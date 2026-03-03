"use client";

import { useState } from "react";
import { createLead, type ApiError } from "@/lib/api";
import { CheckCircle, Loader2 } from "lucide-react";
import clsx from "clsx";

type Field = "nome" | "email" | "telefone" | "nascimento";

interface FormData { nome: string; email: string; telefone: string; nascimento: string }
interface FormErrors { nome?: string; email?: string; telefone?: string; nascimento?: string }

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v: string) => v.replace(/\D/g, "").length >= 10;
const isDate  = (v: string) => { const d = new Date(v); return !isNaN(d.getTime()) && d < new Date(); };

function maskPhone(v: string) {
  const n = v.replace(/\D/g, "").slice(0, 11);
  if (n.length > 6) return `(${n.slice(0,2)}) ${n.slice(2,7)}-${n.slice(7)}`;
  if (n.length > 2) return `(${n.slice(0,2)}) ${n.slice(2)}`;
  if (n.length > 0) return `(${n}`;
  return "";
}

function validate(data: FormData): FormErrors {
  const e: FormErrors = {};
  if (data.nome.trim().length < 3)       e.nome       = "Nome deve ter pelo menos 3 caracteres.";
  if (!isEmail(data.email.trim()))        e.email      = "E-mail inválido.";
  if (!isPhone(data.telefone))            e.telefone   = "Telefone inválido.";
  if (!isDate(data.nascimento))           e.nascimento = "Data de nascimento inválida.";
  return e;
}

export default function LeadForm() {
  const [form, setForm]       = useState<FormData>({ nome: "", email: "", telefone: "", nascimento: "" });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function setField(field: Field, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    try {
      await createLead({
        nome:       form.nome.trim(),
        email:      form.email.trim().toLowerCase(),
        telefone:   form.telefone,
        nascimento: form.nascimento,
      });
      setSuccess(true);
    } catch (err) {
      const apiErr = err as ApiError;
      if (apiErr.fields) {
        setErrors(apiErr.fields as FormErrors);
      } else {
        setErrors({ email: apiErr.error || "Erro ao enviar. Tente novamente." });
      }
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="bg-primary-light border border-primary/30 rounded-2xl p-8 text-center animate-fade-up">
        <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-white" />
        </div>
        <h3 className="font-display font-bold text-lg text-c-title mb-2">
          Você está na lista! 🎉
        </h3>
        <p className="text-c-secondary text-sm leading-relaxed">
          Recebemos seu cadastro. Assim que o Exame App for lançado,
          você será um dos primeiros a saber.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-c-body mb-1.5">
          Nome completo <span className="text-c-error">*</span>
        </label>
        <input
          type="text"
          placeholder="Seu nome completo"
          value={form.nome}
          onChange={e => setField("nome", e.target.value)}
          className={clsx("form-input", errors.nome && "error")}
        />
        {errors.nome && <p className="text-c-error text-xs mt-1">{errors.nome}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-c-body mb-1.5">
          E-mail <span className="text-c-error">*</span>
        </label>
        <input
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={e => setField("email", e.target.value)}
          className={clsx("form-input", errors.email && "error")}
        />
        {errors.email && <p className="text-c-error text-xs mt-1">{errors.email}</p>}
      </div>

      {/* Telefone + Nascimento */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium text-c-body mb-1.5">
            Telefone <span className="text-c-error">*</span>
          </label>
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            value={form.telefone}
            onChange={e => setField("telefone", maskPhone(e.target.value))}
            className={clsx("form-input", errors.telefone && "error")}
          />
          {errors.telefone && <p className="text-c-error text-xs mt-1">{errors.telefone}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-c-body mb-1.5">
            Nascimento <span className="text-c-error">*</span>
          </label>
          <input
            type="date"
            value={form.nascimento}
            onChange={e => setField("nascimento", e.target.value)}
            className={clsx("form-input", errors.nascimento && "error")}
          />
          {errors.nascimento && <p className="text-c-error text-xs mt-1">{errors.nascimento}</p>}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full mt-2 py-4 bg-primary text-white font-display font-bold rounded-xl
                   transition-all duration-200 hover:bg-primary-dark hover:-translate-y-0.5
                   shadow-primary-sm hover:shadow-primary-md
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0
                   flex items-center justify-center gap-2"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
        ) : (
          "Garantir meu acesso →"
        )}
      </button>

      <p className="text-center text-xs text-c-disabled mt-1">
        🔒 Seus dados são protegidos e nunca serão vendidos.
      </p>
    </form>
  );
}
