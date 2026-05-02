import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { HeartPulse, Loader2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const emailSchema = z.string().trim().email("Digite um e-mail válido").max(255);
const passwordSchema = z.string().min(6, "A senha precisa ter no mínimo 6 caracteres").max(72);
const nameSchema = z.string().trim().min(2, "Digite seu nome completo").max(100);

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("login");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      emailSchema.parse(loginEmail);
      passwordSchema.parse(loginPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: loginEmail, password: loginPassword });
    setLoading(false);
    if (error) {
      toast.error("Não foi possível entrar", { description: error.message });
    } else {
      toast.success("Bem-vindo de volta!");
      navigate("/");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      nameSchema.parse(signupName);
      emailSchema.parse(signupEmail);
      passwordSchema.parse(signupPassword);
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0].message);
        return;
      }
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: signupName },
      },
    });
    if (error) {
      setLoading(false);
      toast.error("Não foi possível criar a conta", { description: error.message });
      return;
    }
    // Garante login imediato (auto-confirm habilitado, sem confirmação por e-mail)
    if (!data.session) {
      await supabase.auth.signInWithPassword({ email: signupEmail, password: signupPassword });
    }
    setLoading(false);
    toast.success("Conta criada com sucesso!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex flex-col">
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-base text-muted-foreground hover:text-primary font-semibold">
          <ArrowLeft className="h-5 w-5" /> Voltar para a loja
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-card rounded-3xl border-2 border-border shadow-card-hover p-8">
          <div className="text-center mb-6">
            <div className="inline-flex h-16 w-16 rounded-3xl bg-gradient-brand items-center justify-center shadow-brand mb-4">
              <HeartPulse className="h-8 w-8 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <h1 className="font-serif-display text-3xl text-foreground">Bem-vindo!</h1>
            <p className="text-muted-foreground mt-1">Entre ou crie sua conta para continuar</p>
          </div>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid grid-cols-2 h-12 rounded-2xl bg-secondary p-1.5 mb-6">
              <TabsTrigger value="login" className="rounded-xl text-base font-semibold data-[state=active]:bg-card data-[state=active]:shadow-card">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="rounded-xl text-base font-semibold data-[state=active]:bg-card data-[state=active]:shadow-card">
                Criar conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="le" className="text-base font-semibold">E-mail</Label>
                  <Input id="le" type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-14 mt-1.5 rounded-xl text-base border-2" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="lp" className="text-base font-semibold">Senha</Label>
                  <Input id="lp" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-14 mt-1.5 rounded-xl text-base border-2" placeholder="Sua senha" />
                </div>
                <Button type="submit" disabled={loading} size="lg"
                  className="w-full h-14 rounded-2xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-brand">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="sn" className="text-base font-semibold">Nome completo</Label>
                  <Input id="sn" required value={signupName} onChange={(e) => setSignupName(e.target.value)}
                    className="h-14 mt-1.5 rounded-xl text-base border-2" placeholder="Maria da Silva" />
                </div>
                <div>
                  <Label htmlFor="se" className="text-base font-semibold">E-mail</Label>
                  <Input id="se" type="email" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
                    className="h-14 mt-1.5 rounded-xl text-base border-2" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="sp" className="text-base font-semibold">Crie uma senha</Label>
                  <Input id="sp" type="password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}
                    className="h-14 mt-1.5 rounded-xl text-base border-2" placeholder="Mínimo 6 caracteres" />
                </div>
                <Button type="submit" disabled={loading} size="lg"
                  className="w-full h-14 rounded-2xl text-lg font-bold bg-gradient-promo text-success-foreground shadow-brand">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Criar minha conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Auth;
