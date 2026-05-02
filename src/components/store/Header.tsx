import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Props { onCartClick: () => void }

export const Header = ({ onCartClick }: Props) => {
  const count = useCart((s) => s.count());
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container flex items-center justify-between py-4 gap-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="h-12 w-12 rounded-2xl bg-gradient-brand flex items-center justify-center shadow-brand">
            <HeartPulse className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-serif-display text-2xl text-foreground">FarmaVida</div>
            <div className="text-xs text-muted-foreground font-medium">Especialista em Monjaro</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="lg" className="rounded-2xl h-12 px-5 border-2 hidden sm:flex">
                  <User className="h-5 w-5 mr-2 text-primary" />
                  <span className="font-semibold">Minha conta</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
                <DropdownMenuLabel className="text-base">
                  <p className="font-semibold">Olá!</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="text-base py-3 cursor-pointer">
                  <Link to="/conta"><User className="h-5 w-5 mr-2" /> Meu perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-base py-3 cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-5 w-5 mr-2" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" size="lg" className="rounded-2xl h-12 px-5 border-2 hidden sm:flex">
              <Link to="/auth">
                <User className="h-5 w-5 mr-2 text-primary" />
                <span className="font-semibold">Entrar / Criar conta</span>
              </Link>
            </Button>
          )}

          <Button
            onClick={onCartClick}
            size="lg"
            className="rounded-2xl h-12 px-5 bg-primary hover:bg-primary/90 text-primary-foreground shadow-brand relative"
          >
            <ShoppingCart className="h-5 w-5 mr-2" strokeWidth={2.5} />
            <span className="font-bold">Carrinho</span>
            {count > 0 && (
              <Badge className="ml-2 h-6 min-w-6 rounded-full bg-accent text-accent-foreground border-0 font-bold">
                {count}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
