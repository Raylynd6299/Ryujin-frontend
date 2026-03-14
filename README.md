# 🐉 Ryujin — Frontend

<p align="center">
  <img src="./Ryujin-portada.png" alt="Ryujin — Gestión de Finanzas Personales" width="100%" />
</p>

<p align="center">
  <strong>React SPA for the Ryujin personal finance platform</strong><br/>
  React 19 · TypeScript · Vite 7 · Tailwind CSS v4 · shadcn/ui
</p>

<p align="center">
  <a href="https://github.com/YOUR_USER/ryujin-backend">
    ⚙️ Backend Repo
  </a>
  &nbsp;·&nbsp;
  <a href="https://github.com/YOUR_USER/ryujin">
    🐳 Infrastructure (Docker)
  </a>
</p>

---

## Stack

| Concern          | Technology              |
| ---------------- | ----------------------- |
| UI Library       | React 19                |
| Language         | TypeScript (strict)     |
| Build Tool       | Vite 7                  |
| Routing          | React Router v6         |
| Client State     | Zustand                 |
| Server State     | TanStack Query          |
| Styling          | Tailwind CSS v4         |
| UI Components    | shadcn/ui               |
| Icons            | lucide-react            |
| HTTP Client      | Axios                   |
| Internationali.  | react-i18next (ES / EN) |
| Linting/Format   | Biome                   |

---

## Project Structure

```
src/
├── app/                    # App root, providers, global setup
├── features/               # Feature modules (co-located components, hooks, services)
│   ├── auth/               # Login, register, JWT handling
│   ├── dashboard/          # KPI cards, overview charts
│   ├── finance/            # Income, expenses, debts, accounts, categories
│   ├── investment/         # Holdings, portfolio, stock quotes
│   └── goals/              # Purchase goals
├── components/
│   ├── layout/             # AppLayout, Sidebar, Header, Breadcrumbs
│   ├── ui/                 # shadcn/ui base components
│   └── shared/             # Custom shared business components
├── hooks/                  # Cross-feature custom hooks
├── lib/                    # Third-party library configs (axios, query client)
├── routes/                 # Route definitions and protected route wrappers
├── stores/                 # Zustand stores (theme, sidebar, auth)
├── types/                  # Global TypeScript type definitions
├── locales/                # i18n translations (en.json, es.json)
└── services/               # API client functions
```

---

## Features Implemented

### ✅ Theme System
- Dark mode / Light mode / System auto-detect
- Custom violet color palette
- Persists in `localStorage`

### ✅ Base Layout
- **Collapsible Sidebar** (240px / 64px)
  - Full navigation with icons
  - Expandable submenus
  - State persists in `localStorage`
  - Responsive (overlay on mobile)
- **Header**
  - Logo + app name
  - Navigation breadcrumbs
  - Theme toggle (3 options)
  - Language toggle (ES/EN)
  - Notification badge
  - User menu

### ✅ Routing
- React Router configured with protected routes
- Auto-redirect to dashboard on login
- 404 page

### ✅ Internationalization (i18n)
- Spanish and English support
- Custom `useTranslation` hook
- Language persists in `localStorage`
- Translations organized by namespace

### ✅ State Management
- **themeStore** — theme management
- **sidebarStore** — sidebar open/collapse state
- **authStore** — authentication state (placeholder → real JWT integration in progress)

---

## Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint + format
npm run lint
```

---

## Environment Variables

```bash
cp .env.example .env
```

| Variable        | Description              |
| --------------- | ------------------------ |
| `VITE_API_URL`  | Backend API base URL     |

---

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Violet 400 | `rgb(167 139 250)` | Accents, highlights |
| Violet 500 | `rgb(139 92 246)` | Primary brand color |
| Violet 600 | `rgb(124 58 237)` | Hover states |
| Violet 700 | `rgb(109 40 217)` | Dark contrast |

---

## Code Conventions

- **Functional components** only — no class components
- **PascalCase** for component files and names (`IncomeList.tsx`)
- **camelCase** prefixed with `use` for hooks (`useIncomes.ts`)
- **Named exports** — no default exports
- **TypeScript strict mode** — no `any`
- All user-facing text through `t()` from react-i18next — never hardcode strings
- Components stay under ~150 lines — break down if larger
- Page-level code splitting with `React.lazy()` + `Suspense`

---

## Roadmap

See [docs/TODOs.md](./docs/TODOs.md) for the full task list.

### In Progress
- [ ] Login and Register forms
- [ ] Real JWT authentication flow
- [ ] Form validation (Zod)
- [ ] Backend API integration

### Next
- [ ] Finance module (income, expenses, debts)
- [ ] Investment module (holdings, portfolio charts)
- [ ] Push notifications (Web Push API)
- [ ] Charts (Recharts + Tremor)

---

## Related Repos

| Repo | Description |
|------|-------------|
| [ryujin-backend](https://github.com/YOUR_USER/ryujin-backend) | Go REST API |
| [ryujin](https://github.com/YOUR_USER/ryujin) | Infrastructure — Docker Compose + shared docs |
