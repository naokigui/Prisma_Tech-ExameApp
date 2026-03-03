const features = [
  { icon: "📂", title: "Upload de exames",        desc: "Fotografe ou envie PDFs de qualquer exame. O app organiza automaticamente por tipo e data." },
  { icon: "💊", title: "Receitas digitais",        desc: "Registre receitas médicas com data de validade. Nunca mais fique sem saber qual medicamento tomar." },
  { icon: "💉", title: "Cartão de vacinas",        desc: "Histórico completo das vacinas tomadas, com alertas para as próximas doses." },
  { icon: "📈", title: "Comparação de exames",     desc: "Acompanhe a evolução de qualquer indicador ao longo do tempo com gráficos claros." },
  { icon: "🤝", title: "Compartilhamento rápido",  desc: "Envie seus dados para qualquer médico em segundos — com controle total do que compartilhar." },
  { icon: "🤖", title: "IA de leitura básica",     desc: "Entenda o que está no seu exame com resumos simples. Sem diagnóstico — só clareza." },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="bg-off-white py-24 px-6 md:px-16">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-darker mb-4">
        <span className="w-5 h-0.5 bg-primary rounded" /> A solução
      </p>
      <h2 className="font-display font-extrabold text-4xl md:text-5xl text-c-title leading-tight mb-4">
        Tudo em um lugar,<br />sempre organizado.
      </h2>
      <p className="text-c-secondary text-lg max-w-lg mb-14">
        O Exame App centraliza toda a sua vida médica com inteligência e simplicidade.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="feature-card bg-white rounded-2xl p-8 border border-border-light
                       transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-primary-light
                            flex items-center justify-center text-2xl mb-5">
              {f.icon}
            </div>
            <h3 className="font-display font-bold text-base text-c-title mb-2">{f.title}</h3>
            <p className="text-c-secondary text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
