import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAdmin } from '../contexts/AdminContext';
import { FileText, Settings, Building2, ArrowRight, Eye } from 'lucide-react';

const AdminDashboard = () => {
  const [blogCount, setBlogCount] = useState('—');
  const { authHeaders, API } = useAdmin();

  useEffect(() => {
    axios.get(`${API}/blog?published_only=false`, { headers: authHeaders() })
      .then(r => setBlogCount(r.data.length))
      .catch(() => {});
  }, []);

  const cards = [
    {
      to: '/admin/blog',
      icon: FileText,
      label: 'Blog članci',
      value: blogCount,
      desc: 'Dodajte, uredite ili obrišite blog postove',
      color: '#1e5f9e'
    },
    {
      to: '/admin/content',
      icon: Settings,
      label: 'Sadržaj sajta',
      value: '6',
      desc: 'Uredite tekst, slike, cene i kontakt podatke',
      color: '#0891b2'
    },
    {
      to: '/',
      icon: Eye,
      label: 'Pogledaj sajt',
      value: '↗',
      desc: 'Pregledajte javnu verziju sajta',
      color: '#059669',
      external: true
    },
  ];

  return (
    <div>
      {/* Welcome */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e5f9e] to-[#28a8e0] flex items-center justify-center">
          <Building2 size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#0a2d5e]">Dobrodošli, Admin</h1>
          <p className="text-gray-400 text-sm">Dux Domus CMS upravljačka tabla</p>
        </div>
      </div>

      {/* Quick action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            target={card.external ? '_blank' : undefined}
            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.color + '18' }}>
                <card.icon size={20} style={{ color: card.color }} />
              </div>
              <div className="text-3xl font-bold" style={{ color: card.color }}>{card.value}</div>
            </div>
            <h3 className="font-bold text-[#0a2d5e] mb-1">{card.label}</h3>
            <p className="text-gray-400 text-xs leading-relaxed mb-3">{card.desc}</p>
            <div className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all" style={{ color: card.color }}>
              Otvori <ArrowRight size={12} />
            </div>
          </Link>
        ))}
      </div>

      {/* Admin credentials info */}
      <div className="bg-[#f4f9ff] border border-[#daeaf7] rounded-xl p-5">
        <h3 className="font-bold text-[#0a2d5e] text-sm mb-2">Admin pristupni podaci</h3>
        <div className="text-xs text-gray-500 space-y-1 font-mono">
          <div>Email: <span className="text-[#0a2d5e] font-semibold">admin@duxdomus.rs</span></div>
          <div>Lozinka: <span className="text-[#0a2d5e] font-semibold">DuxAdmin2024!</span></div>
        </div>
        <p className="text-xs text-gray-400 mt-2">Promenite ove podatke u backend .env fajlu kada budete bili spremni.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
