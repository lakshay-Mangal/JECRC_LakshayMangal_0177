import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const snippets = {
  context: {
    label: "1. Create Context",
    code: `// LanguageContext.jsx
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}`,
  },
  hook: {
    label: "2. Custom Hook",
    code: `// Custom hook for easy access
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error(
    "useLanguage must be used within LanguageProvider"
  );
  return ctx;
}`,
  },
  consume: {
    label: "3. Consume in Any Component",
    code: `// Any component, anywhere in the tree
function Navbar() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <nav>
      <a href="#">{t.nav.home}</a>
      <button onClick={() => setLanguage("fr")}>
        🇫🇷 Français
      </button>
    </nav>
  );
}`,
  },
  wrap: {
    label: "4. Wrap App in Provider",
    code: `// main.jsx
<LanguageProvider>
  <App />
</LanguageProvider>

// That's it! Every component can now call
// useLanguage() and get the current language.`,
  },
};

export default function CodeExplainer() {
  const { t } = useLanguage();
  const [active, setActive] = useState("context");

  return (
    <section className="code-explainer" dir={t.dir}>
      <h2 className="section-title">How It Works</h2>
      <div className="code-panel">
        <div className="tab-row">
          {Object.entries(snippets).map(([key, val]) => (
            <button
              key={key}
              className={`tab-btn ${active === key ? "active" : ""}`}
              onClick={() => setActive(key)}
            >
              {val.label}
            </button>
          ))}
        </div>
        <pre className="code-block">
          <code>{snippets[active].code}</code>
        </pre>
      </div>
    </section>
  );
}
