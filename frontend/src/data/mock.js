// Mock data for Dux Domus website

export const companyInfo = {
  name: 'Dux Domus',
  tagline: 'Profesionalni upravnik stambenih zgrada u Nišu',
  subtitle: '350 stambenih jedinica',
  founded: '24.02.2012.',
  owner: 'Slobodan Jakovljević',
  pib: '107449273',
  maticniBroj: '62750367',
  address: 'Gornjomatejevačka 98 A, lokal B, 18000 Niš',
  phones: {
    slobodan: '064/23-505-27',
    aleksa: '065/8430028',
    kancelarija: '018/4558-625',
    kancelarijaNote: '(9-15h)'
  },
  email: 'duxdomus@gmail.com',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2905.0!2d21.9184554!3d43.3381998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4755b164c484bfdb%3A0x3d9e3db5b39a7c79!2sGornjomatejevacka%2098a%2C%20Nis!5e0!3m2!1sen!2srs!4v1680000000000!5m2!1sen!2srs'
};

export const navLinks = [
  { label: 'Početna', href: '/' },
  { label: 'Usluge', href: '/usluge' },
  { label: 'Saradnici', href: '/saradnici' },
  { label: 'Dokumenta', href: '/dokumenta' },
  { label: 'Stambene zgrade', href: '/stambene-zgrade' },
  { label: 'Kontakt', href: '/kontakt' }
];

export const heroSlides = [
  {
    id: 1,
    image: 'https://duxdomus.rs/uploads/slider/1.jpg',
    title: 'Profesionalni upravnik stambenih zgrada',
    subtitle: 'u Nišu - 350 stambenih jedinica',
    fallback: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=60'
  },
  {
    id: 2,
    image: 'https://duxdomus.rs/uploads/slider/2.jpg',
    title: 'Briga o Vašoj zgradi',
    subtitle: 'Pouzdano i profesionalno upravljanje',
    fallback: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=60'
  }
];

export const features = [
  {
    id: 1,
    image: 'https://duxdomus.rs/uploads/sredina/tb_1.jpg',
    fallback: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=60',
    title: 'Briga o Vašoj zgradi',
    description: 'Redovni obilaski i rešavanje svih problema u zgradi'
  },
  {
    id: 2,
    image: 'https://duxdomus.rs/uploads/sredina/tb_2.jpg',
    fallback: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=60',
    title: 'Profesionalni upravnik zgrade',
    description: 'Zakonski usklađeno upravljanje stambenom zajednicom'
  },
  {
    id: 3,
    image: 'https://duxdomus.rs/uploads/sredina/tb_3.jpg',
    fallback: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=60',
    title: 'Višegodišnje iskustvo',
    description: 'Od 2012. godine pružamo vrhunske usluge upravljanja'
  }
];

export const stats = [
  { value: 350, label: 'Stambenih jedinica', suffix: '+' },
  { value: 13, label: 'Godina iskustva', suffix: '+' },
  { value: 9, label: 'Saradnika', suffix: '' },
  { value: 24, label: 'Sata dostupnosti', suffix: '/7' }
];

export const managerDuties = [
  'Rukovodi radom stambene zajednice',
  'Izvršava odluke Skupštine stambene zajednice',
  'Predlaže godišnji program održavanja zgrade',
  'Zaključuje Ugovore u ime zgrade i u svoje ime',
  'Izmiruje obaveze plaćanja u ime i za račun zgrade',
  'Saziva redovne skupštine stanara',
  'Redovno izveštava stanare putem obaveštenja na oglasnim tablama',
  'Vodi knjigovodstvo i podnosi finansijske izveštaje'
];

