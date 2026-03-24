import React from 'react';
import { partners } from '../data/mock';

const Partners = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Naša mreža</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Saradnici</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Sarađujemo sa vodećim kompanijama u oblasti tehničkog održavanja, lift servisa i stambenih usluga u Nišu.
          </p>
        </div>
      </div>

      {/* Partners grid */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gray-600 max-w-2xl mx-auto">
            Zahvaljujući saradnji sa više ozbiljnih privatnih firmi koje održavaju veliki broj naših zgrada,
            u stanju smo da izdejstvujemo najpovoljnije cene i popuste za naše stanare.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group border border-gray-100 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                    e.target.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'text-4xl font-bold text-[#1e5f9e]/30';
                    placeholder.textContent = partner.name.charAt(0);
                    e.target.parentNode.appendChild(placeholder);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2d5e]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-5">
                <div className="inline-block bg-[#e8f4fd] text-[#1e5f9e] text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {partner.category}
                </div>
                <h3 className="text-lg font-bold text-[#0a2d5e]">{partner.name}</h3>
              </div>
            </div>
          ))}
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
              {
                title: 'Povoljnije cene',
                desc: 'Zahvaljujući volumenu posla koji donosimo saradnicima, ostvarujemo posebne popuste koji se prenose na stanare.'
              },
              {
                title: 'Provereni kvalitet',
                desc: 'Svaki saradnik je pažljivo odabran na osnovu kvaliteta rada, pouzdanosti i profesionalnog pristupa.'
              },
              {
                title: 'Brzi odziv',
                desc: 'Naši saradnici su obavezni da reaguju u najkraćem mogućem roku, pogotovo u hitnim situacijama.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center mb-4">
                  <span className="text-[#1e5f9e] font-bold text-lg">{i + 1}</span>
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
