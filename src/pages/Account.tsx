import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { ArrowLeft, Loader2, LogOut, User } from "lucide-react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Account = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      if (data) {
        setFullName(data.full_name ?? "");
        setPhone(data.phone ?? "");
        setAddress(data.address ?? "");
      }
      setLoading(false);
    })();
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, full_name: fullName, phone, address });
    setSaving(false);
    if (error) toast.error("Erro ao salvar", { description: error.message });
    else toast.success("Dados salvos!");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1 container py-8 max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary mb-6 font-semibold">
          <ArrowLeft className="h-5 w-5" /> Voltar para a loja
        </Link>

        <div className="bg-card rounded-3xl border-2 border-border shadow-card p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-brand">
              <User className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-serif-display text-3xl text-foreground">Minha conta</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <Label className="text-base font-semibold">Nome completo</Label>
                <Input value={fullName} onChange={(e) => setFullName(e.target.value)}
                  className="h-14 mt-1.5 rounded-xl text-base border-2" />
              </div>
              <div>
                <Label className="text-base font-semibold">Telefone</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(11) 90000-0000"
                  className="h-14 mt-1.5 rounded-xl text-base border-2" />
              </div>
              <div>
                <Label className="text-base font-semibold">Endereço de entrega</Label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3}
                  className="mt-1.5 rounded-xl text-base border-2" placeholder="Rua, número, bairro, cidade, CEP" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <Button type="submit" disabled={saving} size="lg"
                  className="flex-1 h-14 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 shadow-brand">
                  {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Salvar dados"}
                </Button>
                <Button type="button" onClick={signOut} variant="outline" size="lg"
                  className="h-14 rounded-2xl text-base font-bold border-2 text-destructive hover:text-destructive">
                  <LogOut className="h-5 w-5 mr-2" /> Sair
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
