const express  = require("express");
const router   = express.Router();
const jwt      = require("jsonwebtoken");
const { pool } = require("../db");
const auth     = require("../middleware/auth");

// POST /api/admin/login
router.post("/login", (req, res) => {
  const { username, password } = req.body || {};

  if (
    !username || !password ||
    username !== process.env.ADMIN_USER ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: "Usuário ou senha incorretos." });
  }

  const token = jwt.sign(
    { role: "admin", username },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return res.json({ token, expiresIn: 28800 });
});

// GET /api/admin/stats
router.get("/stats", auth, async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT
        COUNT(*)                                                        AS total,
        COUNT(*) FILTER (WHERE criado_em >= CURRENT_DATE)              AS today,
        COUNT(*) FILTER (WHERE criado_em >= NOW() - INTERVAL '7 days') AS week
      FROM leads
    `);
    return res.json(rows[0]);
  } catch (err) {
    console.error("[GET /admin/stats]", err);
    return res.status(500).json({ error: "Erro interno." });
  }
});

router.get("/leads", auth, async (req, res) => {
  try {
    const page   = Math.max(1, parseInt(req.query.page)  || 1);
    const limit  = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const offset = (page - 1) * limit;
    const search = (req.query.search || "").trim();

    const SORT_COLS = ["nome", "email", "telefone", "nascimento", "criado_em"];
    const sortCol = SORT_COLS.includes(req.query.sort) ? req.query.sort : "criado_em";
    const sortDir = req.query.dir === "asc" ? "ASC" : "DESC";

    const params = [];
    let where = "";
    if (search) {
      params.push(`%${search}%`);
      where = `WHERE nome ILIKE $1 OR email ILIKE $1`;
    }

    const countRes = await pool.query(
      `SELECT COUNT(*) FROM leads ${where}`,
      params
    );
    const total = parseInt(countRes.rows[0].count);

    params.push(limit, offset);
    const li = params.length;
    const dataRes = await pool.query(
      `SELECT id, nome, email, telefone, nascimento, criado_em
       FROM leads ${where}
       ORDER BY ${sortCol} ${sortDir}
       LIMIT $${li - 1} OFFSET $${li}`,
      params
    );

    return res.json({
      leads:      dataRes.rows,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("[GET /admin/leads]", err);
    return res.status(500).json({ error: "Erro interno." });
  }
});

module.exports = router;
