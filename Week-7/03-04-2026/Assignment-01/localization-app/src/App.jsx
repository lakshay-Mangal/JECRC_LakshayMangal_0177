import { AppProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import { Stats, Testimonial } from "./components/StatsTestimonial";
import CodeExplainer from "./components/CodeExplainer";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Testimonial />
        <CodeExplainer />
        <Contact />
      </main>
      <Footer />
    </AppProvider>
  );
}
