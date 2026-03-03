import LeadForm from "@/components/ui/LeadForm";

export default function WaitlistSection() {
  return (
    <section
      id="waitlist"
      className="relative py-24 px-6 md:px-16 overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #2a2a2a 100%)" }}
    >
      {/* BG accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 80% at 100% 50%, rgba(26,222,196,.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        {/* Text */}
        <div>
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                        text-primary/80 mb-4">
            <span className="w-5 h-0.5 bg-primary rounded" /> Acesso antecipado
          </p>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-tight mb-6">
            Seja o primeiro a<br />usar o Exame App.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-8">
            Cadastre-se agora e garanta acesso gratuito ao lançamento.
            Vamos te avisar assim que o app estiver disponível.
          </p>

          {/* Social proof */}
          <div className="flex flex-wrap gap-6">
            {[
              { num: "+2.4k", lbl: "na lista de espera" },
              { num: "100%",  lbl: "gratuito no acesso" },
              { num: "2025",  lbl: "previsão de lançamento" },
            ].map((s, i) => (
              <div key={i}>
                <p className="font-display font-extrabold text-2xl text-primary">{s.num}</p>
                <p className="text-white/50 text-xs mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_24px_64px_rgba(0,0,0,.25)]">
          <p className="font-display font-bold text-c-title text-lg mb-6">
            Quero acesso antecipado ✦
          </p>
          <LeadForm />
        </div>
      </div>
    </section>
  );
}
