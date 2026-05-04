import { lazy, Suspense, useEffect, useState } from "react";
import { Topbar } from "@/components/store/Topbar";
import { UrgencyBar } from "@/components/store/UrgencyBar";
import { StickyMobileCTA } from "@/components/store/StickyMobileCTA";
import { Header } from "@/components/store/Header";
import { Hero } from "@/components/store/Hero";
import { Catalog } from "@/components/store/Catalog";
import { InfoBanner } from "@/components/store/InfoBanner";
import { Footer } from "@/components/store/Footer";
import { CartSheet } from "@/components/store/CartSheet";
import { trackEvent } from "@/lib/tracking";

const HowItWorks = lazy(() => import("@/components/store/HowItWorks").then(m => ({ default: m.HowItWorks })));
const Stats = lazy(() => import("@/components/store/Stats").then(m => ({ default: m.Stats })));
const Testimonials = lazy(() => import("@/components/store/Testimonials").then(m => ({ default: m.Testimonials })));
const FAQSection = lazy(() => import("@/components/store/FAQSection").then(m => ({ default: m.FAQSection })));
const CTABanner = lazy(() => import("@/components/store/CTABanner").then(m => ({ default: m.CTABanner })));
const WelcomePopup = lazy(() => import("@/components/store/WelcomePopup").then(m => ({ default: m.WelcomePopup })));
const SocialProofToasts = lazy(() => import("@/components/store/SocialProofToasts").then(m => ({ default: m.SocialProofToasts })));

const Index = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [deferredReady, setDeferredReady] = useState(false);

  useEffect(() => {
    trackEvent("page_view", { page: "home" });
    const t = setTimeout(() => setDeferredReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <UrgencyBar />
      <Header onCartClick={() => setCartOpen(true)} />
      <CartSheet open={cartOpen} onOpenChange={setCartOpen} />
      {deferredReady && (
        <Suspense fallback={null}>
          <WelcomePopup />
          <SocialProofToasts />
        </Suspense>
      )}

      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <InfoBanner />
        <Catalog />
        <Suspense fallback={<div className="h-32" />}>
          <Stats />
          <HowItWorks />
          <Testimonials />
          <CTABanner />
          <FAQSection />
        </Suspense>
      </main>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Index;
