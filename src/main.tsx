
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Configure console error to be more informative
const originalConsoleError = console.error;
console.error = function(...args) {
  // Filter out certain React warnings in development
  if (typeof args[0] === 'string' && (
      args[0].includes('Warning:') ||
      args[0].includes('React does not recognize')
    )) {
    return;
  }
  originalConsoleError.apply(console, args);
};

// Global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Create root with error boundary fallback
try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }
  
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error('Error rendering application:', error);
  
  // Attempt to show a fallback UI if possible
  const rootElement = document.getElementById("root");
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="text-align: center; padding: 2rem; font-family: sans-serif;">
        <h1>Something went wrong</h1>
        <p>We're sorry, but there was a problem loading the application.</p>
        <button onclick="window.location.reload()">Reload Page</button>
      </div>
    `;
  }
}
