# <img src="skills/financial-advisor/assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Financial Advisor for Google AI Edge Gallery

> A Google AI Edge Gallery Agent Skill acting as a personal financial literacy mentor equipped with **Soul** (empathy, pedagogical clarity, psychological guardrails, strict no-advice compliance) and **Brain** (on-device persistent memory, adaptive proficiency progression, learning roadmap, and tailored daily pills).

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-Google%20AI%20Edge%20Gallery-blue)
![Type](https://img.shields.io/badge/type-JS%20Skill%20%2B%20Webview-orange)
![Compliance](https://img.shields.io/badge/compliance-Educational%20Only-green)

---

## ✨ I Tre Pilastri Fondamentali

1. **💬 Domande Spot & Profilazione Continua**:
   - Fai qualsiasi domanda spontanea (es. *"Cosa sono i BTP?"*, *"Ho 30 anni e vorrei comprare casa tra 7 anni"*).
   - Il **Brain** estrae e ricorda gli obiettivi, l'età e l'orizzonte temporale in `localStorage`.
   - La **Soul** adatta in tempo reale il tono e il registro linguistico (più rassicurante se c'è ansia, più analitico se l'utente è avanzato).

2. **🗺️ Percorso di Apprendimento Strutturato (Learning Path)**:
   - Una roadmap pedagogica a moduli sequenziali suddivisa in tre pilastri:
     - **Fondamenta (Beginner)**: Budgeting 50/30/20, Inflazione, Fondo di Emergenza, Conto Deposito vs Corrente.
     - **Investimenti (Intermediate)**: Interesse Composto, Azioni vs Obbligazioni, ETF e Diversificazione, PAC, Costi e Fisco.
     - **Previdenza & Strategia (Advanced)**: Fondi Pensione e deduzioni fiscali, Volatilità e Drawdown, Asset Allocation, Finanza Comportamentale.
   - Ogni concetto assimilato viene spuntato e il Brain suggerisce sempre la tappa successiva raccomandata.

3. **☀️ Pillole Quotidiane (Concetto del Giorno + Notizie su Misura)**:
   - **Concetto del Giorno**: un micro-apprendimento focalizzato sul prossimo modulo da sbloccare, spiegato tramite analogie pratiche.
   - **Attualità Economica & Notizie**: contestualizzazione dei grandi temi economici (es. tassi BCE, dati ISTAT sull'inflazione, aste BTP, andamento borse) tradotti in **cosa significa concretamente per l'utente in base al suo profilo**.

---

## 🏛️ Architettura: Soul & Brain

```text
skills/financial-advisor/
├── SKILL.md             # Contratto dichiarativo, Soul (etica, no-advice) e protocollo Brain
├── README.md            # Documentazione specifica della skill e caricamento
├── scripts/
│   └── index.html       # BRAIN: runtime headless con memoria persistente via localStorage, roadmap e pillole
└── assets/
    ├── webview.html     # Dashboard grafica interattiva per la chat di AI Edge Gallery
    ├── icon.svg         # Icona vettoriale della skill
    └── demo-profile.json # Fixture offline di sviluppo
```

---

## 📱 Dashboard Interattiva nella Chat

Chiedendo *"Mostrami i miei progressi"* o *"Pillola del giorno"*, la skill inietta una WebView inline nella chat con:
- **Pillola del Giorno**: spiegazione del concetto e notizia economica spiegata per il profilo.
- **Percorso a Tappe**: timeline visiva dei moduli completati, modulo attuale e futuri.
- **Profilo Utente**: livello, orizzonte temporale stimato, attitudine al rischio e obiettivi.
- **Mindset & Bias Shield**: promemoria sui bias psicologici (No Advice, Volatilità, No FOMO).

---

## 🚀 Caricamento su Google AI Edge Gallery

### Metodo 1: Da URL (GitHub Pages)

Carica il seguente URL nel Gestore Skill dell'app:
```text
https://raythekool.github.io/edge-skill-financial-advisor/skills/financial-advisor/
```

### Metodo 2: Import Locale via ADB

```bash
adb push skills/financial-advisor/ /sdcard/Download/
```
Poi tocca **Import local skill** nell'app e seleziona la cartella.

---

## 🧪 Simulatore Locale nel Browser

Puoi testare chat, Brain e dashboard direttamente dal tuo PC:

```bash
# Avvia il server
node serve.js
```
Visita [http://localhost:3000/test-runner.html](http://localhost:3000/test-runner.html) (o [http://localhost:3000/](http://localhost:3000/)).

---

## ⚠️ Disclaimer

Strumento a esclusivo scopo educativo e di alfabetizzazione finanziaria. Non costituisce consulenza finanziaria personalizzata né sollecitazione al pubblico risparmio (direttiva MIFID II).
