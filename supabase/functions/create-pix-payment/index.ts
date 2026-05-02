import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PixRequest {
  amount: number; // em reais
  customer: {
    name: string;
    email: string;
    document?: string;
    phone?: string;
  };
  items: Array<{ title: string; quantity: number; unitPrice: number }>;
}

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

    const auth = btoa(`${PUBLIC_KEY}:${SECRET_KEY}`);
    const amountInCents = Math.round(body.amount * 100);

    const payload = {
      amount: amountInCents,
      paymentMethod: "pix",
      customer: {
        name: body.customer.name,
        email: body.customer.email,
        document: { number: (body.customer.document || "00000000000").replace(/\D/g, ""), type: "cpf" },
        phone: body.customer.phone || "11999999999",
      },
      items: body.items.map((it) => ({
        title: it.title,
        quantity: it.quantity,
        unitPrice: Math.round(it.unitPrice * 100),
        tangible: true,
      })),
      pix: { expiresInDays: 1 },
    };

    const response = await fetch("https://api.sigilopay.com.br/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    console.log("SigiloPay response", response.status, JSON.stringify(data));

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Falha ao gerar PIX", details: data }), {
        status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normaliza resposta para o frontend
    const pix = data.pix || data.pixPayment || {};
    return new Response(JSON.stringify({
      id: data.id || data.transactionId,
      status: data.status,
      qrCode: pix.qrcode || pix.qrCode || pix.payload || data.qrcode,
      qrCodeImage: pix.qrCodeImage || pix.qr_code_image || data.qrCodeImage,
      expiresAt: pix.expirationDate || pix.expiresAt,
      amount: body.amount,
      raw: data,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("create-pix-payment error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});