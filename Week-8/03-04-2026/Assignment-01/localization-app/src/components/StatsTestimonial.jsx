import { useLanguage } from "../context/LanguageContext";

export function Stats() {
  const { t, translations } = useLanguage();
  return (
    <section className="stats" id="about">
      <div className="stat-item"><span className="stat-num">2.4M+</span><span className="stat-label">{t.stats.users}</span></div>
      <div className="stat-divider" />
      <div className="stat-item"><span className="stat-num">{Object.keys(translations).length}</span><span className="stat-label">{t.stats.languages}</span></div>
      <div className="stat-divider" />
      <div className="stat-item"><span className="stat-num">99.9%</span><span className="stat-label">{t.stats.uptime}</span></div>
    </section>
  );
}

export function Testimonial() {
  const { t } = useLanguage();
  return (
    <section className="testimonial">
      <div className="quote-mark">"</div>
      <p className="quote-text">{t.testimonial.quote}</p>
      <span className="quote-author">— {t.testimonial.author}</span>
    </section>
  );
}
