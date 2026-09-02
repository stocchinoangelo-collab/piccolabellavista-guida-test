/* ============================================================
   Piccolabellavista — Contenuti  ·  v4.0
   ============================================================
   Tutti i testi rivolti agli ospiti sono trilingui: { it, en, de }.
   La funzione L() in app.js sceglie la lingua attiva e ripiega
   sull'italiano se una traduzione manca.

   Cosa NON va in questo file: password, codici, recapiti privati.
   Il file è pubblico. I recapiti stanno in js/config.js, dove sono
   disattivati per impostazione predefinita.

   Come aggiungere un evento: copia un blocco esistente dentro
   `eventi`, cambia `id` (deve essere unico), date, luogo e testi,
   e aggiorna `verified` con la data in cui hai controllato la fonte.
   Poi aggiorna `lastUpdated` in js/config.js.
   ============================================================ */

const DATA = {

  casa: {
    image: "img/casa/panoramica.jpg",
    gallery: [
      { image: "img/casa/letto.jpg",       caption: { it: "Camera da letto",     en: "Bedroom",           de: "Schlafzimmer" } },
      { image: "img/casa/panoramica.jpg",  caption: { it: "Cucina e soggiorno",  en: "Kitchen & living",  de: "Küche und Wohnbereich" } },
      { image: "img/casa/bagno.jpg",       caption: { it: "Bagno",               en: "Bathroom",          de: "Badezimmer" } },
      { image: "img/casa/zona-pranzo.jpg", caption: { it: "Zona pranzo",         en: "Dining area",       de: "Essbereich" } }
    ],
    description: {
      it: "Un appartamento luminoso e accogliente nel cuore di Pirri, a pochi minuti dal centro di Cagliari. Perfetto per esplorare la città e le spiagge del sud Sardegna.",
      en: "A bright, welcoming apartment in the heart of Pirri, minutes from central Cagliari. Perfect for exploring the city and the beaches of southern Sardinia.",
      de: "Eine helle, gemütliche Wohnung mitten in Pirri, wenige Minuten vom Zentrum Cagliaris entfernt. Ideal, um die Stadt und die Strände Südsardiniens zu erkunden."
    },
    coordinates: { lat: 39.2238, lng: 9.1217 },
    mapEmbed: "https://www.google.com/maps?q=39.2238,9.1217&output=embed",
    checkin: "15:00",
    checkout: "11:00",
    services: [
      { icon: "🌡️", label: { it: "Aria condizionata",  en: "Air conditioning",  de: "Klimaanlage" } },
      { icon: "📶", label: { it: "Wi-Fi veloce",       en: "Fast Wi-Fi",        de: "Schnelles WLAN" } },
      { icon: "🅿️", label: { it: "Parcheggio privato", en: "Private parking",   de: "Privater Parkplatz" } },
      { icon: "🍳", label: { it: "Cucina attrezzata",  en: "Equipped kitchen",  de: "Ausgestattete Küche" } },
      { icon: "🧺", label: { it: "Lavatrice",          en: "Washing machine",   de: "Waschmaschine" } },
      { icon: "☕", label: { it: "Macchina caffè",     en: "Coffee machine",    de: "Kaffeemaschine" } }
    ],
    rules: [
      { it: "Check-in dalle 15:00, check-out entro le 11:00",      en: "Check-in from 3:00 PM, check-out by 11:00 AM",             de: "Check-in ab 15:00 Uhr, Check-out bis 11:00 Uhr" },
      { it: "Non fumare all'interno dell'appartamento",            en: "No smoking inside the apartment",                          de: "Rauchen in der Wohnung ist nicht gestattet" },
      { it: "Rispettare la quiete dopo le 22:00",                  en: "Please keep quiet hours after 10:00 PM",                   de: "Bitte ab 22:00 Uhr die Nachtruhe einhalten" },
      { it: "Non lasciare rifiuti organici in casa alla partenza", en: "Don't leave organic waste in the apartment when you leave", de: "Bei der Abreise bitte keinen Biomüll in der Wohnung lassen" },
      { it: "Chiudere sempre porte e finestre quando si esce",     en: "Always lock doors and windows when going out",              de: "Türen und Fenster beim Verlassen immer schließen" }
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
      type: { it: "Spiaggia urbana", en: "City beach", de: "Stadtstrand" },
      desc: {
        it: "La spiaggia di Cagliari per eccellenza. 8 km di sabbia fine, servizi, bar e ristoranti. Perfetta per una giornata senza pensieri.",
        en: "Cagliari's beach above all others. 8 km of fine sand, facilities, bars and restaurants. Perfect for a carefree day out.",
        de: "Der Strand Cagliaris schlechthin. 8 km feiner Sand, Einrichtungen, Bars und Restaurants. Perfekt für einen unbeschwerten Tag."
      },
      tags: ["calm", "family", "sunset"],
      wind:     { it: "Maestrale (NO) — ideale",                     en: "Mistral (NW) — ideal",           de: "Mistral (NW) — ideal" },
      ideal:    { it: "Famiglie, passeggiate, aperitivo al tramonto", en: "Families, walks, sunset drinks", de: "Familien, Spaziergänge, Aperitif bei Sonnenuntergang" },
      services: { it: "Bar, noleggio ombrelloni, parcheggio",         en: "Bars, umbrella rental, parking", de: "Bars, Schirmverleih, Parkplatz" },
      map: "https://maps.google.com/?q=Poetto+Cagliari"
    },
    {
      id: "calamosca",
      name: "Cala Mosca",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Torre_e_faro_di_Calamosca.jpg",
      imageCredit: "Wikimedia Commons — CC BY 2.0",
      distance: 8,
      time: 18,
      type: { it: "Cala protetta", en: "Sheltered cove", de: "Geschützte Bucht" },
      desc: {
        it: "Una piccola insenatura a pochi passi dal Poetto. Acqua cristallina e tranquilla, ideale per chi cerca un angolo più intimo.",
        en: "A small cove just steps from Poetto. Clear, calm water, ideal for a quieter spot.",
        de: "Eine kleine Bucht wenige Schritte vom Poetto entfernt. Klares, ruhiges Wasser — ideal für alle, die es etwas privater mögen."
      },
      tags: ["calm", "snorkel", "family"],
      wind:     { it: "Protetta da tutti i venti",               en: "Sheltered from all winds",                 de: "Vor allen Winden geschützt" },
      ideal:    { it: "Snorkeling, nuoto, famiglie con bambini", en: "Snorkeling, swimming, families with kids", de: "Schnorcheln, Schwimmen, Familien mit Kindern" },
      services: { it: "Parcheggio limitato, nessun bar",         en: "Limited parking, no bar",                  de: "Begrenzte Parkplätze, keine Bar" },
      map: "https://maps.google.com/?q=Cala+Mosca+Cagliari"
    },
    {
      id: "mariapiau",
      name: "Mari Pintau",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cala_Mari_Pintau_-_panoramio.jpg",
      imageCredit: "Ramon Espiña Fernandez — CC BY-SA 3.0 — Wikimedia Commons",
      distance: 18,
      time: 25,
      type: { it: "Spiaggia selvaggia", en: "Wild beach", de: "Naturbelassener Strand" },
      desc: {
        it: "Una delle spiagge più belle del Golfo degli Angeli. Sabbia bianchissima e mare turchese. Il nome significa «mare dipinto».",
        en: "One of the finest beaches on the Gulf of Angels. Bright white sand and turquoise water. The name means 'painted sea'.",
        de: "Einer der schönsten Strände am Golfo degli Angeli. Strahlend weißer Sand und türkisfarbenes Wasser. Der Name bedeutet „gemaltes Meer“."
      },
      tags: ["wild", "snorkel", "sunset"],
      wind:     { it: "Scirocco (SE) — da evitare",                en: "Sirocco (SE) — avoid",             de: "Schirokko (SO) — besser meiden" },
      ideal:    { it: "Fotografia, snorkeling, tramonti",           en: "Photography, snorkeling, sunsets", de: "Fotografie, Schnorcheln, Sonnenuntergänge" },
      services: { it: "Parcheggio a bordo strada, nessun servizio", en: "Roadside parking, no facilities",  de: "Parken am Straßenrand, keine Einrichtungen" },
      map: "https://maps.google.com/?q=Mari+Pintau+Quartu"
    },
    {
      id: "solanas",
      name: "Solanas",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Solanas_beach_in_Sardinia_-_Flickr_-_david.orban.jpg",
      imageCredit: "David Orban — CC BY 2.0 — Wikimedia Commons",
      distance: 35,
      time: 40,
      type: { it: "Spiaggia naturale", en: "Natural beach", de: "Naturstrand" },
      desc: {
        it: "Spiaggia lunga e sabbiosa con dune di macchia mediterranea. Mare spettacolare, meno affollata del Poetto.",
        en: "A long sandy beach backed by Mediterranean scrub dunes. Spectacular water, less crowded than Poetto.",
        de: "Ein langer Sandstrand mit Dünen und mediterraner Macchia. Spektakuläres Wasser, deutlich weniger überlaufen als der Poetto."
      },
      tags: ["wild", "family", "wind"],
      wind:     { it: "Libeccio (SO) — da evitare",         en: "Libeccio (SW) — avoid",          de: "Libeccio (SW) — besser meiden" },
      ideal:    { it: "Relax, lunghe passeggiate, famiglie", en: "Relaxing, long walks, families", de: "Entspannen, lange Spaziergänge, Familien" },
      services: { it: "Bar stagionali, parcheggio",          en: "Seasonal bars, parking",         de: "Saisonale Bars, Parkplatz" },
      map: "https://maps.google.com/?q=Solanas+Sardegna"
    },
    {
      id: "costarei",
      name: "Costa Rei",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Panorama_Costa_Rei.jpg",
      imageCredit: "Alex10 — CC BY-SA 3.0 — Wikimedia Commons",
      distance: 55,
      time: 55,
      type: { it: "Spiaggia paradisiaca", en: "Paradise beach", de: "Traumstrand" },
      desc: {
        it: "Uno dei tratti costieri più belli della Sardegna. Sabbia finissima, mare smeraldo, servizi eccellenti.",
        en: "One of Sardinia's most beautiful stretches of coast. Powder-fine sand, emerald water, excellent facilities.",
        de: "Einer der schönsten Küstenabschnitte Sardiniens. Feinster Sand, smaragdgrünes Wasser, hervorragende Infrastruktur."
      },
      tags: ["calm", "family", "snorkel"],
      wind:     { it: "Maestrale (NO) — ideale",                   en: "Mistral (NW) — ideal",                 de: "Mistral (NW) — ideal" },
      ideal:    { it: "Giornata intera, famiglie, snorkeling",      en: "A full day out, families, snorkeling", de: "Ganzer Tag, Familien, Schnorcheln" },
      services: { it: "Ristoranti, noleggio ombrelloni, parcheggi", en: "Restaurants, umbrella rental, parking", de: "Restaurants, Schirmverleih, Parkplätze" },
      map: "https://maps.google.com/?q=Costa+Rei"
    },
    {
      id: "tuerredda",
      name: "Tuerredda",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tuaredda.jpg",
      imageCredit: "Ilaria — CC BY-SA 2.0 — Wikimedia Commons",
      distance: 65,
      time: 70,
      type: { it: "Spiaggia iconica", en: "Iconic beach", de: "Ikonischer Strand" },
      desc: {
        it: "Considerata una delle spiagge più belle d'Italia. Isolotto smeraldo, sabbia bianchissima, acque cristalline.",
        en: "Considered one of Italy's most beautiful beaches. A little emerald islet, bright white sand, crystal-clear water.",
        de: "Gilt als einer der schönsten Strände Italiens. Ein smaragdgrünes Inselchen, strahlend weißer Sand, kristallklares Wasser."
      },
      tags: ["wild", "snorkel", "sunset"],
      wind:     { it: "Maestrale (NO) — ideale",                    en: "Mistral (NW) — ideal",                     de: "Mistral (NW) — ideal" },
      ideal:    { it: "Snorkeling, foto, tramonti indimenticabili",  en: "Snorkeling, photos, unforgettable sunsets", de: "Schnorcheln, Fotos, unvergessliche Sonnenuntergänge" },
      services: { it: "Bar, noleggio canoe, parcheggio a pagamento", en: "Bar, canoe rental, paid parking",          de: "Bar, Kanuverleih, kostenpflichtiger Parkplatz" },
      map: "https://maps.google.com/?q=Spiaggia+Tuerredda"
    }
  ],

  cagliari: [
    {
      id: "storica",
      title: { it: "Cagliari storica", en: "Historic Cagliari", de: "Das historische Cagliari" },
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Castello_(Cagliari).jpg",
      imageCredit: "Wikimedia Commons — CC BY-SA 3.0",
      label: { it: "Storia", en: "History", de: "Geschichte" },
      text: {
        it: "Perditi nei vicoli di Castello, il quartiere medioevale che domina la città. Visita la Cattedrale di Santa Maria, le Torri Pisane e il Bastione di Saint Remy per una vista mozzafiato.",
        en: "Get lost in the lanes of Castello, the medieval quarter overlooking the city. Visit the Cathedral of Santa Maria, the Pisan towers and the Bastion of Saint Remy for a breathtaking view.",
        de: "Verlieren Sie sich in den Gassen von Castello, dem mittelalterlichen Viertel hoch über der Stadt. Besuchen Sie die Kathedrale Santa Maria, die pisanischen Türme und die Bastione di Saint Remy mit atemberaubendem Ausblick."
      }
    },
    {
      id: "panorami",
      title: { it: "Panorami e belvedere", en: "Views and lookouts", de: "Aussichtspunkte" },
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Bastione_di_San_Remy,_prospetto.jpg",
      imageCredit: "Wikimedia Commons",
      label: { it: "Vista", en: "Views", de: "Ausblick" },
      text: {
        it: "Dal Bastione di Saint Remy al colle di Sant'Elia, Cagliari offre panorami che abbracciano il Golfo degli Angeli. Non perdere il tramonto dal lungomare.",
        en: "From the Bastion of Saint Remy to the Sant'Elia hill, Cagliari offers views spanning the Gulf of Angels. Don't miss sunset along the seafront.",
        de: "Von der Bastione di Saint Remy bis zum Hügel Sant'Elia bietet Cagliari Ausblicke über den ganzen Golfo degli Angeli. Verpassen Sie nicht den Sonnenuntergang an der Uferpromenade."
      }
    },
    {
      id: "mare",
      title: { it: "Il mare in città", en: "The sea in the city", de: "Das Meer in der Stadt" },
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
      label: { it: "Mare", en: "Sea", de: "Meer" },
      text: {
        it: "Il Poetto non è solo una spiaggia: è il salotto di Cagliari. Da maggio a ottobre, la vita cittadina si sposta qui per aperitivi, cene e passeggiate.",
        en: "Poetto isn't just a beach — it's Cagliari's living room. From May to October, city life moves here for drinks, dinner and evening strolls.",
        de: "Der Poetto ist nicht nur ein Strand, sondern das Wohnzimmer Cagliaris. Von Mai bis Oktober verlagert sich das Stadtleben hierher — für Aperitif, Abendessen und Spaziergänge."
      }
    },
    {
      id: "passeggiate",
      title: { it: "Passeggiate autentiche", en: "Authentic walks", de: "Schöne Wanderungen" },
      image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&q=80",
      label: { it: "Natura", en: "Nature", de: "Natur" },
      text: {
        it: "La Sella del Diavolo è un promontorio che separa il Poetto da Calamosca. Un sentiero facile con vista spettacolare sul mare e sulla città.",
        en: "Sella del Diavolo is a headland separating Poetto from Calamosca. An easy trail with a spectacular view over the sea and the city.",
        de: "Die Sella del Diavolo ist eine Landzunge zwischen Poetto und Calamosca. Ein leichter Wanderweg mit spektakulärem Blick auf Meer und Stadt."
      }
    },
    {
      id: "aperitivo",
      title: { it: "Aperitivo e sera", en: "Evening drinks", de: "Aperitif und Abend" },
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80",
      label: { it: "Vita sociale", en: "Nightlife", de: "Nachtleben" },
      text: {
        it: "I locali di Piazza Yenne e Via Sassari sono il cuore della movida cagliaritana. Per un aperitivo più tranquillo, prova i bar del porto.",
        en: "The bars around Piazza Yenne and Via Sassari are the heart of Cagliari's nightlife. For quieter drinks, try the bars by the harbour.",
        de: "Die Lokale an der Piazza Yenne und in der Via Sassari sind das Herz des Cagliaritaner Nachtlebens. Wer es ruhiger mag, probiert die Bars am Hafen."
      }
    },
    {
      id: "archeologia",
      title: { it: "Cagliari romana", en: "Roman Cagliari", de: "Das römische Cagliari" },
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cagliari_Anfiteatro_Romano.jpg",
      imageCredit: "Unukorno — CC BY 3.0 — Wikimedia Commons",
      label: { it: "Archeologia", en: "Archaeology", de: "Archäologie" },
      text: {
        it: "L'Anfiteatro Romano, scavato nella roccia, è quel che resta della Cagliari di età imperiale. L'accesso è stato oggetto di riaperture parziali e lavori di restauro negli ultimi anni: verificate lo stato aggiornato sul sito del Comune di Cagliari prima di programmare la visita.",
        en: "The Roman Amphitheatre, carved into the rock, is what remains of imperial-era Cagliari. Access has been subject to partial reopenings and restoration work in recent years: check the current status on the Comune di Cagliari website before planning your visit.",
        de: "Das in den Fels gehauene römische Amphitheater ist das, was vom kaiserzeitlichen Cagliari geblieben ist. Der Zugang war in den letzten Jahren nur teilweise geöffnet und von Restaurierungsarbeiten betroffen: Prüfen Sie den aktuellen Stand vor Ihrem Besuch auf der Website der Stadt Cagliari."
      }
    },
    {
      id: "autentici",
      title: { it: "Luoghi autentici", en: "Authentic spots", de: "Authentische Orte" },
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
      label: { it: "Cultura", en: "Culture", de: "Kultur" },
      text: {
        it: "Il mercato di San Benedetto è uno dei più grandi d'Europa. Il quartiere di Stampace conserva l'anima popolare della città con le sue botteghe artigiane.",
        en: "San Benedetto market is one of the largest in Europe. The Stampace district keeps the city's popular soul alive with its artisan workshops.",
        de: "Der Markt von San Benedetto ist einer der größten Europas. Das Viertel Stampace bewahrt mit seinen Handwerksläden die volkstümliche Seele der Stadt."
      }
    }
  ],

  mangiare: [
    {
      id: "sapiola",
      name: "Sa Piola",
      type: "sardinian",
      typeLabel: { it: "Consiglio di Angelo e Viviana", en: "Angelo & Viviana's pick", de: "Empfehlung von Angelo und Viviana" },
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      note: {
        it: "Uno dei nostri indirizzi di fiducia, provato di persona. Cucina sarda curata.",
        en: "One of our trusted places, tried in person. Carefully done Sardinian cooking.",
        de: "Eine unserer Stammadressen, persönlich getestet. Sorgfältige sardische Küche."
      },
      price: null, address: null,
      map: "https://maps.google.com/?q=Sa+Piola+Cagliari"
    },
    {
      id: "chiaroscuro",
      name: "ChiaroScuro",
      type: "sardinian",
      typeLabel: { it: "Selezionato con la chef", en: "Picked with our chef friend", de: "Ausgewählt mit unserer Köchin" },
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
      note: {
        it: "Uno dei quattro locali provati insieme alla nostra amica chef, esperta di cucina sarda.",
        en: "One of four places tried together with our chef friend, an expert in Sardinian cuisine.",
        de: "Eines von vier Lokalen, die wir gemeinsam mit unserer befreundeten Köchin, einer Kennerin der sardischen Küche, getestet haben."
      },
      price: null, address: null,
      map: "https://maps.google.com/?q=ChiaroScuro+Cagliari"
    },
    {
      id: "josto",
      name: "Josto",
      type: "sardinian",
      typeLabel: { it: "Selezionato con la chef", en: "Picked with our chef friend", de: "Ausgewählt mit unserer Köchin" },
      image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",
      note: null, price: null, address: null,
      map: "https://maps.google.com/?q=Josto+Cagliari"
    },
    {
      id: "nakoa",
      name: "Nakoa",
      type: "sardinian",
      typeLabel: { it: "Selezionato con la chef", en: "Picked with our chef friend", de: "Ausgewählt mit unserer Köchin" },
      image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=400&q=80",
      note: null, price: null, address: null,
      map: "https://maps.google.com/?q=Nakoa+Cagliari"
    },
    {
      id: "cumbidu",
      name: "Cumbidu",
      type: "special",
      typeLabel: { it: "Circa 30 € a persona", en: "About €30 per person", de: "Etwa 30 € pro Person" },
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&q=80",
      note: null, price: "€€€", address: null,
      map: "https://maps.google.com/?q=Cumbidu+Cagliari"
    },
    {
      id: "anticacagliari",
      name: "Antica Cagliari",
      type: "special",
      typeLabel: { it: "Per una cena speciale", en: "For a special dinner", de: "Für ein besonderes Abendessen" },
      image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80",
      note: null, price: null, address: null,
      map: "https://maps.google.com/?q=Antica+Cagliari"
    }
  ],

  enogastronomia: [
    {
      id: "piatti",
      title: { it: "Piatti tradizionali", en: "Traditional dishes", de: "Traditionelle Gerichte" },
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
      text: {
        it: "Il porceddu (maialetto sardo arrosto), i malloreddus (gnocchetti di semola), la fregola (pasta tipo cous cous), la bottarga di muggine e il pane carasau sono solo alcuni dei pilastri della cucina sarda. Ogni piatto racconta secoli di tradizione pastorale e marinara.",
        en: "Porceddu (roast Sardinian suckling pig), malloreddus (small semolina dumplings), fregola (a couscous-like pasta), mullet bottarga and pane carasau are just some of the pillars of Sardinian cooking. Every dish tells centuries of shepherding and seafaring tradition.",
        de: "Porceddu (sardisches Spanferkel), Malloreddus (kleine Hartweizen-Gnocchi), Fregola (couscousartige Pasta), Meeräschen-Bottarga und Pane Carasau sind nur einige Grundpfeiler der sardischen Küche. Jedes Gericht erzählt von Jahrhunderten Hirten- und Seefahrertradition."
      }
    },
    {
      id: "vini",
      title: { it: "Vini sardi", en: "Sardinian wines", de: "Sardische Weine" },
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&q=80",
      text: {
        it: "Il Cannonau (parente del Grenache), il Vermentino di Gallura, il Carignano del Sulcis e il Nuragus sono i grandi vini dell'isola. Non perdete il Mirto, il liquore ai mirti selvatici che chiude ogni pasto sardo.",
        en: "Cannonau (a relative of Grenache), Vermentino di Gallura, Carignano del Sulcis and Nuragus are the island's great wines. Don't miss Mirto, the wild-myrtle liqueur that closes every Sardinian meal.",
        de: "Cannonau (mit dem Grenache verwandt), Vermentino di Gallura, Carignano del Sulcis und Nuragus sind die großen Weine der Insel. Probieren Sie unbedingt Mirto, den Likör aus wilden Myrtenbeeren, der jedes sardische Essen abschließt."
      }
    },
    {
      id: "prodotti",
      title: { it: "Prodotti tipici", en: "Local products", de: "Regionale Spezialitäten" },
      image: "https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80",
      text: {
        it: "Formaggi pecorini stagionati, miele di corbezzolo, olio extravergine di oliva Biancolilla, carciofi spinosi di Sardegna e i dolci a base di mandorle come gli amaretti e le pardulas.",
        en: "Aged pecorino cheeses, strawberry-tree honey, Biancolilla extra virgin olive oil, Sardinian spiny artichokes, and almond-based sweets like amaretti and pardulas.",
        de: "Gereifte Pecorino-Käse, Erdbeerbaumhonig, natives Olivenöl extra der Sorte Biancolilla, sardische Stachelartischocken und Mandelgebäck wie Amaretti und Pardulas."
      }
    },
    {
      id: "dolci",
      title: { it: "Dolci sardi", en: "Sardinian sweets", de: "Sardische Süßspeisen" },
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
      text: {
        it: "Le seadas (ravioli fritti con miele e formaggio), le pardulas (tartellette con ricotta e zafferano), gli amaretti e il torrone sardo. Ogni festa ha il suo dolce tradizionale.",
        en: "Seadas (fried pastries with honey and cheese), pardulas (ricotta and saffron tartlets), amaretti, and Sardinian torrone. Every festival has its own traditional sweet.",
        de: "Seadas (frittierte Teigtaschen mit Honig und Käse), Pardulas (Törtchen mit Ricotta und Safran), Amaretti und sardischer Torrone. Jedes Fest hat seine eigene traditionelle Süßspeise."
      }
    },
    {
      id: "esperienze",
      title: { it: "Esperienze gastronomiche", en: "Food experiences", de: "Kulinarische Erlebnisse" },
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
      text: {
        it: "Visitate il mercato di San Benedetto al mattino presto, partecipate a una cena in masseria o prenotate una degustazione di vini in una cantina del Sulcis. La Sardegna si gusta lentamente.",
        en: "Visit San Benedetto market early in the morning, join a farmhouse dinner, or book a wine tasting at a Sulcis winery. Sardinia is meant to be savoured slowly.",
        de: "Besuchen Sie früh am Morgen den Markt von San Benedetto, nehmen Sie an einem Abendessen auf einem Landgut teil oder buchen Sie eine Weinprobe in einem Weingut im Sulcis. Sardinien genießt man langsam."
      }
    }
  ],

  muoversi: {
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
    items: [
      { icon: "✈️", title: { it: "Dall'aeroporto", en: "From the airport", de: "Vom Flughafen" },
        desc: { it: "Aeroporto di Cagliari-Elmas a 10 km. Taxi circa 25 €, bus linea 10 o metropolitana leggera.",
                en: "Cagliari-Elmas airport is 10 km away. Taxi about €25, bus line 10, or the light metro.",
                de: "Der Flughafen Cagliari-Elmas liegt 10 km entfernt. Taxi ca. 25 €, Buslinie 10 oder die Stadtbahn." } },
      { icon: "🚗", title: { it: "Auto", en: "Car", de: "Auto" },
        desc: { it: "Consigliata per esplorare le spiagge del sud. Parcheggio disponibile sotto casa.",
                en: "Recommended for exploring the southern beaches. Parking available right by the house.",
                de: "Empfehlenswert, um die Strände im Süden zu erkunden. Parkplatz direkt am Haus vorhanden." } },
      { icon: "🚌", title: { it: "Bus urbani", en: "City buses", de: "Stadtbusse" },
        desc: { it: "CTM Cagliari. Biglietto 1,30 € (90 minuti). L'app «CTM Cagliari» è utile per gli orari.",
                en: "Run by CTM Cagliari. Ticket €1.30 (90 minutes). The 'CTM Cagliari' app is handy for timetables.",
                de: "Betrieben von CTM Cagliari. Fahrschein 1,30 € (90 Minuten). Die App „CTM Cagliari“ hilft bei den Fahrplänen." } },
      { icon: "🚊", title: { it: "Metropolitana leggera", en: "Light rail", de: "Stadtbahn" },
        desc: { it: "Collega Pirri al centro e all'aeroporto. Frequente ed economica.",
                en: "Links Pirri to the city centre and the airport. Frequent and cheap.",
                de: "Verbindet Pirri mit dem Zentrum und dem Flughafen. Dichter Takt und günstig." } },
      { icon: "🚕", title: { it: "Taxi e app", en: "Taxi and apps", de: "Taxi und Apps" },
        desc: { it: "AppTaxi e FreeNow funzionano a Cagliari. Radio Taxi: +39 070 400101.",
                en: "AppTaxi and FreeNow work in Cagliari. Radio Taxi: +39 070 400101.",
                de: "AppTaxi und FreeNow funktionieren in Cagliari. Funktaxi: +39 070 400101." } },
      { icon: "🚲", title: { it: "Bici", en: "Bike", de: "Fahrrad" },
        desc: { it: "Noleggio bici al Poetto (da aprile a ottobre). Piste ciclabili in espansione.",
                en: "Bike rental at Poetto (April to October). The cycle-path network is expanding.",
                de: "Fahrradverleih am Poetto (April bis Oktober). Das Radwegenetz wird ausgebaut." } }
    ]
  },

  info: {
    items: [
      { icon: "🏥", title: { it: "Emergenze", en: "Emergencies", de: "Notrufe" },
        value: { it: "112 (numero unico europeo) · 118 (emergenza medica) · 113 (polizia) · 115 (vigili del fuoco)",
                 en: "112 (single European emergency number) · 118 (medical) · 113 (police) · 115 (fire brigade)",
                 de: "112 (europäische Notrufnummer) · 118 (Rettungsdienst) · 113 (Polizei) · 115 (Feuerwehr)" } },
      { icon: "💊", title: { it: "Farmacia", en: "Pharmacy", de: "Apotheke" },
        value: { it: "Farmacia Pirri Centro, Via dei Grilli 23. Il turno notturno è indicato in vetrina.",
                 en: "Farmacia Pirri Centro, Via dei Grilli 23. The night-duty pharmacy is posted on the door.",
                 de: "Farmacia Pirri Centro, Via dei Grilli 23. Der Nachtdienst hängt am Schaufenster aus." } },
      { icon: "🏧", title: { it: "Bancomat", en: "ATM", de: "Geldautomat" },
        value: { it: "Intesa Sanpaolo e UniCredit in Via dei Grilli, a 200 m.",
                 en: "Intesa Sanpaolo and UniCredit on Via dei Grilli, 200 m away.",
                 de: "Intesa Sanpaolo und UniCredit in der Via dei Grilli, 200 m entfernt." } },
      { icon: "🛒", title: { it: "Supermercato", en: "Supermarket", de: "Supermarkt" },
        value: { it: "Conad e Lidl in Via Is Mirrionis, aperti fino alle 20:30.",
                 en: "Conad and Lidl on Via Is Mirrionis, open until 8:30 PM.",
                 de: "Conad und Lidl in der Via Is Mirrionis, geöffnet bis 20:30 Uhr." } },
      { icon: "⛽", title: { it: "Benzinaio", en: "Petrol station", de: "Tankstelle" },
        value: { it: "IP a 400 m in Via della Pineta, aperto 24 ore su 24.",
                 en: "IP station 400 m away on Via della Pineta, open 24 hours.",
                 de: "IP-Tankstelle 400 m entfernt in der Via della Pineta, rund um die Uhr geöffnet." } },
      { icon: "🗑️", title: { it: "Raccolta differenziata", en: "Recycling", de: "Mülltrennung" },
        value: { it: "Carta, plastica, vetro, umido. Il calendario è appeso in cucina.",
                 en: "Paper, plastic, glass, organic. The collection schedule is posted in the kitchen.",
                 de: "Papier, Plastik, Glas, Bioabfall. Der Abfuhrkalender hängt in der Küche." } },
      { icon: "🐕", title: { it: "Veterinario", en: "Vet", de: "Tierarzt" },
        value: { it: "Ambulatorio Veterinario Pirri, Via Santa Gilla 12.",
                 en: "Ambulatorio Veterinario Pirri, Via Santa Gilla 12.",
                 de: "Ambulatorio Veterinario Pirri, Via Santa Gilla 12." } }
    ]
  },

  vento: {
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    description: {
      it: "Il vento in Sardegna determina la qualità della giornata in spiaggia. Ecco una guida pratica:",
      en: "Wind direction shapes how good a beach day will be in Sardinia. Here's a practical guide:",
      de: "In Sardinien entscheidet der Wind darüber, wie gut ein Strandtag wird. Hier eine praktische Orientierung:"
    },
    winds: [
      { name: "Maestrale · Mistral", dir: "NO / NW", icon: "🌬️",
        effect: { it: "Ideale per tutte le spiagge orientali. Poetto, Costa Rei e Tuerredda al top.",
                  en: "Ideal for all the eastern beaches. Poetto, Costa Rei and Tuerredda at their best.",
                  de: "Ideal für alle Strände im Osten. Poetto, Costa Rei und Tuerredda zeigen sich von ihrer besten Seite." } },
      { name: "Scirocco", dir: "SE / SO", icon: "🌡️",
        effect: { it: "Meglio evitare le spiagge orientali. Preferite Solanas, Chia o la costa occidentale.",
                  en: "Better to avoid the eastern beaches. Solanas, Chia or the west coast are the safer choice.",
                  de: "Strände im Osten besser meiden. Solanas, Chia oder die Westküste sind die bessere Wahl." } },
      { name: "Libeccio", dir: "SO / SW", icon: "🌊",
        effect: { it: "Mare agitato a sud-ovest. Meglio spiagge protette come Calamosca o Cala Regina.",
                  en: "Rough sea to the south-west. Sheltered beaches like Calamosca or Cala Regina are safer bets.",
                  de: "Raue See im Südwesten. Geschützte Buchten wie Calamosca oder Cala Regina sind sicherer." } },
      { name: "Tramontana", dir: "N", icon: "❄️",
        effect: { it: "Vento fresco e secco. Ottimo per tutte le spiagge, mare cristallino.",
                  en: "Cool, dry wind. Great for every beach, with crystal-clear water.",
                  de: "Kühler, trockener Wind. Gut für alle Strände, das Wasser wird kristallklar." } }
    ]
  },

  /* ------------------------------------------------------------
     EVENTI E SAGRE — da rivedere ogni mese.
     Le date qui sotto risalgono all'estate 2026. Quando sono tutte
     passate la guida lo dice esplicitamente all'ospite, invece di
     mostrare una pagina vuota — ma la sezione resta da riempire.
     ------------------------------------------------------------ */
  eventi: [
    {
      id: "carmine2026",
      name: "Carmine 2026",
      image: "https://images.unsplash.com/photo-1503095392237-fc55088350b5?w=800&q=80",
      dateStart: "2026-06-19", dateEnd: "2026-09-12", time: "19:30",
      location: "Piazza del Carmine", comune: "Cagliari",
      category: "cultura",
      price: { it: "Gratuito", en: "Free", de: "Kostenlos" },
      description: {
        it: "Rassegna estiva di teatro, musica, circo contemporaneo e spettacoli per famiglie. Un appuntamento fisso della cultura cagliaritana, nello scenario di Piazza del Carmine.",
        en: "A summer season of theatre, music, contemporary circus and family shows. A fixture of Cagliari's cultural calendar, staged in Piazza del Carmine.",
        de: "Eine sommerliche Reihe mit Theater, Musik, zeitgenössischem Zirkus und Familienvorstellungen. Ein fester Termin im Kulturkalender Cagliaris auf der Piazza del Carmine."
      },
      tags: ["cultura", "famiglie", "musica"],
      map: "https://maps.google.com/?q=Piazza+del+Carmine+Cagliari",
      website: "https://www.cagliariturismo.it",
      source: "Comune di Cagliari / Cagliari Turismo",
      verified: "2026-08-29"
    },
    {
      id: "simuove2026",
      name: "Festival «Si muove la città»",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
      dateStart: "2026-06-11", dateEnd: "2026-09-10",
      time: { it: "Vari orari", en: "Various times", de: "Verschiedene Uhrzeiten" },
      location: "Quartieri di Cagliari", comune: "Cagliari",
      category: "cultura",
      price: { it: "Gratuito", en: "Free", de: "Kostenlos" },
      description: {
        it: "Festival diffuso nei quartieri cittadini, con spettacoli di teatro, danza, musica e arti di strada. Eventi in diverse location per tutta l'estate.",
        en: "A festival spread across the city's neighbourhoods, with theatre, dance, music and street arts. Events in different locations all summer long.",
        de: "Ein über die Stadtviertel verteiltes Festival mit Theater, Tanz, Musik und Straßenkunst. Den ganzen Sommer über Veranstaltungen an verschiedenen Orten."
      },
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
      dateStart: "2026-08-27", dateEnd: "2026-09-10",
      time: { it: "Vari orari", en: "Various times", de: "Verschiedene Uhrzeiten" },
      location: "Parco Molentargius", comune: "Quartu Sant'Elena",
      category: "musica",
      price: { it: "Gratuito", en: "Free", de: "Kostenlos" },
      description: {
        it: "Concerti, spettacoli teatrali e attività culturali nel Parco Naturale Regionale Molentargius-Saline, tra fenicotteri rosa e lagune salmastre.",
        en: "Concerts, theatre and cultural events in the Molentargius-Saline regional nature park, among pink flamingos and salt lagoons.",
        de: "Konzerte, Theater und Kulturveranstaltungen im Regionalen Naturpark Molentargius-Saline, zwischen rosa Flamingos und Salzlagunen."
      },
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
      dateStart: "2026-09-04", dateEnd: "2026-09-04", time: "19:30",
      location: "Barumini", comune: "Barumini",
      category: "enogastronomia",
      price: { it: "Da verificare", en: "To be confirmed", de: "Noch zu bestätigen" },
      description: {
        it: "Appuntamento enogastronomico e musicale nel cuore della Marmilla, a due passi dal sito UNESCO di Su Nuraxi. Birra artigianale, cibo locale e musica dal vivo.",
        en: "A food, drink and music event in the heart of the Marmilla, a short walk from the UNESCO site of Su Nuraxi. Craft beer, local food and live music.",
        de: "Ein Genuss- und Musikevent im Herzen der Marmilla, nur einen Steinwurf von der UNESCO-Stätte Su Nuraxi entfernt. Craft-Bier, regionale Küche und Live-Musik."
      },
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
      dateStart: "2026-08-28", dateEnd: "2026-09-07",
      time: { it: "Vari orari", en: "Various times", de: "Verschiedene Uhrzeiten" },
      location: "Cabras", comune: "Cabras (OR)",
      category: "feste",
      price: { it: "Gratuito", en: "Free", de: "Kostenlos" },
      description: {
        it: "Una delle feste tradizionali più suggestive della Sardegna: i corridori scalzi percorrono di corsa i 7 km che separano Cabras dalla chiesa campestre di San Salvatore, portando in spalla la statua del Santo.",
        en: "One of Sardinia's most striking traditional festivals: barefoot runners cover the 7 km between Cabras and the country church of San Salvatore, carrying the statue of the saint on their shoulders.",
        de: "Eines der eindrucksvollsten traditionellen Feste Sardiniens: Barfußläufer legen die 7 km zwischen Cabras und der Landkirche San Salvatore im Laufschritt zurück und tragen dabei die Statue des Heiligen auf den Schultern."
      },
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
      dateNote: { it: "Ultima domenica di settembre", en: "Last Sunday in September", de: "Letzter Sonntag im September" },
      location: "Selargius", comune: "Selargius",
      category: "feste",
      price: { it: "Gratuito", en: "Free", de: "Kostenlos" },
      description: {
        it: "Rievocazione storica del matrimonio tradizionale campidanese, con costumi d'epoca, canti, balli e banchetto rituale. Un tuffo nelle tradizioni della Sardegna.",
        en: "A historical re-enactment of the traditional Campidano wedding, with period costumes, songs, dancing and a ritual banquet. A plunge into Sardinian tradition.",
        de: "Historische Nachstellung der traditionellen Hochzeit im Campidano, mit historischen Trachten, Gesang, Tanz und rituellem Festmahl. Ein Eintauchen in sardische Traditionen."
      },
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
      dateNote: { it: "Settembre (date da confermare)", en: "September (dates to be confirmed)", de: "September (Termine noch offen)" },
      location: "Villaggio Pescatori (Giorgino)", comune: "Cagliari",
      category: "enogastronomia",
      price: { it: "A pagamento", en: "Paid entry", de: "Kostenpflichtig" },
      description: {
        it: "La tradizionale sagra del pesce nel Villaggio Pescatori di Giorgino, con pesce fresco cucinato sul momento, musica e atmosfera marinara.",
        en: "The traditional fish festival in the Giorgino fishing village, with fresh fish cooked on the spot, music and a seafaring atmosphere.",
        de: "Das traditionelle Fischfest im Fischerdorf Giorgino, mit frisch zubereitetem Fisch, Musik und maritimer Atmosphäre."
      },
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
      dateNote: { it: "Settembre (date da confermare)", en: "September (dates to be confirmed)", de: "September (Termine noch offen)" },
      location: "Quartu Sant'Elena", comune: "Quartu Sant'Elena",
      category: "enogastronomia",
      price: { it: "Gratuito / a pagamento", en: "Free / paid", de: "Kostenlos / kostenpflichtig" },
      description: {
        it: "Festa dell'uva e del vino nel centro storico di Quartu Sant'Elena, con stand enogastronomici, mostre e intrattenimento per famiglie.",
        en: "A grape and wine festival in the old centre of Quartu Sant'Elena, with food and wine stalls, exhibitions and family entertainment.",
        de: "Trauben- und Weinfest in der Altstadt von Quartu Sant'Elena, mit Verkostungsständen, Ausstellungen und Programm für Familien."
      },
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
      dateNote: { it: "Ultima domenica di settembre", en: "Last Sunday in September", de: "Letzter Sonntag im September" },
      location: "Decimomannu", comune: "Decimomannu",
      category: "feste",
      price: { it: "Gratuito", en: "Free", de: "Kostenlos" },
      description: {
        it: "Festa religiosa e popolare in onore di Santa Greca, con processione, canti tradizionali e stand gastronomici. Un evento radicato nella devozione campidanese.",
        en: "A religious and popular festival in honour of Saint Greca, with a procession, traditional singing and food stalls. An event rooted in Campidano devotion.",
        de: "Religiöses Volksfest zu Ehren der heiligen Greca, mit Prozession, traditionellem Gesang und Essensständen. Eine tief in der Frömmigkeit des Campidano verwurzelte Veranstaltung."
      },
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
      period: { it: "Età punica (VI–II sec. a.C.)", en: "Punic period (6th–2nd c. BC)", de: "Punische Zeit (6.–2. Jh. v. Chr.)" },
      whyVisit: {
        it: "La più grande necropoli punica dell'intero Mediterraneo, scavata nella roccia calcarea della collina di Tuvixeddu. Tombe a pozzo e camere sepolcrali testimoniano la presenza cartaginese a Cagliari.",
        en: "The largest Punic necropolis in the whole Mediterranean, cut into the limestone of the Tuvixeddu hill. Shaft tombs and burial chambers bear witness to the Carthaginian presence in Cagliari.",
        de: "Die größte punische Nekropole des gesamten Mittelmeerraums, in den Kalkstein des Hügels Tuvixeddu geschlagen. Schachtgräber und Grabkammern zeugen von der karthagischen Präsenz in Cagliari."
      },
      distance:  { it: "In città",       en: "In the city",  de: "Innerhalb der Stadt" },
      visitTime: { it: "1–2 ore",        en: "1–2 hours",    de: "1–2 Stunden" },
      hours:     { it: "05:30–22:30 (sempre aperto)", en: "5:30 AM–10:30 PM (always open)", de: "05:30–22:30 Uhr (durchgehend geöffnet)" },
      price:     { it: "Gratuito",       en: "Free",         de: "Kostenlos" },
      booking:   { it: "Non necessaria", en: "Not required", de: "Nicht erforderlich" },
      website: "https://www.comune.cagliari.it",
      map: "https://maps.google.com/?q=Necropoli+Tuvixeddu+Cagliari",
      source: "Comune di Cagliari / Wikipedia",
      verified: "2026-08-29"
    },
    {
      id: "nora",
      name: "Area Archeologica di Nora",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Archaeological_site_Nora_-_Pula_-_Sardinia_-_Italy_-_17.jpg",
      imageCredit: "Norbert Nagel — CC BY-SA 3.0 — Wikimedia Commons",
      period: { it: "Fenicia, punica, romana (VIII sec. a.C.–V sec. d.C.)",
                en: "Phoenician, Punic, Roman (8th c. BC–5th c. AD)",
                de: "Phönizisch, punisch, römisch (8. Jh. v. Chr.–5. Jh. n. Chr.)" },
      whyVisit: {
        it: "Una delle città antiche più affascinanti della Sardegna: teatro romano, terme, mosaici e il famoso tempio di Tanit. Il sito si trova su un promontorio con vista mozzafiato sul mare.",
        en: "One of Sardinia's most captivating ancient cities: a Roman theatre, baths, mosaics and the famous temple of Tanit. The site sits on a headland with a breathtaking sea view.",
        de: "Eine der faszinierendsten antiken Städte Sardiniens: römisches Theater, Thermen, Mosaike und der berühmte Tanit-Tempel. Die Anlage liegt auf einer Landzunge mit atemberaubendem Meerblick."
      },
      distance:  { it: "~35 km (40 min)", en: "~35 km (40 min)", de: "ca. 35 km (40 Min.)" },
      visitTime: { it: "2–3 ore",         en: "2–3 hours",       de: "2–3 Stunden" },
      hours:     { it: "09:00–20:30 (estate)", en: "9:00 AM–8:30 PM (summer)", de: "09:00–20:30 Uhr (Sommer)" },
      price:     { it: "5 € / ridotto 2,50 €", en: "€5 / reduced €2.50", de: "5 € / ermäßigt 2,50 €" },
      booking:   { it: "Consigliata in alta stagione", en: "Recommended in high season", de: "In der Hochsaison empfohlen" },
      website: "https://www.areaarcheologicanora.it",
      map: "https://maps.google.com/?q=Area+Archeologica+Nora+Pula",
      source: "Area Archeologica Nora (sito ufficiale)",
      verified: "2026-08-29"
    },
    {
      id: "sunuraxi",
      name: "Su Nuraxi di Barumini",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nuraghe_Su_Nuraxi_-_Barumini_-_Sardinia_-_Italy_-_30.jpg",
      imageCredit: "Norbert Nagel — CC BY-SA 3.0 — Wikimedia Commons",
      period: { it: "Età nuragica (XVI–VI sec. a.C.)", en: "Nuragic period (16th–6th c. BC)", de: "Nuraghenzeit (16.–6. Jh. v. Chr.)" },
      whyVisit: {
        it: "Patrimonio UNESCO dal 1997, è il nuraghe più importante e meglio conservato della Sardegna. Un complesso fortificato con torre centrale, cortili e capanne che raccontano 3.500 anni di storia.",
        en: "A UNESCO World Heritage Site since 1997, this is the most important and best-preserved nuraghe in Sardinia. A fortified complex with a central tower, courtyards and huts telling 3,500 years of history.",
        de: "Seit 1997 UNESCO-Welterbe und die bedeutendste, am besten erhaltene Nuraghe Sardiniens. Eine befestigte Anlage mit Zentralturm, Höfen und Hütten, die 3.500 Jahre Geschichte erzählen."
      },
      distance:  { it: "~60 km (55 min)", en: "~60 km (55 min)", de: "ca. 60 km (55 Min.)" },
      visitTime: { it: "1,5 ore",         en: "1.5 hours",       de: "1,5 Stunden" },
      hours:     { it: "09:00–19:30 (estate)", en: "9:00 AM–7:30 PM (summer)", de: "09:00–19:30 Uhr (Sommer)" },
      price:     { it: "15 € / 13–17 anni 12 € / 7–12 anni 9 € (verificare su fondazionebarumini.it)",
                   en: "€15 / ages 13–17 €12 / ages 7–12 €9 (check on fondazionebarumini.it)",
                   de: "15 € / 13–17 Jahre 12 € / 7–12 Jahre 9 € (bitte auf fondazionebarumini.it prüfen)" },
      booking:   { it: "Consigliata online", en: "Booking online recommended", de: "Online-Buchung empfohlen" },
      website: "https://www.su-nuraxi.it",
      map: "https://maps.google.com/?q=Su+Nuraxi+Barumini",
      source: "Fondazione Barumini / UNESCO",
      verified: "2026-08-29"
    },
    {
      id: "santavittoria",
      name: "Santuario Nuragico di Santa Vittoria",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Serri_,_Santuario_Nuragico_Santa_Vittoria._4.JPG",
      imageCredit: "Daniela Serra — CC BY-SA 3.0 — Wikimedia Commons",
      period: { it: "Età nuragica (Bronzo medio–recente)", en: "Nuragic period (Middle–Late Bronze Age)", de: "Nuraghenzeit (mittlere bis späte Bronzezeit)" },
      whyVisit: {
        it: "Uno dei più importanti santuari nuragici del Sud Sardegna, con il tempio a pozzo, l'area delle offerte e le capanne del villaggio. Un luogo di grande suggestione archeologica.",
        en: "One of the most important Nuragic sanctuaries in southern Sardinia, with its well temple, offering area and village huts. An archaeologically evocative place.",
        de: "Eines der bedeutendsten nuraghischen Heiligtümer Südsardiniens, mit Brunnentempel, Opferbereich und Dorfhütten. Ein archäologisch überaus stimmungsvoller Ort."
      },
      distance:  { it: "~70 km (1 h 10 min)", en: "~70 km (1 h 10 min)", de: "ca. 70 km (1 Std. 10 Min.)" },
      visitTime: { it: "1,5 ore",         en: "1.5 hours",    de: "1,5 Stunden" },
      hours:     { it: "09:00–19:00 (estate)", en: "9:00 AM–7:00 PM (summer)", de: "09:00–19:00 Uhr (Sommer)" },
      price:     { it: "5 € / ridotto 2,50 €", en: "€5 / reduced €2.50", de: "5 € / ermäßigt 2,50 €" },
      booking:   { it: "Non necessaria",  en: "Not required", de: "Nicht erforderlich" },
      website: "https://www.sardegnaturismo.it",
      map: "https://maps.google.com/?q=Santuario+Santa+Vittoria+Serri",
      source: "MIC / SardegnaTurismo",
      verified: "2026-08-29"
    },
    {
      id: "anfiteatro",
      name: "Anfiteatro Romano di Cagliari",
      image: "https://commons.wikimedia.org/wiki/Special:FilePath/Cagliari_Anfiteatro_Romano.jpg",
      imageCredit: "Unukorno — CC BY 3.0 — Wikimedia Commons",
      period: { it: "Età romana (II sec. d.C.)", en: "Roman period (2nd c. AD)", de: "Römische Zeit (2. Jh. n. Chr.)" },
      whyVisit: {
        it: "Scavato nella roccia calcarea del colle di Buoncammino, è uno degli anfiteatri romani meglio conservati della Sardegna: poteva ospitare fino a 10.000 spettatori. Il sito è stato oggetto di riaperture parziali e lavori negli ultimi anni, quindi verificate gli orari aggiornati prima della visita.",
        en: "Carved into the limestone of the Buoncammino hill, this is one of the best-preserved Roman amphitheatres in Sardinia: it could hold up to 10,000 spectators. The site has seen partial reopenings and works in recent years, so check current opening hours before visiting.",
        de: "In den Kalkstein des Hügels Buoncammino geschlagen, zählt es zu den besterhaltenen römischen Amphitheatern Sardiniens: Es bot bis zu 10.000 Zuschauern Platz. In den letzten Jahren war die Anlage nur zeitweise geöffnet — prüfen Sie daher vor dem Besuch die aktuellen Öffnungszeiten."
      },
      distance:  { it: "In città",  en: "In the city", de: "Innerhalb der Stadt" },
      visitTime: { it: "45 min",    en: "45 min",      de: "45 Min." },
      hours:     { it: "Verificare le aperture aggiornate sul sito del Comune di Cagliari",
                   en: "Check current opening times on the Comune di Cagliari website",
                   de: "Aktuelle Öffnungszeiten auf der Website der Stadt Cagliari prüfen" },
      price:     { it: "3 € / riduzioni disponibili", en: "€3 / reductions available", de: "3 € / Ermäßigungen möglich" },
      booking:   { it: "Non necessaria", en: "Not required", de: "Nicht erforderlich" },
      website: "https://www.comune.cagliari.it",
      map: "https://maps.google.com/?q=Anfiteatro+Romano+Cagliari",
      source: "Comune di Cagliari / Wikipedia",
      verified: "2026-08-29"
    },
    {
      id: "isconcias",
      name: "Tomba dei Giganti Is Concias",
      period: { it: "Età del Bronzo medio–recente", en: "Middle–Late Bronze Age", de: "Mittlere bis späte Bronzezeit" },
      whyVisit: {
        it: "Una delle tombe dei giganti meglio conservate del Cagliaritano, immersa nel verde del massiccio dei Sette Fratelli. L'esedra e la stele centrale sono impressionanti.",
        en: "One of the best-preserved giants' tombs in the Cagliari area, set in the greenery of the Sette Fratelli massif. The exedra and central stele are striking.",
        de: "Eines der besterhaltenen Gigantengräber im Raum Cagliari, eingebettet ins Grün des Sette-Fratelli-Massivs. Exedra und zentrale Stele sind beeindruckend."
      },
      distance:  { it: "~25 km (30 min)", en: "~25 km (30 min)", de: "ca. 25 km (30 Min.)" },
      visitTime: { it: "1 ora",           en: "1 hour",          de: "1 Stunde" },
      hours:     { it: "Accesso libero dall'esterno", en: "Freely accessible from outside", de: "Frei zugänglich von außen" },
      price:     { it: "Gratuito",        en: "Free",            de: "Kostenlos" },
      booking:   { it: "Non necessaria",  en: "Not required",    de: "Nicht erforderlich" },
      website: "https://www.sardegnaturismo.it",
      map: "https://maps.google.com/?q=Tomba+dei+Giganti+Is+Concias+Quartucciu",
      source: "SardegnaTurismo / Wikimedia Commons",
      verified: "2026-08-29"
    }
  ],

  fonti: {
    text: {
      it: "Questa guida è curata personalmente dagli host di Piccolabellavista. Le fotografie della casa sono nostre; le altre immagini sono usate sotto licenza Unsplash o Wikimedia Commons (CC BY / CC BY-SA), con l'attribuzione indicata su ciascuna. Eventi e sagre sono verificati alla data riportata su ogni scheda: prima di mettervi in viaggio, un controllo sul sito ufficiale è sempre una buona idea.",
      en: "This guide is put together personally by the hosts of Piccolabellavista. The photos of the house are our own; other images are used under an Unsplash or Wikimedia Commons licence (CC BY / CC BY-SA), credited on each picture. Events and festivals were verified on the date shown on each card: before setting off, it is always worth checking the official website.",
      de: "Diesen Reiseführer stellen die Gastgeber von Piccolabellavista persönlich zusammen. Die Fotos der Wohnung stammen von uns; die übrigen Bilder werden unter Unsplash- oder Wikimedia-Commons-Lizenz (CC BY / CC BY-SA) verwendet und sind jeweils einzeln nachgewiesen. Veranstaltungen und Feste wurden zu dem auf der jeweiligen Karte angegebenen Datum geprüft: Vor der Fahrt lohnt sich immer ein Blick auf die offizielle Website."
    },
    credits: [
      { it: "Dati meteorologici: Open-Meteo",  en: "Weather data: Open-Meteo",      de: "Wetterdaten: Open-Meteo" },
      { it: "Mappe: Google Maps",              en: "Maps: Google Maps",             de: "Karten: Google Maps" },
      { it: "Icone: Lucide (SVG)",             en: "Icons: Lucide (SVG)",           de: "Symbole: Lucide (SVG)" },
      { it: "Fotografie della casa: gli host", en: "Photos of the house: the hosts", de: "Fotos der Wohnung: die Gastgeber" },
      { it: "Fotografie generiche: Unsplash",  en: "Stock photography: Unsplash",   de: "Stockfotos: Unsplash" },
      { it: "Spiagge e archeologia: Wikimedia Commons (Nagel, Serra, Orestano, Unukorno, Espiña Fernandez, Orban, Alex10)",
        en: "Beaches and archaeology: Wikimedia Commons (Nagel, Serra, Orestano, Unukorno, Espiña Fernandez, Orban, Alex10)",
        de: "Strände und Archäologie: Wikimedia Commons (Nagel, Serra, Orestano, Unukorno, Espiña Fernandez, Orban, Alex10)" },
      { it: "Eventi: Comune di Cagliari, Cagliari Turismo, Eventi in Sardegna, Sardegna Point",
        en: "Events: Comune di Cagliari, Cagliari Turismo, Eventi in Sardegna, Sardegna Point",
        de: "Veranstaltungen: Comune di Cagliari, Cagliari Turismo, Eventi in Sardegna, Sardegna Point" },
      { it: "Sagre: Sardegna Point, Itinerari nel Gusto", en: "Local festivals: Sardegna Point, Itinerari nel Gusto", de: "Volksfeste: Sardegna Point, Itinerari nel Gusto" },
      { it: "Siti archeologici: Area Archeologica Nora, Fondazione Barumini, MIC, SardegnaTurismo",
        en: "Archaeological sites: Area Archeologica Nora, Fondazione Barumini, MIC, SardegnaTurismo",
        de: "Archäologische Stätten: Area Archeologica Nora, Fondazione Barumini, MIC, SardegnaTurismo" }
    ]
  }
};
