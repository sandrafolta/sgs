import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronDown, 
  ArrowRight,
  Quote,
  CheckCircle2,
  Users,
  Triangle,
  Menu,
  X
} from "lucide-react";

// Import custom components
import PrismViewer from "./components/PrismViewer";
import MirrorReflection from "./components/MirrorReflection";
import InteractiveEcosystem from "./components/InteractiveEcosystem";
import TestimonialSlider from "./components/TestimonialSlider";
import SelfInquiry from "./components/SelfInquiry";

// Import images
import imageOne from "./1.jpg";
import imageThree from "./3.jpg";
import sgsGlowingCracks from "./13.jpg";

export default function App() {
  const prismRef = useRef<HTMLDivElement>(null);
  const stickyCtaRef = useRef<HTMLDivElement>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Always force scroll to top on mount / refresh and disable history scroll restoration
  useEffect(() => {
    setIsReady(true);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Clear hash if any exists to prevent browser native jump-to-hash on refresh
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    // Force scroll position to (0,0) immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduce.matches) {
      setIsJoined(true);
      return;
    }
    const onScroll = () => setIsJoined(window.scrollY > 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Listen for escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Handle sticky bottom CTA visibility based on hero and pricing intersection
  useEffect(() => {
    const bar = stickyCtaRef.current;
    const hero = document.querySelector('.hero');
    const pricing = document.getElementById('dolacz');
    if (!bar || !hero || !pricing) return;

    let pastHero = false;
    let atPricing = false;
    const sync = () => {
      if (pastHero && !atPricing) {
        bar.classList.add('is-visible');
      } else {
        bar.classList.remove('is-visible');
      }
    };

    const heroObserver = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting;
      sync();
    }, { threshold: 0 });

    const pricingObserver = new IntersectionObserver(([e]) => {
      atPricing = e.isIntersecting;
      sync();
    }, { threshold: 0 });

    heroObserver.observe(hero);
    pricingObserver.observe(pricing);

    return () => {
      heroObserver.disconnect();
      pricingObserver.disconnect();
    };
  }, []);

  // Question observer to fade in questions
  useEffect(() => {
    const qio = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          qio.unobserve(e.target);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.q').forEach(el => qio.observe(el));

    return () => {
      qio.disconnect();
    };
  }, []);

  // Smooth scroll handler to targeted chapter ID
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased text-ink selection:bg-cobalt selection:text-paper relative">
      
      {/* Luxury Minimalist Header with Anchor Menu */}
      <header className="fixed top-0 left-0 right-0 h-24 flex items-center justify-between px-6 md:px-16 z-50 bg-paper/85 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <span className="font-raleway text-sm tracking-[0.3em] text-navy font-bold uppercase cursor-pointer" onClick={() => scrollToSection("start")}>
            SELF-GUIDANCE SPACE
          </span>
          <Triangle size={14} className="text-cobalt fill-cobalt/20 stroke-[1.5] rotate-12 animate-pulse shrink-0" />
        </div>

        {/* Elegant Editorial Menu links - Desktop */}
        <nav className="hidden lg:flex items-center space-x-10">
          {[
            { label: "Rozpoznanie", target: "lustra" },
            { label: "Samoprowadzenie", target: "samoprowadzenie" },
            { label: "Co dostajesz", target: "sciezka" },
            { label: "Opinie", target: "opinie" },
            { label: "Dołącz", target: "dolacz" }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToSection(item.target)}
              className="font-raleway text-[11px] uppercase font-bold tracking-[0.25em] text-ink-soft hover:text-cobalt cursor-pointer transition-colors duration-300"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Icon */}
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="lg:hidden p-2 text-navy hover:text-cobalt transition-colors duration-300 cursor-pointer"
          aria-label="Menu"
        >
          <Menu size={24} />
        </button>
      </header>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-navy z-[100] flex flex-col justify-between p-6 md:p-16 text-on-dark"
          >
            {/* Overlay Header */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <span className="font-raleway text-sm tracking-[0.3em] text-white font-bold uppercase cursor-pointer" onClick={() => scrollToSection("start")}>
                  SELF-GUIDANCE SPACE
                </span>
                <Triangle size={14} className="text-[var(--amber)] fill-[var(--amber)]/20 stroke-[1.5] rotate-12 animate-pulse shrink-0" />
              </div>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-white hover:text-[var(--amber)] transition-colors duration-300 cursor-pointer"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Vertically stacked menu items */}
            <nav className="flex flex-col items-center justify-center space-y-4 my-auto w-full">
              {[
                { label: "Rozpoznanie", target: "lustra" },
                { label: "Samoprowadzenie", target: "samoprowadzenie" },
                { label: "Co dostajesz", target: "sciezka" },
                { label: "Opinie", target: "opinie" },
                { label: "Dołącz", target: "dolacz" }
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item.target)}
                  className="w-full min-h-[48px] flex items-center justify-center font-raleway text-[13px] uppercase font-bold tracking-[0.25em] text-on-dark-soft hover:text-white hover:bg-white/5 rounded-sm transition-all duration-300 cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Overlay Footer */}
            <div className="hero__micro text-center">
              SELF-GUIDANCE SPACE
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 w-full flex flex-col items-center pb-[88px] lg:pb-0">

        {/* CHAPTER I: SILENCE & RECLAMATION (Rebuilt Dark Hero with Prism) */}
        <section className="hero sec--dark w-full flex flex-col items-center" id="start">
          <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
            <div className="hero__media w-full max-w-[28rem] mx-auto">
              <div className={`prism ${isJoined ? 'is-joined' : ''} ${isReady ? 'prism-ready' : ''}`} id="prism" ref={prismRef}>
                <span className="shard s1"></span><span className="shard s2"></span>
                <span className="shard s3"></span><span className="shard s4"></span>
              </div>
            </div>

            <div className="hero__copy text-center max-w-[34rem] mx-auto px-6 pb-20">
              <h1 className="hero__claim max-w-[34rem] mx-auto font-sans font-light">
                <span>Instrukcja, jak być spokojną i spełnioną&nbsp;- jest w Tobie.</span>
                <span>Mapa do osiągnięcia wymarzonych celów&nbsp;- jest w Tobie.</span>
                <span>Odpowiedź na „co mam teraz zrobić?" i inne trudne pytania&nbsp;- jest w Tobie.</span>
              </h1>
              <p className="hero__lead max-w-[34rem] mx-auto font-sans font-light">Tutaj pokażę Ci, jak do tego dotrzeć.</p>
              <p className="hero__mark max-w-[34rem] mx-auto font-serif tracking-[0.12em] text-white">SELF-GUIDANCE SPACE</p>
              <a className="btn btn--primary" href="#dolacz" onClick={(e) => { e.preventDefault(); scrollToSection("dolacz"); }}>Wejdź do przestrzeni</a>
            </div>
          </div>
        </section>

        <section className="sec--light w-full py-24 px-6 md:px-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-5xl flex flex-col items-center text-center">
            <p className="max-w-[34rem] mx-auto font-sans text-base text-ink leading-relaxed font-light tracking-wide">
              To miejsce, w którym nauczysz się odróżniać swoją prawdę od cudzych przekonań. Poznasz konkretne narzędzia, z którymi zbudujesz rzeczywistość pasującą do Twojego potencjału - ze spokojem i w zgodzie ze sobą.
            </p>
            <p className="max-w-[34rem] mx-auto mt-8 font-sans text-base text-ink leading-relaxed font-light tracking-wide">
              Stworzyłam tę przestrzeń po to, żebyś już się nie gubiła. Żebyś przerwała cykl, który odtwarzasz:
            </p>
            <blockquote className="max-w-[34rem] mx-auto mt-8 p-6 md:p-8 bg-cobalt/5 border-l-2 border-cobalt text-left italic text-cobalt font-serif text-base leading-relaxed font-light tracking-wide">
              „Słucham innych, robię to, co muszę, trzeba, powinnam, a potem ląduję w niewygodnym miejscu, w którym wcale nie czuję się szczęśliwa. Nie ma tu spokoju ani satysfakcji - i znowu nie wiem, co dalej. Więc szukam kolejnych celów, które mogę osiągnąć, i nowych autorytetów, których mogę zapytać o zdanie, z nadzieją, że tym razem coś się zmieni i pojawi się spełnienie. Żeby za jakiś czas znów się przekonać, że to nie to."
            </blockquote>
          </div>
        </section>

        {/* QUESTIONS SECTION */}
        <section className="questions sec--dark w-full py-24 px-6 md:px-16">
          <div className="w-full max-w-5xl mx-auto">
            <div className="questions__inner max-w-[34rem] mx-auto">
              <p className="q max-w-[34rem] mx-auto">A gdyby tak w końcu zrobić to inaczej i pójść po odpowiedzi do siebie?</p>
              <p className="q max-w-[34rem] mx-auto">A co jeśli to Ty potrafisz poprowadzić siebie do spokoju, spełnienia i satysfakcji, bez pytania innych o zdanie, tylko nie miałaś do tego narzędzi?</p>
              <p className="q max-w-[34rem] mx-auto">A co jeśli tylko Ty wiesz, co zrobić, żeby budzić się z myślą: „kocham moje życie", ale nie miałaś mapy do wewnętrznego głosu, który mówi Ci, jak to zrobić?</p>
            </div>
          </div>
        </section>

        <section className="sec--light w-full pt-12 pb-8 px-6 md:px-16 flex flex-col justify-center items-center">
          <div className="w-full max-w-5xl flex flex-col items-center">
            <div className="box">
              <p>
                Self-Guidance opiera się na procesach i praktyce zamiast suchej wiedzy. Nie mówię Ci, co jest dla Ciebie dobre i kim jesteś - tylko jak rozmawiać ze sobą, żebyś sama mogła to odkryć.
              </p>
              <p>
                Stworzyłam system oparty na uwalnianiu emocji i zmianie przekonań z EFT. Przeprowadzę Cię przez konkretne techniki, które pozwolą Ci spojrzeć z zachwytem na siebie i swoją rzeczywistość.
              </p>
            </div>
          </div>
        </section>

      {/* CHAPTER II: MIRROR REBELS (MirrorReflection Component in Light Theme) */}
      <MirrorReflection isPl={true} />

      {/* THE INTEGRAL TRUTH CALLOUT BANNER (SGS Luxury Editorial Contrast block) */}
      <section className="sec--dark relative w-full py-32 px-6 md:px-16 overflow-hidden flex flex-col items-center justify-center">
        {/* Photorealistic Dark Stone & Glowing Kintsugi Crack Background */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-85">
          <img 
            src={sgsGlowingCracks} 
            alt="Glowing Cracks Texture" 
            className="w-full h-full object-cover mix-blend-lighten scale-102 transition-transform duration-[10000ms] ease-out hover:scale-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient dark overlays to preserve pristine text contrast in the center */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-transparent to-navy/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/40 to-navy/80" />
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-20">
          <div className="w-full max-w-[34rem] mx-auto text-center z-20 py-4 px-4 sm:px-12">
            <div>
              <p className="quote-text font-serif italic font-light tracking-wide max-w-[34rem] mx-auto">
                Uwierzyłaś, że jesteś niewystarczająca.<br />
                Że ciągle musisz działać.<br />
                Że musisz zasłużyć.<br />
                Że umiesz za mało.<br />
                Że są lepsi od Ciebie.<br />
                Że inni wiedzą lepiej i to oni mają rację -<br />
                a Ty, żeby znaleźć w życiu spełnienie, musisz podążać ich śladem.
              </p>
              
              <p className="quote-text font-serif italic font-light tracking-wide max-w-[34rem] mx-auto mt-8">
                A prawda jest taka, że największy sukces - w spokoju i zgodzie ze sobą - odniesiesz wtedy, gdy UHONORUJESZ to, jaka jesteś, i wykorzystasz swoją unikalną energię, zamiast się za nią biczować.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER III: SAMOPROWADZENIE (Educational list in light ivory) */}
      <section 
        id="samoprowadzenie" 
        className="sec--light relative w-full py-24 px-6 md:px-16 overflow-hidden flex flex-col justify-center items-center"
      >
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center z-10">
          {/* Full width header placed higher above the grid and centered */}
          <div className="max-w-[34rem] w-full mb-14 z-10 text-center flex flex-col items-center mx-auto">
            <span className="font-sans text-[var(--fs-label)] tracking-[0.18em] text-[var(--cobalt)] uppercase font-bold mb-3 block">
              NOWE PODEJŚCIE DO ROZWOJU
            </span>
            <h2 className="font-serif font-light tracking-tight text-navy leading-tight mx-auto max-w-[34rem]">
              W <span className="whitespace-nowrap">Self-Guidance Space</span><br />uczę Cię samoprowadzenia
            </h2>
          </div>

          <div className="w-full stack z-10">
            
            {/* Narrative description */}
            <div className="col space-y-8 text-left">
              <div className="space-y-6 font-sans text-base text-ink leading-relaxed font-light tracking-wide">
                <p>
                  Tylko Ty wiesz, czego chcesz, czego potrzebujesz i co jest z Tobą zgodne. Wiesz dlaczego? Bo te odpowiedzi są wyłącznie w Tobie. Nie gdzieś tam, daleko, albo u kogoś innego.
                </p>
                
                <div className="relative p-5 md:p-6 bg-cobalt/5 border-l-2 border-cobalt rounded-r-sm my-6">
                  <p className="font-serif italic text-base text-cobalt leading-relaxed font-light tracking-wide">
                    I zdaję sobie sprawę, że możesz nie wiedzieć, jak do nich dotrzeć. Tego Cię tu nauczę. W tej przestrzeni zrozumiesz, jak pracować ze sobą, zrozumieć siebie i zbudować relację ze sobą opartą na bezwarunkowej miłości.
                  </p>
                </div>
              </div>

              {/* Editorial Image frame */}
              <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden border border-grey/25 p-2 bg-white/40 col-media">
                <img
                  src={imageThree}
                  alt="Samoprowadzenie - Self-Guidance"
                  className="w-full h-full object-cover rounded-sm"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-cobalt/5 mix-blend-multiply pointer-events-none" />
              </div>
            </div>

            {/* Core Definitions of leading yourself */}
            <div className="col space-y-6">
              <div className="p-8 bg-white/45 border-[0.5px] border-grey/25 rounded-sm space-y-6 shadow-sm backdrop-blur-md">
                <span className="eyebrow" style={{textAlign:'left'}}>
                  Kiedy prowadzisz siebie sama, to znaczy, że:
                </span>

                <ul className="list">
                  {[
                    "Prowadzi Cię Twój wewnętrzny głos i Twoja prawda, a nie cudze przekonania i zewnętrzne autorytety.",
                    "Prowadzi Cię czucie - to Twój wewnętrzny autorytet podejmuje decyzje, a umysł i logika pomagają Ci je wcielić w życie, zamiast decydować za Ciebie.",
                    "Potrafisz odróżnić swoją prawdę od cudzych przekonań.",
                    "Rozpoznajesz, które cele są naprawdę Twoje, a które obrałaś z lęku, wstydu albo z przekonania, że jesteś niewystarczająca albo najpierw musisz zasłużyć.",
                    "Sama odkrywasz podświadome blokady i zmieniasz przekonania, żeby osiągnąć to, czego chcesz.",
                    "Umiesz zmieniać perspektywę tak, żeby Ci służyła, a nie ograniczała.",
                    "Potrafisz sama przejść od silnych, trudnych emocji do spokoju.",
                    "Znajdujesz w sobie odpowiedzi na najtrudniejsze pytania - przede wszystkim na „co mam teraz zrobić?”.",
                    "Czujesz spokój, bezpieczeństwo i pełnię w sobie, a nie w zewnętrznych okolicznościach.",
                    "Twój umysł przestaje Cię sabotować i zaczyna Ci pomagać."
                  ].map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CHAPTER IV: THE PATH & ECOSYSTEM (InteractiveEcosystem Component in Light Theme) */}
      <InteractiveEcosystem isPl={true} />

      {/* CHAPTER V: OPINIONS AND TESTIMONIALS (TestimonialSlider Component in Light Theme) */}
      <TestimonialSlider isPl={true} />

      {/* CHAPTER VI: THE SHATTERED PRISM (PrismViewer Component in Light Theme) */}
      <PrismViewer isPl={true} />

      {/* CHAPTER VII: THE JOIN OFFER & REGISTRATION (SelfInquiry Component) */}
      <SelfInquiry isPl={true} />

      </main>

      {/* LUXURY EDITORIAL FOOTER */}
      <footer className="footer">
        <div className="footer__inner">
          <div className="footer__copy">
            © {new Date().getFullYear()} Self-Guidance Space. Wszelkie prawa zastrzeżone.
          </div>
          <div className="footer__legal">
            <a href="https://platforma.sandrafolta.pl/next/public/pages/privacy_policy" target="_blank" rel="noopener noreferrer">Polityka prywatności</a>
            <a href="https://platforma.sandrafolta.pl/next/public/pages/regulations" target="_blank" rel="noopener noreferrer">Regulamin</a>
          </div>
        </div>
      </footer>

      <div className="sticky-cta" id="stickyCta" ref={stickyCtaRef}>
        <a className="btn btn--primary" href="#dolacz" onClick={(e) => { e.preventDefault(); scrollToSection("dolacz"); }}>Dołącz do Self-Guidance Space</a>
      </div>

    </div>
  );
}
