import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { NotificationProvider } from './context/NotificationContext'
import { OfflineProvider } from './context/OfflineContext'
import { ContentProvider } from './context/ContentContext'
import './index.css'

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
)
