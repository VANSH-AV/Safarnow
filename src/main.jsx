import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { OfflineProvider } from './context/OfflineContext'
import { ContentProvider } from './context/ContentContext'
import { loadRuntimeConfig } from './lib/config'
import './index.css'

async function bootstrap() {
  await loadRuntimeConfig().catch(() => null);

  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ContentProvider>
            <NotificationProvider>
              <OfflineProvider>
                <App />
              </OfflineProvider>
            </NotificationProvider>
          </ContentProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

bootstrap();