# Changelog

## v4.0 — 2 settembre 2026

Revisione completa dopo un audit del progetto. Ventidue rilievi, tutti chiusi
tranne uno rimandato di proposito (i font, vedi in fondo).

### Sicurezza e riservatezza

- **Rimossa la schermata con password.** Il controllo avveniva nel browser,
  confrontando l'input con `DATA.password` scritta in chiaro in `js/data.js`,
  file scaricabile da chiunque sul sito pubblico. Chi voleva solo i contenuti
  non aveva nemmeno bisogno della password: erano tutti nello stesso file.
  La guida è ora pubblica per scelta, non per errore.
- **Password del Wi-Fi, telefono ed email fuori dal codice.** Erano pubblici in
  due posti insieme: il sito e la cronologia del repository. Al loro posto la
  sezione «La casa» dice all'ospite dove trovare la password in appartamento.
  I recapiti sono in `js/config.js`, disattivati per impostazione predefinita
  e riattivabili consapevolmente.
  → **La password del Wi-Fi va comunque cambiata dall'host: è stata esposta.**
- `window.open` per le mappe ora passa `noopener`; i due bottoni sono diventati
  veri link, che è anche più corretto.
- Tutti i testi che finiscono nell'HTML passano da `esc()`, e i gestori di click
  non sono più attributi `onclick` generati ma delega di eventi: nessun valore
  dei dati può più essere interpretato come markup.

### Contenuti e lingue

- **Contenuti tedeschi completi.** L'interfaccia era già in tre lingue, i
  contenuti solo in due: con DE selezionato si leggevano intestazioni tedesche
  sopra paragrafi italiani. Ogni testo è ora `{ it, en, de }`.
- **Eventi e siti archeologici tradotti.** `description`, `whyVisit`, `price`,
  `period`, `hours`, `booking`, `distance`, `visitTime` e `dateNote` erano
  stringhe italiane piatte: anche in inglese l'ospite trovava l'italiano.
- Le etichette dei tag negli eventi («cultura», «feste») ora sono tradotte
  invece di comparire come parole italiane in tutte le lingue.
- `js/i18n.js` riscritto come tabella unica `chiave: [it, en, de]`. Prima erano
  tre oggetti separati e alcune chiavi esistevano solo in uno dei tre: agli
  ospiti comparivano a schermo nomi tecnici come `weather` e `openMap`. Ora una
  traduzione mancante si vede a colpo d'occhio.
- Aggiunta in fondo alla guida la data di ultimo aggiornamento, presa da
  `CONFIG.lastUpdated`.

### Correzioni di funzionamento

- **La pagina Eventi non si svuota più in silenzio.** Il messaggio «nessun
  evento» compariva solo se l'elenco era vuoto, non se era pieno di date
  passate — e tutte le date in archivio scadono entro il 27 settembre 2026. Ora
  i due casi sono distinti e spiegati: filtro senza risultati, oppure calendario
  da aggiornare.
- **Niente più doppio disegno all'avvio.** `init()` chiamava `renderRoute()` due
  volte per gli ospiti già autenticati: la home veniva costruita due volte e il
  meteo interrogato due volte a ogni ricarica.
- **`localStorage` protetto anche in `js/i18n.js`.** `app.js` aveva già
  `safeGet`/`safeSet`; `i18n.js` leggeva e scriveva direttamente. In Safari
  privato, o con i dati di sito bloccati, quella riga sollevava un'eccezione e
  l'intera guida non partiva. Le due funzioni sono ora condivise.
- Il meteo ha un limite di 8 secondi: se Open-Meteo non risponde, il widget lo
  dice invece di restare su «Caricamento…».
- `formatDate()` non si rompe più su una data assente o parziale.

### Accessibilità

- **Le schede di spiagge, eventi e siti archeologici sono `<button>`.** Erano
  `<article onclick>`: nessun `tabindex`, nessun `role`, nessuna gestione di
  Invio. Chi naviga da tastiera o con uno screen reader non poteva aprire
  nessun dettaglio — cioè non poteva usare la parte più utile della guida.
  Le schede dei ristoranti, già corrette, sono diventate link.
- Il pannello di dettaglio mette il resto della pagina in `inert`, sposta il
  focus sul pulsante di chiusura e lo restituisce dov'era. Prima si dichiarava
  modale ma il Tab continuava a scorrere i link dietro di esso.
