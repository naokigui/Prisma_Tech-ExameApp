# 🩺 Exame App

Landing page + backend + painel admin para o **Exame App** — o aplicativo que centraliza sua vida médica em um único lugar.

---

## 📁 Estrutura do Projeto

```
exame-app/
├── backend/            # Node.js + Express + PostgreSQL
│   ├── middleware/
│   │   └── auth.js     # Middleware JWT
│   ├── routes/
│   │   ├── leads.js    # POST /api/leads
│   │   └── admin.js    # Login + listagem de leads
│   ├── db.js           # Conexão + criação de tabelas
│   ├── server.js       # Entry point do servidor
│   ├── .env.example    # Variáveis de ambiente
│   └── package.json
│
└── frontend/           # Next.js 14 + Tailwind CSS
    └── src/
        ├── app/
        │   ├── page.tsx              # Landing page
        │   ├── layout.tsx            # Layout global (fonts)
        │   ├── globals.css           # Estilos base + Tailwind
        │   └── admin/
        │       ├── page.tsx          # Tela de login admin
        │       └── dashboard/
        │           └── page.tsx      # Painel com tabela de leads
        ├── components/
        │   ├── ui/
        │   │   ├── Navbar.tsx
        │   │   ├── LeadForm.tsx      # Formulário com validação
        │   │   └── Footer.tsx
        │   └── sections/
        │       ├── HeroSection.tsx
        │       ├── ProblemSection.tsx
        │       ├── SolutionSection.tsx
        │       ├── BenefitsSection.tsx
        │       └── WaitlistSection.tsx
        └── lib/
            └── api.ts                # Funções tipadas de chamada à API
```

---

## ⚡ Como rodar o projeto

### Pré-requisitos

- **Node.js** 18+
- **PostgreSQL** 14+ instalado e rodando
- **npm** ou **yarn**

---

### 1. Configurar o banco de dados

```sql
-- No psql ou PgAdmin:
CREATE DATABASE exame_app;
```

> O backend cria as tabelas automaticamente ao iniciar. Não precisa rodar migrações manualmente.

---

### 2. Rodar o Backend

```bash
cd backend

# Instalar dependências
npm install

# Copiar e editar variáveis de ambiente
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=exame_app
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui

JWT_SECRET=troque_por_uma_chave_forte_min32chars_aqui!!

ADMIN_USER=admin
ADMIN_PASSWORD=admin123

PORT=3001
FRONTEND_URL=http://localhost:3000
```

```bash
# Iniciar em modo desenvolvimento
npm run dev

# Ou em produção
npm start
```

✅ API disponível em `http://localhost:3001`  
✅ Health check: `http://localhost:3001/api/health`

---

### 3. Rodar o Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Copiar e editar variáveis de ambiente
cp .env.local.example .env.local
```

Conteúdo do `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

```bash
# Iniciar em modo desenvolvimento
npm run dev
```

✅ Frontend disponível em `http://localhost:3000`

---

## 🔗 Endpoints da API

| Método | Rota                  | Descrição                     | Auth     |
|--------|-----------------------|-------------------------------|----------|
| POST   | `/api/leads`          | Cria um novo lead             | ❌        |
| POST   | `/api/admin/login`    | Login e retorna JWT           | ❌        |
| GET    | `/api/admin/stats`    | Estatísticas dos leads        | ✅ Bearer |
| GET    | `/api/admin/leads`    | Lista leads (filtro + paginação) | ✅ Bearer |
| GET    | `/api/health`         | Health check                  | ❌        |

### Query params de `/api/admin/leads`
| Param    | Default      | Descrição                          |
|----------|--------------|------------------------------------|
| `page`   | `1`          | Número da página                   |
| `limit`  | `10`         | Itens por página (máx 100)         |
| `search` | `""`         | Busca por nome ou e-mail           |
| `sort`   | `criado_em`  | Campo de ordenação                 |
| `dir`    | `desc`       | Direção: `asc` ou `desc`           |

---

## 🛡️ Segurança implementada

- **JWT** com expiração de 8 horas para o painel admin
- **Rate limiting**: 10 req/15min no endpoint de leads, 100 req/15min no admin
- **Validação dupla**: no frontend (React) e no backend (Express)
- **Constraint UNIQUE** no banco para e-mail
- **CORS** configurado para aceitar apenas a URL do frontend
- **Sanitização** de inputs antes de inserir no banco
- **Prepared statements** com `$1, $2...` para prevenir SQL Injection

---

## 🎨 Páginas do Frontend

| Rota                  | Descrição                                         |
|-----------------------|---------------------------------------------------|
| `/`                   | Landing page com formulário de captação de leads  |
| `/admin`              | Login do painel administrativo                    |
| `/admin/dashboard`    | Tabela de leads com busca, ordenação e paginação  |

**Credenciais padrão do admin:**
- Usuário: `admin`
- Senha: `admin123`

> ⚠️ Altere em produção via variáveis de ambiente no `.env`

---

## 🛠️ Ferramentas de IA utilizadas

- **Claude (Anthropic)** — arquitetura, código completo, design system e documentação
- **GitHub Copilot** — autocomplete durante desenvolvimento

---

## 📦 Tecnologias

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React (ícones)
- Google Fonts: Syne + DM Sans

**Backend**
- Node.js + Express
- PostgreSQL + pg (node-postgres)
- JSON Web Token (jsonwebtoken)
- express-rate-limit
- dotenv, cors

---

## 📌 Observações

> O Exame App não fornece diagnósticos médicos nem orientações de saúde. Consulte sempre um profissional habilitado.
