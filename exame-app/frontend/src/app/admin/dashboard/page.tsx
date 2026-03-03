"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter }  from "next/navigation";
import { getLeads, getStats, type Lead, type StatsResponse } from "@/lib/api";
import {
  Search, LogOut, ChevronUp, ChevronDown,
  ChevronsUpDown, ChevronLeft, ChevronRight,
  Users, CalendarDays, TrendingUp, Loader2,
} from "lucide-react";
import clsx from "clsx";

type SortKey = "nome" | "email" | "telefone" | "nascimento" | "criado_em";
type SortDir = "asc" | "desc";

function useToken() {
  const router = useRouter();
  function getToken() {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("admin_token");
    const exp   = Number(localStorage.getItem("admin_token_exp") || 0);
    if (!token || Date.now() > exp) {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_token_exp");
      return null;
    }
    return token;
  }
  return { getToken, router };
}

function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string; label: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-border-light shadow-card flex items-center gap-5">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="font-display font-extrabold text-3xl text-c-title leading-none">{value}</p>
        <p className="text-c-secondary text-sm mt-1">{label}</p>
      </div>
    </div>
  );
}

function SortIcon({ field, sort, dir }: { field: SortKey; sort: SortKey; dir: SortDir }) {
  if (sort !== field) return <ChevronsUpDown className="w-3.5 h-3.5 opacity-30" />;
  return dir === "asc"
    ? <ChevronUp className="w-3.5 h-3.5 text-primary" />
    : <ChevronDown className="w-3.5 h-3.5 text-primary" />;
}

const PAGE_SIZE = 10;

export default function DashboardPage() {
  const { getToken, router } = useToken();
  const [stats,   setStats]   = useState<StatsResponse | null>(null);
  const [leads,   setLeads]   = useState<Lead[]>([]);
  const [total,   setTotal]   = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page,    setPage]    = useState(1);
  const [search,  setSearch]  = useState("");
  const [sort,    setSort]    = useState<SortKey>("criado_em");
  const [dir,     setDir]     = useState<SortDir>("desc");
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");

  // Debounced search
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const t = setTimeout(() => { setSearch(searchInput); setPage(1); }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchData = useCallback(async () => {
    const token = getToken();
    if (!token) { router.push("/admin"); return; }
    setLoading(true); setError("");
    try {
      const [s, d] = await Promise.all([
        getStats(token),
        getLeads(token, { page, limit: PAGE_SIZE, search, sort, dir }),
      ]);
      setStats(s);
      setLeads(d.leads);
      setTotal(d.total);
      setTotalPages(d.totalPages);
    } catch (e: unknown) {
      const err = e as { error?: string };
      if (err?.error?.includes("Token")) { router.push("/admin"); }
      else setError(err?.error || "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, [page, search, sort, dir, getToken, router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  function handleSort(key: SortKey) {
    if (sort === key) setDir(d => d === "asc" ? "desc" : "asc");
    else { setSort(key); setDir("desc"); }
    setPage(1);
  }

  function logout() {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_token_exp");
    router.push("/admin");
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
    });
  }
  function formatDateTime(iso: string) {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  const thClass = (key: SortKey) =>
    clsx(
      "px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer select-none",
      "bg-off-white border-b border-border-light transition-colors duration-150",
      sort === key ? "text-primary-darker" : "text-c-secondary hover:text-c-body"
    );

  return (
    <div className="min-h-screen bg-off-white">
      {/* Top nav */}
      <nav className="bg-white border-b border-border-light px-6 md:px-10 py-4
                      flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3 font-display font-extrabold text-lg text-c-title">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-primary-sm">
            <svg className="w-4 h-4 fill-white" viewBox="0 0 16 16">
              <path d="M8 0L5.6 5.6H0L4.8 9l-2 6L8 11.6 13.2 15l-2-6L16 5.6h-5.6z" />
            </svg>
          </div>
          Exame App
          <span className="bg-primary-lighter text-primary-darker text-xs font-semibold
                           px-2.5 py-0.5 rounded-full ml-1">
            Admin
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-c-secondary text-sm
                     hover:text-c-error transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          Sair
        </button>
      </nav>

      <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-extrabold text-2xl text-c-title">Painel de Leads</h1>
          <p className="text-c-secondary text-sm mt-1">Cadastros recebidos via landing page</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<Users className="w-5 h-5 text-primary-darker" />}
            color="bg-primary-light"
            value={stats ? String(stats.total) : "—"}
            label="Total de leads"
          />
          <StatCard
            icon={<CalendarDays className="w-5 h-5 text-blue-600" />}
            color="bg-blue-50"
            value={stats ? String(stats.today) : "—"}
            label="Cadastros hoje"
          />
          <StatCard
            icon={<TrendingUp className="w-5 h-5 text-green-600" />}
            color="bg-green-50"
            value={stats ? String(stats.week) : "—"}
            label="Últimos 7 dias"
          />
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-c-error text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* Search + count */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-c-disabled" />
            <input
              type="text"
              placeholder="Buscar por nome ou e-mail..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="form-input pl-10"
            />
          </div>
          <p className="text-c-secondary text-sm whitespace-nowrap">
            {total} {total === 1 ? "resultado" : "resultados"}
          </p>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-border-light overflow-hidden shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  {(["nome","email","telefone","nascimento","criado_em"] as SortKey[]).map(col => (
                    <th key={col} className={thClass(col)} onClick={() => handleSort(col)}>
                      <div className="flex items-center gap-1.5">
                        {{ nome:"Nome", email:"E-mail", telefone:"Telefone",
                           nascimento:"Nascimento", criado_em:"Cadastrado em" }[col]}
                        <SortIcon field={col} sort={sort} dir={dir} />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-c-disabled">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-primary" />
                      Carregando...
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-20 text-center text-c-disabled">
                      <p className="text-3xl mb-2">🔍</p>
                      Nenhum lead encontrado.
                    </td>
                  </tr>
                ) : (
                  leads.map((lead, i) => (
                    <tr key={lead.id} className={clsx("transition-colors", i % 2 === 0 ? "bg-white" : "bg-off-white/50", "hover:bg-primary-light/30")}>
                      <td className="px-4 py-3.5 text-sm font-semibold text-c-title border-b border-border-light/60">
                        {lead.nome}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-c-body border-b border-border-light/60">
                        {lead.email}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-c-secondary border-b border-border-light/60">
                        {lead.telefone}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-c-secondary border-b border-border-light/60">
                        {formatDate(lead.nascimento + "T12:00:00")}
                      </td>
                      <td className="px-4 py-3.5 text-sm text-c-secondary border-b border-border-light/60">
                        {formatDateTime(lead.criado_em)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-4 py-4 flex items-center justify-between border-t border-border-light">
              <p className="text-xs text-c-secondary">
                Página {page} de {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 rounded-lg border border-border-light bg-white hover:border-primary
                             disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const p = totalPages <= 5 ? i + 1 :
                    page <= 3 ? i + 1 :
                    page >= totalPages - 2 ? totalPages - 4 + i :
                    page - 2 + i;
                  return (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={clsx(
                        "w-9 h-9 rounded-lg border text-sm font-medium transition-all",
                        page === p
                          ? "bg-primary text-white border-primary shadow-primary-sm"
                          : "bg-white text-c-body border-border-light hover:border-primary hover:text-primary-darker"
                      )}
                    >
                      {p}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 rounded-lg border border-border-light bg-white hover:border-primary
                             disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
