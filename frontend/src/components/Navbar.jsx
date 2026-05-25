import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { navLinks, companyInfo } from '../data/mock';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      {/* Top info bar */}
      <div className="bg-[#0a2d5e] text-white py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center text-sm gap-2">
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-[#28a8e0] flex-shrink-0" />
            <span className="text-gray-300 text-xs">{companyInfo.address}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone size={13} className="text-[#28a8e0]" />
              <a href="tel:+381184558625" className="hover:text-[#28a8e0] transition-colors text-xs font-medium">
                {companyInfo.phones.kancelarija}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`sticky top-0 z-50 transition-shadow duration-300 bg-white ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src="/img/logo.png"
                alt="Dux Domus"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200
                    ${isActive(link.href)
                      ? 'text-[#28a8e0] bg-[#e8f4fd]'
                      : 'text-[#1a3a5c] hover:text-[#28a8e0] hover:bg-[#f0f8ff]'
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <div className="h-0.5 bg-[#28a8e0] rounded-full mt-0.5" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg text-[#0a2d5e] hover:bg-[#e8f4fd] transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100 border-t border-gray-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="bg-white px-4 py-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors
                  ${isActive(link.href)
                    ? 'text-[#28a8e0] bg-[#e8f4fd]'
                    : 'text-[#1a3a5c] hover:text-[#28a8e0] hover:bg-[#f0f8ff]'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
