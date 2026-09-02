/* ============================================================
   Piccolabellavista — Traduzioni  ·  v4.0
   ============================================================
   Le stringhe sono in una tabella unica: ogni chiave porta le tre
   lingue affiancate, nell'ordine [ italiano, inglese, tedesco ].

   È voluto: nella versione precedente le lingue erano tre oggetti
   separati e alcune chiavi esistevano solo in uno dei tre, così
   l'ospite si ritrovava a leggere "weather" o "openMap" al posto
   del testo. Con una riga per chiave, una traduzione mancante si
   vede a colpo d'occhio mentre si scrive.

   Per aggiungere una lingua: allunga LANGS e aggiungi un elemento
   a ogni riga della tabella.
   ============================================================ */

/* Accesso a localStorage a prova di eccezione.
   Safari in navigazione privata, e qualunque browser con i dati di
   sito bloccati, lanciano un'eccezione al solo tentativo di lettura.
   Senza questa protezione lo script si interrompeva qui e l'intera
   guida non partiva. Le funzioni sono globali: le usa anche app.js. */
function safeGet(key) {
  try { return localStorage.getItem(key); } catch (e) { return null; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch (e) { /* ignorato di proposito */ }
}

const LANGS = ['it', 'en', 'de'];

const STRINGS = {
    nav_home: ["Home", "Home", "Home"],
    nav_spiagge: ["Spiagge", "Beaches", "Strände"],
    nav_cagliari: ["Cagliari", "Cagliari", "Cagliari"],
    nav_mangiare: ["Dove mangiare", "Where to eat", "Essen"],
    nav_eno: ["Enogastronomia", "Food & Wine", "Kulinarik"],
    nav_eventi: ["Eventi", "Events", "Veranstaltungen"],
    nav_altro: ["Altro", "More", "Mehr"],
    nav_menu: ["Menu", "Menu", "Menü"],
    nav_fonti: ["Fonti e credits", "Sources & credits", "Quellen"],
    foot_private: ["Guida privata", "Private guide", "Privater Guide"],
    eventi_title: ["Cosa succede in questi giorni?", "What's on right now?", "Was passiert in diesen Tagen?"],
    eventi_subtitle: ["Eventi, sagre, archeologia e cultura", "Events, festivals, archaeology and culture", "Veranstaltungen, Feste, Archäologie und Kultur im Süden Sardiniens"],
    eventi_filter_all: ["Tutti", "All", "Alle"],
    eventi_filter_cultura: ["Cultura", "Culture", "Kultur"],
    eventi_filter_musica: ["Musica", "Music", "Musik"],
    eventi_filter_famiglie: ["Famiglie", "Families", "Familien"],
    eventi_filter_eno: ["Enogastronomia", "Food & Wine", "Kulinarik"],
    eventi_filter_sagre: ["Sagre", "Local festivals", "Feste"],
    eventi_filter_archeo: ["Archeologia", "Archaeology", "Archäologie"],
    eventi_oggi: ["Oggi", "Today", "Heute"],
    eventi_settimana: ["Questa settimana", "This week", "Diese Woche"],
    eventi_prossimamente: ["Prossimamente", "Coming up", "Demnächst"],
    eventi_vuoto: ["Nessun evento in questa categoria per il periodo selezionato.", "No events in this category for the selected period.", "Keine Veranstaltungen in dieser Kategorie für den gewählten Zeitraum."],
    eventi_archeologia: ["Archeologia", "Archaeology", "Archäologie"],
    eventi_data: ["Data", "Date", "Datum"],
    eventi_orario: ["Orario", "Time", "Uhrzeit"],
    eventi_luogo: ["Luogo", "Location", "Ort"],
    eventi_prezzo: ["Prezzo", "Price", "Preis"],
    eventi_periodo: ["Periodo storico", "Historical period", "Historische Periode"],
    eventi_distanza: ["Distanza", "Distance", "Entfernung"],
    eventi_tempo: ["Tempo di visita", "Visit time", "Besuchsdauer"],
    eventi_orari: ["Orari", "Hours", "Öffnungszeiten"],
    eventi_prenotazione: ["Prenotazione", "Booking", "Reservierung"],
    eventi_perche: ["Perché visitarlo", "Why visit", "Warum besuchen"],
    eventi_sito: ["Sito ufficiale", "Official website", "Offizielle Website"],
    home_welcome: ["Benvenuti a Piccolabellavista", "Welcome to Piccolabellavista", "Willkommen bei Piccolabellavista"],
    home_subtitle: ["La vostra guida personale alla Sardegna, curata con cura dall'host.", "Your personal guide to Sardinia, curated with care by your host.", "Ihr persönlicher Reiseführer für Sardinien, mit Sorgfalt zusammengestellt."],
    home_cta: ["Scopri la guida", "Explore the guide", "Guide entdecken"],
    home_secondary: ["La casa", "The house", "Das Haus"],
    quick_casa: ["La casa", "The house", "Das Haus"],
    quick_spiagge: ["Spiagge", "Beaches", "Strände"],
    quick_mangiare: ["Dove mangiare", "Where to eat", "Essen"],
    quick_eno: ["Enogastronomia", "Food & Wine", "Kulinarik"],
    quick_cagliari: ["Cagliari", "Cagliari", "Cagliari"],
    quick_muoversi: ["Come muoversi", "Getting around", "Mobilität"],
    quick_vento: ["Spiagge e vento", "Beaches & wind", "Strände & Wind"],
    quick_info: ["Informazioni", "Useful info", "Nützliche Infos"],
    beach_title: ["Spiagge della Sardegna", "Sardinian Beaches", "Sardische Strände"],
    beach_subtitle: ["Dalla costa di Cagliari al sud selvaggio", "From the coast of Cagliari to the wild south", "Von der Küste Cagliaris bis zum wilden Süden"],
    beach_filter_all: ["Tutte", "All", "Alle"],
    beach_filter_calm: ["Mare calmo", "Calm sea", "Ruhiges Meer"],
    beach_filter_wind: ["Poco vento", "Low wind", "Wenig Wind"],
    beach_filter_family: ["Famiglie", "Families", "Familien"],
    beach_filter_snorkel: ["Snorkeling", "Snorkeling", "Schnorcheln"],
    beach_filter_sunset: ["Tramonto", "Sunset", "Sonnenuntergang"],
    beach_filter_wild: ["Selvaggia", "Wild", "Wild"],
    beach_today: ["Oggi dove andare?", "Where to go today?", "Wohin heute?"],
    beach_distance: ["km", "km", "km"],
    beach_time: ["min", "min", "Min"],
    beach_map: ["Apri mappa", "Open map", "Karte öffnen"],
    beach_wind: ["Vento", "Wind", "Wind"],
    tag_calm: ["Mare calmo", "Calm sea", "Ruhiges Meer"],
    tag_wind: ["Poco vento", "Low wind", "Wenig Wind"],
    tag_family: ["Famiglie", "Families", "Familien"],
    tag_snorkel: ["Snorkeling", "Snorkeling", "Schnorcheln"],
    tag_sunset: ["Tramonto", "Sunset", "Sonnenuntergang"],
    tag_wild: ["Selvaggia", "Wild", "Wild"],
    cagliari_title: ["Cagliari", "Cagliari", "Cagliari"],
    cagliari_subtitle: ["La città tra mare e storia", "The city between sea and history", "Die Stadt zwischen Meer und Geschichte"],
    eat_title: ["Dove mangiare", "Where to eat", "Wo essen"],
    eat_subtitle: ["Selezione personale dell'host", "Host's personal selection", "Persönliche Auswahl des Gastgebers"],
    eat_sardinian: ["Cucina sarda", "Sardinian cuisine", "Sardische Küche"],
    eat_fish: ["Pesce", "Fish", "Fisch"],
    eat_pizza: ["Pizza", "Pizza", "Pizza"],
    eat_cheap: ["Economico", "Budget", "Günstig"],
    eat_aperitivo: ["Aperitivo", "Aperitif", "Aperitif"],
    eat_breakfast: ["Colazione", "Breakfast", "Frühstück"],
    eat_special: ["Esperienze", "Experiences", "Erlebnisse"],
    eno_title: ["Enogastronomia", "Food & Wine", "Kulinarik"],
    eno_subtitle: ["I sapori autentici della Sardegna", "The authentic flavors of Sardinia", "Die authentischen Aromen Sardiniens"],
    casa_title: ["La casa", "The house", "Das Haus"],
    casa_subtitle: ["Il vostro rifugio a Pirri", "Your retreat in Pirri", "Ihr Rückzugsort in Pirri"],
    info_title: ["Informazioni utili", "Useful information", "Nützliche Informationen"],
    info_subtitle: ["Tutto ciò che serve sapere", "Everything you need to know", "Alles, was Sie wissen müssen"],
    move_title: ["Come muoversi", "Getting around", "Mobilität"],
    move_subtitle: ["Trasporti e consigli", "Transport and tips", "Transport und Tipps"],
    wind_title: ["Spiagge e vento", "Beaches & wind", "Strände & Wind"],
    wind_subtitle: ["Scegli in base alla giornata", "Choose based on the day", "Wählen Sie je nach Wetter"],
    close: ["Chiudi", "Close", "Schließen"],
    wifi: ["Wi-Fi", "Wi-Fi", "Wi-Fi"],
    password: ["Password", "Password", "Passwort"],
    checkin: ["Check-in", "Check-in", "Check-in"],
    checkout: ["Check-out", "Check-out", "Check-out"],
    contact: ["Contatti", "Contacts", "Kontakt"],
    phone: ["Telefono", "Phone", "Telefon"],
    rules: ["Regole della casa", "House rules", "Hausregeln"],
    services: ["Servizi", "Services", "Services"],
    weather: ["Meteo Cagliari", "Weather Cagliari", "Wetter Cagliari"],
    weather_loading: ["Caricamento...", "Loading...", "Laden..."],
    weather_unavailable: ["Non disponibile", "Unavailable", "Nicht verfügbar"],
    whereWeAre: ["Dove siamo", "Where we are", "Wo wir sind"],
    openMap: ["Apri in Google Maps →", "Open in Google Maps →", "In Google Maps öffnen →"],

    /* --- aggiunte v4.0 --- */
    skip_link: ["Vai al contenuto", "Skip to content", "Zum Inhalt springen"],
    updated_on: ["Guida aggiornata al", "Guide updated on", "Reiseführer aktualisiert am"],
    wifi_note: ["La password del Wi-Fi la trovate sul cartoncino in casa. Se non la trovate, scriveteci pure.", "You'll find the Wi-Fi password on the card in the apartment. If you can't find it, just get in touch.", "Das WLAN-Passwort finden Sie auf der Karte in der Wohnung. Falls nicht, schreiben Sie uns einfach."],
    eventi_nessuno: ["Al momento non ci sono eventi in programma. Il calendario viene aggiornato ogni mese: ripassate tra qualche giorno, o chiedete a noi.", "There are no events scheduled at the moment. We refresh the calendar every month — check back in a few days, or just ask us.", "Zurzeit sind keine Veranstaltungen geplant. Wir aktualisieren den Kalender monatlich — schauen Sie in ein paar Tagen wieder vorbei oder fragen Sie uns."],
    eventi_badge_evento: ["Evento", "Event", "Veranstaltung"],
    eventi_badge_sagra: ["Sagra", "Festival", "Fest"],
    eventi_data_indicativa: ["data indicativa", "approximate date", "ungefähres Datum"],
    eventi_fonte: ["Fonte", "Source", "Quelle"],
    eventi_verificato: ["Verificato il", "Verified on", "Geprüft am"],
    beach_details: ["Dettagli", "Details", "Details"],
    beach_type: ["Tipo", "Type", "Art"],
    beach_ideal: ["Ideale per", "Best for", "Ideal für"],
    open_card: ["Apri la scheda", "Open details", "Details öffnen"],
    photo_credit: ["Foto", "Photo", "Foto"],
    eventi_tag_tradizioni: ["Tradizioni", "Traditions", "Traditionen"],
    beach_filters_label: ["Filtra le spiagge", "Filter beaches", "Strände filtern"]

};

/* Costruisce, per ogni lingua, l'oggetto { chiave: testo }. */
const I18N = LANGS.reduce((acc, lang, i) => {
  acc[lang] = {};
  for (const key in STRINGS) acc[lang][key] = STRINGS[key][i];
  return acc;
}, {});

let currentLang = safeGet('pbv-lang');
if (!LANGS.includes(currentLang)) currentLang = 'it';

function t(key) {
  const v = I18N[currentLang] && I18N[currentLang][key];
  if (v) return v;
  return I18N.it[key] || key;
}

function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  currentLang = lang;
  safeSet('pbv-lang', lang);
  document.documentElement.lang = lang;
  applyTranslations();
  if (window.App && window.App.renderCurrent) window.App.renderCurrent();
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const text = t(el.getAttribute('data-i18n'));
    if (text) el.textContent = text;
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const text = t(el.getAttribute('data-i18n-aria'));
    if (text) el.setAttribute('aria-label', text);
  });
  document.querySelectorAll('.langs button').forEach(btn => {
    const on = btn.dataset.lang === currentLang;
    btn.classList.toggle('active', on);
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.lang = currentLang;
  applyTranslations();
  document.querySelectorAll('.langs button').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
});
