import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const PUBLIC_KEY = Deno.env.get("SIGILOPAY_PUBLIC_KEY");
    const SECRET_KEY = Deno.env.get("SIGILOPAY_SECRET_KEY");
    if (!PUBLIC_KEY || !SECRET_KEY) {
      return new Response(JSON.stringify({ error: "Credenciais não configuradas" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const identifier = url.searchParams.get("identifier");

    if (!id && !identifier) {
      return new Response(JSON.stringify({ error: "id ou identifier obrigatório" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const params = new URLSearchParams();
    if (id) params.set("id", id);
    if (identifier) params.set("clientIdentifier", identifier);

    const response = await fetch(`https://app.sigilopay.com.br/api/v1/gateway/transactions?${params.toString()}`, {
      method: "GET",
      headers: {
        "x-public-key": PUBLIC_KEY,
        "x-secret-key": SECRET_KEY,
      },
    });

    const data = await response.json().catch(() => ({}));
    console.log("SigiloPay status check", response.status, JSON.stringify(data).slice(0, 400));

    if (!response.ok) {
      return new Response(JSON.stringify({
        error: data?.message || "Falha ao consultar transação",
        details: data,
      }), { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Atualiza status no banco (best-effort)
    try {
      const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
      const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      if (SUPABASE_URL && SERVICE_ROLE && data?.status) {
        const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
        const match = identifier
          ? { identifier }
          : { transaction_id: String(data.id ?? id) };
        await admin.from("pix_orders").update({ status: data.status }).match(match as any);
      }
    } catch (logErr) {
      console.error("pix_orders update failed", logErr);
    }

    return new Response(JSON.stringify({
      id: data.id,
      status: data.status, // PENDING | COMPLETED | FAILED | REFUNDED | CHARGED_BACK
      paidAt: data.payedAt,
      amount: data.amount,
    }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("check-pix-status error", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});