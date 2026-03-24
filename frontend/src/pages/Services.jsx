import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Scale, Building2, CreditCard, Phone, BarChart3,
  CheckCircle2, ChevronDown, ChevronUp, ArrowRight
} from 'lucide-react';
import { services, mission, vision, companyInfo } from '../data/mock';

const iconMap = { FileText, Scale, Building2, CreditCard, Phone, BarChart3 };

const ServiceCard = ({ service, index }) => {
  const [open, setOpen] = useState(false);
  const Icon = iconMap[service.icon] || Building2;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#e8f4fd] flex items-center justify-center group-hover:bg-[#1e5f9e] transition-colors duration-300">
            <Icon size={22} className="text-[#1e5f9e] group-hover:text-white transition-colors duration-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#28a8e0] uppercase tracking-widest mb-1">Usluga {index + 1}</div>
            <h3 className="text-lg font-bold text-[#0a2d5e] leading-tight">{service.title}</h3>
          </div>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{service.description}</p>

        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-[#1e5f9e] hover:text-[#28a8e0] font-semibold text-sm transition-colors"
        >
          {open ? <><ChevronUp size={15} /> Prikaži manje</> : <><ChevronDown size={15} /> Prikaži detalje</>}
        </button>

        <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-80 mt-4' : 'max-h-0'}`}>
          <div className="pt-4 border-t border-gray-100">
            <ul className="space-y-2">
              {service.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <CheckCircle2 size={13} className="text-[#28a8e0] mt-0.5 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="bg-gradient-to-r from-[#0a2d5e] to-[#1e5f9e] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <span className="text-[#7dd3f8] font-semibold text-xs uppercase tracking-widest">Šta nudimo</span>
          <h1 className="text-4xl font-bold mt-2 mb-4">Naše usluge</h1>
          <p className="text-[#a8d8f0] max-w-2xl mx-auto text-base">
            Dux domus je niška agencija koja se bavi problematikom upravljanja stambenim zgradama na profesionalnom nivou.
          </p>
        </div>
      </div>

      {/* Services grid */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <ServiceCard key={svc.id} service={svc} index={i} />
          ))}
        </div>
      </section>

      {/* Special highlight */}
      <section className="bg-[#e8f4fd] py-14 mx-4 rounded-2xl max-w-6xl md:mx-auto mb-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Building2 size={40} className="text-[#1e5f9e] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#0a2d5e] mb-4">
            Naplata zajedničkih troškova u celoj Srbiji
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Dux domus agencija obavlja uslugu naplate zajedničkih troškova Skupštinama zgrada u svim
            gradovima Republike Srbije. Preko niške JKP "Objedinjena naplata" i preko tekućeg računa
            stambene zajednice.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-md border-l-4 border-[#28a8e0]">
            <h2 className="text-2xl font-bold text-[#0a2d5e] mb-4">Misija</h2>
            <blockquote className="text-gray-600 italic leading-relaxed text-sm">
              "{mission}"
            </blockquote>
          </div>
          <div className="bg-[#0a2d5e] rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Vizija</h2>
            <blockquote className="text-[#a8d8f0] italic leading-relaxed text-lg font-medium">
              "{vision}"
            </blockquote>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-12 bg-[#f4f9ff] my-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0a2d5e]">Kako radimo</h2>
          </div>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>
              Zgrade o kojima mi brinemo obilazimo redovno <strong className="text-[#1e5f9e]">dva puta nedeljno</strong> (u zavisnosti od veličine objekta i dogovora i češće), i na licu mesta rešavamo sve uočene probleme — zamena sijalica, popravka interfona, brava, ulaznih vrata, zamene polomljenih prekidača i svih uočljivih sitnih problema.
            </p>
            <p>
              U našim zgradama sazivamo redovne skupštine stanara na kojima se dogovaramo šta će biti rađeno u narednom periodu. O kompletnom našem radu redovno izveštavamo stanare putem obaveštenja na oglasnim tablama.
            </p>
            <p>
              Za zgrade o kojima mi brinemo vodimo i <strong className="text-[#1e5f9e]">knjigovodstvo</strong> tako da redovno podnosimo finansijske izveštaje stanarima putem blagajničkog izveštaja i izvoda iz banke.
            </p>
            <p>
              U našim zgradama stanari rešavaju sve probleme, u najkraćem mogućem roku, pozivom na{' '}
              <strong className="text-[#1e5f9e]">jedan telefonski broj koji je non-stop aktivan</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0a2d5e]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Zainteresovani ste za naše usluge?</h2>
          <p className="text-[#a8d8f0] mb-6">Kontaktirajte nas i dogovorite besplatne konsultacije</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 bg-[#28a8e0] hover:bg-[#1e8fc0] text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              Pošaljite upit <ArrowRight size={15} />
            </Link>
            <a
              href="tel:+381658430028"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3 rounded-lg font-semibold transition-all"
            >
              <Phone size={15} /> {companyInfo.phones.aleksa}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
