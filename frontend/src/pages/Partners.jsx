import React from 'react';
import { partners } from '../data/mock';
import {
  Wrench, Settings, ArrowUpDown, CreditCard, Home, Cpu,
  CheckCircle2, Clock, ThumbsUp
} from 'lucide-react';

const iconMap = { Wrench, Settings, ArrowUpDown, CreditCard, Home, Cpu };

const categoryColors = {
  'Tehničko održavanje': 'bg-blue-50 text-blue-700 border-blue-100',
  'Lift servisi': 'bg-violet-50 text-violet-700 border-violet-100',
  'Finansije': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Stambene usluge': 'bg-amber-50 text-amber-700 border-amber-100'
};

const Partners = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Naša mreža</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Saradnici</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Sarađujemo sa vodećim kompanijama u oblasti tehničkog održavanja, lift servisa i stambenih usluga.
          </p>
        </div>
      </div>

      {/* Placeholder notice */}
      <div className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-6 py-4 flex items-center gap-3">
          <Clock size={18} className="text-amber-600 flex-shrink-0" />
          <p className="text-amber-800 text-sm">
            <strong>Napomena:</strong> Logotipi i vizualni identiteti saradnika biće prikazani po dobijanju saglasnosti.
            U međuvremenu prikazujemo privremene oznake.
          </p>
        </div>
      </div>

      {/* Partners grid */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {partners.map((partner) => {
            const Icon = iconMap[partner.icon] || Wrench;
            const catClass = categoryColors[partner.category] || 'bg-gray-50 text-gray-700 border-gray-100';

            return (
              <div
                key={partner.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:-translate-y-1"
              >
                {/* Placeholder visual */}
                <div
                  className="h-40 flex flex-col items-center justify-center gap-3"
                  style={{ backgroundColor: partner.color + '15', borderBottom: `3px solid ${partner.color}30` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: partner.color }}
                  >
                    <Icon size={30} className="text-white" />
                  </div>
                  <div
                    className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ color: partner.color, backgroundColor: partner.color + '20' }}
                  >
                    Logo uskoro
                  </div>
                </div>

                <div className="p-5">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border mb-2 ${catClass}`}>
                    {partner.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0a2d5e]">{partner.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-[#f4f9ff] py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0a2d5e]">Prednosti naše mreže saradnika</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: ThumbsUp, title: 'Povoljnije cene', desc: 'Zahvaljujući obimu posla koji donosimo saradnicima, ostvarujemo posebne popuste koji se prenose na stanare.' },
              { icon: CheckCircle2, title: 'Provereni kvalitet', desc: 'Svaki saradnik je pažljivo odabran na osnovu kvaliteta rada, pouzdanosti i profesionalnog pristupa.' },
              { icon: Clock, title: 'Brzi odziv', desc: 'Naši saradnici su obavezni da reaguju u najkraćem mogućem roku, pogotovo u hitnim situacijama.' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-[#1e5f9e]" />
                </div>
                <h3 className="font-bold text-[#0a2d5e] mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
