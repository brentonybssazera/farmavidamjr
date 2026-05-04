import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PixRequest {
  amount: number;
  customer: { name: string; email: string; document?: string; phone?: string };
  items: Array<{ title: string; quantity: number; unitPrice: number }>;
  shipping?: { name: string; address: string; city: string; state: string; complement?: string };
  sessionId?: string;
}

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const isRepeatedDigits = (value: string) => /^(\d)\1+$/.test(value);

const FALLBACK_CPF = "11144477735";
const FALLBACK_PHONE = "11999999999";

const isValidCPF = (value: string) => {
  if (value.length !== 11 || isRepeatedDigits(value)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i += 1) sum += Number(value[i]) * (10 - i);
  const firstCheck = (sum * 10) % 11 % 10;
  if (firstCheck !== Number(value[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i += 1) sum += Number(value[i]) * (11 - i);
  const secondCheck = (sum * 10) % 11 % 10;
  return secondCheck === Number(value[10]);
};

const isValidCNPJ = (value: string) => {
  if (value.length !== 14 || isRepeatedDigits(value)) return false;

  const calculateCheckDigit = (base: string) => {
    const weights = base.length === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const total = base.split("").reduce((sum, digit, index) => sum + Number(digit) * weights[index], 0);
    const remainder = total % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstCheck = calculateCheckDigit(value.slice(0, 12));
  const secondCheck = calculateCheckDigit(value.slice(0, 12) + firstCheck);
  return firstCheck === Number(value[12]) && secondCheck === Number(value[13]);
};

const isValidBrazilianDocument = (value: string) =>
  (value.length === 11 && isValidCPF(value)) || (value.length === 14 && isValidCNPJ(value));

const normalizeDocument = (value: string) => {
  if (isValidBrazilianDocument(value)) return value;
  return FALLBACK_CPF;
};

const normalizePhone = (value: string) => {
  const digits = value.length > 11 ? value.slice(-11) : value;
  if (/^\d{10,11}$/.test(digits) && !isRepeatedDigits(digits)) return digits;
  return FALLBACK_PHONE;
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const PUBLIC_KEY = Deno.env.get("SIGILOPAY_PUBLIC_KEY");
    const SECRET_KEY = Deno.env.get("SIGILOPAY_SECRET_KEY");
    if (!PUBLIC_KEY || !SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Credenciais SigiloPay não configuradas" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = (await req.json()) as PixRequest;
    if (!body?.amount || !body?.customer?.name || !body?.customer?.email) {
      return new Response(JSON.stringify({ error: "Dados inválidos" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const cleanDocument = normalizeDocument(onlyDigits(body.customer.document || ""));
    const cleanPhone = normalizePhone(onlyDigits(body.customer.phone || ""));

    const identifier = `farmavida-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const payload: Record<string, unknown> = {
      identifier,
      amount: Number(body.amount.toFixed(2)),
      client: {
        name: body.customer.name,
        email: body.customer.email,
        phone: cleanPhone,
        document: cleanDocument,
      },
      products: body.items.map((it, i) => ({
        id: `prod-${i}`,
        name: it.title,
        quantity: it.quantity,
        price: Number(it.unitPrice.toFixed(2)),
      })),
      metadata: {
        source: "farmavida",
        ...(body.shipping ? {
          shippingName: body.shipping.name,
          shippingAddress: body.shipping.address,
          shippingCity: body.shipping.city,
          shippingState: body.shipping.state,
          shippingComplement: body.shipping.complement || "",
        } : {}),
      },
    };

    const response = await fetch("https://app.sigilopay.com.br/api/v1/gateway/pix/receive", {
      method: "POST",
      headers: {
        "x-public-key": PUBLIC_KEY,
        "x-secret-key": SECRET_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    console.log("SigiloPay status", response.status, "body", JSON.stringify(data).slice(0, 800));

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: data?.message || "Falha ao gerar PIX",
        errorCode: data?.errorCode,
        details: data,
      }), { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const pix = data.pix || {};

    // Persist no Lovable Cloud (não bloqueia resposta se falhar)
    try {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (SUPABASE_URL && SERVICE_ROLE) {
        const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
        await admin.from("pix_orders").insert({
          identifier,
          transaction_id: data.transactionId ?? null,
          amount: Number(body.amount.toFixed(2)),
          status: data.status ?? "PENDING",
          customer_name: body.customer.name,
          customer_phone: cleanPhone,
          customer_document: cleanDocument,
          shipping_address: body.shipping?.address ?? null,
          shipping_city: body.shipping?.city ?? null,
          shipping_state: body.shipping?.state ?? null,
          items: body.items,
          session_id: body.sessionId ?? null,
        });
      }
    } catch (logErr) {
      console.error("pix_orders insert failed", logErr);
    }

    return new Response(JSON.stringify({
      id: data.transactionId,
      status: data.status,
      qrCode: pix.code,
      qrCodeImage: pix.base64 || pix.image,
      amount: body.amount,
      identifier,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("create-pix-payment error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});