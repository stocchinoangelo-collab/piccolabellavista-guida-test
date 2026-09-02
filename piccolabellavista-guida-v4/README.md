# Piccolabellavista — guida alla Sardegna del sud

Guida per gli ospiti dell'appartamento **Piccolabellavista** a Pirri (Cagliari):
spiagge, città, dove mangiare, enogastronomia, eventi e archeologia.

È un sito statico — HTML, CSS e JavaScript, nessun framework, nessuna build —
installabile come app dal telefono e consultabile anche senza rete.
Si pubblica su GitHub Pages caricando i file così come sono.

**Online:** https://stocchinoangelo-collab.github.io/piccolabellavista-guida-test/

---

## Prima cosa da sapere: questo sito è pubblico

Tutto ciò che sta in questa cartella è scaricabile da chiunque conosca
l'indirizzo. Non c'è modo di nascondere un file: se è nel sito, è leggibile.

Nella versione precedente c'era una schermata con password. Non proteggeva
nulla, perché la password stessa era scritta in un file scaricabile. Insieme a
lei erano pubblici la **password del Wi-Fi di casa**, il numero di telefono e
l'email dell'host.

La schermata è stata rimossa e i dati sensibili sono usciti dal codice.

**Regola pratica:** non scrivere in questi file nulla che non scriveresti su un
cartello davanti al portone. La password del Wi-Fi si consegna in casa — un
cartoncino sul tavolo, o un QR code sul frigorifero.

---

## Struttura

```
index.html               struttura della pagina, nient'altro
manifest.webmanifest     dati per l'installazione come app
sw.js                    service worker: cache e funzionamento offline
icon.svg                 icona vettoriale
css/style.css            tutto lo stile
js/config.js             ⚙️  recapiti e data di aggiornamento — inizia da qui
js/i18n.js               traduzioni dell'interfaccia (IT / EN / DE)
js/data.js               📝  i contenuti della guida — il file che aggiornerai
js/app.js                il motore: rotte, rendering, meteo
img/casa/                foto dell'appartamento
img/icons/               icone dell'app
docs/LICENSES.md         registro delle licenze fotografiche
docs/PHOTO_INVENTORY.md  inventario di tutte le immagini usate
```

Solo due file si toccano nell'uso quotidiano: **`js/config.js`** e
**`js/data.js`**.

---

## Come si aggiorna la guida

### Aggiungere un evento o una sagra

1. Apri `js/data.js` e trova l'elenco `eventi:` (o `sagre:`).
2. Copia un blocco esistente, incollalo sotto e cambia i campi.
3. `id` deve essere unico. `verified` è la data in cui hai controllato la fonte.
4. In `js/config.js`, aggiorna `lastUpdated` con la data di oggi.

Ogni testo rivolto all'ospite è un oggetto con tre lingue:

```js
description: {
  it: "Testo in italiano",
  en: "Text in English",
  de: "Text auf Deutsch"
}
```

Se una lingua manca, la guida mostra l'italiano — ma è meglio scriverle tutte e
tre subito: un ospite tedesco che trova un paragrafo in italiano si accorge
della toppa.

Le date possono essere di due tipi:

- `date: "2026-09-27"` — giorno preciso;
- `date: "2026-09"` — solo il mese, quando la data non è ancora confermata.
  In questo caso l'evento resta in elenco per tutto il mese. Aggiungi anche
  `dateApprox: true` e un `dateNote` con la spiegazione.

### Il calendario ha una scadenza

Quando tutti gli eventi in elenco sono passati, la guida lo dice esplicitamente
all'ospite invece di mostrare una pagina vuota. Ma resta comunque una pagina
senza contenuti: **metti un promemoria mensile** per rivedere eventi e sagre.

### Cambiare i recapiti

In `js/config.js`. Sono a `null`, quindi la sezione contatti e il pulsante
WhatsApp non compaiono affatto. Se ritieni che i tuoi recapiti siano già
pubblici — di norma lo sono, stanno sulla tua inserzione — puoi riattivarli:

```js
contact: {
  phone:    "+39 070 000000",
  email:    "info@esempio.it",
  whatsapp: "39XXXXXXXXXX"   // solo cifre, con prefisso 39, senza +
}
```

Meglio un numero e un indirizzo dedicati all'attività, non quelli personali:
una volta pubblicati non si tolgono più dagli archivi.

---

## Pubblicare una nuova versione

1. Carica i file modificati su GitHub (`main`).
2. **Cambia `VERSION` in `sw.js`** — per esempio da `"4.0.0"` a `"4.0.1"`.

Il secondo passaggio non è facoltativo. Il service worker riconosce una nuova
versione solo se quella stringa cambia: senza, chi ha già installato la guida
continua a vedere i file vecchi, anche per settimane.

Se preferisci non doverci pensare, in fase di pubblicazione puoi generare quella
stringa dall'hash del commit con una GitHub Action.

---

## Lingue

Interfaccia e contenuti sono in **italiano, inglese e tedesco**.

Le traduzioni dell'interfaccia stanno in `js/i18n.js`, in una tabella dove ogni
chiave porta le tre lingue affiancate:

```js
nav_spiagge: ["Spiagge", "Beaches", "Strände"],
```

