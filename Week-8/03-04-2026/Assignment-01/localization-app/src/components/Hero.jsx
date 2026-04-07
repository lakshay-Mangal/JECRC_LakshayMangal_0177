import { useLanguage } from "../context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
        <div className="grid-overlay" />
      </div>
      <div className="hero-content">
        <div className="badge">useContext · Localization</div>
        <h1 className="hero-title">{t.hero.greeting}</h1>
        <p className="hero-tagline">{t.hero.tagline}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior:"smooth" })}>{t.hero.cta}</button>
          <button className="btn-secondary" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior:"smooth" })}>{t.hero.secondary}</button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="globe-ring ring-1" /><div className="globe-ring ring-2" /><div className="globe-ring ring-3" />
        <div className="globe-core">🌐</div>
      </div>
    </section>
  );
}
