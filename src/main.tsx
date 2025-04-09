
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there is a div with id 'root' in your HTML.");
}

// Track the current path for Google Analytics
let currentPagePath = window.location.pathname + window.location.search;

// Initialize Google Analytics in all routes
const initGoogleAnalytics = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    // Get the current page URL
    const pageUrl = window.location.pathname + window.location.search;
    
    // Log page view
    window.gtag('config', 'G-3FN0JR63T1', {
      page_path: pageUrl
    });
  }
};

// Observe route changes
const observeRouteChanges = () => {
  // Use MutationObserver to detect DOM changes that might indicate route changes
  const observer = new MutationObserver(() => {
    // Check if the URL has changed
    const newPath = window.location.pathname + window.location.search;
    if (newPath !== currentPagePath) {
      currentPagePath = newPath;
      initGoogleAnalytics();
    }
  });

  // Start observing the document body for changes
  observer.observe(document.body, { childList: true, subtree: true });
  
  // Also initialize on first load
  initGoogleAnalytics();
};

// Initialize tracking
window.addEventListener('DOMContentLoaded', observeRouteChanges);

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
