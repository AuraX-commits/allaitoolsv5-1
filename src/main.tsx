
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render the app
createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for production environments
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}
