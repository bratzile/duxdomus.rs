import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  ChevronRight, ChevronLeft, CheckCircle2, ArrowRight, Phone,
  Building2, X, Send, CheckCircle, Tag, Users, BookOpen
} from 'lucide-react';
import * as mock from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Animated counter
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
      <div className="text-4xl lg:text-5xl font-bold text-white mb-1 tabular-nums">{count}{suffix}</div>
      <div className="text-[#a8d8f0] text-sm font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
};

// Quote modal
const QuoteModal = ({ onClose, pricing }) => {
  const [form, setForm] = useState({ address: '', numUnits: '', numOther: '', problem: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.address.trim()) e.address = 'Adresa je obavezna';
    if (!form.numUnits.trim() || isNaN(Number(form.numUnits))) e.numUnits = 'Unesite broj stanova';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Unesite ispravnu email adresu';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, form);
    } catch (_) { /* ignorišemo mrežne greške */ }
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (field) => (ev) => {
    setForm(p => ({ ...p, [field]: ev.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] px-6 py-5 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">Zatražite ponudu</h2>
            <p className="text-[#a8d8f0] text-sm mt-0.5">Popunite formu i javićemo vam se</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2d5e] mb-2">Upit primljen!</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Hvala! Kontaktiraćemo Vas na {form.email} sa personalizovanom ponudom.
              </p>
              <button
                onClick={onClose}
                className="mt-5 text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors"
              >
                Zatvori
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Pricing hint */}
              <div className="bg-[#e8f4fd] rounded-xl px-4 py-3 flex items-center gap-3 border border-[#c5e0f5]">
                <Tag size={16} className="text-[#1e5f9e] flex-shrink-0" />
                <p className="text-sm text-[#1e5f9e]">
                  Minimalna cena: <strong>{pricing.minPrice} {pricing.currency}</strong> po {pricing.unit}.
                  {' '}{pricing.note}
                </p>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Adresa stambene zajednice <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={handleChange('address')}
                  placeholder="Ulica i broj, grad"
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 transition-colors
                    ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              {/* Units row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Broj stanova <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.numUnits}
                    onChange={handleChange('numUnits')}
                    placeholder="npr. 24"
                    className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 transition-colors
                      ${errors.numUnits ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                  />
                  {errors.numUnits && <p className="mt-1 text-xs text-red-500">{errors.numUnits}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Lokali / garaže
                    <span className="text-gray-400 font-normal ml-1">(opciono)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.numOther}
                    onChange={handleChange('numOther')}
                    placeholder="npr. 3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] transition-colors"
                  />
                </div>
              </div>

              {/* Problem */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Problem koji imamo u zgradi
                  <span className="text-gray-400 font-normal ml-1">(opciono)</span>
                </label>
                <textarea
                  rows={3}
                  value={form.problem}
                  onChange={handleChange('problem')}
                  placeholder="Opišite nam probleme sa kojima se suočavate u zgradi..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] resize-none transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Vaša email adresa <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  placeholder="vas@email.com"
                  className={`w-full px-4 py-3 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 transition-colors
                    ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] disabled:bg-gray-300 text-white py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <><Send size={15} /> Pošaljite upit</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showQuote, setShowQuote] = useState(false);
  const [content, setContent] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const statsRef = useRef(null);

  // Resolved data (API or mock fallback)
  const heroSlides = content?.hero_slides || mock.heroSlides;
  const features = mock.features; // Keep using stock images from mock
  const stats = content?.stats || mock.stats;
  const managerDuties = content?.manager_duties || mock.managerDuties;
  const aboutText = content?.about_text || mock.aboutText;
  const aboutImage = content?.about_image || 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=600&q=80';
  const faq = content?.faqs || mock.faq;
  const pricing = content?.pricing || mock.pricing;
  const companyInfo = content?.company_info || mock.companyInfo;

  useEffect(() => {
    axios.get(`${API}/content`).then(r => setContent(r.data)).catch(() => {});
    axios.get(`${API}/blog`).then(r => setBlogPosts(r.data)).catch(() => setBlogPosts(mock.blogPosts));
  }, []);

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide((p) => (p + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

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
      {showQuote && <QuoteModal onClose={() => setShowQuote(false)} pricing={pricing} />}

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a2d5e]/90 via-[#0a2d5e]/60 to-transparent" />
          </div>
        ))}

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-6xl mx-auto px-4 w-full">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 bg-[#28a8e0]/20 backdrop-blur-sm border border-[#28a8e0]/40 text-[#7dd3f8] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                <Building2 size={13} /> Profesionalni upravnik zgrada
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
                <button
                  onClick={() => setShowQuote(true)}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                  <Tag size={14} /> Želite ponudu?
                </button>
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

      {/* ── Feature cards ───────────────────────────── */}
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

      {/* ── Welcome / About ─────────────────────────── */}
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

            {/* Pricing teaser */}
            <div className="mt-6 bg-[#e8f4fd] rounded-xl px-5 py-4 border border-[#c5e0f5] flex items-start gap-3">
              <Tag size={18} className="text-[#1e5f9e] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[#0a2d5e]">
                  Minimalna cena: {pricing.minPrice} {pricing.currency} po {pricing.unit}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{pricing.note}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/usluge"
                className="inline-flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
              >
                Saznaj više <ArrowRight size={15} />
              </Link>
              <button
                onClick={() => setShowQuote(true)}
                className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-md"
              >
                <Tag size={15} /> Želite ponudu naše agencije?
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=600&q=80"
              alt="O nama"
              className="w-full rounded-2xl shadow-xl object-cover h-80"
            />
            <div className="absolute -bottom-5 -right-5 bg-[#28a8e0] text-white p-4 rounded-xl shadow-xl">
              <div className="text-2xl font-bold">14+</div>
              <div className="text-sm opacity-90 font-medium">Godina iskustva</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────── */}
      <section ref={statsRef} className="bg-gradient-to-r from-[#0a2d5e] to-[#1a4e8a] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <StatCard key={s.label} {...s} active={statsActive} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Manager duties ──────────────────────────── */}
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

      {/* ── Pricing section ─────────────────────────── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-[#28a8e0] font-semibold text-xs uppercase tracking-widest">Cenovnik</span>
            <h2 className="text-3xl font-bold text-[#0a2d5e] mt-2 mb-4">Transparentne cene</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Verujemo u potpunu transparentnost. Naša minimalna cena je{' '}
              <strong className="text-[#1e5f9e]">{pricing.minPrice} {pricing.currency} po {pricing.unit}</strong>.
              Konačna cena formira se na osnovu ukupnog broja posebnih delova u Vašoj zgradi.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Bez skrivenih naknada. Bez iznenađenja. Sve je dogovoreno ugovorom pre nego što počnemo sa radom.
            </p>
            <button
              onClick={() => setShowQuote(true)}
              className="inline-flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-md"
            >
              <Tag size={15} /> Zatražite tačnu ponudu
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="bg-[#0a2d5e] px-6 py-4">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Tag size={16} className="text-[#28a8e0]" />
                Kako se formira cena
              </h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { label: 'Stanovi', desc: 'Svaki stan = 1 poseban deo' },
                { label: 'Lokali', desc: 'Poslovni prostori = 1 poseban deo' },
                { label: 'Garaže', desc: 'Garažna mesta = 1 poseban deo' },
                { label: 'Minimalna cena', desc: `${pricing.minPrice} ${pricing.currency} / posebnom delu / mesečno`, highlight: true }
              ].map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between py-2.5 px-4 rounded-lg ${item.highlight ? 'bg-[#e8f4fd] border border-[#c5e0f5]' : 'bg-gray-50'}`}
                >
                  <span className={`font-semibold text-sm ${item.highlight ? 'text-[#0a2d5e]' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                  <span className={`text-sm ${item.highlight ? 'text-[#1e5f9e] font-bold' : 'text-gray-500'}`}>
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Referral teaser ─────────────────────────── */}
      <section className="bg-gradient-to-r from-[#0a2d5e] to-[#1a4e8a] py-14 mx-4 rounded-2xl max-w-6xl md:mx-auto mb-12">
        <div className="px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-[#28a8e0]/20 border border-[#28a8e0]/40 text-[#7dd3f8] px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
            <Users size={13} /> Zaradite uz nas
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Postanite naš saradnik i zaradite</h2>
          <p className="text-[#a8d8f0] max-w-xl mx-auto mb-6 text-sm leading-relaxed">
            Preporučite zgradu našoj agenciji — i zaradite nagradu od <strong className="text-white">200€ do 1.000€+</strong> u zavisnosti od veličine zgrade.
          </p>
          <Link
            to="/saradnja"
            className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-6 py-3 rounded-lg font-semibold transition-all hover:shadow-lg"
          >
            Saznajte više <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Blog preview ────────────────────────────── */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <span className="text-[#28a8e0] font-semibold text-xs uppercase tracking-widest">Blog</span>
            <h2 className="text-2xl font-bold text-[#0a2d5e] mt-1">Edukativni sadržaj</h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:flex items-center gap-1.5 text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors"
          >
            Svi članci <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-1"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={`${post.image}&w=400`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                  <BookOpen size={11} />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.category}</span>
                </div>
                <h3 className="font-bold text-[#0a2d5e] text-sm leading-snug group-hover:text-[#1e5f9e] transition-colors line-clamp-2">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6 md:hidden">
          <Link to="/blog" className="text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors">
            Pogledajte sve članke →
          </Link>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────── */}
      <section className="py-16 bg-[#f4f9ff]">
        <div className="max-w-6xl mx-auto px-4">
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
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="bg-[#0a2d5e] py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Preduzmite kontrolu nad svojom zgradom</h2>
          <p className="text-[#a8d8f0] mb-8 text-lg">Kontaktirajte nas danas i dogovorite besplatne konsultacije</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Kontaktirajte nas <ArrowRight size={18} />
            </Link>
            <a
              href="tel:+381658430028"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-bold text-lg transition-all"
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
