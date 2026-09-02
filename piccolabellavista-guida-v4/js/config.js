/* ============================================================
   Piccolabellavista — Configurazione
   ============================================================

   ⚠️  QUESTO FILE È PUBBLICO.
   Viene servito da GitHub Pages insieme al resto del sito: chiunque
   conosca l'indirizzo può scaricarlo e leggerlo. Non metterci nulla
   che non scriveresti su un cartello davanti al portone.

   In particolare NON rimettere qui:
   - la password del Wi-Fi di casa
   - codici di cassaforte, lucchetti o portoni
   - qualunque cosa che dia accesso fisico all'appartamento

   La password del Wi-Fi si consegna in casa: un cartoncino sul tavolo
   o un QR code sul frigorifero funzionano meglio e non finiscono su
   internet. Se non c'è nessun Wi-Fi configurato qui sotto, la guida
   mostra automaticamente agli ospiti un messaggio che dice dove
   trovarla.
   ============================================================ */

const CONFIG = {

  /* Data dell'ultimo aggiornamento dei contenuti.
     Viene mostrata in fondo alla guida, così l'ospite sa quanto è
     fresco quello che sta leggendo. Aggiornala quando tocchi i dati
     (soprattutto eventi e sagre). Formato: AAAA-MM-GG. */
  lastUpdated: "2026-09-02",

  /* Recapiti mostrati nella sezione "La casa" e nel pulsante WhatsApp.
     Sono a `null`, quindi la guida non li mostra affatto e il pulsante
     WhatsApp non compare.

     Se ritieni che i tuoi recapiti siano già pubblici (di norma lo sono:
     stanno sulla tua inserzione), puoi riattivarli scrivendoli qui.
     Esempio:

       phone:    "+39 070 000000",
       email:    "info@esempio.it",
       whatsapp: "39XXXXXXXXXX"   // solo cifre, con prefisso 39, senza +

     Consiglio: usa un numero e un indirizzo dedicati all'attività,
     non quelli personali. Una volta pubblicati non si tolgono più
     dagli archivi. */
  contact: {
    phone: null,
    email: null,
    whatsapp: null
  },

  /* Wi-Fi. Lascia `null` per mostrare agli ospiti il messaggio
     "la password la trovi in casa" invece della password stessa.
     Non riempirlo: è esattamente il dato che non deve stare qui. */
  wifi: null

};
