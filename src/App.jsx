import "./App.css";
import icon from "./assets/icon.jpg";
import FireFlyEffect from "./components/FireflyEffect.jsx";
import MeteorCurtain from "./components/MeteorCurtain.jsx";
import NavButton from "./components/Navbutton.jsx";
import { useTheme } from "./components/ThemeContext";
import { useLanguage } from "./components/LanguageContext";

function App() {
  const { isDark, toggleTheme } = useTheme();
  const { lang, toggleLang } = useLanguage();
  return (
    <>
      <div style={{ width: "100vw", height: "auto" }}>
        <MeteorCurtain
          title="Blackrose Commission"
          subtitle="By Moshi"
          speed={3}
          density={5}
          onDone={() => console.log("ready!")}
        >
          <FireFlyEffect />
          <div
            className={`landing flex flex-col lg:flex-row items-center justify-center min-h-screen gap-15 
      ${
        isDark
          ? "bg-gradient-to-b from-purple-900 to-black"
          : "bg-gradient-to-b from-yellow-100 to-purple-900"
      }`}
          >
            <div className="fixed top-6 right-6 z-50 flex gap-4 items-center">
  <button
    onClick={toggleLang}
    className="py-1 px-4 rounded-lg border border-gray-400 
               hover:bg-gray-200 transition"
  >
    {lang}
  </button>

  <button
    onClick={toggleTheme}
    className={`w-14 h-8 flex items-center rounded-full px-1 transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)]
      ${isDark ? "bg-gray-300" : "bg-yellow-500"}`}
  >
    <div
      className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center 
        ${isDark ? "translate-x-6" : "translate-x-0"}`}
    >
      {isDark ? (
        <svg viewBox="0 0 24 24" fill="black" className="w-4 h-4">
          <path d="M21.752 15.002A9 9 0 1112.998 2.25a7 7 0 108.754 12.752z" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0 4a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm0-20a1 1 0 011-1h0a1 1 0 110 2h0a1 1 0 01-1-1zm10 10a1 1 0 01-1 1h0a1 1 0 110-2h0a1 1 0 011 1zM4 12a1 1 0 01-1 1h0a1 1 0 110-2h0a1 1 0 011 1z" />
        </svg>
      )}
    </div>
  </button>
</div>
            <img
              src={icon}
              alt="icon"
              className="w-90 h-auto rounded-[150px] shadow-[0_0_30px_rgba(168,85,247,0.8)] animate-glow-yellow"
            />
            <div className="sidebar flex flex-col gap-4 p-4">
              <h1 className="font-[Great_Vibes] text-6xl font-bold text-white py-4 animate-glow text-center">
                Blackrose Commission
              </h1>
              <div className="flex flex-col gap-4 p-4 justify-center items-center">
                <NavButton to="/terms">
                  {lang === "TH" ? "กติการการจ้าง" : "Term of use"}
                </NavButton>
                <NavButton to="/queue">
                  {lang === "TH" ? "สอบถามคิว" : "Commission Queue"}
                </NavButton>
                <NavButton to="/payment">
                  {lang === "TH" ? "ชำระเงิน" : "Payment"}
                </NavButton>
              </div>
              <div className="bottombar flex pr-8 px-4 gap-6 p-4 flex items-center justify-center">
              
  {/* Facebook */}
                    <a
                      href="#"
                      className="text-gray-600 hover:text-blue-600 transition"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M22 12a10 10 0 10-11.5 9.9v-7h-2.5v-2.9h2.5V9.4c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.7-1.6 1.5v1.8h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" />
                      </svg>
                    </a>

                    {/* Twitter */}
                    <a
                      href="#"
                      className="text-gray-600 hover:text-sky-500 transition"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.2-.8.5-1.6.8-2.5 1-1.5-1.6-4-1.6-5.5-.1-1 .9-1.4 2.3-1.1 3.6-3.3-.2-6.3-1.7-8.3-4.2-1.1 1.8-.6 4.2 1.1 5.4-.6 0-1.2-.2-1.7-.5 0 2 1.4 3.8 3.4 4.2-.6.2-1.2.2-1.8.1.5 1.7 2.1 2.9 3.9 2.9-1.5 1.2-3.4 1.9-5.3 1.9H2c2 1.3 4.4 2 6.9 2 8.3 0 12.8-6.9 12.8-12.8v-.6c.9-.6 1.6-1.3 2.2-2.2z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="#"
                      className="text-gray-600 hover:text-pink-500 transition"
                    >
                      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                        <path
                          d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 
      5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 
      1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 
      1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 
      2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 
      100 2.2 1.1 1.1 0 000-2.2z"
                        />
                      </svg>
                    </a>
               </div>
                
                  
                  
               
                
          
            </div>
          </div>
        </MeteorCurtain>
      </div>
    </>
  );
}

export default App;
