const express  = require("express");
const router   = express.Router();
const { pool } = require("../db");

// ── Helpers ───────────────────────────────────────────────────
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const isPhone = (v) => v.replace(/\D/g, "").length >= 10;
const isDate  = (v) => { const d = new Date(v); return !isNaN(d) && d < new Date(); };

// POST /api/leads
router.post("/", async (req, res) => {
  try {
    const nome       = String(req.body.nome       || "").trim();
    const email      = String(req.body.email      || "").trim().toLowerCase();
    const telefone   = String(req.body.telefone   || "").trim();
    const nascimento = String(req.body.nascimento || "").trim();

    // Validação
    const errors = {};
    if (nome.length < 3)       errors.nome       = "Nome deve ter pelo menos 3 caracteres.";
    if (!isEmail(email))        errors.email      = "E-mail inválido.";
    if (!isPhone(telefone))     errors.telefone   = "Telefone inválido.";
    if (!isDate(nascimento))    errors.nascimento = "Data de nascimento inválida.";

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({ error: "Dados inválidos.", fields: errors });
    }

    const { rows } = await pool.query(
      `INSERT INTO leads (nome, email, telefone, nascimento)
       VALUES ($1, $2, $3, $4)
       RETURNING id, nome, email, telefone, nascimento, criado_em`,
      [nome, email, telefone, nascimento]
    );

    return res.status(201).json({ message: "Cadastro realizado com sucesso!", lead: rows[0] });

  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({
        error: "E-mail já cadastrado.",
        fields: { email: "Este e-mail já está na lista de espera." },
      });
    }
    console.error("[POST /leads]", err);
    return res.status(500).json({ error: "Erro interno. Tente novamente." });
  }
});

module.exports = router;
