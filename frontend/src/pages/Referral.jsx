import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  DollarSign, Users, Star, CheckCircle2, ChevronRight, ArrowRight,
  Gift, Award, Zap, Phone, Send, CheckCircle
} from 'lucide-react';

const rewards = [
  { range: '15–30 stanova', amount: '200 €' },
  { range: '30–50 stanova', amount: '350 €' },
  { range: '50–60 stanova', amount: '450 €' },
  { range: '60–70 stanova', amount: '550 €' },
  { range: '70–80 stanova', amount: '650 €' },
  { range: '80–100 stanova', amount: 'po dogovoru' },
  { range: '100+ stanova', amount: 'više od 1.000 €' },
];

const whyUs = [
  'Profesionalno i transparentno upravljanje',
  'Brza komunikacija i rešavanje problema',
  'Dugogodišnje iskustvo i veliki broj zadovoljnih zgrada',
  'Jasni troškovi — bez skrivenih naknada',
];

const Referral = () => {
  const [form, setForm] = useState({ name: '', phone: '', buildingAddress: '', numUnits: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Ime je obavezno';
    if (!form.phone.trim()) e.phone = 'Telefon je obavezan';
    if (!form.buildingAddress.trim()) e.buildingAddress = 'Adresa zgrade je obavezna';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const handleChange = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: '' }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-[#28a8e0]/20 border border-[#28a8e0]/40 text-[#7dd3f8] px-4 py-1.5 rounded-full text-sm font-semibold mb-5">
            <Gift size={14} /> Zaradite uz nas
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Postanite naš saradnik<br />
            <span className="text-[#28a8e0]">i zaradite</span>
          </h1>
          <p className="text-[#a8d8f0] text-lg max-w-2xl mx-auto">
            DUX DOMUS AGENCIJA VAM PREDSTAVLJA JEDINSTVENU PONUDU
          </p>
        </div>
      </div>

      {/* Intro section */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-[#0a2d5e] mb-4">
            Saradnja / Preporuka — Zaradite uz nas!
          </h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p className="text-lg">
              Da li ste nezadovoljni trenutnim upravnikom Vaše zgrade?
            </p>
            <p>
              Verujete da Vaša zgrada može imati bolju uslugu, veću transparentnost i efikasnije upravljanje?
            </p>
            <p className="font-semibold text-[#0a2d5e] text-lg">
              Mi imamo rešenje — a Vi priliku da zaradite.
            </p>
          </div>

          {/* How it works */}
          <div className="mt-8 bg-[#f4f9ff] rounded-xl p-6 border border-[#daeaf7]">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-[#28a8e0]" />
              <h3 className="font-bold text-[#0a2d5e] text-lg">Kako funkcioniše?</h3>
            </div>
            <p className="text-gray-600">
              Preporučite našu agenciju za upravljanje stambenim zgradama i, ukoliko zgrada pređe na naše upravljanje,
              ostvarujete <strong className="text-[#1e5f9e]">novčanu nagradu</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Rewards table */}
      <section className="pb-12 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="bg-[#0a2d5e] px-8 py-5 flex items-center gap-3">
            <DollarSign size={22} className="text-[#28a8e0]" />
            <h2 className="text-xl font-bold text-white">Nagrade po veličini zgrade</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {rewards.map((r, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-8 py-4 hover:bg-[#f8fbff] transition-colors ${i === rewards.length - 1 ? 'bg-[#e8f4fd]' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#e8f4fd] flex items-center justify-center text-xs font-bold text-[#1e5f9e]">
                    {i + 1}
                  </div>
                  <span className="font-medium text-[#0a2d5e]">{r.range}</span>
                </div>
                <span className={`font-bold text-lg ${i === rewards.length - 1 ? 'text-[#1e5f9e] text-xl' : 'text-[#28a8e0]'}`}>
                  {r.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambassador program */}
      <section className="pb-12 max-w-4xl mx-auto px-4">
        <div className="bg-gradient-to-br from-[#0a2d5e] to-[#1e5f9e] rounded-2xl p-8 md:p-10 text-white">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-xl bg-[#28a8e0]/30 flex items-center justify-center">
              <Award size={24} className="text-[#28a8e0]" />
            </div>
            <div>
              <div className="text-[#7dd3f8] text-xs uppercase tracking-widest font-semibold">Poseban program</div>
              <h2 className="text-2xl font-bold">Ambasadori</h2>
            </div>
          </div>
          <p className="text-[#a8d8f0] mb-6">
            Dovedite <strong className="text-white">3 ili više zgrada</strong> i postajete naš ambasador:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: DollarSign, label: 'Duple nagrade' },
              { icon: Star, label: 'Prioritetna saradnja' },
              { icon: Gift, label: 'Dodatni bonusi i pogodnosti' },
            ].map(({ icon: Icon, label }, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex items-center gap-3 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-[#28a8e0]/30 flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-[#28a8e0]" />
                </div>
                <span className="font-semibold text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="pb-12 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 size={20} className="text-[#28a8e0]" />
            <h2 className="text-xl font-bold text-[#0a2d5e]">Zašto baš mi?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whyUs.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-[#f4f9ff] rounded-lg px-4 py-3 border border-[#daeaf7]">
                <CheckCircle2 size={15} className="text-[#28a8e0] flex-shrink-0" />
                <span className="text-gray-700 text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* Legal note */}
          <div className="mt-6 bg-gray-50 rounded-lg px-4 py-3 border border-gray-200">
            <p className="text-xs text-gray-500">
              <strong className="text-gray-700">Napomena:</strong> Isplata nagrada je legalna i oporezovana u skladu sa zakonom.
            </p>
          </div>
        </div>
      </section>

      {/* Sign-up form */}
      <section className="pb-16 max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#e8f4fd] flex items-center justify-center">
              <Send size={18} className="text-[#1e5f9e]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0a2d5e]">Prijavite se / Preporučite</h2>
              <p className="text-gray-500 text-sm">Pošaljite nam podatke i kontaktiraćemo vas</p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-[#0a2d5e] mb-2">Prijava primljena!</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Hvala na preporuci! Kontaktiraćemo Vas u najkraćem roku sa svim detaljima saradnje.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { field: 'name', label: 'Vaše ime i prezime', placeholder: 'Ime i prezime', required: true },
                { field: 'phone', label: 'Broj telefona', placeholder: 'npr. 065/123-456', required: true },
                { field: 'buildingAddress', label: 'Adresa zgrade koju preporučujete', placeholder: 'Ulica i broj, Niš', required: true, full: true },
                { field: 'numUnits', label: 'Broj stanova u zgradi (okvirno)', placeholder: 'npr. 24', required: false },
              ].map(({ field, label, placeholder, required, full }) => (
                <div key={field} className={full ? 'sm:col-span-2' : ''}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={handleChange(field)}
                    placeholder={placeholder}
                    className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30
                      ${errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                  />
                  {errors[field] && <p className="mt-1 text-xs text-red-500">{errors[field]}</p>}
                </div>
              ))}

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Napomena (opciono)
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={handleChange('message')}
                  placeholder="Zašto mislite da bi ova zgrada bila zainteresovana za naše usluge?"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] resize-none transition-colors"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] disabled:bg-gray-300 text-white py-3.5 rounded-lg font-semibold transition-all hover:shadow-lg"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><Send size={16} /> Pošaljite preporuku</>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Referral;
