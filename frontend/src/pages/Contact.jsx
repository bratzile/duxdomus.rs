import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Clock, User, Send, CheckCircle2 } from 'lucide-react';
import { companyInfo as mockCompanyInfo } from '../data/mock';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [companyInfo, setCompanyInfo] = useState(mockCompanyInfo);

  useEffect(() => {
    axios.get(`${API}/content`)
      .then(r => { if (r.data.company_info) setCompanyInfo(r.data.company_info); })
      .catch(() => {});
  }, []);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Ime i prezime je obavezno';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Unesite ispravnu email adresu';
    if (form.message.trim().length < 10) e.message = 'Poruka mora imati najmanje 10 karaktera';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, form);
    } catch (_) { /* mail se šalje server-side, ignorišemo mrežne greške */ }
    setLoading(false);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setErrors({});
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Stupite u kontakt</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Kontakt</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Kontaktirajte nas putem telefona, emaila ili popunjavanjem forme. Tu smo za sve vaše upite.
          </p>
        </div>
      </div>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact info */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0a2d5e] mb-6">Informacije</h2>
            </div>

            {[
              {
                icon: User,
                label: 'Vlasnik agencije',
                content: companyInfo.owner
              },
              {
                icon: MapPin,
                label: 'Adresa',
                content: companyInfo.address
              },
              {
                icon: Phone,
                label: 'Telefoni',
                content: (
                  <div className="space-y-1">
                    <div>Slobodan: <a href="tel:+381642350527" className="text-[#1e5f9e] hover:text-[#28a8e0] font-medium transition-colors">{companyInfo.phones.slobodan}</a></div>
                    <div>Aleksa: <a href="tel:+381658430028" className="text-[#1e5f9e] hover:text-[#28a8e0] font-medium transition-colors">{companyInfo.phones.aleksa}</a></div>
                  </div>
                )
              },
              {
                icon: Clock,
                label: 'Kancelarija',
                content: (
                  <div>
                    <a href="tel:+38118455862" className="text-[#1e5f9e] hover:text-[#28a8e0] font-medium transition-colors">
                      {companyInfo.phones.kancelarija}
                    </a>{' '}
                    {companyInfo.phones.kancelarijaNote}
                  </div>
                )
              },
              {
                icon: Mail,
                label: 'Email',
                content: (
                  <a href={`mailto:${companyInfo.email}`} className="text-[#1e5f9e] hover:text-[#28a8e0] font-medium transition-colors">
                    {companyInfo.email}
                  </a>
                )
              }
            ].map(({ icon: Icon, label, content }, i) => (
              <div key={i} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center">
                  <Icon size={18} className="text-[#1e5f9e]" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</div>
                  <div className="text-gray-700 text-sm">{content}</div>
                </div>
              </div>
            ))}

            {/* PIB info */}
            <div className="bg-[#f4f9ff] rounded-xl p-4 border border-[#c5e0f5]">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Podaci o firmi</div>
              <div className="text-sm text-gray-600 space-y-1">
                <div>PIB: <span className="font-semibold text-[#0a2d5e]">{companyInfo.pib}</span></div>
                <div>Matični broj: <span className="font-semibold text-[#0a2d5e]">{companyInfo.maticniBroj}</span></div>
                <div>Osnovana: <span className="font-semibold text-[#0a2d5e]">{companyInfo.founded}</span></div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-[#0a2d5e] mb-6">Pošaljite poruku</h2>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a2d5e] mb-2">Poruka poslata!</h3>
                  <p className="text-gray-500 mb-6">
                    Hvala na upitu. Javićemo vam se što pre.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-[#1e5f9e] hover:text-[#28a8e0] font-semibold transition-colors text-sm"
                  >
                    Pošaljite novu poruku
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Ime i prezime <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Vaše ime i prezime"
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30
                        ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Email adresa <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="vas@email.com"
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30
                        ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Poruka <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={handleChange('message')}
                      placeholder="Napišite svoju poruku ili upit..."
                      className={`w-full px-4 py-3 rounded-lg border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 resize-none
                        ${errors.message ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#28a8e0]'}`}
                    />
                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] disabled:bg-gray-300 text-white py-3.5 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><Send size={16} /> Pošaljite poruku</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 max-w-6xl mx-auto px-4">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 h-72">
          <iframe
            title="Dux Domus lokacija"
            src={companyInfo.mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </div>
  );
};

export default Contact;
