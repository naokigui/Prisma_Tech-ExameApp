import Navbar         from "@/components/ui/Navbar";
import HeroSection     from "@/components/sections/HeroSection";
import ProblemSection  from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import WaitlistSection from "@/components/sections/WaitlistSection";
import Footer          from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Social proof strip */}
        <div className="bg-white border-y border-border-light py-5 px-6 md:px-16
                        flex flex-wrap items-center justify-center gap-3 text-sm text-c-secondary">
          <span><strong className="text-c-title">+2.400 pessoas</strong> já na lista de espera</span>
          <span className="w-1 h-1 rounded-full bg-c-border hidden sm:block" />
          <span>Lançamento previsto para <strong className="text-c-title">2025</strong></span>
          <span className="w-1 h-1 rounded-full bg-c-border hidden sm:block" />
          <span>100% gratuito no acesso antecipado</span>
        </div>

        <ProblemSection />
        <SolutionSection />
        <BenefitsSection />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
