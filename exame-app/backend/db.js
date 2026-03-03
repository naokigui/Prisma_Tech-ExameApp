const { Pool } = require("pg");

const pool = new Pool({
  host:     process.env.DB_HOST     || "localhost",
  port:     parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME     || "exame_app",
  user:     process.env.DB_USER     || "postgres",
  password: process.env.DB_PASSWORD || "",
});

pool.on("error", (err) => {
  console.error("Erro inesperado no pool do PostgreSQL:", err);
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id          SERIAL        PRIMARY KEY,
        nome        VARCHAR(120)  NOT NULL,
        email       VARCHAR(180)  NOT NULL UNIQUE,
        telefone    VARCHAR(20)   NOT NULL,
        nascimento  DATE          NOT NULL,
        criado_em   TIMESTAMPTZ   NOT NULL DEFAULT NOW()
      );

      CREATE INDEX IF NOT EXISTS idx_leads_email     ON leads (email);
      CREATE INDEX IF NOT EXISTS idx_leads_criado_em ON leads (criado_em DESC);
    `);
    console.log("✅ Banco de dados inicializado.");
  } finally {
    client.release();
  }
}

module.exports = { pool, initDB };
