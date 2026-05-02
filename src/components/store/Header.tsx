import { Link } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/stores/cartStore";
import { useAuth } from "@/hooks/useAuth";
import logoImg from "@/assets/logo.png";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Props { onCartClick: () => void }

export const Header = ({ onCartClick }: Props) => {
  const count = useCart((s) => s.count());
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border shadow-sm">
      <div className="container flex items-center justify-between py-3 gap-4">
        <Link to="/" className="flex items-center gap-2.5">
          <img src={logoImg} alt="FarmaVida" className="h-11 w-11 object-contain" />
          <div className="leading-tight">
            <div className="font-serif-display text-xl text-foreground tracking-tight">FarmaVida</div>
            <div className="text-[11px] text-muted-foreground font-medium tracking-wide uppercase">Mounjaro · Porto Velho/RO</div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full h-11 px-4 hidden sm:flex hover:bg-primary-soft">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  <span className="font-medium text-sm">Minha conta</span>
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
            <Button asChild variant="ghost" className="rounded-full h-11 px-4 hidden sm:flex hover:bg-primary-soft">
              <Link to="/auth">
                <User className="h-4 w-4 mr-2 text-primary" />
                <span className="font-medium text-sm">Entrar / Criar conta</span>
              </Link>
            </Button>
          )}

          <Button
            onClick={onCartClick}
            className="rounded-full h-11 px-5 bg-primary hover:bg-primary/90 text-primary-foreground relative"
          >
            <ShoppingCart className="h-4 w-4 mr-2" strokeWidth={2.5} />
            <span className="font-semibold text-sm">Carrinho</span>
            {count > 0 && (
              <Badge className="ml-2 h-5 min-w-5 rounded-full bg-accent text-accent-foreground border-0 font-bold text-xs px-1.5">
                {count}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};
