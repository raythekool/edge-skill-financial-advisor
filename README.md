# <img src="skills/financial-advisor/assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Leo — Financial Advisor for Google AI Edge Gallery

> A Google AI Edge Gallery Agent Skill featuring **Leo**, a personal financial literacy mentor equipped with **Soul** (empathy, pedagogical clarity, psychological guardrails, strict no-advice compliance), **Brain** (on-device persistent memory, adaptive proficiency progression, learning roadmap), and a **Gamified Badge Achievement System**.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-Google%20AI%20Edge%20Gallery-blue)
![Type](https://img.shields.io/badge/type-JS%20Skill%20%2B%20Webview-orange)
![Compliance](https://img.shields.io/badge/compliance-Educational%20Only-green)

---

## 🦁 Chi è Leo?

Leo è il tuo mentore per l'educazione finanziaria.
- **Motto di Leo**: *"Il tempo batte sempre il timing, e la calma batte sempre la fretta."*
- **Personalità**: Calmo, accogliente, mai giudicante, maestro di metafore chiare (la palla di neve, il carrello della spesa, la cintura di sicurezza).
- **Trasparenza**: Non vende prodotti né raccomanda investimenti speculativi.

---

## ✨ Le Funzionalità Chiave

1. **💬 Domande Spot & Profilazione Continua**:
   - Fai qualsiasi domanda spontanea (es. *"Cosa sono i BTP?"*, *"Ho 30 anni e vorrei comprare casa tra 7 anni"*).
   - Leo estrae e ricorda gli obiettivi, l'età e l'orizzonte temporale in `localStorage`.
   - Adatta il registro linguistico al livello dell'utente (`Beginner`, `Intermediate`, `Advanced`).

2. **🏆 Bacheca dei Badge Guadagnati (10 Trofei Sbloccabili)**:
   - Dialogando con Leo e affrontando temi chiave, l'utente sblocca badge di traguardo:
     - 🌱 **Primo Passo**: Prima domanda posta a Leo.
     - 🦺 **Cintura Allacciata**: Comprensione del Fondo di Emergenza.
     - ⛄ **Effetto Valanga**: Comprensione dell'Interesse Composto.
     - 🛒 **Carrello Globale**: Padronanza degli ETF e della diversificazione.
     - 🛡️ **Scudo Anti-FOMO**: Comprensione dei rischi del "tutto e subito" e della Regola Zero.
     - 🧘 **Mente Zen**: Gestione dell'ansia da volatilità e dei crolli di borsa.
     - 🎯 **Bussola Accesa**: Definizione di obiettivi e orizzonti temporali.
     - ☀️ **Costanza Quotidiana**: Consultazione della pillola del giorno.
     - ⚖️ **Occhio ai Costi & Fisco**: Comprensione del TER e della previdenza integrativa.
     - 🧭 **Esploratore della Roadmap**: Consultazione del percorso a 13 moduli.

3. **🗺️ Percorso di Apprendimento Strutturato (Learning Path)**:
   - Roadmap a 13 moduli progressivi divisi in *Fondamenta*, *Investimenti* e *Previdenza & Strategia*.
   - Il Brain suggerisce sempre la tappa successiva consigliata.

4. **☀️ Pillole Quotidiane (Concetto del Giorno + Notizie su Misura)**:
   - **Concetto del Giorno**: micro-apprendimento spiegato con un'analogia.
   - **Attualità Economica**: scenario economico reale (BCE, inflazione, BTP, borse) con l'impatto pratico tradotto per il profilo dell'utente.

---

## 🏛️ Architettura: Soul & Brain

```text
skills/financial-advisor/
├── SKILL.md             # Contratto dichiarativo, personalità di Leo (Soul) e protocollo Brain
├── README.md            # Documentazione specifica della skill
├── scripts/
│   └── index.html       # BRAIN: runtime headless con memoria persistente via localStorage, 10 badge, roadmap e pillole
└── assets/
    ├── webview.html     # Dashboard grafica interattiva con tab Trofei, Pillola, Percorso e Profilo
    ├── icon.svg         # Icona vettoriale della skill
    └── demo-profile.json # Fixture offline di sviluppo
```

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

```bash
node serve.js
```
Visita [http://localhost:3000/test-runner.html](http://localhost:3000/test-runner.html) per chattare con Leo e sbloccare i badge in tempo reale.

---

## ⚠️ Disclaimer

Strumento a esclusivo scopo educativo e di alfabetizzazione finanziaria. Non costituisce consulenza finanziaria personalizzata né sollecitazione al pubblico risparmio (direttiva MIFID II).
