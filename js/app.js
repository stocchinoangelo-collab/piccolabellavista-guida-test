/* Piccolabellavista — App Engine v3.0 */
(function() {
  'use strict';

  const $ = (s, c=document) => c.querySelector(s);
  const $$ = (s, c=document) => [...c.querySelectorAll(s)];

  // Sceglie il testo nella lingua corrente da un campo bilingue {it, en}.
  // Se il campo è una semplice stringa (vecchi contenuti), la restituisce così com'è.
  // Il tedesco (de) non è ancora tradotto: usa l'italiano come riserva.
  function L(field) {
    if (field == null) return '';
    if (typeof field === 'string' || typeof field === 'number') return field;
    return field[currentLang] || field.it || Object.values(field)[0] || '';
  }


  // State
  let currentSection = 'home';
  let beachFilter = 'all';
  let scrollLockCount = 0;

  // DOM refs
  const gate = $('#gate');
  const gatePass = $('#gate-pass');
  const gateBtn = $('#gate-btn');
  const gateErr = $('#gate-err');
  const app = $('#app');
  const view = $('#view');
  const menu = $('#menu');
  const scrim = $('#scrim');
  const burger = $('#burger');
  const menuClose = $('#menu-close');
  const menuList = $('#menu-list');
  const sheet = $('#sheet');
  const sheetBackdrop = $('#sheet-backdrop');
  const sheetX = $('#sheet-x');
  const sheetContent = $('#sheet-content');
  const bottomNav = $('#bottom-nav');

  // ===== SAFE STORAGE =====
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) {}
  }

  // ===== GATE =====
  function checkGate() {
    if (safeGet('pbv-auth') === '1') {
      openApp();
    } else {
      setTimeout(() => gatePass.focus(), 100);
    }
  }

  function openApp() {
    gate.classList.add('hidden');
    app.classList.remove('hidden');
    safeSet('pbv-auth', '1');
    renderRoute();
  }

  gateBtn.addEventListener('click', () => {
    if (gatePass.value.trim().toLowerCase() === DATA.password.toLowerCase()) {
      gateErr.classList.add('hidden');
      openApp();
    } else {
      gateErr.classList.remove('hidden');
      gatePass.value = '';
      gatePass.focus();
    }
  });

  gatePass.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') gateBtn.click();
  });

  // ===== ROUTING =====
  function parseHash() {
    const h = location.hash.replace('#', '') || 'home';
    return h.split('/')[0];
  }

  function renderRoute() {
    const sec = parseHash();
    currentSection = sec;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateNav();

    switch (sec) {
      case 'home': renderHome(); break;
      case 'spiagge': renderSpiagge(); break;
      case 'cagliari': renderCagliari(); break;
      case 'mangiare': renderMangiare(); break;
      case 'enogastronomia': renderEnogastronomia(); break;
      case 'casa': renderCasa(); break;
      case 'muoversi': renderMuoversi(); break;
      case 'info': renderInfo(); break;
      case 'vento': renderVento(); break;
      case 'fonti': renderFonti(); break;
      case 'eventi': renderEventi(); break;
      default: renderHome();
    }
    applyTranslations();
    initLazyImages();
  }

  window.addEventListener('hashchange', renderRoute);

  // ===== NAVIGATION =====
  function updateNav() {
    $$('.bottom-nav__item').forEach(el => {
      el.classList.toggle('active', el.dataset.section === currentSection);
    });
    $$('.menu__list a').forEach(el => {
      el.classList.toggle('active', el.getAttribute('href') === '#' + currentSection);
    });
  }

  function buildMenu() {
    const items = [
      { sec: 'home', label: 'nav_home', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
      { sec: 'spiagge', label: 'nav_spiagge', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 20h20"/><path d="M6 16l4-8 4 4 4-6"/></svg>' },
      { sec: 'cagliari', label: 'nav_cagliari', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>' },
      { sec: 'mangiare', label: 'nav_mangiare', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/></svg>' },
      { sec: 'enogastronomia', label: 'nav_eno', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>' },
      { sec: 'eventi', label: 'nav_eventi', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/></svg>' },
      { sec: 'casa', label: 'quick_casa', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
      { sec: 'muoversi', label: 'quick_muoversi', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg>' },
      { sec: 'vento', label: 'quick_vento', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>' },
      { sec: 'info', label: 'quick_info', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>' },
    ];
    // FIX v3.1: data-i18n solo sullo span del testo, mai sul <a> che contiene SVG
    menuList.innerHTML = items.map(it => `
      <li><a href="#${it.sec}">${it.icon}<span data-i18n="${it.label}">${t(it.label)}</span></a></li>
    `).join('');
    $$('.menu__list a').forEach(a => {
      a.addEventListener('click', () => closeMenu());
    });
  }

  // Menu
  function openMenu() {
    menu.setAttribute('aria-hidden', 'false');
    menu.removeAttribute('inert');
    scrim.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    lockScroll();
    menuClose.focus();
  }
  function closeMenu() {
    menu.setAttribute('aria-hidden', 'true');
    menu.setAttribute('inert', '');
    scrim.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    unlockScroll();
    burger.focus();
  }
  burger.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  scrim.addEventListener('click', closeMenu);

  $('#bottom-more').addEventListener('click', openMenu);

  // ===== SCROLL LOCK =====
  function lockScroll() {
    scrollLockCount++;
    if (scrollLockCount === 1) document.body.style.overflow = 'hidden';
  }
  function unlockScroll() {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    if (scrollLockCount === 0) document.body.style.overflow = '';
  }

  // ===== SHEET =====
  function openSheet(html) {
    sheetContent.innerHTML = html;
    sheet.setAttribute('aria-hidden', 'false');
    lockScroll();
    initLazyImages();
    setTimeout(() => sheetX.focus(), 50);
  }
  function closeSheet() {
    sheet.setAttribute('aria-hidden', 'true');
    unlockScroll();
  }
  sheetBackdrop.addEventListener('click', closeSheet);
  sheetX.addEventListener('click', closeSheet);

  // ===== LAZY IMAGES =====
  function initLazyImages() {
    $$('img[loading="lazy"]').forEach(img => {
      if (img.dataset.lazyInit) return;
      img.dataset.lazyInit = '1';
      if (img.complete) {
        img.classList.add('loaded');
      } else {
        img.onload = () => img.classList.add('loaded');
        img.onerror = () => img.classList.add('error');
        // Rete di sicurezza: alcuni browser (specie su connessioni lente
        // o in modalità risparmio dati) ritardano indefinitamente l'evento
        // "onload" per le immagini lazy ("Load events are deferred").
        // Se dopo 1,5 secondi l'immagine non ha ancora ricevuto una risposta,
        // la mostriamo comunque, invece di lasciarla invisibile per sempre.
        setTimeout(() => {
          if (!img.classList.contains('loaded') && !img.classList.contains('error')) {
            img.classList.add('loaded');
          }
        }, 1500);
      }
    });
  }

  // ===== SCROLL EFFECTS =====
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    $('.topbar').classList.toggle('topbar--scrolled', y > 10);
    lastScroll = y;
  }, { passive: true });

  // ===== KEYBOARD =====
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (sheet.getAttribute('aria-hidden') === 'false') {
        closeSheet();
      } else if (menu.getAttribute('aria-hidden') === 'false') {
        closeMenu();
      }
    }
  });

  // ===== RENDERERS =====

  function renderHome() {
    view.innerHTML = `
      <section class="section">
        <div class="hero">
          <div class="hero__media">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" alt="Sardegna" loading="lazy">
          </div>
          <div class="hero__content">
            <p class="hero__pretitle">Piccolabellavista</p>
            <h1 class="hero__title" data-i18n="home_welcome">Benvenuti</h1>
            <p class="hero__subtitle" data-i18n="home_subtitle">La vostra guida personale</p>
            <div class="hero__cta">
              <button class="btn btn--primary btn--pill" onclick="location.hash='spiagge'" data-i18n="home_cta">Scopri la guida</button>
              <button class="btn btn--ghost btn--pill" onclick="location.hash='casa'" data-i18n="home_secondary">La casa</button>
            </div>
          </div>
        </div>

        <div class="quick-grid">
          <a href="#casa" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_casa">La casa</span>
          </a>
          <a href="#spiagge" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M6 16l4-8 4 4 4-6"/><path d="M12 20V10"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_spiagge">Spiagge</span>
          </a>
          <a href="#mangiare" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_mangiare">Dove mangiare</span>
          </a>
          <a href="#enogastronomia" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_eno">Enogastronomia</span>
          </a>
          <a href="#cagliari" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_cagliari">Cagliari</span>
          </a>
          <a href="#muoversi" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2v20"/><path d="M2 12h20"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_muoversi">Come muoversi</span>
          </a>
          <a href="#vento" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_vento">Spiagge e vento</span>
          </a>
          <a href="#info" class="quick-item">
            <div class="quick-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></div>
            <span class="quick-item__label" data-i18n="quick_info">Informazioni</span>
          </a>
        </div>
      </section>
    `;
  }

  function renderSpiagge() {
    const filters = [
      { key: 'all', label: 'beach_filter_all' },
      { key: 'calm', label: 'beach_filter_calm' },
      { key: 'wind', label: 'beach_filter_wind' },
      { key: 'family', label: 'beach_filter_family' },
      { key: 'snorkel', label: 'beach_filter_snorkel' },
      { key: 'sunset', label: 'beach_filter_sunset' },
      { key: 'wild', label: 'beach_filter_wild' },
    ];

    const filtered = beachFilter === 'all'
      ? DATA.spiagge
      : DATA.spiagge.filter(b => b.tags.includes(beachFilter));

    view.innerHTML = `
      <section class="section">
        <div class="beach-hero">
          <img src="https://images.unsplash.com/photo-1506953829579-0cb981a83e2e?w=800&q=80" alt="Spiagge" loading="lazy">
          <div class="beach-hero__content">
            <p class="heading-sm" style="color:rgba(255,255,255,0.7);margin-bottom:4px;" data-i18n="beach_today">Oggi dove andare?</p>
            <h1 class="beach-hero__title" data-i18n="beach_title">Spiagge</h1>
          </div>
        </div>

        <div class="chip-group">
          ${filters.map(f => `
            <button class="chip ${beachFilter === f.key ? 'active' : ''}" data-filter="${f.key}">
              ${t(f.label)}
            </button>
          `).join('')}
        </div>

        <div class="beach-list">
          ${filtered.map(b => `
            <article class="beach-card" onclick="App.openBeach('${b.id}')">
              <div class="beach-card__media">
                <img src="${b.image}" alt="${b.name}" loading="lazy">
                <div class="beach-card__badges">
                  ${b.tags.map(tag => `<span class="badge">${t('tag_' + tag) || tag}</span>`).join('')}
                </div>
                ${b.imageCredit ? `<span class="media-credit">📷 ${b.imageCredit}</span>` : ''}
              </div>
              <div class="beach-card__body">
                <h3 class="beach-card__title">${b.name}</h3>
                <div class="beach-card__meta">
                  <span>📍 ${b.distance} ${t('beach_distance')}</span>
                  <span>🚗 ${b.time} ${t('beach_time')}</span>
                </div>
                <p class="body" style="margin-bottom:12px;">${L(b.desc)}</p>
                <div class="beach-card__tags">
                  <span class="beach-card__tag">${L(b.type)}</span>
                  <span class="beach-card__tag">${L(b.wind)}</span>
                </div>
                <div class="beach-card__actions">
                  <button class="btn btn--primary btn--small" onclick="event.stopPropagation(); window.open('${b.map}')">${t('beach_map')}</button>
                  <button class="btn btn--secondary btn--small" onclick="event.stopPropagation(); App.openBeach('${b.id}')">Dettagli</button>
                </div>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;

    $$('.chip[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        beachFilter = btn.dataset.filter;
        renderSpiagge();
      });
    });
  }

  function renderCagliari() {
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="cagliari_subtitle">La città tra mare e storia</p>
          <h1 class="display-lg" data-i18n="cagliari_title">Cagliari</h1>
        </div>
        <div class="editorial-grid">
          ${DATA.cagliari.map(item => `
            <article class="editorial-item">
              <div class="editorial-item__media">
                <img src="${item.image}" alt="${L(item.title)}" loading="lazy">
                ${item.imageCredit ? `<span class="media-credit">📷 ${item.imageCredit}</span>` : ''}
              </div>
              <div class="editorial-item__body">
                <span class="editorial-item__label">${L(item.label)}</span>
                <h3 class="editorial-item__title">${L(item.title)}</h3>
                <p class="editorial-item__text">${L(item.text)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderMangiare() {
    const types = ['all', 'sardinian', 'fish', 'pizza', 'cheap', 'aperitivo', 'breakfast', 'special'];
    const typeLabels = {
      all: 'beach_filter_all',
      sardinian: 'eat_sardinian',
      fish: 'eat_fish',
      pizza: 'eat_pizza',
      cheap: 'eat_cheap',
      aperitivo: 'eat_aperitivo',
      breakfast: 'eat_breakfast',
      special: 'eat_special'
    };

    const currentType = new URLSearchParams(location.hash.split('?')[1] || '').get('type') || 'all';
    const filtered = currentType === 'all'
      ? DATA.mangiare
      : DATA.mangiare.filter(r => r.type === currentType);

    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="eat_subtitle">Selezione personale dell'host</p>
          <h1 class="display-lg" data-i18n="eat_title">Dove mangiare</h1>
        </div>
        <div class="chip-group" style="margin-bottom:20px;">
          ${types.map(tp => `
            <button class="chip ${currentType === tp ? 'active' : ''}" onclick="location.hash='mangiare?type=${tp}'">
              ${t(typeLabels[tp])}
            </button>
          `).join('')}
        </div>
        <div class="rest-list">
          ${filtered.map(r => `
            <button class="rest-card" onclick="window.open('${r.map}')">
              <div class="rest-card__thumb">
                <img src="${r.image}" alt="${r.name}" loading="lazy">
              </div>
              <div class="rest-card__body">
                <span class="rest-card__type">${L(r.typeLabel)}</span>
                <h3 class="rest-card__title">${r.name}</h3>
                <p class="rest-card__note">${L(r.note)}</p>
                <div style="display:flex;gap:8px;margin-top:4px;font-size:12px;color:var(--color-stone-muted);">
                  <span>${r.price}</span>
                  <span>·</span>
                  <span>${r.address}</span>
                </div>
              </div>
            </button>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderEnogastronomia() {
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="eno_subtitle">I sapori autentici</p>
          <h1 class="display-lg" data-i18n="eno_title">Enogastronomia</h1>
        </div>
        <div class="editorial-grid">
          ${DATA.enogastronomia.map(item => `
            <article class="card" style="margin-bottom:16px;">
              <div class="card__media" style="aspect-ratio:16/10;">
                <img src="${item.image}" alt="${L(item.title)}" loading="lazy">
              </div>
              <div class="card__body">
                <h3 class="card__title">${L(item.title)}</h3>
                <p class="card__text">${L(item.text)}</p>
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `;
  }

  function renderCasa() {
    const c = DATA.casa;
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="casa_subtitle">Il vostro rifugio</p>
          <h1 class="display-lg" data-i18n="casa_title">La casa</h1>
        </div>
        <div class="card" style="margin-bottom:24px;">
          <div class="card__media" style="aspect-ratio:16/10;">
            <img src="${c.image}" alt="La casa" loading="lazy">
          </div>
          <div class="card__body">
            <p class="body-lg">${L(c.description)}</p>
          </div>
        </div>

        ${c.gallery ? `
        <div class="casa-gallery" style="margin-bottom:24px;">
          ${c.gallery.map(g => `
            <div class="casa-gallery__item">
              <img src="${g.image}" alt="${L(g.caption)}" loading="lazy">
              <span class="casa-gallery__caption">${L(g.caption)}</span>
            </div>
          `).join('')}
        </div>` : ''}

        <h3 class="heading-sm" style="margin-bottom:12px;" data-i18n="wifi">Wi-Fi</h3>
        <div class="info-list" style="margin-bottom:24px;">
          <div class="info-item">
            <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg></div>
            <div class="info-item__body">
              <div class="info-item__label">SSID</div>
              <div class="info-item__value">${c.wifi.ssid}</div>
            </div>
          </div>
          <div class="info-item">
            <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            <div class="info-item__body">
              <div class="info-item__label" data-i18n="password">Password</div>
              <div class="info-item__value" style="font-family:monospace;letter-spacing:1px;">${c.wifi.password}</div>
            </div>
          </div>
        </div>

        <h3 class="heading-sm" style="margin-bottom:12px;" data-i18n="services">Servizi</h3>
        <div class="quick-grid" style="margin-bottom:24px;">
          ${c.services.map(s => `
            <div class="quick-item" style="padding:12px;">
              <div class="quick-item__icon" style="font-size:24px;width:auto;height:auto;background:transparent;">${s.icon}</div>
              <span class="quick-item__label" style="font-size:12px;">${L(s.label)}</span>
            </div>
          `).join('')}
        </div>

        <h3 class="heading-sm" style="margin-bottom:12px;" data-i18n="rules">Regole</h3>
        <div class="info-list" style="margin-bottom:24px;">
          ${c.rules.map(r => `
            <div class="info-item">
              <div class="info-item__icon" style="font-size:14px;"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
              <div class="info-item__body">
                <div class="info-item__value">${L(r)}</div>
              </div>
            </div>
          `).join('')}
        </div>

        <h3 class="heading-sm" style="margin-bottom:12px;" data-i18n="contact">Contatti</h3>
        <div class="info-list">
          <a href="tel:${c.phone}" class="info-item">
            <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
            <div class="info-item__body">
              <div class="info-item__label" data-i18n="contact">Telefono</div>
              <div class="info-item__value">${c.phone}</div>
            </div>
          </a>
          <a href="mailto:${c.email}" class="info-item">
            <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
            <div class="info-item__body">
              <div class="info-item__label">Email</div>
              <div class="info-item__value">${c.email}</div>
            </div>
          </a>
        </div>
      </section>
    `;
  }

  function renderMuoversi() {
    const m = DATA.muoversi;
    view.innerHTML = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="move_subtitle">Trasporti e consigli</p>
          <h1 class="display-lg" data-i18n="move_title">Come muoversi</h1>
        </div>
        <div class="card" style="margin-bottom:24px;">
          <div class="card__media" style="aspect-ratio:16/10;">
            <img src="${m.image}" alt="Come muoversi" loading="lazy">
          </div>
        </div>
        <div class="info-list">
          ${m.items.map(i => `
            <div class="info-item" style="align-items:flex-start;padding:16px;">
              <div class="info-item__icon" style="font-size:20px;width:44px;height:44px;">${i.icon}</div>
              <div class="info-item__body">
                <div class="info-item__label">${L(i.title)}</div>
                <div class="info-item__value">${L(i.desc)}</div>
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
          <p class="heading-sm" data-i18n="info_subtitle">Tutto ciò che serve sapere</p>
          <h1 class="display-lg" data-i18n="info_title">Informazioni utili</h1>
        </div>
        <div class="info-list">
          ${DATA.info.items.map(i => `
            <div class="info-item" style="align-items:flex-start;padding:16px;">
              <div class="info-item__icon" style="font-size:20px;width:44px;height:44px;">${i.icon}</div>
              <div class="info-item__body">
                <div class="info-item__label">${L(i.title)}</div>
                <div class="info-item__value">${L(i.value)}</div>
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
          <p class="heading-sm" data-i18n="wind_subtitle">Scegli in base alla giornata</p>
          <h1 class="display-lg" data-i18n="wind_title">Spiagge e vento</h1>
        </div>
        <div class="card" style="margin-bottom:24px;">
          <div class="card__media" style="aspect-ratio:16/10;">
            <img src="${v.image}" alt="Vento" loading="lazy">
          </div>
          <div class="card__body">
            <p class="body-lg">${L(v.description)}</p>
          </div>
        </div>
        <div class="info-list">
          ${v.winds.map(w => `
            <div class="info-item" style="align-items:flex-start;padding:16px;">
              <div class="info-item__icon" style="font-size:20px;width:44px;height:44px;">${w.icon}</div>
              <div class="info-item__body">
                <div class="info-item__label">${w.name} <span style="color:var(--color-stone-muted);font-weight:400;">(${w.dir})</span></div>
                <div class="info-item__value">${L(w.effect)}</div>
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
          <h1 class="display-lg" data-i18n="nav_fonti">Fonti</h1>
        </div>
        <div class="card">
          <div class="card__body">
            <p class="body-lg" style="margin-bottom:16px;">${L(DATA.fonti.text)}</p>
            <ul style="display:flex;flex-direction:column;gap:8px;font-size:14px;color:var(--color-stone-light);">
              ${DATA.fonti.credits.map(c => `<li>• ${L(c)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  // ===== BEACH DETAIL SHEET =====
  function openBeach(id) {
    const b = DATA.spiagge.find(x => x.id === id);
    if (!b) return;
    openSheet(`
      <img src="${b.image}" alt="${b.name}" loading="lazy">
      ${b.imageCredit ? `<p class="caption" style="margin:-8px 0 12px;color:var(--color-stone-muted);">📷 ${b.imageCredit}</p>` : ''}
      <h2 class="display-md">${b.name}</h2>
      <div class="beach-card__meta" style="margin-bottom:16px;">
        <span>📍 ${b.distance} ${t('beach_distance')}</span>
        <span>🚗 ${b.time} ${t('beach_time')}</span>
      </div>
      <p class="body">${L(b.desc)}</p>
      <div class="info-list">
        <div class="info-item">
          <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20"/><path d="M6 16l4-8 4 4 4-6"/><path d="M12 20V10"/></svg></div>
          <div class="info-item__body">
            <div class="info-item__label">Tipo</div>
            <div class="info-item__value">${L(b.type)}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg></div>
          <div class="info-item__body">
            <div class="info-item__label">${t('beach_wind')}</div>
            <div class="info-item__value">${L(b.wind)}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div>
          <div class="info-item__body">
            <div class="info-item__label">Ideale per</div>
            <div class="info-item__value">${L(b.ideal)}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="info-item__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg></div>
          <div class="info-item__body">
            <div class="info-item__label">Servizi</div>
            <div class="info-item__value">${L(b.services)}</div>
          </div>
        </div>
      </div>
      <div style="margin-top:24px;">
        <a href="${b.map}" target="_blank" class="btn btn--primary btn--full">${t('beach_map')}</a>
      </div>
    `);
  }

  // ===== EVENTI / SAGRE / ARCHEOLOGIA =====
  let eventiFilter = 'all';

  function formatDate(iso) {
    const [y, m, d] = iso.split('-');
    return `${d}/${m}/${y}`;
  }

  function renderEventi() {
    const filters = [
      { key: 'all', label: 'eventi_filter_all' },
      { key: 'cultura', label: 'eventi_filter_cultura' },
      { key: 'musica', label: 'eventi_filter_musica' },
      { key: 'famiglie', label: 'eventi_filter_famiglie' },
      { key: 'eno', label: 'eventi_filter_eno' },
      { key: 'feste', label: 'eventi_filter_sagre' },
      { key: 'archeo', label: 'eventi_filter_archeo' },
    ];

    const now = new Date();
    const weekEnd = new Date(now); weekEnd.setDate(weekEnd.getDate() + 7);

    let allItems = [];
    DATA.eventi.forEach(e => {
      allItems.push({ type: 'evento', sortDate: new Date(e.dateStart), endDate: new Date(e.dateEnd), data: e });
    });
    DATA.sagre.forEach(s => {
      const d = new Date(s.date.length === 7 ? s.date + '-01' : s.date);
      allItems.push({ type: 'sagra', sortDate: d, endDate: d, data: s });
    });

    if (eventiFilter !== 'all' && eventiFilter !== 'archeo') {
      const catMap = { eno: 'enogastronomia', feste: 'feste', cultura: 'cultura', musica: 'musica', famiglie: 'famiglie' };
      const wanted = catMap[eventiFilter];
      allItems = allItems.filter(it => it.data.category === wanted || (it.data.tags && it.data.tags.includes(wanted)));
    }

    const showEventsSagre = eventiFilter !== 'archeo';
    const showArcheo = eventiFilter === 'all' || eventiFilter === 'archeo';

    allItems.sort((a, b) => a.sortDate - b.sortDate);
    const oggi = allItems.filter(it => it.sortDate <= now && it.endDate >= now);
    const settimana = allItems.filter(it => it.sortDate > now && it.sortDate <= weekEnd);
    const prossimi = allItems.filter(it => it.sortDate > weekEnd);

    let html = `
      <section class="section">
        <div class="section__header">
          <p class="heading-sm" data-i18n="eventi_subtitle">Eventi, sagre, archeologia e cultura</p>
          <h1 class="display-lg" data-i18n="eventi_title">Cosa succede in questi giorni?</h1>
        </div>
        <div class="chip-group" style="margin-bottom:20px;">
          ${filters.map(f => `
            <button class="chip ${eventiFilter === f.key ? 'active' : ''}" data-efilter="${f.key}">${t(f.label)}</button>
          `).join('')}
        </div>
    `;

    if (showEventsSagre) {
      if (!allItems.length) {
        html += `<p class="body" style="text-align:center;padding:24px 0;color:var(--color-stone-muted);" data-i18n="eventi_vuoto">Nessun evento in questa categoria per il periodo selezionato.</p>`;
      } else {
        if (oggi.length) html += sectionBlock('eventi_oggi', 'Oggi', oggi);
        if (settimana.length) html += sectionBlock('eventi_settimana', 'Questa settimana', settimana);
        if (prossimi.length) html += sectionBlock('eventi_prossimamente', 'Prossimamente', prossimi);
      }
    }

    if (showArcheo) {
      html += `
        <h2 class="heading-sm" style="margin:32px 0 16px;" data-i18n="eventi_archeologia">Archeologia</h2>
        <div class="archeo-list">
          ${DATA.archeologia.map(a => `
            <article class="archeo-card" onclick="App.openArcheo('${a.id}')">
              <div class="archeo-card__media">${a.image ? `<img src="${a.image}" alt="${a.name}" loading="lazy">` : ''}</div>
              <div class="archeo-card__body">
                <span class="archeo-card__period">${L(a.period)}</span>
                <h3 class="archeo-card__title">${a.name}</h3>
                <div class="archeo-card__meta"><span>📍 ${L(a.distance)}</span><span>⏱️ ${L(a.visitTime)}</span></div>
                <span class="archeo-card__price">${L(a.price)}</span>
              </div>
            </article>
          `).join('')}
        </div>
      `;
    }

    html += `</section>`;
    view.innerHTML = html;

    $$('.chip[data-efilter]').forEach(btn => {
      btn.addEventListener('click', () => { eventiFilter = btn.dataset.efilter; renderEventi(); });
    });
  }

  function sectionBlock(i18nKey, fallbackLabel, items) {
    return `
      <h2 class="heading-sm" style="margin:24px 0 12px;" data-i18n="${i18nKey}">${fallbackLabel}</h2>
      <div class="event-list">${items.map(eventCard).join('')}</div>
    `;
  }

  function eventCard(it) {
    const d = it.data;
    const dateStr = d.dateStart
      ? (d.dateStart === d.dateEnd ? formatDate(d.dateStart) : `${formatDate(d.dateStart)} → ${formatDate(d.dateEnd)}`)
      : L(d.dateNote);
    const approx = d.dateApprox ? ' (~)' : '';
    return `
      <article class="event-card" onclick="App.openEvento('${it.type}', '${d.id}')">
        <div class="event-card__media">
          <img src="${d.image}" alt="${d.name}" loading="lazy">
          <div class="event-card__badge">${it.type === 'sagra' ? 'Sagra' : 'Evento'}</div>
        </div>
        <div class="event-card__body">
          <div class="event-card__date">📅 ${dateStr}${approx}</div>
          <h3 class="event-card__title">${d.name}</h3>
          <div class="event-card__meta">
            <span>📍 ${d.location}, ${d.comune}</span>
            ${d.time ? `<span>🕐 ${d.time}</span>` : ''}
          </div>
          <div style="display:flex;gap:8px;align-items:center;">
            <span class="event-card__price">${L(d.price)}</span>
          </div>
        </div>
      </article>
    `;
  }

  function openEvento(type, id) {
    const pool = type === 'sagra' ? DATA.sagre : DATA.eventi;
    const e = pool.find(x => x.id === id);
    if (!e) return;
    const dateStr = e.dateStart
      ? (e.dateStart === e.dateEnd ? formatDate(e.dateStart) : `${formatDate(e.dateStart)} → ${formatDate(e.dateEnd)}`)
      : (L(e.dateNote) || formatDate(e.date));
    const approx = e.dateApprox ? ' <span style="color:var(--color-stone-muted);font-size:13px;">(data indicativa)</span>' : '';
    openSheet(`
      <img src="${e.image}" alt="${e.name}" loading="lazy">
      <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
        <span class="badge badge--ocean">${type === 'sagra' ? 'Sagra' : 'Evento'}</span>
        ${(e.tags || []).map(tag => `<span class="badge">${tag}</span>`).join('')}
      </div>
      <h2 class="display-md">${e.name}</h2>
      <div class="info-list" style="margin:16px 0;">
        <div class="info-item"><div class="info-item__icon">📅</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_data">Data</div><div class="info-item__value">${dateStr}${approx}</div>
        </div></div>
        ${e.time ? `<div class="info-item"><div class="info-item__icon">🕐</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_orario">Orario</div><div class="info-item__value">${e.time}</div>
        </div></div>` : ''}
        <div class="info-item"><div class="info-item__icon">📍</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_luogo">Luogo</div><div class="info-item__value">${e.location}, ${e.comune}</div>
        </div></div>
        <div class="info-item"><div class="info-item__icon">💶</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_prezzo">Prezzo</div><div class="info-item__value">${L(e.price)}</div>
        </div></div>
      </div>
      <p class="body">${e.description}</p>
      <div style="margin-top:20px;display:flex;gap:8px;flex-direction:column;">
        ${e.website ? `<a href="${e.website}" target="_blank" class="btn btn--primary btn--full" data-i18n="eventi_sito">Sito ufficiale</a>` : ''}
        <a href="${e.map}" target="_blank" class="btn btn--secondary btn--full">${t('beach_map')}</a>
      </div>
      <p class="caption" style="margin-top:16px;">Fonte: ${e.source} · Verificato: ${e.verified}</p>
    `);
  }

  function openArcheo(id) {
    const a = DATA.archeologia.find(x => x.id === id);
    if (!a) return;
    openSheet(`
      ${a.image ? `<img src="${a.image}" alt="${a.name}" loading="lazy">` : ''}
      ${a.imageCredit ? `<p class="caption" style="margin:4px 0 12px;color:var(--color-stone-muted);">📷 ${a.imageCredit}</p>` : ''}
      <h2 class="display-md">${a.name}</h2>
      <div class="info-list" style="margin:16px 0;">
        <div class="info-item"><div class="info-item__icon">🏛️</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_periodo">Periodo storico</div><div class="info-item__value">${L(a.period)}</div>
        </div></div>
        <div class="info-item"><div class="info-item__icon">📍</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_distanza">Distanza</div><div class="info-item__value">${L(a.distance)}</div>
        </div></div>
        <div class="info-item"><div class="info-item__icon">⏱️</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_tempo">Tempo di visita</div><div class="info-item__value">${L(a.visitTime)}</div>
        </div></div>
        <div class="info-item"><div class="info-item__icon">🕐</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_orari">Orari</div><div class="info-item__value">${L(a.hours)}</div>
        </div></div>
        <div class="info-item"><div class="info-item__icon">💶</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_prezzo">Prezzo</div><div class="info-item__value">${L(a.price)}</div>
        </div></div>
        <div class="info-item"><div class="info-item__icon">📋</div><div class="info-item__body">
          <div class="info-item__label" data-i18n="eventi_prenotazione">Prenotazione</div><div class="info-item__value">${L(a.booking)}</div>
        </div></div>
      </div>
      <h3 class="heading-sm" style="margin:20px 0 8px;" data-i18n="eventi_perche">Perché visitarlo</h3>
      <p class="body">${a.whyVisit}</p>
      <div style="margin-top:20px;display:flex;gap:8px;flex-direction:column;">
        ${a.website ? `<a href="${a.website}" target="_blank" class="btn btn--primary btn--full" data-i18n="eventi_sito">Sito ufficiale</a>` : ''}
        <a href="${a.map}" target="_blank" class="btn btn--secondary btn--full">${t('beach_map')}</a>
      </div>
      <p class="caption" style="margin-top:16px;">Fonte: ${a.source} · Verificato: ${a.verified}</p>
    `);
  }

  // ===== INIT =====
  function init() {
    buildMenu();
    checkGate();
    if (safeGet('pbv-auth') === '1') {
      renderRoute();
    }
  }

  // Expose
  window.App = {
    renderCurrent: renderRoute,
    openBeach,
    openEvento,
    openArcheo,
    openSheet,
    closeSheet
  };

  init();
})();
