import React from 'react';
import { CheckCircle2, Clock, ThumbsUp } from 'lucide-react';

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

      {/* Prednosti naše mreže saradnika */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-[#28a8e0] font-semibold text-xs uppercase tracking-widest">Zašto mi</span>
            <h2 className="text-3xl font-bold text-[#0a2d5e] mt-2">Prednosti naše mreže saradnika</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: ThumbsUp,
                title: 'Povoljnije cene',
                desc: 'Zahvaljujući obimu posla koji donosimo saradnicima, ostvarujemo posebne popuste koji se prenose na stanare.'
              },
              {
                icon: CheckCircle2,
                title: 'Provereni kvalitet',
                desc: 'Svaki saradnik je pažljivo odabran na osnovu kvaliteta rada, pouzdanosti i profesionalnog pristupa.'
              },
              {
                icon: Clock,
                title: 'Brzi odziv',
                desc: 'Naši saradnici su obavezni da reaguju u najkraćem mogućem roku, pogotovo u hitnim situacijama.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl bg-[#e8f4fd] flex items-center justify-center mb-5 group-hover:bg-[#1e5f9e] transition-colors">
                  <item.icon size={22} className="text-[#1e5f9e] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-[#0a2d5e] text-lg mb-3">{item.title}</h3>
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
