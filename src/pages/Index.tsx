import { Navbar } from "@/components/store/Navbar";
import { Hero } from "@/components/store/Hero";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Features } from "@/components/store/Features";
import { Safety } from "@/components/store/Safety";
import { Footer } from "@/components/store/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <Features />
        <Safety />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
