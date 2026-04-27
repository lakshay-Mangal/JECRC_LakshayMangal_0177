import { useState, useRef, useEffect } from "react";
import { useLanguage, useTheme } from "../context/LanguageContext";

export default function Navbar() {
  const { t, language, setLanguage, translations } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { key: "home", id: "hero" },
    { key: "about", id: "about" },
    { key: "features", id: "features" },
    { key: "contact", id: "contact" },
  ];

  const current = translations[language];

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <span className="logo-icon">◈</span>
        <span className="logo-text">Lingua</span>
      </div>

      <ul className="nav-links">
        {navItems.map(({ key, id }) => (
          <li key={key}>
            <button className="nav-btn" onClick={() => scrollTo(id)}>
              {t.nav[key]}
            </button>
          </li>
        ))}
      </ul>

      <div className="nav-controls">
        {/* Theme toggle */}
        <button className="theme-toggle" onClick={toggleTheme} title={theme === "dark" ? t.theme_light : t.theme_dark}>
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        {/* Language dropdown */}
        <div className="lang-dropdown" ref={dropRef}>
          <button className="lang-trigger" onClick={() => setDropOpen(p => !p)}>
            <span>{current.flag}</span>
            <span className="lang-trigger-name">{current.name}</span>
            <span className={`chevron ${dropOpen ? "open" : ""}`}>▾</span>
          </button>
          {dropOpen && (
            <div className="lang-menu">
              <div className="lang-menu-label">{t.lang_label}</div>
              {Object.values(translations).map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-option ${language === lang.code ? "active" : ""}`}
                  onClick={() => { setLanguage(lang.code); setDropOpen(false); }}
                >
                  <span className="flag">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {language === lang.code && <span className="check">✓</span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
