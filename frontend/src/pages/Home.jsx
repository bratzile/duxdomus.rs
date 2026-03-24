import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, CheckCircle2, ArrowRight, Phone, Building2
} from 'lucide-react';
import { heroSlides, features, stats, managerDuties, aboutText, faq, companyInfo } from '../data/mock';

// Animated counter hook
const useCounter = (target, duration = 1800, active = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime = null;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const pct = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(pct * target));
      if (pct < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, active]);
  return count;
};

const StatCard = ({ value, label, suffix, active }) => {
  const count = useCounter(value, 1800, active);
  return (
    <div className="text-center py-2">
      <div className="text-4xl lg:text-5xl font-bold text-white mb-1 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-[#a8d8f0] text-sm font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const statsRef = useRef(null);

  // Auto-advance hero slider
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Trigger stat counters when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsActive(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative h-[480px] md:h-[580px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = slide.fallback; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2d5e]/85 via-[#0a2d5e]/50 to-transparent" />
          </div>
        ))}

        {/* Hero text */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-[#28a8e0]/20 backdrop-blur-sm border border-[#28a8e0]/40 text-[#7dd3f8] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Building2 size={13} />
                Profesionalni upravnik zgrada
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg text-[#a8d8f0] font-medium mb-6">
                {heroSlides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/kontakt"
                  className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                >
                  Kontaktirajte nas <ArrowRight size={15} />
                </Link>
                <Link
                  to="/usluge"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  Naše usluge
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Slider arrows */}
        <button
          onClick={() => setCurrentSlide((p) => (p - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((p) => (p + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/35 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2'}`}
            />
          ))}
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────── */}
      <section className="relative -mt-14 z-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.onerror = null; e.target.src = f.fallback; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d5e]/75 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-base leading-tight">{f.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-500 text-sm mb-3">{f.description}</p>
                <Link to="/usluge" className="inline-flex items-center gap-1 text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors">
                  Saznaj više <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Welcome / About ───────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#28a8e0] font-semibold text-xs uppercase tracking-widest">Dobrodošli</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0a2d5e] mt-2 mb-6 leading-tight">
              Profesionalni upravnik stambenih zgrada u Nišu
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Ako je Vaša zgrada u problemima a Vi nemate vremena da ih rešavate — <strong className="text-[#1e5f9e]">pozovite nas</strong>.</p>
              <p>Ako želite da u zgradu ulazite sa zadovoljstvom — mi ćemo to omogućiti.</p>
              <p>{aboutText}</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/usluge"
                className="inline-flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
              >
                Saznaj više <ArrowRight size={15} />
              </Link>
              <a
                href="tel:+381658430028"
                className="inline-flex items-center gap-2 border-2 border-[#1e5f9e] text-[#1e5f9e] hover:bg-[#1e5f9e] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
              >
                <Phone size={15} /> Pozovite nas
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://duxdomus.rs/uploads/images/dole/page1_pic4.jpg"
              alt="O nama"
              className="w-full rounded-2xl shadow-xl object-cover h-80"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=60';
              }}
            />
            <div className="absolute -bottom-5 -right-5 bg-[#28a8e0] text-white p-4 rounded-xl shadow-xl">
              <div className="text-2xl font-bold">13+</div>
              <div className="text-sm opacity-90 font-medium">Godina iskustva</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section ref={statsRef} className="bg-gradient-to-r from-[#0a2d5e] to-[#1a4e8a] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-[#1e5f9e]/40">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} active={statsActive} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Manager duties ────────────────────────────────── */}
      <section className="py-20 bg-[#f4f9ff]">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#28a8e0] font-semibold text-xs uppercase tracking-widest">Naše obaveze</span>
            <h2 className="text-3xl font-bold text-[#0a2d5e] mt-2">Profesionalni upravnik stambene zajednice</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {managerDuties.map((duty, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white px-5 py-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <CheckCircle2 size={18} className="text-[#28a8e0] flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-gray-700 font-medium text-sm">{duty}</span>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/usluge"
              className="inline-flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              Pogledajte sve usluge <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#28a8e0] font-semibold text-xs uppercase tracking-widest">Odgovori</span>
          <h2 className="text-3xl font-bold text-[#0a2d5e] mt-2">Najčešće postavljana pitanja</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faq.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left font-semibold text-[#0a2d5e] hover:bg-[#f8fbff] transition-colors"
                onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
              >
                <span>{item.question}</span>
                <ChevronRight
                  size={18}
                  className={`text-[#28a8e0] flex-shrink-0 transition-transform duration-200 ${openFaq === item.id ? 'rotate-90' : ''}`}
                />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === item.id ? 'max-h-48' : 'max-h-0'}`}>
                <div className="px-6 pb-5 pt-0 text-gray-600 text-sm leading-relaxed border-t border-gray-100">
                  <div className="pt-4">{item.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#0a2d5e] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Preduzmite kontrolu nad svojom zgradom</h2>
          <p className="text-[#a8d8f0] mb-8 text-lg">
            Kontaktirajte nas danas i dogovorite besplatne konsultacije
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
            >
              Kontaktirajte nas <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+381658430028"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200"
            >
              <Phone size={18} /> {companyInfo.phones.aleksa}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
