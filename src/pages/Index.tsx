import { useState } from "react";
import { Topbar } from "@/components/store/Topbar";
import { Header } from "@/components/store/Header";
import { Hero } from "@/components/store/Hero";
import { Catalog } from "@/components/store/Catalog";
import { InfoBanner } from "@/components/store/InfoBanner";
import { HowItWorks } from "@/components/store/HowItWorks";
import { Stats } from "@/components/store/Stats";
import { Testimonials } from "@/components/store/Testimonials";
import { FAQSection } from "@/components/store/FAQSection";
import { CTABanner } from "@/components/store/CTABanner";
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
        <Hero />
        <InfoBanner />
        <Catalog />
        <Stats />
        <HowItWorks />
        <Testimonials />
        <CTABanner />
        <FAQSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
