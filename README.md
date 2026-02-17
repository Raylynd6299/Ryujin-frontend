# Ryujin Frontend

Plataforma de gestión de finanzas personales e inversiones construida con React, TypeScript, y Tailwind CSS.

## 🚀 Stack Tecnológico

- **React 19** - UI Library
- **TypeScript** - Type Safety
- **Vite 7** - Build Tool
- **React Router v6** - Routing
- **Zustand** - State Management
- **TanStack Query** - Data Fetching
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - UI Components
- **lucide-react** - Icons
- **react-i18next** - Internacionalización
- **Axios** - HTTP Client

## 📁 Estructura del Proyecto

```
src/
├── app/                    # Aplicación principal
├── features/               # Módulos por funcionalidad
│   ├── auth/              # Autenticación
│   ├── dashboard/         # Dashboard
│   ├── finance/           # Finanzas personales
│   ├── investment/        # Inversiones
│   └── goals/             # Objetivos
├── components/            # Componentes compartidos
│   ├── layout/           # Layout components
│   ├── ui/               # shadcn/ui components
│   └── shared/           # Custom shared components
├── hooks/                 # Custom hooks
├── lib/                   # Utilidades
├── routes/                # Configuración de rutas
├── stores/                # Zustand stores
├── types/                 # TypeScript types
├── locales/               # Traducciones (ES/EN)
└── services/              # API clients
```

## 🎨 Features Implementados

### ✅ Sistema de Tema
- Dark mode / Light mode / System
- Paleta de colores morados personalizada
- Persiste en localStorage
- Detección automática de preferencia del sistema

### ✅ Layout Base
- **Sidebar colapsable** (240px / 64px)
  - Navegación completa con iconos
  - Submenús expandibles
  - Estado persiste en localStorage
  - Responsive (overlay en mobile)
  
- **Header**
  - Logo + nombre de la app
  - Breadcrumbs de navegación
  - Toggle de tema (3 opciones)
  - Toggle de idioma (ES/EN)
  - Notificaciones con badge
  - Menú de usuario

- **AppLayout**
  - Grid responsive
  - Transiciones suaves
  - Scroll optimizado

### ✅ Routing
- React Router configurado
- Rutas protegidas con autenticación
- Páginas placeholder para todos los módulos
- Redirect automático a dashboard
- 404 page

### ✅ Internacionalización (i18n)
- Soporte para Español e Inglés
- Hook personalizado `useTranslation`
- Persiste idioma en localStorage
- Traducciones organizadas por namespace

### ✅ State Management
- **themeStore** - Gestión de tema
- **sidebarStore** - Estado del sidebar
- **authStore** - Autenticación (placeholder)

## 🏃 Comandos

```bash
# Desarrollo
npm run dev

# Build producción
npm run build

# Preview build
npm run preview

# Lint
npm run lint
```

## 🎯 Próximos Pasos

Ver [docs/TODOs.md](./docs/TODOs.md) para la lista completa de tareas pendientes.

### Crítico
- [ ] Implementar formularios de Login y Register
- [ ] Conectar con API del backend
- [ ] Implementar autenticación real (JWT)
- [ ] Agregar validación de formularios

### Importante
- [ ] Implementar módulo de Finanzas
- [ ] Implementar módulo de Inversiones
- [ ] Agregar gráficas y visualizaciones
- [ ] Implementar sistema de notificaciones

## 🌈 Paleta de Colores

### Morados (Primary)
- **Violet 500** `rgb(139 92 246)` - Principal
- **Violet 600** `rgb(124 58 237)` - Hover
- **Violet 700** `rgb(109 40 217)` - Contraste oscuro
- **Violet 400** `rgb(167 139 250)` - Acentos

## 📝 Convenciones de Código

- Usar **functional components** con hooks
- Nombrar componentes en **PascalCase**
- Hooks personalizados con prefijo **use**
- Archivos de componentes: **ComponentName.tsx**
- Exports nombrados, no default
- Tipos TypeScript explícitos
- Tailwind classes ordenadas lógicamente

## 🔗 Links Útiles

- [Documentación de diseño](../docs/plans/2026-02-16-frontend-layout-design.md)
- [TODOs pendientes](./docs/TODOs.md)
- [Planeación general](../docs/PLANNING.md)

---

**Última actualización:** 2026-02-16

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
