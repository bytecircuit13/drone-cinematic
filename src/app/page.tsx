import CanvasBackground from "../components/scroll/CanvasBackground";
import Navbar from "../components/ui/Navbar";
import HeroSection from "../components/sections/HeroSection";
import FeatureSections from "../components/sections/FeatureSections";
import TechSpecs from "../components/sections/TechSpecs";
import Footer from "../components/sections/Footer";
import ScrollNav from "../components/ui/ScrollNav";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative w-full overflow-hidden">
      <Navbar />
      <ScrollNav />
      <CanvasBackground />
      <HeroSection />
      <FeatureSections />
      <TechSpecs />
      <Footer />
    </main>
  );
}