export const services = [
  {
    id: 1,
    icon: 'FileText',
    title: 'Administrativno-tehnički poslovi',
    description: 'Registracija stambene zgrade, pribavljanje matičnog broja i PIB-a, otvaranje tekućeg računa stambene zajednice.',
    details: [
      'Registracija stambene zgrade u okviru lokalne samouprave',
      'Registracija skupštine stambene zajednice',
      'Pribavljanje matičnog broja',
      'Pribavljanje PIB-a iz poreske uprave',
      'Otvaranje tekućeg računa stambene zajednice',
      'Zaključivanje ugovora o nalogu sa JKP "Objedinjena naplata"',
      'Vođenje knjiga i izrada završnih računa za stambenu zgradu'
    ]
  },
  {
    id: 2,
    icon: 'Scale',
    title: 'Zakonske obaveze',
    description: 'Zaključivanje svih potrebnih ugovora za tehničko održavanje, hitne intervencije i tekuće servisiranje.',
    details: [
      'Zaključivanje ugovora za redovno tehničko održavanje zgrade',
      'Zaključivanje ugovora za hitne intervencije',
      'Zaključivanje ugovora za redovno održavanje lifta',
      'Zaključivanje ugovora za redovno održavanje hidrouređaja',
      'Zaključivanje ugovora za održavanje higijene u zgradi'
    ]
  },
  {
    id: 3,
    icon: 'Building2',
    title: 'Organizacija poslova u zgradi',
    description: 'Profesionalna organizacija svih tekućih i investicionih radova u stambenoj zgradi.',
    details: [
      'Popisivanje i utvrđivanje broja članova domaćinstva',
      'Pribavljanje ponuda i organizacija investicionih radova',
      'Službena komunikacija sa javnim preduzećima i inspekcijskim organima',
      'Obezbeđivanje i ugradnja protiv-požarne zaštite',
      'Organizacija posla čišćenja snega ispred stambene zgrade'
    ]
  },
  {
    id: 4,
    icon: 'CreditCard',
    title: 'Naplata zajedničkih troškova',
    description: 'Vršimo naplatu zajedničkih troškova za stambene zgrade u svim gradovima Republike Srbije.',
    details: [
      'Naplata kroz JKP "Objedinjena naplata"',
      'Naplata preko tekućeg računa stambene zajednice',
      'Usluga dostupna za sve gradove u Srbiji',
      'Transparentno finansijsko izveštavanje',
      'Mesečni blagajnički izveštaji'
    ]
  },
  {
    id: 5,
    icon: 'Phone',
    title: 'Non-stop dostupnost',
    description: 'Stanari rešavaju sve probleme pozivom na jedan telefonski broj koji je non-stop aktivan.',
    details: [
      'Jedan broj telefona uvek dostupan',
      'Redovni obilasci zgrade dva puta nedeljno',
      'Brzo rešavanje: zamena sijalica, popravka interfona',
      'Servis brava i ulaznih vrata',
      'Rešavanje problema sa liftom'
    ]
  },
  {
    id: 6,
    icon: 'BarChart3',
    title: 'Finansijsko izveštavanje',
    description: 'Redovno podnošenje finansijskih izveštaja stanarima putem blagajničkog izveštaja i bankovnih izvoda.',
    details: [
      'Mesečni blagajnički izveštaji',
      'Izvodi iz banke sa finansijskim stanjem',
      'Pregled prihoda i rashoda zgrade',
      'Godišnji završni račun',
      'Transparentno upravljanje finansijama'
    ]
  }
];

export const partners = [
  { id: 1, name: 'Eko Stan Niš', image: 'https://duxdomus.rs/uploads/saradnici/tb_1.jpg', category: 'Tehničko održavanje' },
  { id: 2, name: 'Eko Stan Plus', image: 'https://duxdomus.rs/uploads/saradnici/tb_2.jpg', category: 'Tehničko održavanje' },
  { id: 3, name: 'FM Lift', image: 'https://duxdomus.rs/uploads/saradnici/tb_3.jpg', category: 'Lift servisi' },
  { id: 4, name: 'Elevator', image: 'https://duxdomus.rs/uploads/saradnici/tb_4.jpg', category: 'Lift servisi' },
  { id: 5, name: 'Elevator Plus', image: 'https://duxdomus.rs/uploads/saradnici/tb_5.jpg', category: 'Lift servisi' },
  { id: 6, name: 'Euro Lift', image: 'https://duxdomus.rs/uploads/saradnici/tb_6.jpg', category: 'Lift servisi' },
  { id: 7, name: 'Objedinjena naplata', image: 'https://duxdomus.rs/uploads/saradnici/tb_7.jpg', category: 'Finansije' },
  { id: 8, name: 'Niš Stan', image: 'https://duxdomus.rs/uploads/saradnici/tb_8.jpg', category: 'Stambene usluge' },
  { id: 9, name: 'Sistem Servis Niš', image: 'https://duxdomus.rs/uploads/saradnici/tb_9.jpg', category: 'Tehničko održavanje' }
];

