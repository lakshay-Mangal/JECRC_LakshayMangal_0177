import { useLanguage } from "../context/LanguageContext";

export default function Features() {
  const { t } = useLanguage();
  return (
    <section className="features" id="features">
      <h2 className="section-title">{t.features.title}</h2>
      <div className="features-grid">
        {t.features.items.map((item, i) => (
          <div className="feature-card" key={i} style={{ "--delay": `${i * 0.1}s` }}>
            <div className="feature-icon">{item.icon}</div>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-desc">{item.desc}</p>
            <div className="card-accent" />
          </div>
        ))}
      </div>
    </section>
  );
}
