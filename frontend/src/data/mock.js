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
  { label: 'Usluge', href: '/usluge' },
  { label: 'Stambene zgrade', href: '/stambene-zgrade' },
  { label: 'Blog', href: '/blog' },
  { label: 'Postanite saradnik', href: '/saradnja' },
  { label: 'Kontakt', href: '/kontakt' }
];

export const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1612637968894-660373e23b03?w=1920&q=80',
    title: 'Profesionalni upravnik stambenih zgrada',
    subtitle: 'u Nišu — 350 stambenih jedinica'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1594484208280-efa00f96fc21?w=1920&q=80',
    title: 'Briga o Vašoj zgradi',
    subtitle: 'Pouzdano i profesionalno upravljanje od 2012.'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1920&q=80',
    title: 'Transparentnost i efikasnost',
    subtitle: 'Jasni troškovi — bez skrivenih naknada'
  }
];

export const features = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1624204386084-dd8c05e32226?w=600&q=80',
    title: 'Briga o Vašoj zgradi',
    description: 'Redovni obilaski i rešavanje svih problema u zgradi'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1626178793926-22b28830aa30?w=600&q=80',
    title: 'Profesionalni upravnik zgrade',
    description: 'Zakonski usklađeno upravljanje stambenom zajednicom'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1769690094086-c7784fba4f8d?w=600&q=80',
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
  { id: 1, name: 'Eko Stan Niš', category: 'Tehničko održavanje', icon: 'Wrench', color: '#2563eb' },
  { id: 2, name: 'Eko Stan Plus', category: 'Tehničko održavanje', icon: 'Settings', color: '#0891b2' },
  { id: 3, name: 'FM Lift', category: 'Lift servisi', icon: 'ArrowUpDown', color: '#7c3aed' },
  { id: 4, name: 'Elevator', category: 'Lift servisi', icon: 'ArrowUpDown', color: '#6d28d9' },
  { id: 5, name: 'Elevator Plus', category: 'Lift servisi', icon: 'ArrowUpDown', color: '#5b21b6' },
  { id: 6, name: 'Euro Lift', category: 'Lift servisi', icon: 'ArrowUpDown', color: '#4c1d95' },
  { id: 7, name: 'Objedinjena naplata', category: 'Finansije', icon: 'CreditCard', color: '#065f46' },
  { id: 8, name: 'Niš Stan', category: 'Stambene usluge', icon: 'Home', color: '#b45309' },
  { id: 9, name: 'Sistem Servis Niš', category: 'Tehničko održavanje', icon: 'Cpu', color: '#be123c' }
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
  '2. proleterske brigade 22', '7. juli 35', '7. juli 15', '7. juli 31 A',
  '7. juli 4 B', '9. brigade 57', 'Albanske golgote 4A', 'Aleksandra Milenkovića 5',
  'Aleksandra Nenadovića 8', 'Aleksinačka 1 A', 'Žarka Đurića 33', 'Žikice Jovanovića Španca 7',
  'Župska 5', 'Čarnojevića 25', 'Čarnojevićeva 10', 'Čarnojevićeva 12',
  'Ćirila i Metodija 17A', 'Balkanska 15/1', 'Balkanska 15/2', 'Blagoja Parovića 18',
  'Božidarčeva 24', 'Božidarčeva 32', 'Božidarčeva 33', 'Božidarčeva 35',
  'Bogdana Popovića 5', 'Borivoja Stevanovića 32', 'Borivoja Stevanovića 37', 'Borova 11',
  'Borova 13', 'Borova 15', 'Borska 15', 'Branka Krsmanovića 11',
  'Branka Krsmanovića 15', 'Branka Krsmanovića 23', 'Branka Krsmanovića 29', 'Branka Krsmanovića 59',
  'Branka Radičevića 8', 'Bul. Zorana Đinđića 125', 'Bulevar dr. Zorana Đinđića 85', 'Bulevar dr. Zorana Đinđića 105',
  'Bulevar dr. Zorana Đinđića 31', 'Bulevar dr. Zorana Đinđića 113', 'Bulevar dr. Zorana Đinđića 115', 'Bulevar dr. Zorana Đinđića 117',
  'Bulevar dr. Zorana Đinđića 121 a', 'Bulevar dr. Zorana Đinđića 7', 'Bulevar Nemanjića 1', 'Bulevar Nemanjića 17',
  'Bulevar Nemanjića 20', 'Bulevar Nemanjića 5', 'Bulevar Nemanjića 63', 'Bulevar Nemanjića 7',
  'Bulevar Nemanjića 8', 'Bulevar Nemanjića 95', 'Bulevar Nikole Tesle 23', 'Bulevar Nikole Tesle 37',
  'Bulevar Nikole Tesle 49', 'Bulevar Zorana Đinđića 6', 'Cara Dušana 110', 'Cara Dušana 81',
  'Cara Dušana 98', 'Cara Konstantina 41', 'Cara Uroša 17', 'Cvijićeva 9',
  'Despota Đurđa 13', 'Despota Đurđa 3 a', 'Dimitrovgradska 15', 'Dimitrovgradska 16',
  'Dimitrovgradska 18', 'Donjovrežinska 5', 'Dr. Milutina Ivkovića 2', 'Dr. Dragiše Mišovića 1 B',
  'Dr. Dragiše Mišovića 3A', 'Dragiše Cvetkovića 14', 'Dragiše Cvetkovića 16', 'Dragiše Cvetkovića 19B',
  'Dragiše Cvetkovića 22', 'Dragiše Cvetkovića 24', 'Dragiše Cvetkovića 26', 'Dragiše Cvetkovića 28 B',
  'Dragiše Cvetkovića 30', 'Dragiše Cvetkovića 32 B', 'Dragiše Cvetkovića 64', 'Dragiše Cvetkovića 66',
  'Dragiše Cvetkovića 68', 'Dragiše Cvetkovića 70', 'Dragiše Cvetkovića 81', 'Dragiše Cvetkovića 83',
  'Dragiše Cvetkovića 85', 'Elektronska 3', 'Episkopska 18', 'Episkopska 26',
  'Episkopska 36', 'Episkopska 69', 'Filipa Višnjića 1', 'Filipa Višnjića 3',
  'Filipa Višnjića 6', 'Filipa Višnjića 7', 'Francuska 6', 'Gavrila Principa 18',
  'Gen. Milojka Lešjanina 29 A', 'Gen. Milojka Lešjanina 29 B', 'Gen. Milojka Lešjanina 29 V', 'Gen. Milojka Lešjanina 10',
  'Generala Milojka Lešjanina 1', 'Generala Milojka Lešjanina 10', 'Generala Milojka Lešjanina 40', 'Glamočka 15',
  'Gornjematejevačka 112 E', 'Gornjomatejevačka 110', 'Gornjomatejevačka 110v', 'Gornjomatejevačka 112',
  'Gornjomatejevačka 112 Č', 'Gornjomatejevačka 112 B', 'Gornjomatejevačka 114', 'Gornjomatejevačka 8, prilaz 2',
  'Gornjomatejevačka 8, prilaz 2A', 'Gornjomatejevačka 98A', 'Hajduk Veljkova 9', 'Hajduk Veljkova 37 A',
  'Hajduk Veljkova 37 B', 'Hajduk Veljkova 37 V', 'Hajduk Veljkova 42', 'Hilandarska 21',
  'Hilandarska 5 A', 'Homoljska 14', 'Ilindenska 33 A', 'Ilindenska 33 B',
  'Ivana Gorana Kovačića 38', 'Ivana Gundulića 1 B', 'Ivana Gundulića 9', 'Izvorska 26',
  'Jablanička 26', 'Jelene Dimitrijević 3', 'Jeronimova 20', 'Jeronimova 24',
  'Jovana Ristića 11', 'Jovana Ristića 34', 'Jovana Ristića 8', 'Jovana Skerlića 26',
  'Jovana Skerlića 28', 'Jovana Skerlića 6', 'Jug Bogdanova 38', 'Jug Bogdanova 9',
  'Jugovićeva 1', 'Jugovićeva 12', 'Jugovićeva 15 A', 'Jugovićeva 21',
  'Jugovićeva 24', 'Jugovićeva 6 A', 'Karadžićeva 2', 'Katičeva 3',
  'Kej Kolo srpskih sestara 17', 'Kneginje Ljubice 13', 'Kneginje Ljubice 2V', 'Knjaževačka 154',
  'Knjaževačka 189', 'Kosovke devojke 7', 'Kovanlučka 21', 'Kralja Vukašina 11',
  'Kraljevića Marka 36', 'Kraljevića Marka 40', 'Kraljevića Marka 5', 'Kraljevića Marka 6-8',
  'Krfska 2', 'Krivi Vir 2', 'Lala 6', 'Lepenička 2',
  'Ljubomira Nikolića 19', 'Lovčenska 1', 'Majakovskog 8', 'Majakovskog 95',
  'Majora Tepića 14', 'Maksima Gorkog 4', 'Maksima Gorkog 7', 'Maksima Gorkog 8',
  'Matejevački put 27A', 'Matejevački put 1', 'Matejevački put 11', 'Matejevački put 25',
  'Matejevački put 25A', 'Matejevački put 27', 'Matejevački put 9', 'Milana Blagojevića 55',
  'Milana Rakića 5', 'Milana Rakića 5 A', 'Milana Rakića 6', 'Milana Rakića 8/1',
  'Milana Rakića 8/2', 'Milorada Veljkovića Špaje 11a i 11b', 'Milorada Veljkovića Špaje 13-1', 'Milorada Veljkovića Špaje 13-2',
  'Milorada Veljkovića Špaje 23 A', 'Milorada Veljkovića Špaje 23 B', 'Mirisnih vrba 1 B', 'Mirisnih vrba 13',
  'Mokranjčeva 71', 'Mokranjčeva 73', 'Mokranjčeva 77', 'Mokranjčeva 80B',
  'Mokranjčeva 81', 'Mokranjčeva 86 A', 'Mokranjčeva 86 B', 'Mokranjčeva 87',
  'Mokranjčeva 88', 'Mokranjčeva 92', 'Mokranjčeva 94', 'Momčila Popovića 4',
  'Nade Tomić 16/1', 'Nade Tomić 16/2', 'Nade Tomić 16/3', 'Narodnih heroja 26',
  'Narodnih heroja 28', 'Narodnih heroja 30', 'Narodnih heroja 64', 'Narodnih heroja 68',
  'Nikole Kopernika 33', 'Nikole Kopernika 40', 'Nikole Kopernika 42', 'Nikole Kopernika 59',
  'Nikole Pašića 48', 'Nikole Pašića 50', 'Njegoševa 35', 'Nova Železnička kolonija 12 D',
  'Nova železnička kolonija 10/1', 'Nova železnička kolonija 10/2', 'Nova železnička kolonija 6', 'Obrenovićeva 124 G',
  'Obrenovićeva 2', 'Obrenovićeva 59-1', 'Obrenovićeva 59-2', 'Orlovića Pavla 7',
  'Orlovića Pavla 7 B', 'Pantalejska 75 A', 'Pariske komune 23', 'Pariske komune 7',
  'Pariske komune 9', 'Partizanskih kurira 2A', 'Patrisa Lumumbe 7', 'Pavla Jurišića Šturma 3',
  'Petra Balje 1', 'Petra Balje 2', 'Petra Vučinića 16', 'Prijezdina 14',
  'Prijezdina 7', 'Primorska 4', 'Prvomajska 1', 'Prvomajska 9',
  'Radanska 6', 'Radnih brigada 3', 'Radnih brigada 5', 'Radnih brigada 8',
  'Rajićeva 12', 'Rasadnik 4', 'Ratka Vukičevića 10', 'Ratka Vukičevića 8',
  'Rentgenova 1 A', 'Rentgenova 23', 'Rentgenova 3', 'Rentgenova 31',
  'Rentgenova 4', 'Rentgenova 5', 'Rentgenova 9 B', 'Rentgenova 9A',
  'Romanijska 7', 'Rudnička 12', 'Sinđelićev trg 2', 'Siniše Radića 4',
  'Skopljanska 7', 'Somborska 43', 'Somborska 87-3', 'Sremska 11',
  'Sremska 18', 'Sremska 2', 'Sremska 22', 'Sremska 24',
  'Sremska 26', 'Sremska 4', 'Sremska 5', 'Sremska 6',
  'Sremska 7', 'Sremska 9', 'Stara železnička kolonija 1', 'Stara železnička kolonija 14',
  'Stara železnička kolonija 1A', 'Starca Vujadina 24', 'Starca Vujadina 32', 'Starca Vujadina 9',
  'Stevana Nemanje 29', 'Stojana Andrića 12', 'Stojana Novakovića 11', 'Strahinjića bana 1',
  'Studenička 48 A', 'Studenička 48 V', 'Studenička 48-1', 'Studenička 48-2',
  'Studenička 54', 'Studenička 58 Ž', 'Studenička 58 B', 'Studenička 58 E',
  'Studenička 58 V', 'Studenička 58 Z', 'Svetopreobraženška 14', 'Tihomira Brankovića-Joce 18 B',
  'Tihomira Brankovića-Joce 18 G', 'Tihomira Brankovića-Joce 18 V', 'Todora Milovanovića 19', 'Todora Milovanovića 6',
  'Tome Rokšandića 6', 'Tome Rosandića 2', 'Tome Rosandića 8/1', 'Tome Rosandića 8/2',
  'Tome Rosandića 8/3', 'Tome Rosandića 8/4', 'Tome Rosandića 8/5', 'Tome Rosandića 8/6',
  'Tome Rosandića 5/2', 'Trg Kralja Aleksandra Ujedinitelja 6', 'Trg Pavla Stojkovića 13', 'Trg Pavla Stojkovića 15',
  'Trg Pavla Stojkovića 17', 'Učitelj Milina 33B', 'Učitelj Milina 43', 'Učitelj Tasina 25',
  'Učitelj Tasina 26', 'Učitelj Tasina 28', 'Vardarska 3', 'Vase Albanca 42',
  'Vase Čarapića 15', 'Vase Pelagića 74', 'Vase Pelagića 76', 'Vase Pelagića 80',
  'Velebitska 2A', 'Velikotrnavska 1', 'Velikotrnavska 13', 'Velikotrnavska 9',
  'Vizantijski bulevar 122', 'Vizantijski bulevar 142', 'Vizantijski bulevar 28', 'Vizantijski bulevar 36',
  'Vizantijski bulevar 38', 'Vizantijski bulevar 96', 'Vladimira Gortana 4', 'Vožda Karađorđa 100',
  'Vožda Karađorđa 5', 'Vožda Karađorđa 51', 'Vojvode Mišića 60', 'Vojvode Mišića 32',
  'Vojvode Mišića 36', 'Vojvode Mišića 40', 'Vojvode Mišića 48', 'Vojvode Mišića 5',
  'Vojvode Mišića 54', 'Vojvode Mišića 54 A', 'Vojvode Mišića 6', 'Vojvode Mišića 95',
  'Vojvode Mišića 97', 'Vojvode Mišića 75', 'Vojvode Putnika 50', 'Vojvode Stepe 5',
  'Vojvode Tankosića 1 L', 'Vojvode Tankosića 16', 'Vojvode Tankosića 40', 'Vojvode Tankosića 3',
  'Vojvode Tepića 14', 'Vožda Karađorđa 7', 'Vranjanska 17', 'Vranjanska 13',
  'Zelengorska 19', 'Zelengorska 30', 'Zelengorska 32', 'Zetska 6',
  'Zlatiborska 49', 'Zmaja od Nočaja 54', 'Zmaja od Nočaja 60 B', 'Zmaja od Nočaja 56',
  'Zorana Gudžića 2A', 'Zorana Gudžića 2B', 'Zorana Gudžića 2G', 'Zorana Gudžića 2V'
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