- Aggiunto il collegamento «vai al contenuto» e una regola `:focus-visible`
  globale. Nel CSS c'era una sola regola `:focus`, sul campo del cancello, e
  per giunta rimuoveva il contorno.
- Titoli delle schede promossi da `<h3>` a `<h2>`, gerarchia delle intestazioni
  coerente in tutte le sezioni. Le icone decorative sono `aria-hidden`.
- I pulsanti della lingua e dei filtri dichiarano `aria-pressed`.

### PWA e offline

- `sw.js` precarica `"./"` oltre a `"./index.html"`, e le navigazioni hanno un
  fallback. Prima, offline, chi apriva l'indirizzo senza `index.html` — cioè
  quasi tutti — non trovava nulla in cache.
- Le foto della casa e le icone sono precaricate: la sezione «La casa» funziona
  anche senza rete.
- Il precaricamento avviene file per file: un'icona rinominata non impedisce
  più l'installazione dell'intero service worker.
- Rimossa la gestione di `docs.google.com` e `googleusercontent.com`: nessuna
  riga del progetto contattava quei domini. Era codice di una funzionalità mai
  completata.
- `manifest.webmanifest`: aggiunto `id`, `start_url` portato a `"./"`, tolto il
  vincolo `orientation: portrait`.

### Pulizia del repository

- Eliminati `SW.js` (copia identica di `sw.js`, in collisione con esso su macOS
  e Windows, dove il filesystem non distingue le maiuscole) e `sw .js` (versione
  3.1, con uno spazio nel nome).
- Eliminato `js/((8).js`: 681 righe, vecchia copia di `data.js`, contenente
  un'altra copia della password del Wi-Fi.
- `LICENSES.md` e `PHOTO_INVENTORY.md` spostati da `js/` a `docs/`.
  `PHOTO_INVENTORY.md` riscritto: dichiarava «file immagine fisicamente
  presenti: 0» quando in `img/casa/` ce n'erano quattro.
- Aggiunti `README.md`, questo `CHANGELOG.md`, `LICENSE`, `.gitignore` e
  `.nojekyll`. Il `CHANGELOG.md` era citato in `index.html` e nei commenti del
  codice, ma non esisteva.
- Gli attributi `style` scritti a mano nel JavaScript sono diventati classi CSS.

### Rimandato

- **I font arrivano ancora da Google Fonts.** Toglierli richiede di scaricare i
  file dei caratteri, cosa che non si poteva fare nell'ambiente in cui è stata
  preparata questa versione. Le istruzioni complete sono nel README, sezione
  «Self-hosting dei font»: sono cinque minuti di lavoro.
- **Le immagini di spiagge, cibo ed eventi restano in hotlink** da Unsplash e
  Wikimedia Commons. Funzionano, ma dipendono da server esterni. Il README
  spiega come portarle nel repository quando c'è tempo.

---

## v3.2 — sw.js

- `js/data.js` servito con strategia rete-per-prima invece che cache-per-prima:
  eventi, sagre e prezzi restavano congelati alla versione della prima visita.

## v3.1

- `renderHome()`: mancava `const c = DATA.casa`, con un `ReferenceError` a ogni
  caricamento della home.
- `parseHash()`: non gestiva `?` nell'hash, quindi i filtri di «Dove mangiare»
  riportavano l'ospite alla home invece di filtrare.
- `initWeather()` e `renderWhatsApp()` erano definite ma mai chiamate: il meteo
  restava su «Caricamento…» e il pulsante WhatsApp non compariva mai.
- `renderEventi()`: le sagre con data nota solo al mese sparivano dall'elenco il
  giorno 2, perché trattate come un singolo istante.
- `renderMangiare()`: prezzo e indirizzo non verificati mostravano agli ospiti
  la stringa `[DA VERIFICARE]`; ora i campi mancanti sono nascosti.
- `renderCasa()`: l'etichetta «Telefono» riusava la chiave `contact` e mostrava
  «Contatti» due volte.
- `i18n`: `weather`, `whereWeAre` e `openMap` esistevano solo nel blocco tedesco
  e in forma sbagliata; `password` e `phone` erano usate ma mai definite.
- `--color-stone-muted` scurito da `#8a8a88` a `#706e69`: il contrasto reale era
  ~3,2:1, sotto la soglia 4,5:1 richiesta da WCAG 2.1 AA per i testi piccoli.
- Aggiunte varianti PNG dell'icona: iOS non supporta in modo affidabile un
  `apple-touch-icon` in SVG.
