import React, { useState, useMemo } from 'react';
import { residentialBuildings } from '../data/mock';
import { Building2, Search, MapPin } from 'lucide-react';

const ResidentialBuildings = () => {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return residentialBuildings;
    return residentialBuildings.filter((addr) => addr.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">
            Pod našim upravljanjem
          </span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Stambene jedinice</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Više od <strong className="text-white">350 stambenih jedinica</strong> u Nišu koje
            profesionalno održavamo i kojima upravljamo.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex flex-wrap justify-center gap-10">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0a2d5e]">350+</div>
              <div className="text-sm text-gray-500 mt-0.5">Stambenih jedinica</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0a2d5e]">{residentialBuildings.length}</div>
              <div className="text-sm text-gray-500 mt-0.5">Adresa u bazi</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#0a2d5e]">13+</div>
              <div className="text-sm text-gray-500 mt-0.5">Godina iskustva</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search + list */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-10">
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Pretražite adresu..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#28a8e0] focus:outline-none focus:ring-2 focus:ring-[#28a8e0]/20 text-sm transition-colors shadow-sm"
            />
          </div>
          {search && (
            <p className="text-xs text-gray-400 mt-2 text-center">
              Pronađeno: <strong>{filtered.length}</strong> adresa
            </p>
          )}
        </div>

        {/* Address grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5">
            {filtered.map((address, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white rounded-lg px-4 py-3 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#c5e0f5] hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <MapPin
                  size={14}
                  className="text-[#28a8e0] flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <span className="text-gray-700 text-sm font-medium leading-snug">{address}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <Building2 size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nema rezultata za "{search}"</p>
          </div>
        )}

        {/* Bottom note */}
        <div className="mt-12 text-center bg-[#f4f9ff] rounded-2xl p-8 border border-[#daeaf7]">
          <Building2 size={36} className="text-[#28a8e0] mx-auto mb-3" />
          <h3 className="font-bold text-[#0a2d5e] text-lg mb-2">
            Vaša adresa nije na listi?
          </h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-4">
            Kontaktirajte nas i saznajte kako možemo preuzeti upravljanje Vaše stambene zajednice.
          </p>
          <a
            href="tel:+381658430028"
            className="inline-flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-6 py-3 rounded-lg font-semibold transition-all text-sm hover:shadow-md"
          >
            <Building2 size={15} />
            Kontaktirajte nas
          </a>
        </div>
      </section>
    </div>
  );
};

export default ResidentialBuildings;