export const documents = [
  {
    id: 1,
    title: 'Zakon o stanovanju i održavanju zgrada',
    description: 'Zakon koji reguliše stanovanje i upravljanje stambenim zgradama u RS',
    type: 'Zakon',
    icon: 'ScrollText'
  },
  {
    id: 2,
    title: 'Pravilnik o upravljanju stambenom zajednicom',
    description: 'Pravilnik koji definiše obaveze i prava profesionalnog upravnika',
    type: 'Pravilnik',
    icon: 'FileText'
  },
  {
    id: 3,
    title: 'Ugovor o poveravanju poslova profesionalnog upravnika',
    description: 'Standardni ugovor koji se potpisuje sa stambenom zajednicom',
    type: 'Ugovor',
    icon: 'ClipboardList'
  },
  {
    id: 4,
    title: 'Zapisnik sa skupštine stambene zajednice',
    description: 'Forma zapisnika za redovne skupštine stanara',
    type: 'Obrazac',
    icon: 'ClipboardCheck'
  },
  {
    id: 5,
    title: 'Izveštaj o finansijskom stanju zgrade',
    description: 'Mesečni finansijski izveštaj za stanare',
    type: 'Obrazac',
    icon: 'BarChart3'
  },
  {
    id: 6,
    title: 'Program godišnjeg održavanja zgrade',
    description: 'Plan redovnog i investicionog održavanja za tekuću godinu',
    type: 'Plan',
    icon: 'Calendar'
  }
];

export const residentialBuildings = [
  { id: 1, address: 'Bulevar Nikole Tesle 12, Niš', floors: 7, units: 28 },
  { id: 2, address: 'Vojislava Ilića 34, Niš', floors: 5, units: 20 },
  { id: 3, address: 'Cara Dušana 18, Niš', floors: 6, units: 24 },
  { id: 4, address: 'Obrenovićeva 56, Niš', floors: 4, units: 16 },
  { id: 5, address: 'Knez Mihajlova 23, Niš', floors: 8, units: 32 },
  { id: 6, address: 'Svetosavska 45, Niš', floors: 5, units: 20 },
  { id: 7, address: 'Proleterska 67, Niš', floors: 6, units: 24 },
  { id: 8, address: 'Niška 89, Niš', floors: 4, units: 16 },
  { id: 9, address: 'Sinđelićeva 34, Niš', floors: 7, units: 28 },
  { id: 10, address: 'Šumadijska 12, Niš', floors: 5, units: 20 },
  { id: 11, address: 'Kopaoničke brigade 4, Niš', floors: 6, units: 24 },
  { id: 12, address: 'Partizanska 23, Niš', floors: 4, units: 16 }
];

export const faq = [
  {
    id: 1,
    question: 'Šta je profesionalni upravnik stambene zajednice?',
    answer: 'Profesionalni upravnik je fizičko ili pravno lice koje zakonom ovlašćuje skupština stambene zajednice da u njeno ime obavlja sve poslove upravljanja zgradom, u skladu sa Zakonom o stanovanju i održavanju zgrada.'
  },
  {
    id: 2,
    question: 'Koje su prednosti angažovanja profesionalnog upravnika?',
    answer: 'Prednosti su brojne: stručno upravljanje finansijama zgrade, povoljniji ugovori sa servisnim firmama zahvaljujući količinskim popustima, rešavanje problema 24/7, zakonska usklađenost, transparentno izveštavanje i rasterećenje stanara od administrativnih obaveza.'
  },
  {
    id: 3,
    question: 'Koliko često se obilazi zgrada?',
    answer: 'Zgrade o kojima mi brinemo obilazimo redovno dva puta nedeljno (u zavisnosti od veličine objekta i dogovora i češće), i na licu mesta rešavamo sve uočene probleme.'
  },
  {
    id: 4,
    question: 'Da li pružate usluge van Niša?',
    answer: 'Dux domus agencija obavlja uslugu naplate zajedničkih troškova skupštinama zgrada u svim gradovima Republike Srbije, preko niške JKP "Objedinjena naplata" i preko tekućeg računa stambene zajednice.'
  },
  {
    id: 5,
    question: 'Kako se rešavaju hitni problemi?',
    answer: 'U našim zgradama stanari rešavaju sve probleme, u najkraćem mogućem roku, pozivom na jedan telefonski broj koji je non-stop aktivan.'
  }
];

export const mission = 'Agencija "Dux domus" će ostvariti svoju viziju ostvarivanjem koristi za korisnike naših usluga - olakšavanjem zajedničkog života u stambenim zgradama, kvalitetnim i odgovornim posredovanjem između stanara i svih spoljnih subjekata neophodnih za funkcionisanje zgrade, stalnom dostupnošću stanarima i pravovremenom i potpunom povratnom informacijom.';

export const vision = 'Naša agencija će postavljati nove standarde kvaliteta, usluga i odgovornosti prema stanarima!';

export const aboutText = 'Mi smo agencija koja će dati sve od sebe da Vaš standard života u zgradi digne na viši nivo. Agencija za upravljanje nekretninama DUX DOMUS Niš je osnovana 24.02.2012. godine. Cela zamisao našeg poslovanja je da uvek radimo u korist stanara i da svaka naša usluga bude njima podređena i kreirana za njih.';
