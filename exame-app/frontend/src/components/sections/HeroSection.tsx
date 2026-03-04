import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center
                        text-center px-6 pt-32 pb-20 overflow-hidden">
      {/* BG radial + grid */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% -5%, rgba(26,222,196,.18) 0%, transparent 60%),
            radial-gradient(circle at 85% 85%, rgba(26,222,196,.07) 0%, transparent 40%),
            #F8FAFA`,
        }}
      />
      <div className="hero-grid absolute inset-0 -z-10 opacity-40" />

      {/* Badge */}
      <div className="animate-fade-up inline-flex items-center gap-2 text-primary-darker text-sm font-medium
                      bg-primary-lighter border border-primary/30 rounded-full px-4 py-1.5 mb-8">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
        Lançamento em breve — vagas limitadas
      </div>

      {/* Heading */}
      <h1 className="animate-fade-up-1 font-display font-extrabold text-c-title
                     text-5xl sm:text-6xl lg:text-[5rem] leading-[1.06] mb-6">
        Sua saúde,{" "}
        <span className="text-primary accent-underline relative">organizada</span>
        <br />de verdade.
      </h1>

      {/* Sub */}
      <p className="animate-fade-up-2 text-c-secondary text-lg leading-relaxed max-w-[560px] mb-10">
        Chega de PDFs espalhados no WhatsApp. O Exame App centraliza seus
        exames, receitas e vacinas — sempre acessível quando você precisar.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up-3 flex flex-col sm:flex-row gap-4 justify-center mb-20">
        <Link
          href="#waitlist"
          className="inline-flex items-center justify-center gap-2 bg-primary text-white
                     font-medium px-8 py-4 rounded-xl text-base
                     hover:bg-primary-dark transition-all duration-200 hover:-translate-y-0.5
                     shadow-primary-md hover:shadow-primary-lg"
        >
          Quero acesso antecipado
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="#solution"
          className="inline-flex items-center justify-center gap-2 bg-white text-c-title
                     font-medium px-7 py-4 rounded-xl text-base border border-border-light
                     hover:border-primary hover:text-primary-darker transition-all duration-200"
        >
          Como funciona
          <ChevronDown className="w-4 h-4" />
        </Link>
      </div>

      {/* Phone mockup */}
      <div className="animate-fade-up-3 relative">
        <div className="w-56 mx-auto bg-white rounded-[2.5rem] border-[5px] border-gray-200
                        shadow-[0_40px_80px_rgba(0,0,0,.12)] overflow-hidden">
          {/* Screen */}
          <div className="h-[460px] bg-gradient-to-b from-primary-light to-white p-5 flex flex-col gap-3">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-1">
              <span className="font-display font-bold text-xs text-c-title">Meus Exames</span>
              <div className="w-7 h-7 rounded-full bg-primary" />
            </div>

            {/* Cards */}
            {[
              { icon: "🩸", name: "Hemograma Completo", date: "15 jan 2026", badge: "Normal", badgeColor: "bg-green-100 text-green-700" },
              { icon: "🫀", name: "ECG Repouso",        date: "02 mar 2025", badge: "Normal", badgeColor: "bg-green-100 text-green-700" },
              { icon: "💉", name: "Vacina COVID-19",    date: "20 abr 2025", badge: "Novo",   badgeColor: "bg-primary-lighter text-primary-darker" },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-3 shadow-card flex items-center gap-3 animate-slide-card"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center text-base flex-shrink-0">
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.68rem] font-semibold text-c-title truncate">{card.name}</p>
                  <p className="text-[0.6rem] text-c-secondary mt-0.5">{card.date}</p>
                </div>
                <span className={`text-[0.58rem] font-semibold px-2 py-0.5 rounded-full ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
            ))}

            {/* Progress bar */}
            <div className="bg-white rounded-2xl p-3 shadow-card mt-1">
              <p className="text-[0.6rem] text-c-secondary mb-2">Saúde geral • 3 exames recentes</p>
              <div className="h-2 bg-border-light rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-bar-grow" style={{ width: "68%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating card */}
        <div className="absolute -right-6 top-16 bg-white rounded-2xl p-3 shadow-card-hover border border-border-light
                        flex items-center gap-3 w-44 animate-fade-up-3">
          <div className="w-8 h-8 rounded-xl bg-green-100 flex items-center justify-center text-sm">📊</div>
          <div>
            <p className="text-[0.65rem] font-semibold text-c-title">Colesterol</p>
            <p className="text-[0.58rem] text-c-success font-semibold">↓ 12% vs anterior</p>
          </div>
        </div>
        <div className="absolute -left-8 bottom-20 bg-white rounded-2xl p-3 shadow-card-hover border border-border-light
                        flex items-center gap-3 w-40 animate-fade-up-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-sm">💊</div>
          <div>
            <p className="text-[0.65rem] font-semibold text-c-title">Receita salva</p>
            <p className="text-[0.58rem] text-c-secondary">Validade: 60 dias</p>
          </div>
        </div>
      </div>
    </section>
  );
}
