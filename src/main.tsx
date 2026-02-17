import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';
import { App } from './app';
import { ThemeInitializer } from './app/ThemeInitializer';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeInitializer>
      <App />
    </ThemeInitializer>
  </StrictMode>,
);
