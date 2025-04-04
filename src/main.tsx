
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Create root and render the app
createRoot(document.getElementById("root")!).render(<App />);

// Register service worker immediately, not waiting for load event
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js', { scope: '/' })
    .then(registration => {
      console.log('Service Worker registered with scope:', registration.scope);
      
      // Check for updates every hour if the page remains open
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000); // 1 hour
    })
    .catch(error => {
      console.error('Service Worker registration failed:', error);
    });
}
