import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer" dir={t.dir}>
      <div className="footer-inner">
        <span className="footer-logo">◈ Lingua</span>
        <span className="footer-copy">© 2026 · {t.footer.rights}</span>
        <span className="footer-tech">{t.footer.built}</span>
      </div>
    </footer>
  );
}
