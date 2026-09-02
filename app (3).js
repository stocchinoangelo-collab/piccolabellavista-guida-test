/* ============================================================
   Piccolabellavista — Motore dell'app  ·  v4.0
   ============================================================
   Cambiamenti principali rispetto alla v3.1:

   - Rimosso il cancello con password. Non proteggeva nulla: la
     password stava in chiaro in un file scaricabile da chiunque.
     La guida è ora pubblica, e i dati che non devono essere
     pubblici (Wi-Fi, recapiti) sono usciti dal codice: vedi
     js/config.js.
   - Le schede di spiagge, eventi e siti archeologici sono <button>
     invece di <article onclick>: prima non erano raggiungibili da
     tastiera né annunciate come interattive.
   - Tutti i testi che finiscono nell'HTML passano da esc(), e i
     gestori di click non sono più attributi inline ma delega di
     eventi: nessun valore dei dati può più finire interpretato
     come markup.
   - La sezione Eventi ora dice esplicitamente quando non c'è nulla
     in programma, invece di mostrare una pagina muta.
   - init() non disegna più due volte la home a ogni ricarica.
   - Quando un pannello è aperto, il resto della pagina è `inert`
     e il focus torna dov'era alla chiusura.
   - Le mappe si aprono con noopener.
   ============================================================ */

