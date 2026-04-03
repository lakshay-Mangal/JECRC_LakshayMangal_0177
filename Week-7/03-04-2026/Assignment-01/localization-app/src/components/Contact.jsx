import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <h2 className="section-title">{t.contact_title}</h2>
        <p className="contact-desc">{t.contact_desc}</p>
        <div className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label>{t.contact_name}</label>
              <input type="text" placeholder={t.contact_name} />
            </div>
            <div className="form-group">
              <label>{t.contact_email}</label>
              <input type="email" placeholder={t.contact_email} />
            </div>
          </div>
          <div className="form-group">
            <label>{t.contact_msg}</label>
            <textarea rows="5" placeholder={t.contact_msg} />
          </div>
          <button className="btn-primary contact-btn">{t.contact_btn}</button>
        </div>
      </div>
    </section>
  );
}
