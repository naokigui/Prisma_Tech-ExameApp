"use client";

import { useState }     from "react";
import { useRouter }    from "next/navigation";
import { adminLogin }   from "@/lib/api";
import { Loader2, Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [error,     setError]     = useState("");
  const [loading,   setLoading]   = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!username || !password) { setError("Preencha todos os campos."); return; }
    setLoading(true); setError("");
    try {
      const { token, expiresIn } = await adminLogin(username, password);
      const exp = Date.now() + expiresIn * 1000;
      localStorage.setItem("admin_token",   token);
      localStorage.setItem("admin_token_exp", String(exp));
      router.push("/admin/dashboard");
    } catch (err: unknown) {
      const e = err as { error?: string };
      setError(e?.error || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-off-white flex items-center justify-center px-4">
      {/* BG accent */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(26,222,196,.1) 0%, transparent 60%), #F8FAFA",
        }}
      />

      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,.1)] border border-border-light">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-primary-sm">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 16 16">
                <path d="M8 0L5.6 5.6H0L4.8 9l-2 6L8 11.6 13.2 15l-2-6L16 5.6h-5.6z" />
              </svg>
            </div>
            <span className="font-display font-extrabold text-xl text-c-title">Exame App</span>
          </div>
          <p className="text-center text-c-secondary text-sm mb-8">
            Acesso ao painel administrativo
          </p>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-c-error text-sm
                            rounded-xl px-4 py-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm font-medium text-c-body mb-1.5">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-c-body mb-1.5">Senha</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={clsx("form-input pr-10")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-c-disabled hover:text-c-secondary transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-primary text-white font-display font-bold rounded-xl
                         transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5
                         shadow-primary-sm hover:shadow-primary-md
                         disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                         flex items-center justify-center gap-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Entrando...</> : "Entrar no painel"}
            </button>
          </form>

          <p className="text-center text-xs text-c-disabled mt-6">
            Credenciais padrão: <code className="bg-off-white px-1.5 py-0.5 rounded text-c-secondary">admin</code> /{" "}
            <code className="bg-off-white px-1.5 py-0.5 rounded text-c-secondary">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}