Sono su una riga sola di proposito. Nella versione precedente le tre lingue
erano tre oggetti separati e alcune chiavi esistevano solo in uno dei tre: agli
ospiti italiani e inglesi comparivano a schermo nomi tecnici come `weather` e
`openMap`. Con una riga per chiave, una traduzione mancante si vede mentre la
si scrive.

Per aggiungere una quarta lingua: allunga `LANGS`, aggiungi un elemento a ogni
riga della tabella, aggiungi un bottone in `index.html` e la chiave
corrispondente nei contenuti di `js/data.js`.

---

## Immagini

Le foto dell'appartamento sono in `img/casa/` e sono nostre.

Le altre — spiagge, città, cibo, eventi — arrivano da **Unsplash** e
**Wikimedia Commons** e sono caricate direttamente dai loro server. Funziona,
ma dipende da server che non controlliamo: se un'immagine viene rimossa o
rinominata, sulla guida resta un buco.

Il passo successivo, quando c'è tempo, è scaricarle nel repository:

1. `docs/PHOTO_INVENTORY.md` elenca tutte le immagini con il loro indirizzo.
2. Scaricale in `img/spiagge/`, `img/cagliari/`, ecc.
3. Ridimensionale a circa 1200 px di larghezza (le card non ne mostrano di più).
4. Sostituisci l'URL con il percorso locale in `js/data.js`.
5. Aggiungi i nuovi file all'elenco `ASSETS` in `sw.js`.

Le attribuzioni sono già nei dati (`imageCredit`) e vengono mostrate sopra ogni
foto: vanno mantenute, le licenze CC BY e CC BY-SA lo richiedono.
`docs/LICENSES.md` contiene le regole da seguire.

### Le foto della casa

Sono verticali (547 × 672 px). La galleria le mostra in verticale, senza
tagliarle. Se un giorno le rifai, scattale in orizzontale e a risoluzione più
alta: la guida ne trarrà giovamento in tutte le altre posizioni.

---

## Self-hosting dei font

`index.html` carica Fraunces e Inter da Google Fonts. Sono due connessioni
bloccanti prima del primo disegno, e l'indirizzo IP di ogni ospite arriva a un
server terzo — un punto delicato per chi ospita clienti europei.

Per toglierla:

1. Scarica i due font da [fonts.google.com](https://fonts.google.com) o con
   [google-webfonts-helper](https://gwfh.mranftl.com/fonts), in formato
   **woff2**, sottoinsieme `latin` + `latin-ext` (serve per à, è, ü, ß).
2. Mettili in `fonts/`.
3. In `index.html`, sostituisci i tre `<link>` verso Google con nulla.
4. In cima a `css/style.css`, aggiungi:

```css
@font-face {
  font-family: 'Fraunces';
  src: url('../fonts/fraunces-variable.woff2') format('woff2');
  font-weight: 500 700;
  font-display: swap;
}
@font-face {
  font-family: 'Inter';
  src: url('../fonts/inter-variable.woff2') format('woff2');
  font-weight: 400 600;
  font-display: swap;
}
```

5. Aggiungi i due file a `ASSETS` in `sw.js` e cambia `VERSION`.

Le variabili `--font-display` e `--font-body` nel CSS non vanno toccate: hanno
già i nomi giusti e una catena di riserva sensata.

---

## Funzionamento offline

`sw.js` mette in cache la pagina, il codice, lo stile, le icone e le foto della
casa. Le immagini esterne no: offline le sezioni che le usano restano senza
foto, il testo si legge comunque.

Il meteo viene sempre dalla rete (Open-Meteo, senza chiave né registrazione) e
se non risponde entro 8 secondi la guida lo dice, invece di restare su
«Caricamento…».

`js/data.js` e `js/config.js` sono serviti con strategia *rete-per-prima*: chi
ha già la guida installata vede subito i contenuti aggiornati, senza aspettare
un cambio di versione della cache.

---

## Accessibilità

- Ogni scheda cliccabile è un `<button>` o un `<a>`: si raggiungono con Tab e si
  aprono con Invio.
- Menu laterale e pannello di dettaglio mettono il resto della pagina in
  `inert`, spostano il focus e lo restituiscono alla chiusura. Si chiudono con
  Esc.
- C'è un collegamento «vai al contenuto» all'inizio della pagina, visibile solo
  quando riceve il focus.
- Il contrasto dei testi piccoli rispetta la soglia WCAG 2.1 AA
  (`--color-stone-muted` è `#706e69`: non schiarirlo).
- Le animazioni rispettano `prefers-reduced-motion`.

---

## Sviluppo in locale

Serve un server HTTP: il service worker e il `fetch` del meteo non funzionano
aprendo il file con un doppio clic.

```bash
python3 -m http.server 8000
# poi apri http://localhost:8000
```

Durante le prove, in DevTools → Application → Service Workers, spunta
**Update on reload**: altrimenti la cache continua a servirti la versione
precedente e ti sembrerà che le modifiche non abbiano effetto.

---

## Licenza

Il codice è sotto licenza MIT (vedi `LICENSE`).

I testi della guida e le fotografie dell'appartamento sono degli host e non
rientrano nella licenza MIT. Le altre immagini restano dei rispettivi autori,
sotto le licenze indicate in `docs/LICENSES.md`.
