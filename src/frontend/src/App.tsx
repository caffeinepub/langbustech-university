import { Toaster } from "@/components/ui/sonner";
import AIAdvisorWidget from "./components/AIAdvisorWidget";
import AboutSection from "./components/AboutSection";
import AccreditationSection from "./components/AccreditationSection";
import CertificationsSection from "./components/CertificationsSection";
import ContactSection from "./components/ContactSection";
import CorporateSolutionsSection from "./components/CorporateSolutionsSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import ProgramsSection from "./components/ProgramsSection";
import PublicationsSection from "./components/PublicationsSection";
import RecognitionSection from "./components/RecognitionSection";
import StatsBar from "./components/StatsBar";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0A0A14] text-white font-body">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ProgramsSection />
        <CorporateSolutionsSection />
        <AccreditationSection />
        <PublicationsSection />
        <CertificationsSection />
        <RecognitionSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <AIAdvisorWidget />
      <Toaster />
    </div>
  );
}
