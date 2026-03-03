const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// ── Types ────────────────────────────────────────────────────
export interface Lead {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  criado_em: string;
}

export interface LeadsResponse {
  leads: Lead[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface StatsResponse {
  total: string;
  today: string;
  week:  string;
}

export interface ApiError {
  error: string;
  fields?: Record<string, string>;
}

// ── Leads ────────────────────────────────────────────────────
export async function createLead(data: {
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
}) {
  const res = await fetch(`${BASE}/api/leads`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw json as ApiError;
  return json as { message: string; lead: Lead };
}

// ── Admin ────────────────────────────────────────────────────
export async function adminLogin(username: string, password: string) {
  const res = await fetch(`${BASE}/api/admin/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok) throw json as ApiError;
  return json as { token: string; expiresIn: number };
}

export async function getStats(token: string) {
  const res = await fetch(`${BASE}/api/admin/stats`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw json as ApiError;
  return json as StatsResponse;
}

export async function getLeads(
  token: string,
  params: { page?: number; limit?: number; search?: string; sort?: string; dir?: string }
) {
  const qs = new URLSearchParams({
    page:   String(params.page  || 1),
    limit:  String(params.limit || 10),
    search: params.search || "",
    sort:   params.sort   || "criado_em",
    dir:    params.dir    || "desc",
  });
  const res = await fetch(`${BASE}/api/admin/leads?${qs}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw json as ApiError;
  return json as LeadsResponse;
}
