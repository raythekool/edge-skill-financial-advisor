# 📘 Google AI Edge Gallery — Skill Development Playbook & Golden Rules

Questo documento raccoglie tutti i principi architetturali, i vincoli tecnici e le best practice apprese sul campo durante lo sviluppo e il collaudo su iOS (iPhone con Gemma 4 E2B) e Android di **Google AI Edge Gallery**.

---

## 🏛️ 1. Architettura dei File: 100% Self-Contained

Ogni skill deve essere composta da file completamente autosufficienti.

```
skills/<skill-name>/
├── SKILL.md                 # System prompt per l'SLM (Gemma 4 E2B / 2B)
├── index.html               # Landing page di installazione 1-click (OS-aware)
├── scripts/
│   └── index.html           # Runner headless per run_js (100% inline JS)
└── assets/
    ├── webview.html         # Dashboard grafica interattiva (100% inline CSS/JS/SVG)
    └── icon.svg             # Icona vettoriale della skill
```

### ⚠️ Regola Fondamentale sulla Sandbox iOS (WebKit / JavaScriptCore)
- **Zero `<script src="...">` esterni nel runner**: In `scripts/index.html`, tutto il codice JavaScript deve essere contenuto all'interno di un unico tag `<script>...</script>`. Su iOS, l'ambiente di esecuzione headless non risolve né carica file JavaScript secondari via URL locali (`file://`).
- **Zero `<link rel="stylesheet">` o `<script src="...">` esterni nel Webview**: In `assets/webview.html`, tutti gli stili CSS devono trovarsi in `<style>...</style>` e tutti gli script in `<script>...</script>`. L'accesso a cartelle superiori (`../scripts/i18n.js`) viola le policy di sandboxing di WebKit su iOS e blocca l'esecuzione.
- **Zero dipendenze da immagini esterne**: Usa icone SVG inline o data-URIs base64 per evitare immagini rotte in assenza di rete o sandbox locale.

---

## ⚡ 2. Risoluzione "URI Too Long" & Payload Compatto

### Il Problema
Quando il runner `scripts/index.html` restituisce l'URL del webview:
```javascript
const webviewUrl = `../assets/webview.html?payload=${encodeURIComponent(JSON.stringify(payload))}`;
```
Se il payload include cataloghi statici, elenchi completi di corsi, testi tradotti o lunghi riepiloghi, l'URL risultante può superare i **16.000 caratteri**.
Su iOS (WebKit e `NSURL`), qualsiasi indirizzo che supera i 2.048–4.096 caratteri viene bloccato con l'errore:
> **"URI Too Long" (HTTP 414 / WebKit error)**

### La Soluzione
1. **Cataloghi e dati statici residenti nel Webview**: Array di configurazione, descrizioni dei moduli, cataloghi dei badge e dizionari i18n devono risiedere direttamente all'interno dello script inline di `webview.html`.
2. **Payload compatto (URL < 600 caratteri)**: Il runner deve passare via URL soltanto gli identificativi dinamici essenziali:
   ```json
   {
     "level": "beginner",
     "streak": 1,
     "concepts": ["inflazione", "etf"],
     "badges": ["first_step", "smart_cart"],
     "tab": "badges",
     "lang": "it"
   }
   ```
3. **Reidratazione dinamica**: `webview.html` legge il payload compatto e calcola in locale lo stato di avanzamento, i badge sbloccati/bloccati e i testi della pillola odierna.

---

## 🧠 3. Prompt Engineering per SLM (Gemma 4 E2B / 2B)

I modelli Small Language Model (SLM) on-device (2B e 4B parametri) richiedono istruzioni estremamente lineari e compatte.

### 📐 Linee Guida per `SKILL.md`
- **Lunghezza contenuta**: Massimo 40–50 righe di prompt.
- **Nessuna regola condizionale complessa**: Evita strutture tipo *"Regola 1 per i saluti, Regola 2 per le domande, Regola 3 per gli approfondimenti"*.
- **Comando imperativo universale**:
  > *"Always call the `run_js` tool on **EVERY turn** (including greetings, questions, and concept explanations) with the following exact parameters:"*
- **Obbligo esplicito del webview**:
  > *"Always include the returned webview in your response so that the interactive graphical dashboard is displayed on screen."*
- **Suggerimenti di prompt obbligatori**:
  > *"Conclude every response with 2-3 prompt suggestions to guide what to explore next..."*
- **Esempio JSON compatto**: Fornisci un singolo esempio JSON valido e univoco.

---

## 📱 4. Installazione 1-Click & Gestione Cross-Platform (iOS vs Android)

Lo schema URI personalizzato `com.google.ai.edge.gallery://llm_agent_chat/` è registrato **esclusivamente nel manifest di Android**.
Su iOS Safari, tentare di aprire tale link genera un popup di errore bloccante:
> *"Safari non può aprire la pagina perché l'indirizzo non è valido"*

### Architettura della Landing Page OS-Aware:
- **Su iOS**:
  - Nascondi / non invocare lo schema `com.google.ai.edge.gallery://`.
  - Pulsante principale: **"📋 Copia URL Skill per Edge Gallery"** (copia immediata con animazione e feedback visivo).
  - Pulsante secondario: **"Apri / Scarica Edge Gallery su App Store"** con link diretto ad Apple App Store.
- **Su Android**:
  - Pulsante principale: lancia `com.google.ai.edge.gallery://` copiando contestualmente l'URL negli appunti.
  - Pulsante secondario: Copia manuale.
- **Su Desktop**:
  - Mostra il **QR Code** ad alta risoluzione per la scansione da smartphone.
  - Pulsante secondario: Avvia il simulatore web integrato.

---

## 🔄 5. Ciclo di Vita e Aggiornamento delle Skill

- Google AI Edge Gallery scarica i file della skill **in locale nella sandbox dell'app** durante la prima importazione.
- L'app non effettua polling automatico degli aggiornamenti remoti su GitHub Pages ad ogni interazione.
- **Per aggiornare una skill su dispositivo**:
  1. Aprire l'app Edge Gallery > **Agent Skills**.
  2. Eliminare la skill esistente (swipe o icona cestino).
  3. Toccare **Add Skill from URL** e reinserire l'URL canonico di GitHub Pages.
  4. Salvare e avviare una nuova chat.

---

## 🎨 6. Design & Aspetto Visivo del Webview

- **Aspect Ratio**: Restituire `aspectRatio: 0.75 - 0.85` nel JSON di `run_js` per occupare l'altezza ideale nella bolla di chat mobile senza dover scorrere verticalmente.
- **Scrollbar invisibili**: Aggiungere sempre:
  ```css
  html, body { scrollbar-width: none; -ms-overflow-style: none; }
  ::-webkit-scrollbar { display: none; }
  ```
- **Dark Mode nativa**:
  ```css
  :root { color-scheme: light dark; --bg: #f8fafc; --card: #ffffff; ... }
  @media (prefers-color-scheme: dark) { :root { --bg: #0f172a; --card: #1e293b; ... } }
  ```
