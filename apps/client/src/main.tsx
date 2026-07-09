import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider } from './components/common/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="alltooldeck-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
)

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('ServiceWorker registered:', reg.scope))
      .catch(err => console.log('ServiceWorker registration failed:', err));
  });
}
