import { useState } from "react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Catalog } from "@/components/store/Catalog";
import { InfoBanner } from "@/components/store/InfoBanner";
import { HowItWorks } from "@/components/store/HowItWorks";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />

      <main className="flex-1">
        {/* PRODUTOS NO TOPO — para idosos comprarem rapidamente */}
        <Catalog />
        <InfoBanner />
        <HowItWorks />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
