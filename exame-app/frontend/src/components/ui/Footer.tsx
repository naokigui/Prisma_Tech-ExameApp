import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-c-title text-white/50 py-10 px-6 md:px-16 text-center text-sm">
      <p>
        <strong className="text-white font-semibold">Exame App</strong> — Sua saúde organizada em um único lugar.
      </p>
      <p className="mt-2 text-xs text-white/30">
        ⚠️ O Exame App não fornece diagnósticos médicos nem orientações de saúde.
        Consulte sempre um profissional habilitado.
      </p>
      <div className="mt-6 pt-6 border-t border-white/10">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-xs text-white/30
                     hover:text-white/70 transition-colors duration-200"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
          Acesso administrativo
        </Link>
      </div>
    </footer>
  );
}