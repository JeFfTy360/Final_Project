import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PriceProvider from './context/PriceContext.jsx'
import AccessibilityProvider from './context/AccessibilityContext.jsx'
import './i18n.js'; // Import i18n configuration
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import i18n from './i18n.js'; // Import the i18n instance
import { BrowserRouter } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <AccessibilityProvider>
          <PriceProvider>
            <App />
          </PriceProvider>
        </AccessibilityProvider>
      </I18nextProvider>
    </BrowserRouter>
  </StrictMode>,
)
