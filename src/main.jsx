import { BrowserRouter,Route,Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from "./components/ThemeContext";
import { LanguageProvider } from "./components/LanguageContext";
import './index.css'
import App from './App.jsx'
import Terms from "./pages/terms.jsx";
import Payment from "./pages/Payment.jsx";

createRoot(document.getElementById('root')).render(
  <LanguageProvider>
  <ThemeProvider>
    <BrowserRouter>
         <Routes>
          <Route path="/" element={<App />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
    </BrowserRouter>
  </ThemeProvider>
  </LanguageProvider>
)
