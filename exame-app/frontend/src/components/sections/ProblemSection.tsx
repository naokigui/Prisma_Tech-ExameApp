const problems = [
  {
    emoji: "📱",
    title: "Exames perdidos no WhatsApp",
    desc: "PDFs esquecidos entre fotos de família e memes, impossíveis de encontrar na hora certa.",
  },
  {
    emoji: "📋",
    title: "Receitas que somem",
    desc: "Papéis amassados na gaveta, fotos desfocadas que você nunca consegue ler quando precisa.",
  },
  {
    emoji: "💉",
    title: '"Qual vacina você tomou?"',
    desc: "Ninguém sabe responder. A carteirinha sumiu e você não faz ideia do que está em dia.",
  },
  {
    emoji: "📊",
    title: "Sem histórico para comparar",
    desc: "Impossível saber se seu colesterol piorou sem ter os exames anteriores na mão.",
  },
];

const chaosFiles = [
  "📄 hemograma_2023.pdf",
  "📷 IMG_20240312.jpg",
  "📄 receita_dez.pdf",
  "📷 exame_tireoide.jpg",
  "📄 vacina_covid_2.pdf",
  "💬 WhatsApp · Encaminhado",
  "📄 ecg_resultado.pdf",
  "📷 foto_resultado.jpg",
];

const rotations = ["-2deg", "1.5deg", "-1deg", "2.5deg", "-1.5deg", "1deg", "-2.5deg", "1.2deg"];

export default function ProblemSection() {
  return (
    <section id="problem" className="bg-white py-24 px-6 md:px-16">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-darker mb-4">
        <span className="w-5 h-0.5 bg-primary rounded" /> O problema
      </p>
      <h2 className="font-display font-extrabold text-4xl md:text-5xl text-c-title leading-tight mb-4">
        Sua vida médica está<br />em todo lugar.
      </h2>
      <p className="text-c-secondary text-lg max-w-lg mb-14">
        E quando você mais precisa, encontrar um exame vira uma tarefa impossível.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Problem list */}
        <div className="space-y-4">
          {problems.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-4 p-5 bg-off-white rounded-2xl
                         border-l-4 border-transparent transition-all duration-300
                         hover:border-c-error hover:shadow-card"
            >
              <span className="text-2xl mt-0.5 flex-shrink-0">{p.emoji}</span>
              <div>
                <p className="font-semibold text-c-title text-sm mb-1">{p.title}</p>
                <p className="text-c-secondary text-sm leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chaos visual */}
        <div className="hidden md:block bg-off-white rounded-3xl p-8 border border-border-light">
          <p className="text-xs font-bold text-c-secondary uppercase tracking-widest text-center mb-6">
            Sua situação atual
          </p>
          <div className="flex flex-wrap gap-3">
            {chaosFiles.map((f, i) => (
              <div
                key={i}
                style={{ transform: `rotate(${rotations[i]})` }}
                className="bg-white rounded-xl px-3 py-2.5 text-xs text-c-body
                           border border-border-light shadow-card whitespace-nowrap"
              >
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
