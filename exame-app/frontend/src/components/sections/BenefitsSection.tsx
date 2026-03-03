const benefits = [
  { title: "Acesso instantâneo",            desc: "Encontre qualquer exame em segundos, de qualquer lugar, sem precisar vasculhar o celular." },
  { title: "Histórico completo",            desc: "Todos os exames ordenados por data e tipo, prontos para apresentar ao médico." },
  { title: "Segurança e privacidade",       desc: "Seus dados de saúde são criptografados e nunca são compartilhados sem sua autorização." },
  { title: "Funciona sem internet",         desc: "Acesse seus dados mesmo offline — importante em consultas onde a conexão é ruim." },
  { title: "Grátis para começar",           desc: "O plano básico é completamente gratuito. Organize sua saúde sem gastar nada." },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="bg-white py-24 px-6 md:px-16">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-darker mb-4">
        <span className="w-5 h-0.5 bg-primary rounded" /> Benefícios
      </p>
      <h2 className="font-display font-extrabold text-4xl md:text-5xl text-c-title leading-tight mb-14">
        Por que o Exame App<br />vai mudar sua rotina.
      </h2>

      <div className="grid md:grid-cols-2 gap-16 items-center">
        {/* List */}
        <div className="space-y-6">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-lg bg-primary-light flex items-center justify-center
                              text-primary-darker font-bold text-sm flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <h4 className="font-display font-bold text-c-title mb-1">{b.title}</h4>
                <p className="text-c-secondary text-sm leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats visual */}
        <div className="hidden md:block bg-off-white rounded-3xl p-10 border border-border-light text-center">
          <p className="font-display font-extrabold text-6xl text-primary leading-none">68%</p>
          <p className="text-c-secondary text-sm mt-2 mb-8">
            dos brasileiros já perderam um exame médico importante
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "3×",    lbl: "mais rápido na consulta" },
              { num: "100%",  lbl: "privacidade dos dados"   },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-border-light">
                <p className="font-display font-extrabold text-3xl text-c-title">{s.num}</p>
                <p className="text-c-secondary text-xs mt-1">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
