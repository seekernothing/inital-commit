import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { DemoPlayer } from "@/components/DemoPlayer";
import { ProductTour } from "@/components/ProductTour";
import { Receipt } from "@/components/Receipt";
import { Stats } from "@/components/Stats";
import { Pricing } from "@/components/Pricing";
import { FinaleFooter } from "@/components/FinaleFooter";

export default function Home() {
  return (
    <>
      {/* fixed decorative layers (z-0) — one continuous surface */}
      <Background />

      {/* floating navbar (fixed) */}
      <Navbar />

      {/* content sits above the background */}
      <div className="relative z-1">
        <Hero />
        <DemoPlayer />
        <ProductTour />
        <Receipt />
        <Stats />
        <Pricing />
        <FinaleFooter />
      </div>
    </>
  );
}