export const pricing = {
  minPrice: 350,
  currency: 'RSD',
  unit: 'posebnom delu',
  note: 'Konačna cena zavisi od ukupnog broja posebnih delova u zgradi.'
};

export const blogPosts = [
  {
    id: 1,
    slug: 'prava-i-obaveze-stanara',
    title: 'Prava i obaveze stanara stambene zajednice',
    excerpt: 'Svaki stanar ima zakonska prava, ali i obaveze prema stambenoj zajednici. Saznajte šta to podrazumeva u praksi.',
    date: '15. maj 2025.',
    category: 'Zakon i propisi',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80',
    content: `Zakon o stanovanju i održavanju zgrada definiše prava i obaveze svakog stanara koji je član stambene zajednice. Razumevanje ovih pravila ključno je za harmoničan suživot u zgradi.

**Osnovna prava stanara:**
- Pravo glasa na skupštini stambene zajednice
- Pravo uvida u finansijsko stanje zgrade
- Pravo na informisanost o svim radovima i troškovima
- Pravo na prigovor i žalbu

**Osnivne obaveze stanara:**
- Redovno plaćanje zajedničkih troškova
- Učešće u skupštinama i donošenju odluka
- Poštovanje kućnog reda
- Briga o zajedničkim delovima zgrade

Ukoliko stanar ne izmiruje redovne troškove, stambena zajednica ima pravo da pokrene sudski postupak naplate. Važno je znati da lično nekorišćenje zajedničkih prostorija (lifta, stepeništa itd.) ne oslobađa obaveze plaćanja.

**Savet:** Uvek tražite pisani zapisnik sa skupštine i čuvajte sve uplatnice.`
  },
  {
    id: 2,
    slug: 'zasto-profesionalni-upravnik',
    title: 'Zašto je profesionalni upravnik bolje rešenje od komšije-predsednika?',
    excerpt: 'Komšija koji "zna sve" vs. stručno lice koje odgovara zakonom. Koja je razlika i zašto je važna?',
    date: '28. april 2025.',
    category: 'Upravljanje zgradama',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    content: `Mnoge zgrade i danas funkcionišu sa "predsednikom skupštine" koji je komšija volonter. Dok to može funkcionisati u manjim zgradama, u većini slučajeva dolazi do problema.

**Problemi sa volonterskim upravljanjem:**
- Nema formalnog obrazovanja za ovu ulogu
- Lični odnosi utiču na odluke
- Nema finansijske odgovornosti
- Nedostupnost u hitnim situacijama
- Neefikasno upravljanje novcem zajednice

**Šta donosi profesionalni upravnik:**
- Zakonska odgovornost — odgovara imovinom za svoje postupke
- Povoljniji ugovori sa servisnim firmama (zahvaljujući obimu posla)
- Transparentno finansijsko izveštavanje
- Dostupnost 24/7 za hitne slučajeve
- Stručno posredovanje u konfliktima

Profesionalni upravnik ne mora biti skuplji od starog sistema. Zahvaljujući popustima koje postiže sa partnerima, u praksi često snižava ukupne troškove zgrade.`
  },
  {
    id: 3,
    slug: 'kako-registrovati-stambenu-zajednicu',
    title: 'Korak po korak: Kako registrovati stambenu zajednicu',
    excerpt: 'Registracija stambene zajednice je zakonska obaveza. Evo šta tačno treba uraditi i u kom redosledu.',
    date: '10. april 2025.',
    category: 'Administrativni poslovi',
    readTime: '8 min',
    image: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&q=80',
    content: `Od stupanja na snagu Zakona o stanovanju i održavanju zgrada, registracija stambene zajednice postala je obavezna za sve stambene zgrade. Evo kompletnog vodiča.

**Korak 1 — Sazivanje osnivačke skupštine**
Skupštinu može sazvati svaki vlasnik posebnog dela u zgradi. Pozivi moraju biti dostavljeni svim vlasnicima minimum 8 dana unapred.

**Korak 2 — Izbor upravnika i predsednika skupštine**
Na skupštini se biraju: predsednik skupštine stanara i upravnik (može biti profesionalni ili volonterski).

**Korak 3 — Registracija u lokalnoj samoupravi**
Podnosi se zahtev u opštini/gradskoj upravi sa: zapisnikom sa skupštine, podacima o upravniku i adresom zgrade.

**Korak 4 — Pribavljanje matičnog broja i PIB-a**
Nakon registracije, stambena zajednica dobija pravni subjektivitet, matični broj od Agencije za privredne registre i PIB od Poreske uprave.

**Korak 5 — Otvaranje tekućeg računa**
Banka otvara tekući račun na osnovu rešenja o registraciji. Sve zajedničke finansije moraju da idu kroz ovaj račun.

Ovaj proces može trajati od 2 do 6 nedjelja. Naša agencija pruža kompletnu pomoć tokom celog procesa.`
  },
  {
    id: 4,
    slug: 'cesti-problemi-u-zgradama',
    title: '10 najčešćih problema u stambenim zgradama i kako ih rešiti',
    excerpt: 'Od prokišnjavanja krovova do neurednih stanara — evo šta su najčešći problemi i ko je odgovoran za njihovo rešavanje.',
    date: '22. mart 2025.',
    category: 'Problemi i rešenja',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    content: `U svakodnevnom radu sa stambenim zgradama, susrećemo se sa istim problemima iznova. Evo pregled 10 najčešćih i ko je odgovoran za njihovo rešavanje.

**1. Prokišnjavanje krova**
Odgovornost: stambena zajednica, investicioni zahvat, finansira se iz fonda za održavanje.

**2. Kvar lifta**
Odgovornost: stambena zajednica kroz servisni ugovor. Hitna intervencija mora biti dostupna 24h.

**3. Neplaćanje zajedničkih troškova**
Rešenje: opomena, zatim sudska naplata. Kamata se obračunava po zakonu.

**4. Buka i ometanje komšija**
Rešenje: kućni red, opomena, komunalna policija. Upravnik posreduje.

**5. Oštećenja u zajedničkim prostorijama**
Odgovornost: stanar koji je prouzrokovao štetu. Upravnik dokumentuje i naplaćuje.

**6. Neodržavana higijena**
Rešenje: ugovor sa firmom za čišćenje ili organizovana dežurstva stanara.

**7. Neispravna grejanja i cevi**
Podela: instalacije unutar stana — vlasnik stana; zajednički razvodi — stambena zajednica.

**8. Nelegalno zauzimanje zajedničkih prostora**
Rešenje: opomena, inspekcija, po potrebi sud.

**9. Neregistrovani stanari/podstanari**
Obaveza: prijaviti u "Objedinjenu naplatu" radi tačnog obračuna troškova.

**10. Neadekvatan fond za održavanje**
Rešenje: skupština odlučuje o visini mesečnog doprinosa i planu investicionih radova.`
  },
  {
    id: 5,
    slug: 'finansije-stambene-zajednice',
    title: 'Kako funkcionišu finansije stambene zajednice',
    excerpt: 'Ko skuplja novac, ko ima pravo uvida, kako se donose odluke o trošenju — sve što trebate znati o novcu u Vašoj zgradi.',
    date: '5. mart 2025.',
    category: 'Finansije',
    readTime: '6 min',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
    content: `Finansije stambene zajednice moraju biti transparentne i dostupne svakom stanaru. Evo kako sistem funkcioniše.

**Tekući račun stambene zajednice**
Sav novac koji stanari uplaćuju ide na zvanični tekući račun stambene zajednice, a ne na privatni račun upravnika. Izvod iz banke mora biti dostupan svim stanarima.

**Fond za tekuće održavanje**
Mesečni iznosi koje stanari plaćaju (obično 5–15 din/m²) pokrivaju redovne troškove: čišćenje, servisiranje lifta, sijalice, sitne popravke itd.

**Fond za investiciono ulaganje**
Poseban deo doprinosa odlazi za buduće veće radove: krov, fasada, elektro instalacije. Ovaj novac treba da se čuva na posebnom podračunu.

**Ko odlučuje o trošenju?**
Skupština stanara odlučuje o svim radovima čija vrednost prelazi određeni prag (obično 3 mesečna doprinosa). Manji troškovi su u nadležnosti upravnika.

**Pravo uvida stanara**
Svaki stanar ima pravo da traži:
- Blagajnički izveštaj (mesečni)
- Izvod iz banke
- Kopiju svakog ugovora koji je potpisan u ime zgrade

**Savet:** Tražite mesečni finansijski izveštaj od upravnika. Ako ih ne dobijate automatski, to je signal da nešto nije uredu.`
  }
];

export const mission = 'Agencija "Dux domus" će ostvariti svoju viziju ostvarivanjem koristi za korisnike naših usluga - olakšavanjem zajedničkog života u stambenim zgradama, kvalitetnim i odgovornim posredovanjem između stanara i svih spoljnih subjekata neophodnih za funkcionisanje zgrade, stalnom dostupnošću stanarima i pravovremenom i potpunom povratnom informacijom.';

export const vision = 'Naša agencija će postavljati nove standarde kvaliteta, usluga i odgovornosti prema stanarima!';

export const aboutText = 'Mi smo agencija koja će dati sve od sebe da Vaš standard života u zgradi digne na viši nivo. Agencija za upravljanje nekretninama DUX DOMUS Niš je osnovana 24.02.2012. godine. Cela zamisao našeg poslovanja je da uvek radimo u korist stanara i da svaka naša usluga bude njima podređena i kreirana za njih.';
