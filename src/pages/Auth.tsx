import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { HeartPulse, Loader2, ArrowLeft, ShieldCheck, Truck, Sparkles, Snowflake } from "lucide-react";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gradient-soft flex flex-col relative overflow-hidden">
      <div className="absolute top-0 -left-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -right-20 h-80 w-80 rounded-full bg-accent/15 blur-3xl pointer-events-none" />

      <div className="container py-5 relative">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-semibold">
          <ArrowLeft className="h-4 w-4" /> Voltar para a loja
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-6 relative">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Lateral institucional */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block px-2"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Acesso seguro
            </span>
            <h2 className="font-serif-display text-4xl xl:text-5xl text-foreground mt-4 leading-tight text-balance">
              Sua jornada de saúde começa aqui
            </h2>
            <p className="text-muted-foreground mt-4 text-base">
              Crie sua conta e acompanhe seus pedidos, receitas e histórico de tratamento em um só lugar.
            </p>

            <div className="mt-7 space-y-3">
              {[
                { Icon: ShieldCheck, t: "100% Original Eli Lilly", d: "Nota fiscal e lote rastreável" },
                { Icon: Snowflake, t: "Entrega refrigerada", d: "Cadeia de frio 2-8°C" },
                { Icon: Truck, t: "Frete grátis", d: "Para todo o Brasil" },
              ].map(({ Icon, t, d }, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-card border border-border"
                >
                  <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground leading-tight">{t}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{d}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Card principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md mx-auto bg-card rounded-3xl border border-border shadow-card-hover p-6 sm:p-8"
          >
            <div className="text-center mb-6">
              <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-brand items-center justify-center shadow-brand mb-3">
                <HeartPulse className="h-7 w-7 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <h1 className="font-serif-display text-2xl sm:text-3xl text-foreground">Bem-vindo!</h1>
              <p className="text-sm text-muted-foreground mt-1">Entre ou crie sua conta para continuar</p>
            </div>

            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-2 h-12 rounded-full bg-secondary p-1 mb-5">
                <TabsTrigger value="login" className="rounded-full text-sm font-semibold data-[state=active]:bg-card data-[state=active]:shadow-card">
                Entrar
              </TabsTrigger>
                <TabsTrigger value="signup" className="rounded-full text-sm font-semibold data-[state=active]:bg-card data-[state=active]:shadow-card">
                Criar conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-3.5">
                <div>
                  <Label htmlFor="le" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">E-mail</Label>
                  <Input id="le" type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                    className="h-12 mt-1.5 rounded-xl text-base" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="lp" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Senha</Label>
                  <Input id="lp" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                    className="h-12 mt-1.5 rounded-xl text-base" placeholder="Sua senha" />
                </div>
                <Button type="submit" disabled={loading} size="lg"
                  className="w-full h-13 rounded-full text-base font-bold bg-primary hover:bg-primary/90 shadow-brand">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-3.5">
                <div>
                  <Label htmlFor="sn" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Nome completo</Label>
                  <Input id="sn" required value={signupName} onChange={(e) => setSignupName(e.target.value)}
                    className="h-12 mt-1.5 rounded-xl text-base" placeholder="Maria da Silva" />
                </div>
                <div>
                  <Label htmlFor="se" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">E-mail</Label>
                  <Input id="se" type="email" required value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)}
                    className="h-12 mt-1.5 rounded-xl text-base" placeholder="seu@email.com" />
                </div>
                <div>
                  <Label htmlFor="sp" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Crie uma senha</Label>
                  <Input id="sp" type="password" required value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)}
                    className="h-12 mt-1.5 rounded-xl text-base" placeholder="Mínimo 6 caracteres" />
                </div>
                <Button type="submit" disabled={loading} size="lg"
                  className="w-full h-13 rounded-full text-base font-bold bg-gradient-promo text-success-foreground shadow-brand">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Criar minha conta"}
                </Button>
              </form>
            </TabsContent>
            </Tabs>

            <p className="text-center text-xs text-muted-foreground mt-5">
              Ao continuar você concorda com nossos termos de uso e política de privacidade.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