(function () {
  'use strict';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* Neutralizza i caratteri che il browser leggerebbe come markup.
     I contenuti sono nostri, ma un apostrofo o una & in un nome di
     ristorante non devono poter rompere la pagina. */
  function esc(value) {
    if (value == null) return '';
    return String(value)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  /* Sceglie il testo nella lingua attiva da un campo { it, en, de }.
     Se il campo è già una stringa (numeri, nomi propri) lo restituisce
     invariato; se manca la traduzione ripiega sull'italiano. */
  function L(field) {
    if (field == null) return '';
    if (typeof field === 'string' || typeof field === 'number') return field;
    return field[currentLang] || field.it || Object.values(field)[0] || '';
  }

  /* Scorciatoie: testo tradotto già pronto per l'HTML. */
  const LE = (field) => esc(L(field));
  const TE = (key) => esc(t(key));

  /* Etichetta tradotta di un tag di evento. I tag nei dati sono parole
     italiane ("cultura", "feste"): senza questa mappa finivano a schermo
     così com'erano anche in inglese e tedesco. */
  const TAG_KEYS = {
    cultura: 'eventi_filter_cultura',
    musica: 'eventi_filter_musica',
    famiglie: 'eventi_filter_famiglie',
    enogastronomia: 'eventi_filter_eno',
    feste: 'eventi_filter_sagre',
    sagre: 'eventi_filter_sagre',
    tradizioni: 'eventi_tag_tradizioni'
  };
  const tagLabel = (tag) => (TAG_KEYS[tag] ? esc(t(TAG_KEYS[tag])) : esc(tag));

  // ===== Stato =====
  let currentSection = 'home';
  let beachFilter = 'all';
  let eventiFilter = 'all';
  let scrollLockCount = 0;
  let lastFocused = null;

  // ===== Riferimenti al DOM =====
  const app           = $('#app');
  const view          = $('#view');
  const menu          = $('#menu');
  const scrim         = $('#scrim');
  const burger        = $('#burger');
  const menuClose     = $('#menu-close');
  const menuList      = $('#menu-list');
  const sheet         = $('#sheet');
  const sheetBackdrop = $('#sheet-backdrop');
  const sheetX        = $('#sheet-x');
  const sheetContent  = $('#sheet-content');

  // ===== Navigazione =====

  function parseHash() {
    const h = location.hash.replace('#', '') || 'home';
    // Divide sia su "/" sia su "?", così "mangiare?type=fish" resta "mangiare".
    return h.split(/[/?]/)[0] || 'home';
  }

  const ROUTES = {
    home: renderHome,
    spiagge: renderSpiagge,
    cagliari: renderCagliari,
    mangiare: renderMangiare,
    enogastronomia: renderEnogastronomia,
    casa: renderCasa,
    muoversi: renderMuoversi,
    info: renderInfo,
    vento: renderVento,
    fonti: renderFonti,
    eventi: renderEventi
  };

  function renderRoute() {
    const sec = parseHash();
    currentSection = ROUTES[sec] ? sec : 'home';
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNav();
    (ROUTES[currentSection] || renderHome)();
    applyTranslations();
    initLazyImages();
  }

  window.addEventListener('hashchange', renderRoute);

  function updateNav() {
    $$('.bottom-nav__item').forEach(el => {
      const on = el.dataset.section === currentSection;
      el.classList.toggle('active', on);
      if (el.tagName === 'A') el.setAttribute('aria-current', on ? 'page' : 'false');
    });
    $$('.menu__list a').forEach(el => {
      el.classList.toggle('active', el.getAttribute('href') === '#' + currentSection);
    });
  }

  function buildMenu() {
    const icon = (paths) =>
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" focusable="false">${paths}</svg>`;

    const items = [
      { sec: 'home',           label: 'nav_home',      icon: icon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>') },
      { sec: 'spiagge',        label: 'nav_spiagge',   icon: icon('<path d="M2 20h20"/><path d="M6 16l4-8 4 4 4-6"/>') },
      { sec: 'cagliari',       label: 'nav_cagliari',  icon: icon('<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>') },
      { sec: 'mangiare',       label: 'nav_mangiare',  icon: icon('<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>') },
      { sec: 'enogastronomia', label: 'nav_eno',       icon: icon('<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>') },
      { sec: 'eventi',         label: 'nav_eventi',    icon: icon('<path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>') },
      { sec: 'casa',           label: 'quick_casa',    icon: icon('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>') },
      { sec: 'muoversi',       label: 'quick_muoversi', icon: icon('<circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/>') },
      { sec: 'vento',          label: 'quick_vento',   icon: icon('<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>') },
      { sec: 'info',           label: 'quick_info',    icon: icon('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>') }
    ];

    // data-i18n va sullo <span> del testo, mai sul link che contiene anche l'SVG.
    menuList.innerHTML = items.map(it =>
      `<li><a href="#${it.sec}">${it.icon}<span data-i18n="${it.label}">${TE(it.label)}</span></a></li>`
    ).join('');

    menuList.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });
  }

  // ===== Menu laterale =====
  function openMenu() {
    lastFocused = document.activeElement;
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('inert');
    scrim.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    lockScroll();
    // Il menu diventa visibile tramite il selettore [aria-hidden="false"] nel
    // CSS: chiamare focus() nella stessa istruzione non ha effetto, perché
    // l'elemento è ancora visibility:hidden quando il browser la esegue.
    requestAnimationFrame(() => menuClose.focus());
  }
  function closeMenu() {
    if (menu.getAttribute('aria-hidden') === 'true') return;
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    scrim.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    unlockScroll();
    (lastFocused && lastFocused.focus ? lastFocused : burger).focus();
  }

  // ===== Blocco dello scroll =====
  function lockScroll() {
    scrollLockCount++;
    if (scrollLockCount === 1) document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.style.overflow = '';
  }

  // ===== Pannello di dettaglio =====
  function openSheet(html) {
    lastFocused = document.activeElement;
    sheetContent.innerHTML = html;
    sheet.setAttribute('aria-hidden', 'false');
    // Il resto della pagina esce dall'ordine di tabulazione: senza questo
    // il pannello si dichiarava modale ma il Tab continuava a scorrere
    // i link dietro di esso.
    app.setAttribute('inert', '');
    lockScroll();
    initLazyImages();
    applyTranslations();
    requestAnimationFrame(() => sheetX.focus());
  }
  function closeSheet() {
    if (sheet.getAttribute('aria-hidden') === 'true') return;
    sheet.setAttribute('aria-hidden', 'true');
    app.removeAttribute('inert');
    unlockScroll();
    sheetContent.innerHTML = '';
    if (lastFocused && lastFocused.isConnected && lastFocused.focus) lastFocused.focus();
  }

  // ===== Immagini =====
  function initLazyImages() {
    $$('img[loading="lazy"]').forEach(img => {
      if (img.dataset.lazyInit) return;
      img.dataset.lazyInit = '1';
      if (img.complete) { img.classList.add('loaded'); return; }
      img.addEventListener('load',  () => img.classList.add('loaded'),  { once: true });
      img.addEventListener('error', () => img.classList.add('error'),   { once: true });
      // Alcuni browser, su rete lenta o in risparmio dati, rimandano l'evento
      // "load" a tempo indeterminato. Dopo 1,5 s mostriamo comunque l'immagine
      // invece di lasciarla invisibile per sempre.
      setTimeout(() => {
        if (!img.classList.contains('loaded') && !img.classList.contains('error')) {
          img.classList.add('loaded');
        }
      }, 1500);
    });
  }

  /* Un <img> con attributi coerenti, in un posto solo. */
  function imgTag(src, alt, extra) {
    if (!src) return '';
    return `<img src="${esc(src)}" alt="${esc(alt || '')}" loading="lazy" decoding="async"${extra ? ' ' + extra : ''}>`;
  }

  function creditTag(credit) {
    if (!credit) return '';
    return `<span class="media-credit">${TE('photo_credit')} · ${esc(credit)}</span>`;
  }

  // ===== Effetti allo scroll =====
  window.addEventListener('scroll', () => {
    const bar = $('.topbar');
    if (bar) bar.classList.toggle('topbar--scrolled', window.scrollY > 10);
  }, { passive: true });

  // ===== Tastiera =====
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (sheet.getAttribute('aria-hidden') === 'false') closeSheet();
    else if (menu.getAttribute('aria-hidden') === 'false') closeMenu();
  });

  // ===== Delega dei click nella vista =====
  // Un solo gestore invece di attributi onclick generati: i valori dei dati
  // non entrano mai nel markup come codice.
  view.addEventListener('click', (e) => {
    const beach = e.target.closest('[data-beach]');
    if (beach) { openBeach(beach.dataset.beach); return; }

    const evento = e.target.closest('[data-evento]');
    if (evento) { openEvento(evento.dataset.eventoType, evento.dataset.evento); return; }

    const archeo = e.target.closest('[data-archeo]');
    if (archeo) { openArcheo(archeo.dataset.archeo); return; }

    const bfilter = e.target.closest('[data-filter]');
    if (bfilter) { beachFilter = bfilter.dataset.filter; renderSpiagge(); applyTranslations(); initLazyImages(); return; }

    const efilter = e.target.closest('[data-efilter]');
    if (efilter) { eventiFilter = efilter.dataset.efilter; renderEventi(); applyTranslations(); initLazyImages(); return; }

    const goto = e.target.closest('[data-goto]');
    if (goto) { location.hash = goto.dataset.goto; }
  });

  // ===== Sezioni =====

  function renderHome() {
    const c = DATA.casa;
    const quick = [
      { hash: 'casa',           key: 'quick_casa',     paths: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>' },
      { hash: 'spiagge',        key: 'quick_spiagge',  paths: '<path d="M2 20h20"/><path d="M6 16l4-8 4 4 4-6"/><path d="M12 20V10"/>' },
      { hash: 'mangiare',       key: 'quick_mangiare', paths: '<path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>' },
      { hash: 'enogastronomia', key: 'quick_eno',      paths: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>' },
      { hash: 'cagliari',       key: 'quick_cagliari', paths: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>' },
      { hash: 'muoversi',       key: 'quick_muoversi', paths: '<circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/>' },
      { hash: 'vento',          key: 'quick_vento',    paths: '<path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/>' },
      { hash: 'info',           key: 'quick_info',     paths: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>' }
    ];

    view.innerHTML = `
      <section class="section">
        <div class="hero">
          <div class="hero__media">
            ${imgTag('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', 'Sardegna')}
          </div>
          <div class="hero__content">
            <p class="hero__pretitle">Piccolabellavista</p>
            <h1 class="hero__title" data-i18n="home_welcome">${TE('home_welcome')}</h1>
            <p class="hero__subtitle" data-i18n="home_subtitle">${TE('home_subtitle')}</p>
            <div class="hero__cta">
              <button type="button" class="btn btn--primary btn--pill" data-goto="spiagge" data-i18n="home_cta">${TE('home_cta')}</button>
              <button type="button" class="btn btn--ghost btn--pill" data-goto="casa" data-i18n="home_secondary">${TE('home_secondary')}</button>
            </div>
          </div>
        </div>

        <div class="quick-grid">
          <a href="#vento" class="quick-item" id="meteo-widget">
            <div class="quick-item__icon" aria-hidden="true">🌤️</div>
            <span class="quick-item__label" data-i18n="weather">${TE('weather')}</span>
            <span class="quick-item__sublabel">${TE('weather_loading')}</span>
          </a>
          ${quick.map(q => `
            <a href="#${q.hash}" class="quick-item">
              <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${q.paths}</svg></div>
              <span class="quick-item__label" data-i18n="${q.key}">${TE(q.key)}</span>
            </a>
          `).join('')}
        </div>

        ${c.mapEmbed ? `
        <h2 class="heading-sm" style="margin:24px 0 12px;" data-i18n="whereWeAre">${TE('whereWeAre')}</h2>
        <div class="map-card" style="margin-bottom:24px;">
          <iframe class="map-card__frame" src="${esc(c.mapEmbed)}" title="${TE('whereWeAre')}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          <a href="https://maps.google.com/?q=${esc(c.coordinates.lat)},${esc(c.coordinates.lng)}" target="_blank" rel="noopener noreferrer" class="map-card__link" data-i18n="openMap">${TE('openMap')}</a>
        </div>` : ''}
      </section>
    `;
    initWeather();
  }

  function renderSpiagge() {
    const filters = ['all', 'calm', 'wind', 'family', 'snorkel', 'sunset', 'wild']
      .map(key => ({ key, label: 'beach_filter_' + key }));

    const list = beachFilter === 'all'
      ? DATA.spiagge
      : DATA.spiagge.filter(b => b.tags.includes(beachFilter));

    view.innerHTML = `
      <section class="section">
        <div class="beach-hero">
          ${imgTag('https://images.unsplash.com/photo-1506953829579-0cb981a83e2e?w=800&q=80', '')}
          <div class="beach-hero__content">
            <p class="heading-sm" style="color:rgba(255,255,255,0.75);margin-bottom:4px;" data-i18n="beach_today">${TE('beach_today')}</p>
            <h1 class="beach-hero__title" data-i18n="beach_title">${TE('beach_title')}</h1>
          </div>
        </div>

        <div class="chip-group" role="group" aria-label="${TE('beach_filters_label')}">
          ${filters.map(f => `
            <button type="button" class="chip ${beachFilter === f.key ? 'active' : ''}"
                    data-filter="${f.key}" aria-pressed="${beachFilter === f.key}">${TE(f.label)}</button>
          `).join('')}
        </div>

        <div class="beach-list">
          ${list.map(b => `
            <article class="beach-card">
              <div class="beach-card__media">
                ${imgTag(b.image, b.name)}
                <div class="beach-card__badges">
                  ${b.tags.map(tag => `<span class="badge">${TE('tag_' + tag)}</span>`).join('')}
                </div>
                ${creditTag(b.imageCredit)}
              </div>
              <div class="beach-card__body">
                <h2 class="beach-card__title">${esc(b.name)}</h2>
                <div class="beach-card__meta">
                  <span>📍 ${esc(b.distance)} ${TE('beach_distance')}</span>
                  <span>🚗 ${esc(b.time)} ${TE('beach_time')}</span>
                </div>
                <p class="body" style="margin-bottom:12px;">${LE(b.desc)}</p>
                <div class="beach-card__tags">
                  <span class="beach-card__tag">${LE(b.type)}</span>
                  <span class="beach-card__tag">${LE(b.wind)}</span>
                </div>
                <div class="beach-card__actions">
                  <a class="btn btn--primary btn--small" href="${esc(b.map)}" target="_blank" rel="noopener noreferrer">${TE('beach_map')}</a>
                  <button type="button" class="btn btn--secondary btn--small" data-beach="${esc(b.id)}">${TE('beach_details')}</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderCagliari() {
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="cagliari_subtitle">${TE('cagliari_subtitle')}</p>
          <h1 class="display-lg" data-i18n="cagliari_title">${TE('cagliari_title')}</h1>
        </div>
        <div class="editorial-grid">
          ${DATA.cagliari.map(item => `
            <article class="editorial-item">
              <div class="editorial-item__media">
                ${imgTag(item.image, L(item.title))}
                ${creditTag(item.imageCredit)}
              </div>
              <div class="editorial-item__body">
                <span class="editorial-item__label">${LE(item.label)}</span>
                <h2 class="editorial-item__title">${LE(item.title)}</h2>
                <p class="editorial-item__text">${LE(item.text)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderMangiare() {
    const typeLabels = {
      all: 'beach_filter_all', sardinian: 'eat_sardinian', fish: 'eat_fish',
      pizza: 'eat_pizza', cheap: 'eat_cheap', aperitivo: 'eat_aperitivo',
      breakfast: 'eat_breakfast', special: 'eat_special'
    };

    const current = new URLSearchParams(location.hash.split('?')[1] || '').get('type') || 'all';
    const list = current === 'all' ? DATA.mangiare : DATA.mangiare.filter(r => r.type === current);

    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="eat_subtitle">${TE('eat_subtitle')}</p>
          <h1 class="display-lg" data-i18n="eat_title">${TE('eat_title')}</h1>
        </div>
        <div class="chip-group" style="margin-bottom:20px;">
          ${Object.keys(typeLabels).map(tp => `
            <a class="chip ${current === tp ? 'active' : ''}" href="#mangiare?type=${tp}"
               ${current === tp ? 'aria-current="true"' : ''}>${TE(typeLabels[tp])}</a>
          `).join('')}
        </div>
        <div class="rest-list">
          ${list.map(r => {
            // prezzo e indirizzo non ancora verificati sono `null`: il campo
            // sparisce, invece di mostrare all'ospite un appunto interno.
            const meta = [r.price, r.address].filter(Boolean);
            const note = LE(r.note);
            return `
              <a class="rest-card" href="${esc(r.map)}" target="_blank" rel="noopener noreferrer">
                <div class="rest-card__thumb">${imgTag(r.image, r.name)}</div>
                <div class="rest-card__body">
                  <span class="rest-card__type">${LE(r.typeLabel)}</span>
                  <h2 class="rest-card__title">${esc(r.name)}</h2>
                  ${note ? `<p class="rest-card__note">${note}</p>` : ''}
                  ${meta.length ? `<div class="rest-card__meta">${meta.map(p => `<span>${esc(p)}</span>`).join('<span>·</span>')}</div>` : ''}
                </div>
              </a>
            `;
          }).join('')}
        </div>
      </section>
    `;
  }

  function renderEnogastronomia() {
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="eno_subtitle">${TE('eno_subtitle')}</p>
          <h1 class="display-lg" data-i18n="eno_title">${TE('eno_title')}</h1>
        </div>
        <div class="editorial-grid">
          ${DATA.enogastronomia.map(item => `
            <article class="card" style="margin-bottom:16px;">
              <div class="card__media" style="aspect-ratio:16/10;">${imgTag(item.image, L(item.title))}</div>
              <div class="card__body">
                <h2 class="card__title">${LE(item.title)}</h2>
                <p class="card__text">${LE(item.text)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderCasa() {
    const c = DATA.casa;
    const contact = (CONFIG && CONFIG.contact) || {};

    const wifiBlock = (CONFIG && CONFIG.wifi && CONFIG.wifi.ssid) ? `
      <div class="info-item">
        <div class="info-item__icon">${wifiIcon()}</div>
        <div class="info-item__body">
          <div class="info-item__label">SSID</div>
          <div class="info-item__value">${esc(CONFIG.wifi.ssid)}</div>
        </div>
      </div>` : `
      <div class="info-item">
        <div class="info-item__icon">${wifiIcon()}</div>
        <div class="info-item__body">
          <div class="info-item__value" data-i18n="wifi_note">${TE('wifi_note')}</div>
        </div>
      </div>`;

    const contactRows = [];
    if (contact.phone) {
      contactRows.push(`
        <a href="tel:${esc(contact.phone.replace(/\s+/g, ''))}" class="info-item">
          <div class="info-item__icon">${phoneIcon()}</div>
          <div class="info-item__body">
            <div class="info-item__label" data-i18n="phone">${TE('phone')}</div>
            <div class="info-item__value">${esc(contact.phone)}</div>
          </div>
        </a>`);
    }
    if (contact.email) {
      contactRows.push(`
        <a href="mailto:${esc(contact.email)}" class="info-item">
          <div class="info-item__icon">${mailIcon()}</div>
          <div class="info-item__body">
            <div class="info-item__label">Email</div>
            <div class="info-item__value">${esc(contact.email)}</div>
          </div>
        </a>`);
    }

    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="casa_subtitle">${TE('casa_subtitle')}</p>
          <h1 class="display-lg" data-i18n="casa_title">${TE('casa_title')}</h1>
        </div>

        <div class="card" style="margin-bottom:24px;">
          <div class="card__media" style="aspect-ratio:4/3;">${imgTag(c.image, L(c.description))}</div>
          <div class="card__body"><p class="body-lg">${LE(c.description)}</p></div>
        </div>

        ${c.gallery ? `
        <div class="casa-gallery" style="margin-bottom:24px;">
          ${c.gallery.map(g => `
            <figure class="casa-gallery__item">
              ${imgTag(g.image, L(g.caption))}
              <figcaption class="casa-gallery__caption">${LE(g.caption)}</figcaption>
            </figure>
          `).join('')}
        </div>` : ''}

        <h2 class="heading-sm" style="margin-bottom:12px;" data-i18n="wifi">${TE('wifi')}</h2>
        <div class="info-list" style="margin-bottom:24px;">${wifiBlock}</div>

        <h2 class="heading-sm" style="margin-bottom:12px;" data-i18n="services">${TE('services')}</h2>
        <div class="quick-grid" style="margin-bottom:24px;">
          ${c.services.map(s => `
            <div class="quick-item quick-item--static">
              <div class="quick-item__icon quick-item__icon--emoji" aria-hidden="true">${esc(s.icon)}</div>
              <span class="quick-item__label" style="font-size:12px;">${LE(s.label)}</span>
            </div>
          `).join('')}
        </div>

        <h2 class="heading-sm" style="margin-bottom:12px;" data-i18n="rules">${TE('rules')}</h2>
        <ul class="info-list info-list--plain" style="margin-bottom:24px;">
          ${c.rules.map(r => `
            <li class="info-item">
              <div class="info-item__icon">${checkIcon()}</div>
              <div class="info-item__body"><div class="info-item__value">${LE(r)}</div></div>
            </li>
          `).join('')}
        </ul>

        ${contactRows.length ? `
        <h2 class="heading-sm" style="margin-bottom:12px;" data-i18n="contact">${TE('contact')}</h2>
        <div class="info-list">${contactRows.join('')}</div>` : ''}
      </section>
    `;
  }

  function renderMuoversi() {
    const m = DATA.muoversi;
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="move_subtitle">${TE('move_subtitle')}</p>
          <h1 class="display-lg" data-i18n="move_title">${TE('move_title')}</h1>
        </div>
        <div class="card" style="margin-bottom:24px;">
          <div class="card__media" style="aspect-ratio:16/10;">${imgTag(m.image, '')}</div>
        </div>
        <div class="info-list">
          ${m.items.map(i => `
            <div class="info-item info-item--stacked">
              <div class="info-item__icon info-item__icon--emoji" aria-hidden="true">${esc(i.icon)}</div>
              <div class="info-item__body">
                <div class="info-item__label">${LE(i.title)}</div>
                <div class="info-item__value">${LE(i.desc)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderInfo() {
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="info_subtitle">${TE('info_subtitle')}</p>
          <h1 class="display-lg" data-i18n="info_title">${TE('info_title')}</h1>
        </div>
        <div class="info-list">
          ${DATA.info.items.map(i => `
            <div class="info-item info-item--stacked">
              <div class="info-item__icon info-item__icon--emoji" aria-hidden="true">${esc(i.icon)}</div>
              <div class="info-item__body">
                <div class="info-item__label">${LE(i.title)}</div>
                <div class="info-item__value">${LE(i.value)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderVento() {
    const v = DATA.vento;
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="wind_subtitle">${TE('wind_subtitle')}</p>
          <h1 class="display-lg" data-i18n="wind_title">${TE('wind_title')}</h1>
        </div>
        <div class="card" style="margin-bottom:24px;">
          <div class="card__media" style="aspect-ratio:16/10;">${imgTag(v.image, '')}</div>
          <div class="card__body"><p class="body-lg">${LE(v.description)}</p></div>
        </div>
        <div class="info-list">
          ${v.winds.map(w => `
            <div class="info-item info-item--stacked">
              <div class="info-item__icon info-item__icon--emoji" aria-hidden="true">${esc(w.icon)}</div>
              <div class="info-item__body">
                <div class="info-item__label">${esc(w.name)} <span class="info-item__dir">(${esc(w.dir)})</span></div>
                <div class="info-item__value">${LE(w.effect)}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderFonti() {
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <h1 class="display-lg" data-i18n="nav_fonti">${TE('nav_fonti')}</h1>
        </div>
        <div class="card">
          <div class="card__body">
            <p class="body-lg" style="margin-bottom:16px;">${LE(DATA.fonti.text)}</p>
            <ul class="credits-list">
              ${DATA.fonti.credits.map(c => `<li>${LE(c)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  // ===== Dettaglio spiaggia =====
  function openBeach(id) {
    const b = DATA.spiagge.find(x => x.id === id);
    if (!b) return;
    openSheet(`
      ${imgTag(b.image, b.name)}
      ${b.imageCredit ? `<p class="caption sheet__credit">${TE('photo_credit')} · ${esc(b.imageCredit)}</p>` : ''}
      <h2 class="display-md">${esc(b.name)}</h2>
      <div class="beach-card__meta" style="margin-bottom:16px;">
        <span>📍 ${esc(b.distance)} ${TE('beach_distance')}</span>
        <span>🚗 ${esc(b.time)} ${TE('beach_time')}</span>
      </div>
      <p class="body">${LE(b.desc)}</p>
      <div class="info-list">
        ${infoRow(TE('beach_type'),   LE(b.type))}
        ${infoRow(TE('beach_wind'),   LE(b.wind))}
        ${infoRow(TE('beach_ideal'),  LE(b.ideal))}
        ${infoRow(TE('services'),     LE(b.services))}
      </div>
      <div style="margin-top:24px;">
        <a href="${esc(b.map)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--full">${TE('beach_map')}</a>
      </div>
    `);
  }

  function infoRow(label, value) {
    if (!value) return '';
    return `<div class="info-item"><div class="info-item__body">
      <div class="info-item__label">${label}</div>
      <div class="info-item__value">${value}</div>
    </div></div>`;
  }

  // ===== Eventi, sagre, archeologia =====

  function formatDate(iso) {
    if (!iso) return '';
    const parts = String(iso).split('-');
    if (parts.length < 3) return String(iso);
    const [y, m, d] = parts;
    return `${d}/${m}/${y}`;
  }

  function renderEventi() {
    const filters = [
      { key: 'all',      label: 'eventi_filter_all' },
      { key: 'cultura',  label: 'eventi_filter_cultura' },
      { key: 'musica',   label: 'eventi_filter_musica' },
      { key: 'famiglie', label: 'eventi_filter_famiglie' },
      { key: 'eno',      label: 'eventi_filter_eno' },
      { key: 'feste',    label: 'eventi_filter_sagre' },
      { key: 'archeo',   label: 'eventi_filter_archeo' }
    ];

    const now = new Date();
    const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7);

    let items = DATA.eventi.map(e => ({
      type: 'evento',
      sortDate: new Date(e.dateStart),
      endDate: new Date(e.dateEnd),
      data: e
    }));

    DATA.sagre.forEach(s => {
      let sortDate, endDate;
      if (String(s.date).length === 7) {
        // Una data nota solo a livello di mese ("2026-09") copre l'intero mese,
        // altrimenti sparirebbe dalla lista già il giorno 2.
        const [y, mo] = s.date.split('-').map(Number);
        sortDate = new Date(y, mo - 1, 1);
        endDate  = new Date(y, mo, 0);
      } else {
        sortDate = endDate = new Date(s.date);
      }
      items.push({ type: 'sagra', sortDate, endDate, data: s });
    });

    if (eventiFilter !== 'all' && eventiFilter !== 'archeo') {
      const catMap = { eno: 'enogastronomia', feste: 'feste', cultura: 'cultura', musica: 'musica', famiglie: 'famiglie' };
      const wanted = catMap[eventiFilter];
      items = items.filter(it =>
        it.data.category === wanted || (it.data.tags && it.data.tags.includes(wanted)));
    }

    items.sort((a, b) => a.sortDate - b.sortDate);
    const oggi      = items.filter(it => it.sortDate <= now && it.endDate >= now);
    const settimana = items.filter(it => it.sortDate > now && it.sortDate <= weekEnd);
    const prossimi  = items.filter(it => it.sortDate > weekEnd);

    const showEvents = eventiFilter !== 'archeo';
    const showArcheo = eventiFilter === 'all' || eventiFilter === 'archeo';

    let html = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="eventi_subtitle">${TE('eventi_subtitle')}</p>
          <h1 class="display-lg" data-i18n="eventi_title">${TE('eventi_title')}</h1>
        </div>
        <div class="chip-group" style="margin-bottom:20px;">
          ${filters.map(f => `
            <button type="button" class="chip ${eventiFilter === f.key ? 'active' : ''}"
                    data-efilter="${f.key}" aria-pressed="${eventiFilter === f.key}">${TE(f.label)}</button>
          `).join('')}
        </div>
    `;

    if (showEvents) {
      const nothingUpcoming = !oggi.length && !settimana.length && !prossimi.length;
      if (nothingUpcoming) {
        // Distinzione importante: nessun evento *nella categoria scelta*, oppure
        // calendario interamente passato. Prima nessuno dei due casi diceva nulla
        // se la lista non era vuota ma tutte le date erano trascorse.
        const key = items.length ? 'eventi_nessuno' : 'eventi_vuoto';
        html += `<p class="empty-state" data-i18n="${key}">${TE(key)}</p>`;
      } else {
        if (oggi.length)      html += sectionBlock('eventi_oggi', oggi);
        if (settimana.length) html += sectionBlock('eventi_settimana', settimana);
        if (prossimi.length)  html += sectionBlock('eventi_prossimamente', prossimi);
      }
    }

    if (showArcheo) {
      html += `
        <h2 class="heading-sm" style="margin:32px 0 16px;" data-i18n="eventi_archeologia">${TE('eventi_archeologia')}</h2>
        <div class="archeo-list">
          ${DATA.archeologia.map(a => `
            <button type="button" class="archeo-card" data-archeo="${esc(a.id)}">
              <div class="archeo-card__media">${imgTag(a.image, a.name)}</div>
              <div class="archeo-card__body">
                <span class="archeo-card__period">${LE(a.period)}</span>
                <span class="archeo-card__title">${esc(a.name)}</span>
                <span class="archeo-card__meta"><span>📍 ${LE(a.distance)}</span><span>⏱️ ${LE(a.visitTime)}</span></span>
                <span class="archeo-card__price">${LE(a.price)}</span>
              </div>
            </button>
          `).join('')}
        </div>
      `;
    }

    view.innerHTML = html + '</section>';
  }

  function sectionBlock(i18nKey, items) {
    return `
      <h2 class="heading-sm" style="margin:24px 0 12px;" data-i18n="${i18nKey}">${TE(i18nKey)}</h2>
      <div class="event-list">${items.map(eventCard).join('')}</div>
    `;
  }

  function eventCard(it) {
    const d = it.data;
    const dateStr = d.dateStart
      ? (d.dateStart === d.dateEnd ? formatDate(d.dateStart) : `${formatDate(d.dateStart)} → ${formatDate(d.dateEnd)}`)
      : L(d.dateNote);
    const badge = it.type === 'sagra' ? TE('eventi_badge_sagra') : TE('eventi_badge_evento');
    return `
      <button type="button" class="event-card" data-evento="${esc(d.id)}" data-evento-type="${esc(it.type)}">
        <div class="event-card__media">
          ${imgTag(d.image, d.name)}
          <span class="event-card__badge">${badge}</span>
        </div>
        <div class="event-card__body">
          <span class="event-card__date">📅 ${esc(dateStr)}${d.dateApprox ? ' (~)' : ''}</span>
          <span class="event-card__title">${esc(d.name)}</span>
          <span class="event-card__meta">
            <span>📍 ${esc(d.location)}, ${esc(d.comune)}</span>
            ${d.time ? `<span>🕐 ${LE(d.time)}</span>` : ''}
          </span>
          <span class="event-card__price">${LE(d.price)}</span>
        </div>
      </button>
    `;
  }

  function openEvento(type, id) {
    const pool = type === 'sagra' ? DATA.sagre : DATA.eventi;
    const e = pool.find(x => x.id === id);
    if (!e) return;

    const dateStr = e.dateStart
      ? (e.dateStart === e.dateEnd ? formatDate(e.dateStart) : `${formatDate(e.dateStart)} → ${formatDate(e.dateEnd)}`)
      : (L(e.dateNote) || formatDate(e.date));
    const approx = e.dateApprox ? ` <span class="info-item__hint">(${TE('eventi_data_indicativa')})</span>` : '';
    const badge = type === 'sagra' ? TE('eventi_badge_sagra') : TE('eventi_badge_evento');

    openSheet(`
      ${imgTag(e.image, e.name)}
      <div class="sheet__badges">
        <span class="badge badge--ocean">${badge}</span>
        ${(e.tags || []).map(tag => `<span class="badge">${tagLabel(tag)}</span>`).join('')}
      </div>
      <h2 class="display-md">${esc(e.name)}</h2>
      <div class="info-list" style="margin:16px 0;">
        ${infoRow(TE('eventi_data'),   esc(dateStr) + approx)}
        ${e.time ? infoRow(TE('eventi_orario'), LE(e.time)) : ''}
        ${infoRow(TE('eventi_luogo'),  esc(e.location) + ', ' + esc(e.comune))}
        ${infoRow(TE('eventi_prezzo'), LE(e.price))}
      </div>
      <p class="body">${LE(e.description)}</p>
      <div class="sheet__actions">
        ${e.website ? `<a href="${esc(e.website)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--full">${TE('eventi_sito')}</a>` : ''}
        <a href="${esc(e.map)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--full">${TE('beach_map')}</a>
      </div>
      <p class="caption sheet__source">${TE('eventi_fonte')}: ${esc(e.source)} · ${TE('eventi_verificato')} ${esc(formatDate(e.verified))}</p>
    `);
  }

  function openArcheo(id) {
    const a = DATA.archeologia.find(x => x.id === id);
    if (!a) return;
    openSheet(`
      ${imgTag(a.image, a.name)}
      ${a.imageCredit ? `<p class="caption sheet__credit">${TE('photo_credit')} · ${esc(a.imageCredit)}</p>` : ''}
      <h2 class="display-md">${esc(a.name)}</h2>
      <div class="info-list" style="margin:16px 0;">
        ${infoRow(TE('eventi_periodo'),      LE(a.period))}
        ${infoRow(TE('eventi_distanza'),     LE(a.distance))}
        ${infoRow(TE('eventi_tempo'),        LE(a.visitTime))}
        ${infoRow(TE('eventi_orari'),        LE(a.hours))}
        ${infoRow(TE('eventi_prezzo'),       LE(a.price))}
        ${infoRow(TE('eventi_prenotazione'), LE(a.booking))}
      </div>
      <h3 class="heading-sm" style="margin:20px 0 8px;" data-i18n="eventi_perche">${TE('eventi_perche')}</h3>
      <p class="body">${LE(a.whyVisit)}</p>
      <div class="sheet__actions">
        ${a.website ? `<a href="${esc(a.website)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--full">${TE('eventi_sito')}</a>` : ''}
        <a href="${esc(a.map)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--full">${TE('beach_map')}</a>
      </div>
      <p class="caption sheet__source">${TE('eventi_fonte')}: ${esc(a.source)} · ${TE('eventi_verificato')} ${esc(formatDate(a.verified))}</p>
    `);
  }

  // ===== Meteo =====
  function initWeather() {
    const widget = document.getElementById('meteo-widget');
    if (!widget) return;
    const sub = widget.querySelector('.quick-item__sublabel');
    if (sub) sub.textContent = t('weather_loading');

    // Senza un limite di tempo, su rete lenta il widget resta su "Caricamento…"
    // finché il browser non decide di arrendersi.
    const ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timer = ctrl ? setTimeout(() => ctrl.abort(), 8000) : null;

    fetch('https://api.open-meteo.com/v1/forecast?latitude=39.2238&longitude=9.1217&current_weather=true&windspeed_unit=kmh',
          ctrl ? { signal: ctrl.signal } : undefined)
      .then(r => r.ok ? r.json() : Promise.reject(new Error('HTTP ' + r.status)))
      .then(d => {
        if (timer) clearTimeout(timer);
        const w = d && d.current_weather;
        if (!w || !sub) throw new Error('risposta inattesa');
        sub.textContent = `🌡️ ${Math.round(w.temperature)}° · 💨 ${Math.round(w.windspeed)} km/h · ${windDirection(w.winddirection)}`;
      })
      .catch(() => {
        if (timer) clearTimeout(timer);
        if (sub) sub.textContent = t('weather_unavailable');
      });
  }

  function windDirection(deg) {
    const byLang = {
      it: ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'],
      en: ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
      de: ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW']
    };
    const dirs = byLang[currentLang] || byLang.it;
    return dirs[Math.round(deg / 45) % 8];
  }

  // ===== WhatsApp =====
  // Compare solo se un numero è stato configurato in js/config.js.
  function renderWhatsApp() {
    const number = CONFIG && CONFIG.contact && CONFIG.contact.whatsapp;
    const existing = document.getElementById('whatsapp-float');
    if (!number) { if (existing) existing.remove(); return; }
    if (existing) return;

    const greetings = {
      it: 'Ciao, sono ospite di Piccolabellavista',
      en: "Hi, I'm a guest at Piccolabellavista",
      de: 'Hallo, ich bin Gast bei Piccolabellavista'
    };
    const labels = { it: 'Scrivici su WhatsApp', en: 'Message us on WhatsApp', de: 'Schreiben Sie uns auf WhatsApp' };

    const btn = document.createElement('a');
    btn.id = 'whatsapp-float';
    btn.href = 'https://wa.me/' + String(number).replace(/\D/g, '') +
               '?text=' + encodeURIComponent(greetings[currentLang] || greetings.it);
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.setAttribute('aria-label', labels[currentLang] || labels.it);
    btn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
    document.body.appendChild(btn);
  }

  // ===== Piè di pagina: data di aggiornamento =====
  function renderUpdated() {
    const el = document.getElementById('foot-updated');
    if (!el) return;
    const iso = CONFIG && CONFIG.lastUpdated;
    if (!iso) { el.hidden = true; return; }
    el.hidden = false;
    el.textContent = `${t('updated_on')} ${formatDate(iso)}`;
  }

  // ===== Icone inline =====
  const svg = (paths) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths}</svg>`;
  const wifiIcon  = () => svg('<path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/>');
  const phoneIcon = () => svg('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>');
  const mailIcon  = () => svg('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>');
  const checkIcon = () => svg('<polyline points="20 6 9 17 4 12"/>');

  // ===== Avvio =====
  function init() {
    buildMenu();

    burger.addEventListener('click', openMenu);
    menuClose.addEventListener('click', closeMenu);
    scrim.addEventListener('click', closeMenu);
    $('#bottom-more').addEventListener('click', openMenu);
    sheetBackdrop.addEventListener('click', closeSheet);
    sheetX.addEventListener('click', closeSheet);

    renderRoute();
    renderWhatsApp();
    renderUpdated();
  }

  // Esposto per i18n.js (ridisegna la vista al cambio di lingua).
  window.App = {
    renderCurrent: () => { renderRoute(); renderWhatsApp(); renderUpdated(); },
    openBeach, openEvento, openArcheo, openSheet, closeSheet
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
