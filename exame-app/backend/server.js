require("dotenv").config();

const express   = require("express");
const cors      = require("cors");
const rateLimit = require("express-rate-limit");
const { initDB } = require("./db");

const leadsRouter = require("./routes/leads");
const adminRouter = require("./routes/admin");

const app  = express();
const PORT = process.env.PORT || 3001;

// ── Middlewares ───────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

// ── Rate limiting ─────────────────────────────────────────────
app.use("/api/leads", rateLimit({
  windowMs: 15 * 60 * 1000, max: 10,
  message: { error: "Muitas tentativas. Aguarde 15 minutos." },
}));
app.use("/api/admin", rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: { error: "Muitas requisições." },
}));

// ── Rotas ─────────────────────────────────────────────────────
app.use("/api/leads", leadsRouter);
app.use("/api/admin", adminRouter);

app.get("/api/health", (_req, res) =>
  res.json({ status: "ok", ts: new Date().toISOString() })
);

app.use((_req, res) => res.status(404).json({ error: "Rota não encontrada." }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Erro interno." });
});

// ── Start ─────────────────────────────────────────────────────
(async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`🚀  API rodando em http://localhost:${PORT}`);
  });
})();
