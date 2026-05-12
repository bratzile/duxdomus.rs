import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, Building2 } from 'lucide-react';
import { companyInfo, navLinks } from '../data/mock';

const Footer = () => {
  return (
    <footer className="bg-[#0a2d5e] text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1e5f9e] to-[#28a8e0] flex items-center justify-center flex-shrink-0">
                <Building2 size={22} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-lg tracking-wide">DUX DOMUS</div>
                <div className="text-[#28a8e0] text-xs tracking-widest uppercase">Niš</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Profesionalni upravnik stambenih zgrada u Nišu. Osnovani 2012. godine sa više od 350 stambenih jedinica.
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>PIB: {companyInfo.pib}</div>
              <div>Matični broj: {companyInfo.maticniBroj}</div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-bold text-[#28a8e0] text-xs uppercase tracking-widest mb-5">Navigacija</h3>
            <ul className="space-y-2.5">
              {[...navLinks, { label: 'Postanite saradnik', href: '/saradnja' }].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-[#28a8e0] transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#28a8e0] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2">
            <h3 className="font-bold text-[#28a8e0] text-xs uppercase tracking-widest mb-5">Kontakt informacije</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#28a8e0] mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">{companyInfo.address}</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={16} className="text-[#28a8e0] mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  <div className="text-gray-400">
                    Slobodan:{' '}
                    <a href="tel:+381642350527" className="text-gray-200 hover:text-[#28a8e0] transition-colors">
                      {companyInfo.phones.slobodan}
                    </a>
                  </div>
                  <div className="text-gray-400">
                    Aleksa:{' '}
                    <a href="tel:+381658430028" className="text-gray-200 hover:text-[#28a8e0] transition-colors">
                      {companyInfo.phones.aleksa}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-[#28a8e0] flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  Kancelarija:{' '}
                  <a href="tel:+38118455862" className="text-gray-200 hover:text-[#28a8e0] transition-colors">
                    {companyInfo.phones.kancelarija}
                  </a>{' '}
                  {companyInfo.phones.kancelarijaNote}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-[#28a8e0] flex-shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="text-gray-400 hover:text-[#28a8e0] transition-colors text-sm"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1a3d6e]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© {new Date().getFullYear()} Dux Domus Niš. Sva prava zadržana.</span>
          <span>Vlasnik: {companyInfo.owner}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
