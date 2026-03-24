import React from 'react';
import { documents } from '../data/mock';
import {
  ScrollText, FileText, ClipboardList, ClipboardCheck, BarChart3, Calendar, Download, ExternalLink
} from 'lucide-react';

const iconMap = {
  ScrollText, FileText, ClipboardList, ClipboardCheck, BarChart3, Calendar
};

const typeColors = {
  Zakon: 'bg-blue-100 text-blue-700',
  Pravilnik: 'bg-purple-100 text-purple-700',
  Ugovor: 'bg-green-100 text-green-700',
  Obrazac: 'bg-orange-100 text-orange-700',
  Plan: 'bg-teal-100 text-teal-700'
};

const Documents = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Pravna osnova</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Dokumenta</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Sve relevantne zakone, pravilnike, obrasce i ugovore potrebne za funkcionisanje stambene zajednice.
          </p>
        </div>
      </div>

      {/* Documents grid */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => {
            const Icon = iconMap[doc.icon] || FileText;
            const typeColor = typeColors[doc.type] || 'bg-gray-100 text-gray-700';

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group border border-gray-100 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#e8f4fd] flex items-center justify-center group-hover:bg-[#1e5f9e] transition-colors duration-300">
                    <Icon size={22} className="text-[#1e5f9e] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${typeColor}`}>
                    {doc.type}
                  </span>
                </div>
                <h3 className="font-bold text-[#0a2d5e] mb-2 text-base leading-snug">{doc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{doc.description}</p>
                <button
                  className="flex items-center gap-2 text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors group/btn"
                  onClick={() => alert('Za pristup dokumentima, molimo kontaktirajte kancelariju.')}
                >
                  <Download size={14} className="group-hover/btn:-translate-y-0.5 transition-transform" />
                  Preuzmi dokument
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Info note */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-[#e8f4fd] rounded-2xl p-8 border border-[#c5e0f5]">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1e5f9e] flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-[#0a2d5e] mb-2">Potrebna vam je pomoć sa dokumentacijom?</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Naš tim je tu da vam pomogne sa svim administrativnim i pravnim aspektima upravljanja stambenom zajednicom.
                Kontaktirajte nas za sve informacije o potrebnoj dokumentaciji i procedurama registracije.
              </p>
              <a
                href="tel:+381658430028"
                className="inline-flex items-center gap-2 mt-4 text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors"
              >
                <ExternalLink size={14} />
                Pozovite kancelariju
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Documents;
