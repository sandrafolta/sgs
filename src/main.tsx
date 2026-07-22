import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import faviconUrl from './icon-pryzmat.png';

// Disable native scroll restoration so refreshes always start at the top
if (typeof window !== 'undefined') {
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  window.addEventListener('beforeunload', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

// Ensure favicon is set dynamically with exact Vite-resolved asset path
if (typeof document !== 'undefined') {
  const head = document.head || document.getElementsByTagName('head')[0];
  
  // Remove existing icon links to prevent stale browser caches
  const existingIcons = document.querySelectorAll("link[rel*='icon'], link[rel='apple-touch-icon']");
  existingIcons.forEach(el => el.parentNode?.removeChild(el));

  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = faviconUrl;
  head.appendChild(link);

  const shortcutLink = document.createElement('link');
  shortcutLink.rel = 'shortcut icon';
  shortcutLink.href = faviconUrl;
  head.appendChild(shortcutLink);

  const appleLink = document.createElement('link');
  appleLink.rel = 'apple-touch-icon';
  appleLink.href = faviconUrl;
  head.appendChild(appleLink);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);


