import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAdmin } from '../contexts/AdminContext';
import { Save, Upload, X, CheckCircle, Plus, Trash2 } from 'lucide-react';

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-5">
    <div className="bg-[#f8fbff] border-b border-gray-200 px-5 py-3">
      <h3 className="font-bold text-[#0a2d5e] text-sm">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, children, hint }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    {hint && <p className="text-xs text-gray-400 mb-1.5">{hint}</p>}
    {children}
  </div>
);

const Input = ({ value, onChange, placeholder, className = '' }) => (
  <input
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className={`w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] transition-colors ${className}`}
  />
);

const Textarea = ({ value, onChange, rows = 3, placeholder }) => (
  <textarea
    rows={rows}
    value={value}
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0] resize-y transition-colors"
  />
);

const AdminContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('company');
  const { authHeaders, API } = useAdmin();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const fileInputRef = useRef();
  const [uploadTarget, setUploadTarget] = useState(null);

  useEffect(() => { fetchContent(); }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get(`${API}/content`);
      setContent(res.data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/content`, content, { headers: authHeaders() });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } catch (e) { alert('Greška pri čuvanju'); }
    finally { setSaving(false); }
  };

  const handleImageUpload = async (file, callback) => {
    if (!file) return;
    const fd = new FormData();
    fd.append('file', file);
    try {
      const res = await axios.post(`${API}/upload`, fd, {
        headers: { ...authHeaders(), 'Content-Type': 'multipart/form-data' }
      });
      callback(`${BACKEND_URL}${res.data.url}`);
    } catch { alert('Greška pri uploadu slike'); }
  };

  const ImageUploadField = ({ label, value, onChange }) => {
    const localRef = useRef();
    return (
      <Field label={label}>
        {value && <img src={value} alt="" className="w-full h-36 object-cover rounded-lg border border-gray-200 mb-2" />}
        <div className="flex gap-2">
          <Input value={value} onChange={onChange} placeholder="https://..." />
          <button
            onClick={() => localRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#e8f4fd] hover:bg-[#d0e8f7] text-[#1e5f9e] text-sm font-semibold rounded-lg transition-colors flex-shrink-0"
          >
            <Upload size={14} /> Upload
          </button>
          <input ref={localRef} type="file" accept="image/*" className="hidden"
            onChange={e => handleImageUpload(e.target.files[0], onChange)} />
        </div>
      </Field>
    );
  };

  const set = (path, value) => {
    setContent(prev => {
      const next = { ...prev };
      const keys = path.split('.');
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj[keys[i]] = { ...obj[keys[i]] };
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const tabs = [
    { id: 'company', label: 'Kompanija' },
    { id: 'hero', label: 'Hero sekcija' },
    { id: 'homepage', label: 'Početna' },
    { id: 'pricing', label: 'Cene' },
    { id: 'services', label: 'Usluge' },
    { id: 'faq', label: 'FAQ' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-[#28a8e0]/30 border-t-[#28a8e0] rounded-full animate-spin" />
    </div>
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2d5e]">Sadržaj sajta</h1>
          <p className="text-gray-400 text-sm mt-0.5">Uredite sve tekstualne i vizuelne sadržaje</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] disabled:bg-gray-300 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
        >
          {saveSuccess ? <><CheckCircle size={15} /> Sačuvano!</> :
            saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> :
              <><Save size={15} /> Sačuvaj sve</>
          }
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 mb-5 overflow-x-auto">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex-shrink-0
              ${activeTab === t.id ? 'bg-[#1e5f9e] text-white' : 'text-gray-500 hover:text-[#0a2d5e] hover:bg-gray-100'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── COMPANY ──────────────────────────────────── */}
      {activeTab === 'company' && content.company_info && (
        <div>
          <Section title="Osnovne informacije">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Vlasnik"><Input value={content.company_info.owner} onChange={v => set('company_info.owner', v)} /></Field>
              <Field label="Datum osnivanja"><Input value={content.company_info.founded} onChange={v => set('company_info.founded', v)} /></Field>
              <Field label="PIB"><Input value={content.company_info.pib} onChange={v => set('company_info.pib', v)} /></Field>
              <Field label="Matični broj"><Input value={content.company_info.maticniBroj} onChange={v => set('company_info.maticniBroj', v)} /></Field>
            </div>
            <Field label="Adresa"><Input value={content.company_info.address} onChange={v => set('company_info.address', v)} /></Field>
            <Field label="Email"><Input value={content.company_info.email} onChange={v => set('company_info.email', v)} /></Field>
          </Section>
          <Section title="Telefoni">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Slobodan"><Input value={content.company_info.phones?.slobodan} onChange={v => set('company_info.phones.slobodan', v)} /></Field>
              <Field label="Aleksa"><Input value={content.company_info.phones?.aleksa} onChange={v => set('company_info.phones.aleksa', v)} /></Field>
              <Field label="Kancelarija"><Input value={content.company_info.phones?.kancelarija} onChange={v => set('company_info.phones.kancelarija', v)} /></Field>
              <Field label="Napomena (radno vreme)"><Input value={content.company_info.phones?.kancelarijaNote} onChange={v => set('company_info.phones.kancelarijaNote', v)} /></Field>
            </div>
          </Section>
          <Section title="Google Maps Embed URL">
            <Field label="Embed URL" hint="Kopirajte embed URL sa Google Maps">
              <Input value={content.company_info.mapEmbedUrl} onChange={v => set('company_info.mapEmbedUrl', v)} />
            </Field>
          </Section>
        </div>
      )}

      {/* ── HERO ─────────────────────────────────────── */}
      {activeTab === 'hero' && (
        <div>
          {(content.hero_slides || []).map((slide, i) => (
            <Section key={i} title={`Slajd ${i + 1}`}>
              <ImageUploadField
                label="Slika pozadine"
                value={slide.image}
                onChange={v => {
                  const slides = [...content.hero_slides];
                  slides[i] = { ...slides[i], image: v };
                  set('hero_slides', slides);
                }}
              />
              <Field label="Naslov">
                <Input
                  value={slide.title}
                  onChange={v => {
                    const slides = [...content.hero_slides];
                    slides[i] = { ...slides[i], title: v };
                    set('hero_slides', slides);
                  }}
                />
              </Field>
              <Field label="Podnaslov">
                <Input
                  value={slide.subtitle}
                  onChange={v => {
                    const slides = [...content.hero_slides];
                    slides[i] = { ...slides[i], subtitle: v };
                    set('hero_slides', slides);
                  }}
                />
              </Field>
            </Section>
          ))}
        </div>
      )}

      {/* ── HOMEPAGE ─────────────────────────────────── */}
      {activeTab === 'homepage' && (
        <div>
          <Section title="O nama tekst">
            <Field label="Opis agencije">
              <Textarea rows={4} value={content.about_text} onChange={v => set('about_text', v)} />
            </Field>
            <ImageUploadField label="Slika O nama" value={content.about_image} onChange={v => set('about_image', v)} />
          </Section>
          <Section title="Misija i vizija">
            <Field label="Misija">
              <Textarea rows={4} value={content.mission} onChange={v => set('mission', v)} />
            </Field>
            <Field label="Vizija">
              <Textarea rows={2} value={content.vision} onChange={v => set('vision', v)} />
            </Field>
          </Section>
          <Section title="Statistike">
            <div className="grid grid-cols-2 gap-4">
              {(content.stats || []).map((stat, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3 space-y-2">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-500">Vrednost</label>
                      <input
                        type="number"
                        value={stat.value}
                        onChange={e => { const s = [...content.stats]; s[i] = { ...s[i], value: Number(e.target.value) }; set('stats', s); }}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 mt-0.5"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-gray-500">Sufiks</label>
                      <input
                        value={stat.suffix}
                        onChange={e => { const s = [...content.stats]; s[i] = { ...s[i], suffix: e.target.value }; set('stats', s); }}
                        className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 mt-0.5"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">Oznaka</label>
                    <input
                      value={stat.label}
                      onChange={e => { const s = [...content.stats]; s[i] = { ...s[i], label: e.target.value }; set('stats', s); }}
                      className="w-full px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 mt-0.5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Section>
          <Section title="Obaveze upravnika">
            {(content.manager_duties || []).map((duty, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <Input value={duty} onChange={v => { const d = [...content.manager_duties]; d[i] = v; set('manager_duties', d); }} />
                <button onClick={() => { const d = content.manager_duties.filter((_, idx) => idx !== i); set('manager_duties', d); }}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-lg flex-shrink-0"><Trash2 size={15} /></button>
              </div>
            ))}
            <button onClick={() => set('manager_duties', [...(content.manager_duties || []), ''])}
              className="flex items-center gap-1.5 text-sm text-[#1e5f9e] hover:text-[#28a8e0] font-semibold mt-1">
              <Plus size={14} /> Dodaj obavezu
            </button>
          </Section>
        </div>
      )}

      {/* ── PRICING ──────────────────────────────────── */}
      {activeTab === 'pricing' && content.pricing && (
        <Section title="Cenovnik">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Minimalna cena">
              <input
                type="number"
                value={content.pricing.minPrice}
                onChange={e => set('pricing.minPrice', Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/30 focus:border-[#28a8e0]"
              />
            </Field>
            <Field label="Valuta"><Input value={content.pricing.currency} onChange={v => set('pricing.currency', v)} /></Field>
            <Field label="Jedinica merenja"><Input value={content.pricing.unit} onChange={v => set('pricing.unit', v)} /></Field>
          </div>
          <Field label="Napomena o ceni">
            <Textarea rows={2} value={content.pricing.note} onChange={v => set('pricing.note', v)} />
          </Field>
        </Section>
      )}

      {/* ── SERVICES ─────────────────────────────────── */}
      {activeTab === 'services' && (
        <div>
          {(content.services || []).map((svc, i) => (
            <Section key={i} title={`Usluga ${i + 1}: ${svc.title}`}>
              <Field label="Naslov usluge">
                <Input value={svc.title} onChange={v => { const s = [...content.services]; s[i] = { ...s[i], title: v }; set('services', s); }} />
              </Field>
              <Field label="Opis">
                <Textarea rows={2} value={svc.description} onChange={v => { const s = [...content.services]; s[i] = { ...s[i], description: v }; set('services', s); }} />
              </Field>
              <Field label="Detalji (svaki u novom redu)">
                <Textarea
                  rows={4}
                  value={(svc.details || []).join('\n')}
                  onChange={v => { const s = [...content.services]; s[i] = { ...s[i], details: v.split('\n') }; set('services', s); }}
                />
              </Field>
            </Section>
          ))}
        </div>
      )}

      {/* ── FAQ ──────────────────────────────────────── */}
      {activeTab === 'faq' && (
        <div>
          {(content.faqs || []).map((faq, i) => (
            <Section key={i} title={`Pitanje ${i + 1}`}>
              <div className="flex gap-2 items-start">
                <div className="flex-1 space-y-3">
                  <Field label="Pitanje">
                    <Input value={faq.question} onChange={v => { const f = [...content.faqs]; f[i] = { ...f[i], question: v }; set('faqs', f); }} />
                  </Field>
                  <Field label="Odgovor">
                    <Textarea rows={3} value={faq.answer} onChange={v => { const f = [...content.faqs]; f[i] = { ...f[i], answer: v }; set('faqs', f); }} />
                  </Field>
                </div>
                <button onClick={() => set('faqs', content.faqs.filter((_, idx) => idx !== i))}
                  className="p-2 text-red-400 hover:bg-red-50 rounded-lg mt-6 flex-shrink-0"><Trash2 size={15} /></button>
              </div>
            </Section>
          ))}
          <button
            onClick={() => set('faqs', [...(content.faqs || []), { id: Date.now(), question: '', answer: '' }])}
            className="flex items-center gap-2 bg-white border border-dashed border-[#28a8e0] text-[#1e5f9e] hover:bg-[#f0f8ff] w-full py-3 rounded-xl text-sm font-semibold justify-center transition-colors"
          >
            <Plus size={15} /> Dodaj pitanje
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminContent;
