import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    code: "en", name: "English", flag: "🇬🇧", dir: "ltr",
    nav: { home: "Home", about: "About", features: "Features", contact: "Contact" },
    hero: { greeting: "Hello, World", tagline: "Experience seamless multilingual interfaces", cta: "Get Started", secondary: "Learn More" },
    features: { title: "Why Choose Us", items: [
      { icon: "🌍", title: "Global Reach", desc: "Serve customers in their native language effortlessly." },
      { icon: "⚡", title: "Instant Switch", desc: "Language updates propagate instantly across all components." },
      { icon: "🎨", title: "Beautiful UI", desc: "Every language supported with pixel-perfect design." },
      { icon: "🔒", title: "Secure & Fast", desc: "Enterprise-grade performance with zero latency." },
    ]},
    stats: { users: "Users Worldwide", languages: "Languages Supported", uptime: "Uptime" },
    testimonial: { quote: "This app changed how we think about global products.", author: "Sarah Chen, Product Lead" },
    footer: { rights: "All rights reserved.", built: "Built with React Context API" },
    lang_label: "Select Language",
    theme_light: "Light Mode", theme_dark: "Dark Mode",
    contact_title: "Get In Touch", contact_desc: "Have questions? We'd love to hear from you.",
    contact_name: "Your Name", contact_email: "Email Address", contact_msg: "Your Message", contact_btn: "Send Message",
  },
  fr: {
    code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr",
    nav: { home: "Accueil", about: "À propos", features: "Fonctionnalités", contact: "Contact" },
    hero: { greeting: "Bonjour, le Monde", tagline: "Vivez des interfaces multilingues fluides", cta: "Commencer", secondary: "En savoir plus" },
    features: { title: "Pourquoi nous choisir", items: [
      { icon: "🌍", title: "Portée Mondiale", desc: "Servez vos clients dans leur langue maternelle." },
      { icon: "⚡", title: "Changement Instant", desc: "Les mises à jour linguistiques se propagent instantanément." },
      { icon: "🎨", title: "Belle Interface", desc: "Chaque langue avec un design parfait au pixel près." },
      { icon: "🔒", title: "Sécurisé & Rapide", desc: "Performance de niveau entreprise sans latence." },
    ]},
    stats: { users: "Utilisateurs Mondiaux", languages: "Langues Supportées", uptime: "Disponibilité" },
    testimonial: { quote: "Cette application a changé notre vision des produits mondiaux.", author: "Sarah Chen, Responsable Produit" },
    footer: { rights: "Tous droits réservés.", built: "Construit avec React Context API" },
    lang_label: "Choisir la langue",
    theme_light: "Mode Clair", theme_dark: "Mode Sombre",
    contact_title: "Contactez-nous", contact_desc: "Des questions? Nous serions ravis de vous entendre.",
    contact_name: "Votre Nom", contact_email: "Adresse Email", contact_msg: "Votre Message", contact_btn: "Envoyer",
  },
  ja: {
    code: "ja", name: "日本語", flag: "🇯🇵", dir: "ltr",
    nav: { home: "ホーム", about: "概要", features: "機能", contact: "連絡先" },
    hero: { greeting: "こんにちは、世界", tagline: "シームレスな多言語インターフェースを体験", cta: "はじめる", secondary: "詳しく見る" },
    features: { title: "選ばれる理由", items: [
      { icon: "🌍", title: "グローバル展開", desc: "顧客の母国語で簡単にサービスを提供。" },
      { icon: "⚡", title: "即時切替", desc: "言語の更新が全コンポーネントに即座に反映。" },
      { icon: "🎨", title: "美しいUI", desc: "すべての言語でピクセルパーフェクトなデザイン。" },
      { icon: "🔒", title: "安全・高速", desc: "遅延ゼロのエンタープライズグレードのパフォーマンス。" },
    ]},
    stats: { users: "世界中のユーザー", languages: "対応言語数", uptime: "稼働率" },
    testimonial: { quote: "このアプリはグローバル製品への考え方を変えました。", author: "サラ・チェン、プロダクトリード" },
    footer: { rights: "全著作権所有。", built: "React Context APIで構築" },
    lang_label: "言語を選択",
    theme_light: "ライトモード", theme_dark: "ダークモード",
    contact_title: "お問い合わせ", contact_desc: "ご質問はお気軽にどうぞ。",
    contact_name: "お名前", contact_email: "メールアドレス", contact_msg: "メッセージ", contact_btn: "送信",
  },
  ar: {
    code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl",
    nav: { home: "الرئيسية", about: "حول", features: "المميزات", contact: "اتصل" },
    hero: { greeting: "مرحباً بالعالم", tagline: "تجربة واجهات متعددة اللغات بسلاسة", cta: "ابدأ الآن", secondary: "اعرف المزيد" },
    features: { title: "لماذا تختارنا", items: [
      { icon: "🌍", title: "وصول عالمي", desc: "خدمة العملاء بلغتهم الأم بسهولة تامة." },
      { icon: "⚡", title: "تبديل فوري", desc: "تنتشر تحديثات اللغة فوراً عبر جميع المكونات." },
      { icon: "🎨", title: "واجهة جميلة", desc: "كل لغة مدعومة بتصميم مثالي للبكسل." },
      { icon: "🔒", title: "آمن وسريع", desc: "أداء على مستوى المؤسسات بدون أي تأخير." },
    ]},
    stats: { users: "مستخدمون حول العالم", languages: "لغات مدعومة", uptime: "وقت التشغيل" },
    testimonial: { quote: "غيّر هذا التطبيق طريقة تفكيرنا في المنتجات العالمية.", author: "سارة تشن، مديرة المنتج" },
    footer: { rights: "جميع الحقوق محفوظة.", built: "مبني بـ React Context API" },
    lang_label: "اختر اللغة",
    theme_light: "الوضع الفاتح", theme_dark: "الوضع الداكن",
    contact_title: "تواصل معنا", contact_desc: "هل لديك أسئلة؟ يسعدنا سماعك.",
    contact_name: "اسمك", contact_email: "البريد الإلكتروني", contact_msg: "رسالتك", contact_btn: "إرسال",
  },
  de: {
    code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr",
    nav: { home: "Startseite", about: "Über uns", features: "Funktionen", contact: "Kontakt" },
    hero: { greeting: "Hallo, Welt", tagline: "Erleben Sie nahtlose mehrsprachige Interfaces", cta: "Loslegen", secondary: "Mehr erfahren" },
    features: { title: "Warum uns wählen", items: [
      { icon: "🌍", title: "Globale Reichweite", desc: "Kunden mühelos in ihrer Muttersprache bedienen." },
      { icon: "⚡", title: "Sofortiger Wechsel", desc: "Sprachaktualisierungen verbreiten sich sofort." },
      { icon: "🎨", title: "Schöne UI", desc: "Jede Sprache mit pixelgenauem Design unterstützt." },
      { icon: "🔒", title: "Sicher & Schnell", desc: "Enterprise-Performance ohne Latenz." },
    ]},
    stats: { users: "Weltweite Nutzer", languages: "Unterstützte Sprachen", uptime: "Verfügbarkeit" },
    testimonial: { quote: "Diese App hat unsere Sicht auf globale Produkte verändert.", author: "Sarah Chen, Produktleiterin" },
    footer: { rights: "Alle Rechte vorbehalten.", built: "Erstellt mit React Context API" },
    lang_label: "Sprache wählen",
    theme_light: "Helles Design", theme_dark: "Dunkles Design",
    contact_title: "Kontakt aufnehmen", contact_desc: "Fragen? Wir freuen uns von Ihnen zu hören.",
    contact_name: "Ihr Name", contact_email: "E-Mail-Adresse", contact_msg: "Ihre Nachricht", contact_btn: "Senden",
  },
  hi: {
    code: "hi", name: "हिन्दी", flag: "🇮🇳", dir: "ltr",
    nav: { home: "होम", about: "हमारे बारे में", features: "विशेषताएँ", contact: "संपर्क" },
    hero: { greeting: "नमस्ते, दुनिया", tagline: "निर्बाध बहुभाषी इंटरफेस का अनुभव करें", cta: "शुरू करें", secondary: "और जानें" },
    features: { title: "हमें क्यों चुनें", items: [
      { icon: "🌍", title: "वैश्विक पहुँच", desc: "ग्राहकों को उनकी मातृभाषा में सेवा दें।" },
      { icon: "⚡", title: "तत्काल स्विच", desc: "भाषा अपडेट सभी घटकों में तुरंत फैलते हैं।" },
      { icon: "🎨", title: "सुंदर UI", desc: "हर भाषा में परफेक्ट डिज़ाइन।" },
      { icon: "🔒", title: "सुरक्षित और तेज़", desc: "शून्य विलंबता के साथ एंटरप्राइज़ प्रदर्शन।" },
    ]},
    stats: { users: "विश्वभर उपयोगकर्ता", languages: "समर्थित भाषाएँ", uptime: "अपटाइम" },
    testimonial: { quote: "इस ऐप ने वैश्विक उत्पादों के बारे में हमारी सोच बदल दी।", author: "सारा चेन, प्रोडक्ट लीड" },
    footer: { rights: "सर्वाधिकार सुरक्षित।", built: "React Context API के साथ बनाया गया" },
    lang_label: "भाषा चुनें",
    theme_light: "लाइट मोड", theme_dark: "डार्क मोड",
    contact_title: "संपर्क करें", contact_desc: "कोई प्रश्न है? हम सुनना पसंद करेंगे।",
    contact_name: "आपका नाम", contact_email: "ईमेल पता", contact_msg: "आपका संदेश", contact_btn: "भेजें",
  },
  gu: {
    code: "gu", name: "ગુજરાતી", flag: "🇮🇳", dir: "ltr",
    nav: { home: "હોમ", about: "અમારા વિશે", features: "વિશેષતાઓ", contact: "સંપર્ક" },
    hero: { greeting: "નમસ્તે, વિશ્વ", tagline: "સીમલેસ બહુભાષી ઇન્ટરફેસ અનુભવો", cta: "શરૂ કરો", secondary: "વધુ જાણો" },
    features: { title: "અમને શા માટે પસંદ કરો", items: [
      { icon: "🌍", title: "વૈશ્વિક પહોંચ", desc: "ગ્રાહકોને તેમની માતૃભાષામાં સેવા આપો।" },
      { icon: "⚡", title: "તાત્કાલિક સ્વિચ", desc: "ભાષા અપડેટ તમામ ઘટકોમાં તરત ફેલાય છે." },
      { icon: "🎨", title: "સુંદર UI", desc: "દરેક ભાષામાં સંપૂર્ણ ડિઝાઇન." },
      { icon: "🔒", title: "સુરક્ષિત અને ઝડપી", desc: "શૂન્ય વિલંબ સાથે એન્ટરપ્રાઇઝ પ્રદર્શન." },
    ]},
    stats: { users: "વૈશ્વિક વપરાશકર્તા", languages: "સમર્થિત ભાષાઓ", uptime: "અપટાઇમ" },
    testimonial: { quote: "આ ઐપે વૈશ્વિક ઉત્પાદનો વિશે અમારી વિચારસરણી બદલી.", author: "સારા ચેન, પ્રોડક્ટ લીડ" },
    footer: { rights: "સર્વ હક્કો સુરક્ષિત.", built: "React Context API સાથે બનાવ્યું" },
    lang_label: "ભાષા પસંદ કરો",
    theme_light: "લાઇટ મોડ", theme_dark: "ડાર્ક મોડ",
    contact_title: "સંપર્ક કરો", contact_desc: "પ્રશ્નો છે? અમે સાંભળવા ઈચ્છીએ છીએ.",
    contact_name: "તમારું નામ", contact_email: "ઈમેઇલ સરનામું", contact_msg: "તમારો સંદેશ", contact_btn: "મોકલો",
  },
  mr: {
    code: "mr", name: "मराठी", flag: "🇮🇳", dir: "ltr",
    nav: { home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", features: "वैशिष्ट्ये", contact: "संपर्क" },
    hero: { greeting: "नमस्कार, जग", tagline: "अखंड बहुभाषिक इंटरफेसचा अनुभव घ्या", cta: "सुरू करा", secondary: "अधिक जाणून घ्या" },
    features: { title: "आम्हाला का निवडावे", items: [
      { icon: "🌍", title: "जागतिक व्याप्ती", desc: "ग्राहकांना त्यांच्या मातृभाषेत सेवा द्या." },
      { icon: "⚡", title: "त्वरित बदल", desc: "भाषा अद्यतने सर्व घटकांमध्ये त्वरित पसरतात." },
      { icon: "🎨", title: "सुंदर UI", desc: "प्रत्येक भाषेत परिपूर्ण डिझाइन." },
      { icon: "🔒", title: "सुरक्षित आणि जलद", desc: "शून्य विलंबासह एंटरप्राइझ कार्यप्रदर्शन." },
    ]},
    stats: { users: "जगभरातील वापरकर्ते", languages: "समर्थित भाषा", uptime: "अपटाइम" },
    testimonial: { quote: "या ॲपने जागतिक उत्पादनांबद्दलचा आमचा विचार बदलला.", author: "सारा चेन, प्रोडक्ट लीड" },
    footer: { rights: "सर्व हक्क राखीव.", built: "React Context API सह बनवले" },
    lang_label: "भाषा निवडा",
    theme_light: "लाइट मोड", theme_dark: "डार्क मोड",
    contact_title: "संपर्क साधा", contact_desc: "प्रश्न आहेत? आम्हाला ऐकायला आवडेल.",
    contact_name: "तुमचे नाव", contact_email: "ईमेल पत्ता", contact_msg: "तुमचा संदेश", contact_btn: "पाठवा",
  },
};

const LanguageContext = createContext(null);
const ThemeContext = createContext(null);

export function AppProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [theme, setTheme] = useState("dark");
  const t = translations[language];
  const toggleTheme = () => setTheme(p => p === "dark" ? "light" : "dark");
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
        <div className={`app-root theme-${theme}`} dir={t.dir}>
          {children}
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within AppProvider");
  return ctx;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within AppProvider");
  return ctx;
}
