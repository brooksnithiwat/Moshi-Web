import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "./components/ThemeContext";
import { LanguageProvider } from "./components/LanguageContext";
import './index.css'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <LanguageProvider>
  <ThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  </LanguageProvider>
)
