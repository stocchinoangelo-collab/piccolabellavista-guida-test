/* Piccolabellavista — Data & Content v3.2 — contenuti bilingue IT/EN */
const DATA = {
  password: "piccolabellavista",

  casa: {
    image: "img/casa/panoramica.jpg",
    gallery: [
      { image: "img/casa/letto.jpg", caption: { it: "Camera da letto", en: "Bedroom" } },
      { image: "img/casa/panoramica.jpg", caption: { it: "Cucina e soggiorno", en: "Kitchen & living area" } },
      { image: "img/casa/bagno.jpg", caption: { it: "Bagno", en: "Bathroom" } },
      { image: "img/casa/zona-pranzo.jpg", caption: { it: "Zona pranzo", en: "Dining area" } }
    ],
    description: {
      it: "Un appartamento luminoso e accogliente nel cuore di Pirri, a pochi minuti dal centro di Cagliari. Perfetto per esplorare la città e le spiagge del sud Sardegna.",
      en: "A bright, welcoming apartment in the heart of Pirri, minutes from central Cagliari. Perfect for exploring the city and the beaches of southern Sardinia."
    },
    wifi: {
      ssid: "PiccolaBellaVista",
      password: "Sardegna2024!"
    },
    checkin: "15:00",
    checkout: "11:00",
    phone: "+39 393 110 4422",
    email: "piccolabellavista1@gmail.com",
    services: [
      { icon: "🌡️", label: { it: "Aria condizionata", en: "Air conditioning" } },
      { icon: "📶", label: { it: "Wi-Fi veloce", en: "Fast Wi-Fi" } },
      { icon: "🅿️", label: { it: "Parcheggio privato", en: "Private parking" } },
      { icon: "🍳", label: { it: "Cucina attrezzata", en: "Equipped kitchen" } },
      { icon: "🧺", label: { it: "Lavatrice", en: "Washing machine" } },
      { icon: "☕", label: { it: "Macchina caffè", en: "Coffee machine" } }
    ],
    rules: [
      { it: "Check-in dalle 15:00, check-out entro le 11:00", en: "Check-in from 3:00 PM, check-out by 11:00 AM" },
      { it: "Non fumare all'interno dell'appartamento", en: "No smoking inside the apartment" },
      { it: "Rispettare la quiete dopo le 22:00", en: "Please keep quiet hours after 10:00 PM" },
      { it: "Non lasciare rifiuti organici in casa alla partenza", en: "Don't leave organic waste in the apartment when you leave" },
      { it: "Chiudere sempre porte e finestre quando si esce", en: "Always lock doors and windows when going out" }
    ]
  },

  spiagge: [
    {
      id: "poetto",
      name: "Poetto",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Poetto_beach.jpg",
      imageCredit: "Wikimedia Commons — CC BY 2.0",
      distance: 6,
      time: 15,
      type: { it: "Spiaggia urbana", en: "City beach" },
      desc: {
        it: "La spiaggia di Cagliari per eccellenza. 8 km di sabbia fine, servizi, bar e ristoranti. Perfetta per una giornata senza pensieri.",
        en: "Cagliari's beach above all others. 8 km of fine sand, facilities, bars and restaurants. Perfect for a carefree day out."
      },
      tags: ["calm", "family", "sunset"],
      wind: { it: "Mistral (NW) — ideale", en: "Mistral (NW) — ideal" },
      ideal: { it: "Famiglie, passeggiate, aperitivo al tramonto", en: "Families, walks, sunset drinks" },
      services: { it: "Bar, noleggio ombrelloni, parcheggio", en: "Bars, umbrella rental, parking" },
      map: "https://maps.google.com/?q=Poetto+Cagliari"
    },
    {
      id: "calamosca",
      name: "Cala Mosca",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Torre_e_faro_di_Calamosca.jpg",
      imageCredit: "Wikimedia Commons — CC BY 2.0",
      distance: 8,
      time: 18,
      type: { it: "Cala protetta", en: "Sheltered cove" },
      desc: {
        it: "Una piccola insenatura a pochi passi dal Poetto. Acqua cristallina e tranquilla, ideale per chi cerca un angolo più intimo.",
        en: "A small cove just steps from Poetto. Clear, calm water, ideal for a quieter spot."
      },
      tags: ["calm", "snorkel", "family"],
      wind: { it: "Protetta da tutti i venti", en: "Sheltered from all winds" },
      ideal: { it: "Snorkeling, nuoto, famiglie con bambini", en: "Snorkeling, swimming, families with kids" },
      services: { it: "Parcheggio limitato, nessun bar", en: "Limited parking, no bar" },
      map: "https://maps.google.com/?q=Cala+Mosca+Cagliari"
    },
    {
      id: "mariapiau",
      name: "Mari Pintau",
      image: "https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?w=800&q=80",
      imageCredit: "Unsplash — immagine rappresentativa (non il sito reale)",
      distance: 18,
      time: 25,
      type: { it: "Spiaggia selvaggia", en: "Wild beach" },
      desc: {
        it: "Una delle spiagge più belle del Golfo degli Angeli. Sabbia bianchissima e mare turchese. Il nome significa 'Mare dipinto'.",
        en: "One of the finest beaches on the Gulf of Angels. Bright white sand and turquoise water. The name means 'Painted Sea'."
      },
      tags: ["wild", "snorkel", "sunset"],
      wind: { it: "Sirocco (SE) — da evitare", en: "Sirocco (SE) — avoid" },
      ideal: { it: "Fotografia, snorkeling, tramonti", en: "Photography, snorkeling, sunsets" },
      services: { it: "Parcheggio a bordo strada, nessun servizio", en: "Roadside parking, no facilities" },
      map: "https://maps.google.com/?q=Mari+Pintau+Quartu"
    },
    {
      id: "solanas",
      name: "Solanas",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      imageCredit: "[DA VERIFICARE] Unsplash — immagine rappresentativa (non il sito reale, in attesa di una foto reale di Angelo)",
      distance: 35,
      time: 40,
      type: { it: "Spiaggia naturale", en: "Natural beach" },
      desc: {
        it: "Spiaggia lunga e sabbiosa con dune di macchia mediterranea. Mare spettacolare, meno affollata del Poetto.",
        en: "A long sandy beach backed by Mediterranean scrub dunes. Spectacular water, less crowded than Poetto."
      },
      tags: ["wild", "family", "wind"],
      wind: { it: "Libeccio (SW) — da evitare", en: "Libeccio (SW) — avoid" },
      ideal: { it: "Relax, lunghe passeggiate, famiglie", en: "Relaxing, long walks, families" },
      services: { it: "Bar stagionali, parcheggio", en: "Seasonal bars, parking" },
      map: "https://maps.google.com/?q=Solanas+Sardegna"
    },
    {
      id: "costarei",
      name: "Costa Rei",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Costa_Rei.jpg",
      imageCredit: "Alex10 — CC BY-SA 3.0 — Wikimedia Commons",
      distance: 55,
      time: 55,
      type: { it: "Spiaggia paradisiaca", en: "Paradise beach" },
      desc: {
        it: "Uno dei tratti costieri più belli della Sardegna. Sabbia finissima, mare smeraldo, servizi eccellenti.",
        en: "One of Sardinia's most beautiful stretches of coast. Powder-fine sand, emerald water, excellent facilities."
      },
      tags: ["calm", "family", "snorkel"],
      wind: { it: "Mistral (NW) — ideale", en: "Mistral (NW) — ideal" },
      ideal: { it: "Giornata intera, famiglie, snorkeling", en: "A full day out, families, snorkeling" },
      services: { it: "Ristoranti, noleggio ombrelloni, parcheggi", en: "Restaurants, umbrella rental, parking" },
      map: "https://maps.google.com/?q=Costa+Rei"
    },
    {
      id: "tuerredda",
      name: "Tuerredda",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tuaredda.jpg",
      imageCredit: "Ilaria — CC BY-SA 2.0 — Wikimedia Commons",
      distance: 65,
      time: 70,
      type: { it: "Spiaggia iconica", en: "Iconic beach" },
      desc: {
        it: "Considerata una delle spiagge più belle d'Italia. Isolotto smeraldo, sabbia bianchissima, acque cristalline.",
        en: "Considered one of Italy's most beautiful beaches. A little emerald islet, bright white sand, crystal-clear water."
      },
      tags: ["wild", "snorkel", "sunset"],
      wind: { it: "Mistral (NW) — ideale", en: "Mistral (NW) — ideal" },
      ideal: { it: "Snorkeling, foto, tramonti indimenticabili", en: "Snorkeling, photos, unforgettable sunsets" },
      services: { it: "Bar, noleggio canoe, parcheggio a pagamento", en: "Bar, canoe rental, paid parking" },
      map: "https://maps.google.com/?q=Spiaggia+Tuerredda"
    }
  ],

  cagliari: [
    {
      id: "storica",
      title: { it: "Cagliari storica", en: "Historic Cagliari" },
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Castello_(Cagliari).jpg",
      imageCredit: "Wikimedia Commons — CC BY-SA 3.0",
      label: { it: "Storia", en: "History" },
      text: {
        it: "Perditi nei vicoli di Castello, il quartiere medioevale che domina la città. Visita la Cattedrale di Santa Maria, le Torri Pisane e il Bastione di Saint Remy per una vista mozzafiato.",
        en: "Get lost in the lanes of Castello, the medieval quarter overlooking the city. Visit the Cathedral of Santa Maria, the Pisan towers and the Bastion of Saint Remy for a breathtaking view."
      }
    },
    {
      id: "panorami",
      title: { it: "Panorami e belvedere", en: "Views and lookouts" },
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bastione_di_San_Remy,_prospetto.jpg",
      imageCredit: "Wikimedia Commons",
      label: { it: "Vista", en: "Views" },
      text: {
        it: "Dal Bastione di Saint Remy al colle di Sant'Elia, Cagliari offre panorami che abbracciano il Golfo degli Angeli. Non perdere il tramonto dal lungomare.",
        en: "From the Bastion of Saint Remy to the Sant'Elia hill, Cagliari offers views spanning the Gulf of Angels. Don't miss sunset along the seafront."
      }
    },
    {
      id: "mare",
      title: { it: "Il mare in città", en: "The sea in the city" },
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      label: { it: "Mare", en: "Sea" },
      text: {
        it: "Il Poetto non è solo una spiaggia: è il salotto di Cagliari. Da maggio a ottobre, la vita cittadina si sposta qui per aperitivi, cene e passeggiate.",
        en: "Poetto isn't just a beach — it's Cagliari's living room. From May to October, city life moves here for drinks, dinner and evening strolls."
      }
    },
    {
      id: "passeggiate",
      title: { it: "Passeggiate autentiche", en: "Authentic walks" },
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
      label: { it: "Natura", en: "Nature" },
      text: {
        it: "La Sella del Diavolo è un promontorio che separa il Poetto da Calamosca. Un sentiero facile con vista spettacolare sul mare e sulla città.",
        en: "Sella del Diavolo is a headland separating Poetto from Calamosca. An easy trail with a spectacular view over the sea and the city."
      }
    },
    {
      id: "aperitivo",
      title: { it: "Aperitivo e sera", en: "Evening drinks" },
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      label: { it: "Vita sociale", en: "Nightlife" },
      text: {
        it: "I locali di Piazza Yenne e Via Sassari sono il cuore della movida cagliaritana. Per un aperitivo più tranquillo, prova i bar del porto.",
        en: "The bars around Piazza Yenne and Via Sassari are the heart of Cagliari's nightlife. For quieter drinks, try the bars by the harbour."
      }
    },
    {
      id: "archeologia",
      title: { it: "Cagliari romana", en: "Roman Cagliari" },
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
      imageCredit: "Unsplash — immagine rappresentativa (non il vero Anfiteatro Romano, vedi la scheda dedicata in Archeologia)",
      label: { it: "Archeologia", en: "Archaeology" },
      text: {
        it: "L'Anfiteatro Romano, scavato nella roccia, è quel che resta della Cagliari di età imperiale. [DA VERIFICARE: risulta online che possa essere chiuso per restauro in alcuni periodi — controllare prima di consigliarlo agli ospiti]. Nei mesi caldi la città ospita spesso rassegne culturali all'aperto: [DA VERIFICARE] calendario aggiornato di mostre ed eventi archeologici.",
        en: "The Roman Amphitheatre, carved into the rock, is what remains of imperial-era Cagliari. [TO CHECK: it may be closed for restoration at times — verify before recommending it to guests]. In the warmer months the city often hosts open-air cultural events: [TO CHECK] current schedule of exhibitions and archaeological events."
      }
    },
    {
      id: "autentici",
      title: { it: "Luoghi autentici", en: "Authentic spots" },
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      label: { it: "Cultura", en: "Culture" },
      text: {
        it: "Il mercato di San Benedetto è uno dei più grandi d'Europa. Il quartiere di Stampace conserva l'anima popolare della città con le sue botteghe artigiane.",
        en: "San Benedetto market is one of the largest in Europe. The Stampace district keeps the city's popular soul alive with its artisan workshops."
      }
    }
  ],

  mangiare: [
    {
      id: "sapiola",
      name: "Sa Piola",
      type: "sardinian",
      typeLabel: { it: "Consiglio di Angelo e Viviana", en: "Angelo & Viviana's pick" },
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      note: {
        it: "Uno dei nostri indirizzi di fiducia, provato di persona. Cucina sarda curata.",
        en: "One of our trusted places, tried in person. Carefully done Sardinian cooking."
      },
      price: "[DA VERIFICARE]",
      address: "[DA VERIFICARE: indirizzo]",
      map: "https://maps.google.com/?q=Sa+Piola+Cagliari"
    },
    {
      id: "chiaroscuro",
      name: "ChiaroScuro",
      type: "sardinian",
      typeLabel: { it: "Selezionato con la chef", en: "Picked with our chef friend" },
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      note: {
        it: "Uno dei quattro locali provati insieme alla nostra amica chef esperta di cucina sarda.",
        en: "One of four places tried together with our chef friend, an expert in Sardinian cuisine."
      },
      price: "[DA VERIFICARE]",
      address: "[DA VERIFICARE: indirizzo, tipo di cucina]",
      map: "https://maps.google.com/?q=ChiaroScuro+Cagliari"
    },
    {
      id: "josto",
      name: "Josto",
      type: "sardinian",
      typeLabel: { it: "Selezionato con la chef", en: "Picked with our chef friend" },
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      note: { it: "[DA VERIFICARE: breve descrizione]", en: "[TO CHECK: short description]" },
      price: "[DA VERIFICARE]",
      address: "[DA VERIFICARE: indirizzo, tipo di cucina]",
      map: "https://maps.google.com/?q=Josto+Cagliari"
    },
    {
      id: "nakoa",
      name: "Nakoa",
      type: "sardinian",
      typeLabel: { it: "Selezionato con la chef", en: "Picked with our chef friend" },
      image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80",
      note: { it: "[DA VERIFICARE: breve descrizione]", en: "[TO CHECK: short description]" },
      price: "[DA VERIFICARE]",
      address: "[DA VERIFICARE: indirizzo, tipo di cucina]",
      map: "https://maps.google.com/?q=Nakoa+Cagliari"
    },
    {
      id: "cumbidu",
      name: "Cumbidu",
      type: "special",
      typeLabel: { it: "Circa 30 € a persona", en: "About €30 per person" },
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
      note: { it: "[DA VERIFICARE: breve descrizione]", en: "[TO CHECK: short description]" },
      price: "€€€",
      address: "[DA VERIFICARE: indirizzo]",
      map: "https://maps.google.com/?q=Cumbidu+Cagliari"
    },
    {
      id: "anticacagliari",
      name: "Antica Cagliari",
      type: "special",
      typeLabel: { it: "Per una cena speciale", en: "For a special dinner" },
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80",
      note: { it: "[DA VERIFICARE: breve descrizione]", en: "[TO CHECK: short description]" },
      price: "[DA VERIFICARE]",
      address: "[DA VERIFICARE: indirizzo]",
      map: "https://maps.google.com/?q=Antica+Cagliari"
    }
  ],

  enogastronomia: [
    {
      id: "piatti",
      title: { it: "Piatti tradizionali", en: "Traditional dishes" },
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
      text: {
        it: "Il porceddu (maialetto sardo arrosto), i malloreddus (gnocchetti di semola), la fregola (pasta tipo cous cous), il bottarga di muggine e il pane carasau sono solo alcuni dei pilastri della cucina sarda. Ogni piatto racconta secoli di tradizione pastorale e marinara.",
        en: "Porceddu (roast Sardinian suckling pig), malloreddus (small semolina dumplings), fregola (a couscous-like pasta), mullet bottarga and pane carasau are just some of the pillars of Sardinian cooking. Every dish tells centuries of shepherding and seafaring tradition."
      }
    },
    {
      id: "vini",
      title: { it: "Vini sardi", en: "Sardinian wines" },
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
      text: {
        it: "Il Cannonau (parente del Grenache), il Vermentino di Gallura, il Carignano del Sulcis e il Nuragus sono i grandi vini dell'isola. Non perdete il Mirto, il liquore ai mirti selvatici che chiude ogni pasto sardo.",
        en: "Cannonau (a relative of Grenache), Vermentino di Gallura, Carignano del Sulcis and Nuragus are the island's great wines. Don't miss Mirto, the wild-myrtle liqueur that closes every Sardinian meal."
      }
    },
    {
      id: "prodotti",
      title: { it: "Prodotti tipici", en: "Local products" },
      image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80",
      text: {
        it: "Formaggi pecorini stagionati, miele di corbezzolo, olio extravergine di oliva Biancolilla, carciofi spinosi di Sardegna, e i dolci a base di mandorle come le amaretti e le pardulas.",
        en: "Aged pecorino cheeses, strawberry-tree honey, Biancolilla extra virgin olive oil, Sardinian spiny artichokes, and almond-based sweets like amaretti and pardulas."
      }
    },
    {
      id: "dolci",
      title: { it: "Dolci sardi", en: "Sardinian sweets" },
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      text: {
        it: "Le seadas (ravioli fritti con miele e formaggio), le pardulas (tartellette con ricotta e zafferano), gli amaretti e il torrone sardo. Ogni festa ha il suo dolce tradizionale.",
        en: "Seadas (fried pastries with honey and cheese), pardulas (ricotta and saffron tartlets), amaretti, and Sardinian torrone. Every festival has its own traditional sweet."
      }
    },
    {
      id: "esperienze",
      title: { it: "Esperienze gastronomiche", en: "Food experiences" },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
      text: {
        it: "Visitate il mercato di San Benedetto al mattino presto, partecipate a una cena in masseria, o prenotate una degustazione di vini in una cantina del Sulcis. La Sardegna si gusta lentamente.",
        en: "Visit San Benedetto market early in the morning, join a farmhouse dinner, or book a wine tasting at a Sulcis winery. Sardinia is meant to be savoured slowly."
      }
    }
  ],

  muoversi: {
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    items: [
      { icon: "✈️", title: { it: "Dall'aeroporto", en: "From the airport" }, desc: { it: "Aeroporto di Cagliari-Elmas a 10 km. Taxi circa €25, bus linea 10 o trenino metropolitano.", en: "Cagliari-Elmas airport is 10 km away. Taxi about €25, bus line 10, or the light metro." } },
      { icon: "🚗", title: { it: "Auto", en: "Car" }, desc: { it: "Consigliata per esplorare le spiagge del sud. Parcheggio disponibile sotto casa.", en: "Recommended for exploring the southern beaches. Parking available right by the house." } },
      { icon: "🚌", title: { it: "Bus urbani", en: "City buses" }, desc: { it: "CTM Cagliari. Biglietto €1,30 (90 min). App 'CTM Cagliari' utile per orari.", en: "Run by CTM Cagliari. Ticket €1.30 (90 min). The 'CTM Cagliari' app is handy for timetables." } },
      { icon: "🚊", title: { it: "Trenino verde", en: "Light rail" }, desc: { it: "Metropolitana leggera che collega Pirri al centro e all'aeroporto. Frequente ed economica.", en: "Light metro linking Pirri to the city centre and the airport. Frequent and cheap." } },
      { icon: "🚕", title: { it: "Taxi / App", en: "Taxi / apps" }, desc: { it: "AppTaxi e FreeNow funzionano a Cagliari. Radio Taxi: +39 070 400101.", en: "AppTaxi and FreeNow work in Cagliari. Radio Taxi: +39 070 400101." } },
      { icon: "🚲", title: { it: "Bici", en: "Bike" }, desc: { it: "Noleggio bici al Poetto (aprile-ottobre). Piste ciclabili in espansione.", en: "Bike rental at Poetto (April–October). The cycle-path network is expanding." } }
    ]
  },

  info: {
    items: [
      { icon: "🏥", title: { it: "Emergenze", en: "Emergencies" }, value: { it: "118 (medica) · 113 (carabinieri) · 115 (vigili del fuoco)", en: "118 (medical) · 113 (police) · 115 (fire brigade)" } },
      { icon: "💊", title: { it: "Farmacia", en: "Pharmacy" }, value: { it: "Farmacia Pirri Centro, Via dei Grilli 23. Turno notturno su segnaletica.", en: "Farmacia Pirri Centro, Via dei Grilli 23. Night-duty pharmacy shown on posted signs." } },
      { icon: "🏧", title: { it: "Bancomat", en: "ATM" }, value: { it: "Intesa Sanpaolo e UniCredit in Via dei Grilli, a 200m.", en: "Intesa Sanpaolo and UniCredit on Via dei Grilli, 200 m away." } },
      { icon: "🛒", title: { it: "Supermercato", en: "Supermarket" }, value: { it: "Conad e Lidl in Via Is Mirrionis, aperto fino alle 20:30.", en: "Conad and Lidl on Via Is Mirrionis, open until 8:30 PM." } },
      { icon: "⛽", title: { it: "Benzinaio", en: "Petrol station" }, value: { it: "IP a 400m in Via della Pineta, aperto 24h.", en: "IP station 400 m away on Via della Pineta, open 24h." } },
      { icon: "📶", title: { it: "Wi-Fi", en: "Wi-Fi" }, value: { it: "SSID: PiccolaBellaVista | Password: Sardegna2024!", en: "SSID: PiccolaBellaVista | Password: Sardegna2024!" } },
      { icon: "🗑️", title: { it: "Raccolta differenziata", en: "Recycling" }, value: { it: "Carta, plastica, vetro, umido. Calendario in cucina.", en: "Paper, plastic, glass, organic. Schedule posted in the kitchen." } },
      { icon: "🐕", title: { it: "Veterinario", en: "Vet" }, value: { it: "Ambulatorio Veterinario Pirri, Via Santa Gilla 12.", en: "Ambulatorio Veterinario Pirri, Via Santa Gilla 12." } }
    ]
  },

  vento: {
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    description: {
      it: "Il vento in Sardegna determina la qualità della giornata in spiaggia. Ecco una guida pratica:",
      en: "Wind direction shapes how good a beach day will be in Sardinia. Here's a practical guide:"
    },
    winds: [
      { name: "Mistral (Maestrale)", dir: "NW", effect: { it: "Ideale per tutte le spiagge orientali. Poetto, Costa Rei, Tuerredda al top.", en: "Ideal for all the eastern beaches. Poetto, Costa Rei and Tuerredda at their best." }, icon: "🌬️" },
      { name: "Sirocco", dir: "SE", effect: { it: "Evitare le spiagge orientali. Meglio Solanas, Chia o la costa occidentale.", en: "Avoid the eastern beaches. Solanas, Chia or the west coast are better." }, icon: "🌡️" },
      { name: "Libeccio", dir: "SW", effect: { it: "Mare agitato a sud-ovest. Spiagge protette come Calamosca o Cala Regina.", en: "Rough sea to the south-west. Sheltered beaches like Calamosca or Cala Regina are safer bets." }, icon: "🌊" },
      { name: "Tramontana", dir: "N", effect: { it: "Vento fresco e secco. Ottimo per tutte le spiagge, mare cristallino.", en: "Cool, dry wind. Great for every beach, with crystal-clear water." }, icon: "❄️" }
    ]
  },

  /* Le tre sezioni seguenti (eventi, sagre, archeologia) sono nuove, fornite da Kimi
     con dati verificati e fonti reali. Per ora sono solo in italiano: L() le mostrerà
     correttamente anche in EN/DE (usa l'italiano come fallback) finché non le traduciamo. */
  eventi: [
    {
      id: "carmine2026",
      name: "Carmine 2026",
      image: "https://images.unsplash.com/photo-1503095392237-fc55088350b5?w=800&q=80",
      dateStart: "2026-06-19",
      dateEnd: "2026-09-12",
      time: "19:30",
      location: "Piazza del Carmine",
      comune: "Cagliari",
      category: "cultura",
      price: "Gratuito",
      description: "Rassegna estiva di teatro, musica, circo contemporaneo e spettacoli per famiglie. Un appuntamento fisso della cultura cagliaritana nel suggestivo scenario di Piazza del Carmine.",
      tags: ["cultura", "famiglie", "musica"],
      map: "https://maps.google.com/?q=Piazza+del+Carmine+Cagliari",
      website: "https://www.cagliariturismo.it",
      source: "Comune di Cagliari / Cagliari Turismo",
      verified: "2026-08-29"
    },
    {
      id: "simuove2026",
      name: "Festival 'Si muove la città'",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      dateStart: "2026-06-11",
      dateEnd: "2026-09-10",
      time: "Vari orari",
      location: "Quartieri di Cagliari",
      comune: "Cagliari",
      category: "cultura",
      price: "Gratuito",
      description: "Festival diffuso nei quartieri cittadini con spettacoli di teatro, danza, musica e arti di strada. Eventi in diverse location per tutta l'estate.",
      tags: ["cultura", "musica", "famiglie"],
      map: "https://maps.google.com/?q=Cagliari",
      website: "https://www.comune.cagliari.it",
      source: "Paradisola / Comune di Cagliari",
      verified: "2026-08-29"
    },
    {
      id: "quartucultura2026",
      name: "Quartu Cultura Festival",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80",
      dateStart: "2026-08-27",
      dateEnd: "2026-09-10",
      time: "Vari orari",
      location: "Parco Molentargius",
      comune: "Quartu Sant'Elena",
      category: "musica",
      price: "Gratuito",
      description: "Concerti, spettacoli teatrali e attività culturali nel Parco Naturale Regionale Molentargius-Saline, tra fenicotteri rosa e lagune salmastre.",
      tags: ["musica", "cultura", "famiglie"],
      map: "https://maps.google.com/?q=Parco+Molentargius+Quartu",
      website: "https://www.eventiinsardegna.it",
      source: "Eventi in Sardegna",
      verified: "2026-08-29"
    },
    {
      id: "sinfoniemalto2026",
      name: "Sinfonie di Malto",
      image: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&q=80",
      dateStart: "2026-09-04",
      dateEnd: "2026-09-04",
      time: "19:30",
      location: "Barumini",
      comune: "Barumini",
      category: "enogastronomia",
      price: "Da verificare",
      description: "Appuntamento enogastronomico e musicale nel cuore della Marmilla, a due passi dal sito UNESCO di Su Nuraxi. Birra artigianale, cibo locale e musica dal vivo.",
      tags: ["enogastronomia", "musica"],
      map: "https://maps.google.com/?q=Barumini",
      website: "https://www.eventiinsardegna.it",
      source: "Eventi in Sardegna",
      verified: "2026-08-29"
    },
    {
      id: "corsascalzi2026",
      name: "Corsa degli Scalzi / Festa di San Salvatore",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
      dateStart: "2026-08-28",
      dateEnd: "2026-09-07",
      time: "Vari orari",
      location: "Cabras",
      comune: "Cabras (OR)",
      category: "feste",
      price: "Gratuito",
      description: "Una delle feste tradizionali più suggestive della Sardegna: i corredori scalzi percorrono a corsa i 7 km che separano Cabras dalla chiesa campestre di San Salvatore, portando in spalla la statua del Santo.",
      tags: ["feste", "tradizioni"],
      map: "https://maps.google.com/?q=Cabras+OR",
      website: "https://www.eventiinsardegna.it",
      source: "Eventi in Sardegna",
      verified: "2026-08-29"
    }
  ],

  sagre: [
    {
      id: "matrimonioselargino",
      name: "Matrimonio Selargino",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      date: "2026-09-27",
      dateNote: "Ultima domenica di settembre",
      location: "Selargius",
      comune: "Selargius",
      category: "feste",
      price: "Gratuito",
      description: "Rievocazione storica del matrimonio tradizionale campidanese con costumi d'epoca, canti, balli e banchetto rituale. Un tuffo nelle tradizioni della Sardegna.",
      tags: ["feste", "tradizioni", "famiglie"],
      map: "https://maps.google.com/?q=Selargius",
      website: "https://www.sardegnapoint.it",
      source: "Sardegna Point",
      verified: "2026-08-29",
      dateApprox: true
    },
    {
      id: "sagrapesce",
      name: "Sagra del Pesce — Villaggio Pescatori",
      image: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800&q=80",
      date: "2026-09",
      dateNote: "Settembre (date da confermare)",
      location: "Villaggio Pescatori (Giorgino)",
      comune: "Cagliari",
      category: "enogastronomia",
      price: "A pagamento",
      description: "La tradizionale sagra del pesce nel Villaggio Pescatori di Giorgino, con pesce fresco cucinato sul momento, musica e atmosfera marinara.",
      tags: ["enogastronomia", "sagre"],
      map: "https://maps.google.com/?q=Villaggio+Pescatori+Cagliari",
      website: "https://www.sardegnapoint.it",
      source: "Sardegna Point",
      verified: "2026-08-29",
      dateApprox: true
    },
    {
      id: "sagrauva",
      name: "Sagra dell'Uva",
      image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
      date: "2026-09",
      dateNote: "Settembre (date da confermare)",
      location: "Quartu Sant'Elena",
      comune: "Quartu Sant'Elena",
      category: "enogastronomia",
      price: "Gratuito / A pagamento",
      description: "Festa dell'uva e del vino nel centro storico di Quartu Sant'Elena, con stand enogastronomici, mostre e intrattenimento per famiglie.",
      tags: ["enogastronomia", "sagre", "famiglie"],
      map: "https://maps.google.com/?q=Quartu+Sant+Elena",
      website: "https://www.itinerarinelgusto.it",
      source: "Itinerari nel Gusto",
      verified: "2026-08-29",
      dateApprox: true
    },
    {
      id: "santagreca",
      name: "Santa Greca",
      image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80",
      date: "2026-09-27",
      dateNote: "Ultima domenica di settembre",
      location: "Decimomannu",
      comune: "Decimomannu",
      category: "feste",
      price: "Gratuito",
      description: "Festa religiosa e popolare in onore di Santa Greca, con processione, canti tradizionali e stand gastronomici. Un evento radicato nella devozione campidanese.",
      tags: ["feste", "tradizioni", "famiglie"],
      map: "https://maps.google.com/?q=Decimomannu",
      website: "https://www.sardegnapoint.it",
      source: "Sardegna Point",
      verified: "2026-08-29",
      dateApprox: true
    }
  ],

  archeologia: [
    {
      id: "tuvixeddu",
      name: "Necropoli di Tuvixeddu",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cagliari_-_necropoli_di_Tuvixeddu_-_202109291525_5.jpg",
      imageCredit: "Mauro Cristarella Orestano (Crimao) — CC BY-SA 4.0 — Wikimedia Commons",
      period: "Età punica (VI–II sec. a.C.)",
      whyVisit: "La più grande necropoli punica dell'intero Mediterraneo, scavata nella roccia calcarea della collina di Tuvixeddu. Tombe a pozzo e camere sepolcrali testimoniano la presenza cartaginese a Cagliari.",
      distance: "In città",
      visitTime: "1–2 ore",
      hours: "05:30–22:30 (aperto sempre)",
      price: "Gratuito",
      website: "https://www.comune.cagliari.it",
      booking: "Non necessaria",
      map: "https://maps.google.com/?q=Necropoli+Tuvixeddu+Cagliari",
      source: "Comune di Cagliari / Wikipedia",
      verified: "2026-08-29"
    },
    {
      id: "nora",
      name: "Area Archeologica di Nora",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Archaeological_site_Nora_-_Pula_-_Sardinia_-_Italy_-_17.jpg",
      imageCredit: "Norbert Nagel — CC BY-SA 3.0 — Wikimedia Commons",
      period: "Fenicia, punica, romana (VIII sec. a.C.–V sec. d.C.)",
      whyVisit: "Una delle città antiche più affascinanti della Sardegna: teatro romano, terme, mosaici e il famoso tempio di Tanit. Il sito si trova su un promontorio con vista mozzafiato sul mare.",
      distance: "~35 km (40 min)",
      visitTime: "2–3 ore",
      hours: "09:00–20:30 (estate)",
      price: "€5 / ridotto €2,50",
      website: "https://www.areaarcheologicanora.it",
      booking: "Consigliata in alta stagione",
      map: "https://maps.google.com/?q=Area+Archeologica+Nora+Pula",
      source: "Area Archeologica Nora ufficiale",
      verified: "2026-08-29"
    },
    {
      id: "sunuraxi",
      name: "Su Nuraxi di Barumini",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nuraghe_Su_Nuraxi_-_Barumini_-_Sardinia_-_Italy_-_30.jpg",
      imageCredit: "Norbert Nagel — CC BY-SA 3.0 — Wikimedia Commons",
      period: "Età nuragica (XVI–VI sec. a.C.)",
      whyVisit: "Patrimonio UNESCO dal 1997, è il nuraghe più importante e meglio conservato della Sardegna. Un complesso fortificato con torre centrale, cortili e capanne che raccontano 3.500 anni di storia.",
      distance: "~60 km (55 min)",
      visitTime: "1,5 ore",
      hours: "09:00–19:30 (estate)",
      price: "€15 / 13–17 anni €12 / 7–12 anni €9",
      website: "https://www.su-nuraxi.it",
      booking: "Consigliata online",
      map: "https://maps.google.com/?q=Su+Nuraxi+Barumini",
      source: "Fondazione Barumini / UNESCO",
      verified: "2026-08-29"
    },
    {
      id: "santavittoria",
      name: "Santuario Nuragico di Santa Vittoria",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Serri_,_Santuario_Nuragico_Santa_Vittoria._4.JPG",
      imageCredit: "Daniela Serra — CC BY-SA 3.0 — Wikimedia Commons",
      period: "Età nuragica (Bronzo Medio–Bronzo Recente)",
      whyVisit: "Uno dei più importanti santuari nuragici del Sud Sardegna, con il tempio a pozzo, l'area delle offerte e le capanne del villaggio. Un luogo di grande suggestione archeologica.",
      distance: "~70 km (1h 10min)",
      visitTime: "1,5 ore",
      hours: "09:00–19:00 (estate)",
      price: "€5 / ridotto €2,50",
      website: "https://www.sardegnaabbandonata.it",
      booking: "Non necessaria",
      map: "https://maps.google.com/?q=Santuario+Santa+Vittoria+Serri",
      source: "MIBAC / Sardegna Abbandonata",
      verified: "2026-08-29"
    },
    {
      id: "anfiteatro",
      name: "Anfiteatro Romano di Cagliari",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cagliari_Anfiteatro_Romano.jpg",
      imageCredit: "Unukorno — CC BY 3.0 — Wikimedia Commons",
      period: "Età romana (II sec. d.C.)",
      whyVisit: "Scavato nella roccia calcarea del colle di Buoncammino, è uno degli anfiteatri romani meglio conservati della Sardegna. Poteva ospitare fino a 10.000 spettatori.",
      distance: "In città",
      visitTime: "45 min",
      hours: "Da verificare (aperto di giorno)",
      price: "€3 / riduzioni disponibili",
      website: "https://www.comune.cagliari.it",
      booking: "Non necessaria",
      map: "https://maps.google.com/?q=Anfiteatro+Romano+Cagliari",
      source: "Comune di Cagliari / Wikipedia",
      verified: "2026-08-29"
    },
    {
      id: "isconcias",
      name: "Tomba dei Giganti Is Concias",
      period: "Età del Bronzo Medio–Recente",
      whyVisit: "Una delle tombe dei giganti meglio conservate del Cagliaritano, immersa nel verde del massiccio dei Sette Fratelli. L'esedra e la stele centrale sono impressionanti.",
      distance: "~25 km (30 min)",
      visitTime: "1 ora",
      hours: "Libero (accesso esterno)",
      price: "Gratuito",
      website: "https://www.sardegnaturismo.it",
      booking: "Non necessaria",
      map: "https://maps.google.com/?q=Tomba+dei+Giganti+Is+Concias+Quartucciu",
      source: "SardegnaTurismo / Wikimedia Commons",
      verified: "2026-08-29"
    }
  ],

  fonti: {
    text: {
      it: "Questa guida è stata curata personalmente dall'host di Piccolabellavista. Le informazioni sono aggiornate al 2026. Le fotografie sono di proprietà dell'host, concesse sotto licenza Unsplash o Wikimedia Commons (CC BY-SA / CC BY). Per suggerimenti o aggiornamenti: piccolabellavista1@gmail.com",
      en: "This guide was put together personally by the host of Piccolabellavista. Information is current as of 2026. Photos belong to the host, or are used under an Unsplash or Wikimedia Commons (CC BY-SA / CC BY) license. For suggestions or updates: piccolabellavista1@gmail.com"
    },
    credits: [
      { it: "Dati meteorologici: Open-Meteo", en: "Weather data: Open-Meteo" },
      { it: "Mappe: Google Maps", en: "Maps: Google Maps" },
      { it: "Icone: Lucide (SVG)", en: "Icons: Lucide (SVG)" },
      { it: "Fotografie spiagge/casa: Unsplash / Host", en: "Beach/house photos: Unsplash / Host" },
      { it: "Fotografie archeologia: Wikimedia Commons (Nagel, Tausch, Serra, Orestano, Unukorno, Follesa)", en: "Archaeology photos: Wikimedia Commons (Nagel, Tausch, Serra, Orestano, Unukorno, Follesa)" },
      { it: "Eventi: Comune di Cagliari, Cagliari Turismo, Eventi in Sardegna, Sardegna Point", en: "Events: Comune di Cagliari, Cagliari Turismo, Eventi in Sardegna, Sardegna Point" },
      { it: "Sagre: Sardegna Point, Itinerari nel Gusto", en: "Local festivals: Sardegna Point, Itinerari nel Gusto" },
      { it: "Siti archeologici: Area Archeologica Nora, Fondazione Barumini, MIBAC, SardegnaTurismo", en: "Archaeological sites: Area Archeologica Nora, Fondazione Barumini, MIBAC, SardegnaTurismo" }
    ]
  }
};
