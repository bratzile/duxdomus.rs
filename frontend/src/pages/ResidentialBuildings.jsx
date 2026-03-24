import React from 'react';
import { residentialBuildings } from '../data/mock';
import { Building2, Home, Layers } from 'lucide-react';

const ResidentialBuildings = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Pod našim upravljanjem</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Stambene zgrade</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto">
            Pregled stambenih zgrada kojima profesionalno upravljamo u Nišu.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { icon: Building2, label: 'Zgrada', value: residentialBuildings.length + '+' },
              { icon: Home, label: 'Stambenih jedinica', value: '350+' },
              { icon: Layers, label: 'Prosečan broj spratova', value: '5-7' }
            ].map(({ icon: Icon, label, value }, i) => (
              <div key={i} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon size={18} className="text-[#28a8e0]" />
                  <span className="text-2xl font-bold text-[#0a2d5e]">{value}</span>
                </div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buildings list */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Svaku zgradu obilazimo redovno dva puta nedeljno. Stanari mogu u svakom trenutku da nas
            kontaktiraju putem telefona koji je non-stop aktivan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {residentialBuildings.map((building) => (
            <div
              key={building.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-5 border border-gray-100 group hover:-translate-y-0.5 hover:border-[#c5e0f5]"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#e8f4fd] flex items-center justify-center group-hover:bg-[#1e5f9e] transition-colors">
                  <Building2 size={18} className="text-[#1e5f9e] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="font-semibold text-[#0a2d5e] text-sm leading-snug mb-2">{building.address}</p>
                  <div className="flex gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Layers size={11} />
                      {building.floors} spratova
                    </span>
                    <span className="flex items-center gap-1">
                      <Home size={11} />
                      {building.units} jedinica
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center bg-[#f4f9ff] rounded-2xl p-8">
          <Building2 size={36} className="text-[#28a8e0] mx-auto mb-3" />
          <h3 className="font-bold text-[#0a2d5e] text-lg mb-2">Vaša zgrada nije na listi?</h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-4">
            Kontaktirajte nas i saznajte kako možemo preuzeti upravljanje Vaše stambene zajednice.
          </p>
          <a
            href="tel:+381658430028"
            className="inline-flex items-center gap-2 bg-[#1e5f9e] hover:bg-[#0a2d5e] text-white px-6 py-3 rounded-lg font-semibold transition-all text-sm"
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
