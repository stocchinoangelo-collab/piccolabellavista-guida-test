/* ============================================================
   Piccolabellavista — Service worker  ·  v4.0
   ============================================================
   Cambiamenti rispetto alla v3.2:

   - "./" è tra gli asset precaricati e le navigazioni hanno un
     fallback su index.html. Prima, offline, chi apriva l'indirizzo
     senza "index.html" (cioè quasi tutti) non trovava nulla in
     cache: la richiesta era per "/" ma in cache c'era "./index.html".
   - Le foto della casa e le icone sono precaricate. Una PWA che
     offline mostra "La casa" senza foto non serve a molto.
   - Tolta la gestione di docs.google.com / googleusercontent.com:
     nessuna riga del progetto contatta quei domini. Era codice di
     una funzionalità mai completata.
   - La versione della cache si ricava da VERSION: cambiare quella
     stringa a ogni rilascio è l'unico passaggio manuale rimasto,
     ed è documentato nel README.
   ============================================================ */

const VERSION = "4.0.0";
const CACHE = `pbv-${VERSION}`;

const ASSETS = [
  "./",
  "./index.html",
  "css/style.css",
  "js/config.js",
  "js/i18n.js",
  "js/data.js",
  "js/app.js",
  "manifest.webmanifest",
  "icon.svg",
  "img/casa/panoramica.jpg",
  "img/casa/letto.jpg",
  "img/casa/bagno.jpg",
  "img/casa/zona-pranzo.jpg",
  "img/icons/icon-192.png",
  "img/icons/icon-512.png",
  "img/icons/icon-512-maskable.png",
  "img/icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then(cache =>
      // addAll fallisce in blocco se un solo file manca: mettiamo in cache
      // uno alla volta, così un'icona rinominata non impedisce
      // l'installazione dell'intero service worker.
      Promise.all(ASSETS.map(url =>
        cache.add(url).catch(err => console.warn("Precache saltato:", url, err))
      ))
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys.filter(k => k.startsWith("pbv-") && k !== CACHE).map(k => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);

  /* Meteo: sempre dalla rete, mai dalla cache. */
  if (url.hostname === "api.open-meteo.com") return;

  /* Navigazioni: rete per prima, così un aggiornamento si vede subito;
     se la rete non c'è, la copia in cache di index.html. */
  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) {
          const cache = await caches.open(CACHE);
          cache.put("./index.html", fresh.clone());
        }
        return fresh;
      } catch (err) {
        const cache = await caches.open(CACHE);
        return (await cache.match(request)) ||
               (await cache.match("./index.html")) ||
               (await cache.match("./")) ||
               Response.error();
      }
    })());
    return;
  }

  if (url.origin !== location.origin) return;

  /* js/data.js e js/config.js cambiano più spesso di CSS e codice
     (eventi, sagre, prezzi): rete per prima, cache come rete di
     sicurezza. Cache-first li avrebbe congelati alla prima visita. */
  if (/\/js\/(data|config)\.js$/.test(url.pathname)) {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(request);
        if (fresh.ok) {
          const cache = await caches.open(CACHE);
          cache.put(request, fresh.clone());
        }
        return fresh;
      } catch (err) {
        const cached = await caches.match(request);
        return cached || Response.error();
      }
    })());
    return;
  }

  /* Tutto il resto (CSS, JS, immagini, icone): cache per prima. */
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const fresh = await fetch(request);
      if (fresh.ok && fresh.type === "basic") {
        const cache = await caches.open(CACHE);
        cache.put(request, fresh.clone());
      }
      return fresh;
    } catch (err) {
      return Response.error();
    }
  })());
});
