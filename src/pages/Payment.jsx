import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../components/LanguageContext";
import { useTheme } from "../components/ThemeContext";
import FireFlyEffect from "../components/FireflyEffect";
function SlideIn({ children, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(target);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 550ms ease ${delay}ms, transform 550ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

export default function Payment() {
  const { lang, toggleLang } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const content = {
    TH: {
      title: "ช่องทางการโอน",
      intro: "",
      items: [
        "ธนาคาร กรุงศรี ไทยพาณิย์ กรุงไทย",
        "Promtpay",
        "True money wallet",
        "Tip me",
        "Paypal",
      ],
    },
    EN: {
      title: "Payment Methods",
      intro: "",
      items: [
        "Bank Transfer: Krungsri, SCB, Krungthai",
        "PromptPay",
        "TrueMoney Wallet",
        "TipMe",
        "PayPal",
      ],
    },
  };

  const text = content[lang] || content.TH;

  return (
    <div
      className={`min-h-screen px-6 py-12 flex items-center justify-center text-white relative ${
        isDark
          ? "bg-gradient-to-b from-purple-900 to-black"
          : "bg-gradient-to-b from-yellow-100 to-purple-900"
      }`}
    >
       <FireFlyEffect />
      <div className="fixed top-6 right-6 z-50 flex gap-4 items-center">
        <button
          onClick={toggleLang}
          className="py-1 px-4 rounded-lg border border-gray-800 text-black hover:bg-gray-200 transition hover:text-gray-800"
          aria-label="Toggle language"
        >
          {lang}
        </button>

        <button
          onClick={toggleTheme}
          className={`w-14 h-8 flex items-center rounded-full px-1 transition-colors duration-300 shadow-[0_0_10px_rgba(255,255,255,0.8)] ${
            isDark ? "bg-gray-300" : "bg-yellow-500"
          }`}
          aria-label="Toggle theme"
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center ${
              isDark ? "translate-x-6" : "translate-x-0"
            }`}
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

      <SlideIn className={`w-full max-w-3xl rounded-3xl border p-8 shadow-2xl backdrop-blur-md ${isDark ? "border-white/10 bg-white/5" : "border-white/30 bg-black/25"}`}>
        <h1 className="text-4xl font-bold mb-4">{text.title}</h1>
        {text.intro ? <p className="text-white/80 mb-6">{text.intro}</p> : null}

        <ul className="space-y-4 list-disc pl-6 text-white/90">
          {text.items.map((item, index) => (
            <SlideIn key={item} delay={index * 90}>
              <li>{item}</li>
            </SlideIn>
          ))}
        </ul>
      </SlideIn>
      </div>

  );
}