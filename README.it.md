# <img src="skills/financial-advisor/assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Leo — Mentore Finanziario per Google AI Edge Gallery

> 🇬🇧 Read the English version: [README.md](README.md)

Una Skill per Google AI Edge Gallery che introduce **Leo**, un mentore personale per l'educazione finanziaria. Leo fornisce una guida calda ed empatica (Soul) alimentata da una memoria persistente sul dispositivo (Brain). Aiuta gli utenti a comprendere il mondo della finanza tramite un sistema di badge (gamification), un percorso formativo a 13 moduli e pillole quotidiane dinamiche generate dall'LLM.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-Google%20AI%20Edge%20Gallery-blue)
![Type](https://img.shields.io/badge/type-JS%20Skill%20%2B%20Webview-orange)
![Compliance](https://img.shields.io/badge/compliance-Educational%20Only-green)

---

## 📚 Tutorials (Orientato all'Apprendimento)

### Getting Started: Chatta con Leo in Locale
Se vuoi provare l'esperienza di dialogo con Leo ed esplorare la sua Dashboard Webview senza installare la skill su un dispositivo fisico, puoi usare il simulatore locale integrato.

1. **Clona il repository**:
   ```bash
   git clone https://github.com/raythekool/edge-skill-financial-advisor.git
   cd edge-skill-financial-advisor
   ```
2. **Avvia il server locale**:
   ```bash
   node serve.js
   ```
3. **Apri il browser**:
   Visita [http://localhost:3000/test-runner.html](http://localhost:3000/test-runner.html).
4. **Interagisci**: Fai una domanda (es. "Cos'è l'interesse composto?") per attivare il simulatore. Osserva come il "Brain" aggiorna il tuo livello, sblocca badge e ti fa avanzare nei moduli!

---

## 🛠️ How-To Guides (Orientato ai Task)

### Come installare la Skill su Google AI Edge Gallery
Puoi distribuire Leo sull'app Edge Gallery di un dispositivo Android in due modi.

**Metodo 1: Tramite ADB (Importazione Locale)**
1. Collega il dispositivo Android via USB e assicurati che il Debug USB sia attivo.
2. Copia la cartella della skill nei download del dispositivo:
   ```bash
   adb push skills/financial-advisor/ /sdcard/Download/
   ```
3. Apri l'app **Google AI Edge Gallery**, tocca **Import local skill** e seleziona la cartella `financial-advisor`.

**Metodo 2: Tramite URL (GitHub Pages)**
1. Pubblica la cartella `skills/financial-advisor/` su un URL pubblico.
2. Nel gestore skill dell'app Edge Gallery, incolla l'URL (es. `https://raythekool.github.io/edge-skill-financial-advisor/skills/financial-advisor/`).

### Come aggiungere una nuova lingua (i18n)
La Webview Dashboard supporta la localizzazione. Per aggiungere una lingua (es. Spagnolo):
1. Apri `skills/financial-advisor/scripts/i18n.js`.
2. Aggiungi la chiave `es` all'oggetto `I18N` con le traduzioni per i tab e le etichette.
3. Aggiorna `currentLang = "es";` o aggiungi la logica per rilevare dinamicamente la lingua del dispositivo.

---

## 📖 Reference (Orientato all'Informazione)

### Struttura dei File e Architettura
La skill si basa su un'architettura Vanilla JS completamente svincolata da tool di build (no Webpack/Vite).

```text
skills/financial-advisor/
├── SKILL.md             # L'Anima (Soul): Prompt di Sistema LLM e istruzioni
└── scripts/
    ├── brain.js         # Il Cervello (Brain): Gestione stato e API Handler
    ├── config.js        # I Dati (Data): Curriculum, Catalogo badge, Stato di default
    └── i18n.js          # Il Dizionario: Stringhe UI (EN/IT)
└── assets/
    ├── webview.html     # Layout della Dashboard
    ├── app.js           # Logica UI della Dashboard (Tab, Rendering)
    ├── style.css        # Stili della Dashboard (Dark/Light mode)
    └── icon.svg         # Icona della Skill
```

### L'API `ai_edge_gallery_get_result`
Il cuore della skill è la funzione `window["ai_edge_gallery_get_result"]` in `brain.js`. L'app host chiama questa funzione passando un payload JSON contenente una `action`.
Azioni supportate:
- `load_memory`: Restituisce il livello attuale, i badge e il progresso.
- `update_memory`: Aggiorna i concetti appresi e sblocca nuovi badge.
- `get_badges`: Restituisce l'array dei badge sbloccati e bloccati.
- `get_learning_path`: Restituisce lo stato della roadmap a 13 moduli.
- `get_daily_pill`: Istruisce l'LLM a fornire una notizia economica generata dinamicamente (`llm_news`).
- `view_hub`: Restituisce il payload necessario per renderizzare `webview.html`.
- `switch_profile`: Cambia il profilo utente attivo salvato nel `localStorage`.

---

## 🧠 Explanation (Orientato alla Comprensione)

### La Filosofia: Soul & Brain
Leo non è progettato per snocciolare freddi dati finanziari, ma per agire come un mentore empatico. Questo si ottiene dividendo la skill in due componenti distinti:

1. **The Soul (`SKILL.md`)**: Questo file definisce la personalità di Leo per l'LLM. Applica rigidamente la **Regola Zero (Nessun consiglio d'investimento)**, assicurandosi che Leo non raccomandi mai azioni o criptovalute specifiche, focalizzandosi invece sull'educazione tramite metafore della vita reale.
2. **The Brain (`brain.js`)**: Un runtime invisibile che offre persistenza tra una sessione e l'altra. Sfruttando il `localStorage` del dispositivo, traccia ciò che l'utente ha imparato. Se l'utente fa domande sugli ETF, il Brain registra l'evento, alza il livello a "Intermediate" e sblocca il trofeo "Carrello Globale".

### Perché Vanilla JS?
Per garantire la massima compatibilità e velocità di esecuzione all'interno dell'ambiente limitato (Android Webview) dell'app AI Edge Gallery, il codice si affida unicamente a JavaScript Vanilla, variabili CSS e HTML5. L'assenza di bundler o framework pesanti (come React) mantiene il peso del codice minuscolo e l'esecuzione istantanea.

---
*Disclaimer: Strumento a esclusivo scopo educativo e di alfabetizzazione finanziaria. Non costituisce consulenza finanziaria personalizzata né sollecitazione al pubblico risparmio.*
