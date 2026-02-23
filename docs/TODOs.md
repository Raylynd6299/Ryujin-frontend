# Frontend TODOs - Ryujin

## 🔴 Crítico

### Autenticación
- [ ] Implementar validación de token JWT en `authStore.initializeAuth()`
- [ ] Implementar lógica de refresh token en `lib/api.ts` interceptor
- [ ] Agregar manejo de expiración de token

### API
- [ ] Configurar variable de entorno `VITE_API_URL` para producción
- [ ] Implementar retry logic para requests fallidos
- [ ] Agregar timeout configuration por endpoint

## 🟡 Importante

### Layout & Routing
- [ ] Implementar scroll to top al cambiar de ruta
- [ ] Agregar Error Boundary en AppLayout
- [ ] Implementar animaciones de transición entre páginas
- [ ] Optimizar bundle size del router

### UX/UI
- [ ] Implementar skeleton loaders para estados de carga
- [ ] Agregar animaciones para sidebar collapse/expand
- [ ] Implementar focus management para accesibilidad
- [ ] Agregar keyboard shortcuts para navegación

### Notificaciones
- [ ] Implementar sistema de notificaciones real
- [ ] Conectar NotificationBell con API
- [ ] Implementar Web Push API para notificaciones
- [ ] Agregar Service Worker

## 🟢 Mejoras Futuras

### Performance
- [ ] Implementar lazy loading para routes
- [ ] Optimizar re-renders con React.memo
- [ ] Implementar virtual scrolling para listas largas
- [ ] Code splitting por feature

### Testing
- [ ] Setup de testing (Vitest + Testing Library)
- [ ] Tests unitarios para stores
- [ ] Tests de integración para components
- [ ] Tests E2E con Playwright

### Internacionalización
- [ ] Agregar más traducciones para features
- [ ] Implementar fallback de traducciones
- [ ] Agregar soporte para más idiomas (PT, FR, etc.)

### Accesibilidad
- [ ] Audit completo de WCAG 2.1
- [ ] Agregar aria-labels faltantes
- [ ] Mejorar contraste de colores
- [ ] Implementar skip navigation links

### Features
- [ ] Implementar búsqueda global en Header
- [ ] Agregar tooltips informativos
- [ ] Implementar modo de alto contraste
- [ ] Agregar soporte para PWA

---

*Última actualización: 2026-02-21*
