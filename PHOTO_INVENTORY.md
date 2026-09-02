# Inventario fotografico

**Aggiornato:** 2 settembre 2026 · versione 4.0 del progetto

Questo file elenca ogni immagine usata dalla guida e da dove arriva. Va tenuto
allineato: la versione precedente dichiarava «file immagine fisicamente
presenti: 0» quando in `img/casa/` ce n'erano già quattro.

---

## Riepilogo

| Categoria | Quantità |
|---|---|
| Riferimenti a immagini nei dati (`js/data.js`) | 29 |
| Riferimenti nel codice (`js/app.js`, immagini di intestazione) | 2 |
| File presenti nel repository | 8 (4 foto + 4 icone) |
| Immagini caricate da server esterni | 27 indirizzi distinti |
| — di cui Unsplash | 14 |
| — di cui Wikimedia Commons | 13 |
| Riferimenti a file locali mancanti | **0** |
| Immagini Wikimedia senza attribuzione | **0** |

---

## 1. Foto dell'appartamento — nel repository

Quattro file in `img/casa/`, proprietà degli host. Formato verticale,
547 × 672 px, JPEG, fra 27 e 38 kB ciascuno.

| File | Dove appare |
|---|---|
| `panoramica.jpg` | Immagine principale della sezione «La casa» + galleria |
| `letto.jpg` | Galleria — camera da letto |
| `bagno.jpg` | Galleria — bagno |
| `zona-pranzo.jpg` | Galleria — zona pranzo |

**Nota tecnica.** Sono scatti verticali. Dalla v4.0 la galleria li mostra in
formato 3/4, cioè senza tagliarli; prima un contenitore in 4/3 ne rimuoveva una
porzione consistente. La risoluzione (547 px di larghezza) è al limite: se un
giorno rifai le foto, scattale in orizzontale e attorno ai 1200 px.

## 2. Icone dell'app — nel repository

| File | Uso |
|---|---|
| `icon.svg` | Icona vettoriale, favicon principale |
| `img/icons/icon-192.png` | Manifest, 192 × 192 |
| `img/icons/icon-512.png` | Manifest, 512 × 512 |
| `img/icons/icon-512-maskable.png` | Manifest, `purpose: maskable` |
| `img/icons/apple-touch-icon.png` | iOS, 180 × 180 (Safari non gestisce in modo affidabile un apple-touch-icon in SVG) |

Tutte precaricate dal service worker: le icone ci sono anche offline.

---

## 3. Immagini da Wikimedia Commons — hotlink

Tredici indirizzi, tutti serviti tramite `Special:FilePath`. Ogni voce nei dati
ha il proprio campo `imageCredit`, che la guida mostra sopra la foto: le licenze
CC BY e CC BY-SA lo richiedono e **l'attribuzione non va rimossa**.

| Soggetto | File su Commons | Attribuzione registrata |
|---|---|---|
| Spiaggia del Poetto | `Poetto_beach.jpg` | Wikimedia Commons — CC BY 2.0 |
| Torre e faro di Calamosca | `Torre_e_faro_di_Calamosca.jpg` | Wikimedia Commons — CC BY 2.0 |
| Cala Mari Pintau | `Cala_Mari_Pintau_-_panoramio.jpg` | Ramon Espiña Fernandez — CC BY-SA 3.0 |
| Spiaggia di Solanas | `Solanas_beach_in_Sardinia_-_Flickr_-_david.orban.jpg` | David Orban — CC BY 2.0 |
| Costa Rei | `Panorama_Costa_Rei.jpg` | Alex10 — CC BY-SA 3.0 |
| Tuerredda | `Tuaredda.jpg` | Ilaria — CC BY-SA 2.0 |
| Quartiere Castello | `Castello_(Cagliari).jpg` | Wikimedia Commons — CC BY-SA 3.0 |
| Bastione di Saint Remy | `Bastione_di_San_Remy,_prospetto.jpg` | Wikimedia Commons |
| Anfiteatro romano | `Cagliari_Anfiteatro_Romano.jpg` | Unukorno — CC BY 3.0 |
| Necropoli di Tuvixeddu | `Cagliari_-_necropoli_di_Tuvixeddu_-_202109291525_5.jpg` | Mauro Cristarella Orestano (Crimao) — CC BY-SA 4.0 |
| Area archeologica di Nora | `Archaeological_site_Nora_-_Pula_-_Sardinia_-_Italy_-_17.jpg` | Norbert Nagel — CC BY-SA 3.0 |
| Su Nuraxi di Barumini | `Nuraghe_Su_Nuraxi_-_Barumini_-_Sardinia_-_Italy_-_30.jpg` | Norbert Nagel — CC BY-SA 3.0 |
| Santuario di Santa Vittoria | `Serri_,_Santuario_Nuragico_Santa_Vittoria._4.JPG` | Daniela Serra — CC BY-SA 3.0 |

**Voce senza immagine:** la Tomba dei Giganti Is Concias non ha un campo
`image`. È voluto e gestito: la scheda si apre normalmente, semplicemente senza
foto. Se ne trovi una con licenza compatibile, aggiungi `image` e `imageCredit`.

---

## 4. Immagini da Unsplash — hotlink

Quattordici indirizzi distinti, usati per le sezioni in cui non abbiamo
fotografie proprie: intestazioni, ristoranti, enogastronomia, eventi, trasporti,
vento.

Sono **fotografie generiche**: non ritraggono i luoghi indicati. Vale per tutte
le schede dei ristoranti (nessuna è una foto del locale) e per le immagini degli
eventi. Non vanno presentate come documentazione dei luoghi.

Due indirizzi sono usati in `js/app.js` per le intestazioni di Home e Spiagge, e
non compaiono nei dati.

Note d'uso:

- `photo-1414235077428-338989a2e8c0` compare due volte (Sa Piola e ChiaroScuro).
  Da differenziare, se un giorno si passa a foto reali.
- Gli indirizzi non sono stati verificati uno per uno nell'ambiente in cui è
  stata preparata la v4.0, che non aveva accesso a internet. **Vanno
  controllati**: apri la guida in ogni sezione e cerca i riquadri vuoti.

---

## 5. Cosa manca ancora

1. **Verificare i 27 indirizzi esterni.** Basta scorrere le sezioni con la
   console del browser aperta: gli errori 404 si vedono subito.
2. **Portare le immagini nel repository.** Il README, sezione «Immagini»,
   descrive il procedimento. Elimina la dipendenza da server terzi, permette di
   ridimensionarle e le rende disponibili anche offline.
3. **Sostituire le foto dei ristoranti con foto reali**, oppure dichiarare
   nella scheda che l'immagine è generica.
4. **Rifare le foto della casa in orizzontale**, a risoluzione più alta.

Le regole da rispettare quando si aggiungono immagini sono in
[`LICENSES.md`](LICENSES.md). La prima resta la più importante: non inventare
autore, licenza, fonte o attribuzione.
