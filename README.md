# <img src="skills/financial-advisor/assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Leo — Financial Advisor for Google AI Edge Gallery

> 🇮🇹 Leggi la versione in Italiano: [README.it.md](README.it.md)

A Google AI Edge Gallery Agent Skill featuring **Leo**, a personal financial literacy mentor. Leo provides warm, empathetic guidance (Soul) powered by an on-device persistent memory (Brain). He helps users navigate financial literacy through a gamified badge system, a 13-module learning path, and dynamic daily pills powered by LLM.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-Google%20AI%20Edge%20Gallery-blue)
![Type](https://img.shields.io/badge/type-JS%20Skill%20%2B%20Webview-orange)
![Compliance](https://img.shields.io/badge/compliance-Educational%20Only-green)

---

## 📚 Tutorials (Learning-Oriented)

### Getting Started: Chat with Leo Locally
If you want to experience what it's like to chat with Leo and explore his Webview Dashboard without installing it on a physical device, you can use the built-in local simulator.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/raythekool/edge-skill-financial-advisor.git
   cd edge-skill-financial-advisor
   ```
2. **Start the local server**:
   ```bash
   node serve.js
   ```
3. **Open your browser**:
   Navigate to [http://localhost:3000/test-runner.html](http://localhost:3000/test-runner.html).
4. **Interact**: Type a question (e.g., "What is compound interest?") to trigger the simulated LLM. Watch as the "Brain" updates your level, issues badges, and unlocks modules!

---

## 🛠️ How-To Guides (Task-Oriented)

### How to Install the Skill on Google AI Edge Gallery
You can deploy Leo to the Edge Gallery app running on an Android device using two methods.

**Method 1: Via ADB (Local Import)**
1. Connect your Android device via USB and ensure USB Debugging is enabled.
2. Push the skill folder to your device's Download folder:
   ```bash
   adb push skills/financial-advisor/ /sdcard/Download/
   ```
3. Open the **Google AI Edge Gallery** app, tap **Import local skill**, and select the `financial-advisor` folder.

**Method 2: Via URL (GitHub Pages)**
1. Host the `skills/financial-advisor/` folder on a public URL.
2. Inside the Edge Gallery app's Skill Manager, paste the URL (e.g., `https://raythekool.github.io/edge-skill-financial-advisor/skills/financial-advisor/`).

### How to Add a New UI Language
The Webview Dashboard supports i18n. To add a new language (e.g., Spanish):
1. Open `skills/financial-advisor/scripts/i18n.js`.
2. Add an `es` key to the `I18N` object containing the translations for the UI tabs and labels.
3. Update `currentLang = "es";` or add logic to detect the device's locale dynamically.

---

## 📖 Reference (Information-Oriented)

### File Structure & Architecture
The skill relies on a Vanilla JS architecture completely decoupled from build tools (no Webpack/Vite required).

```text
skills/financial-advisor/
├── SKILL.md             # The "Soul": LLM System Prompt & Instructions
└── scripts/
    ├── brain.js         # The "Brain": State management & API Handler
    ├── config.js        # The "Data": Curriculum, Badges catalog, Default state
    └── i18n.js          # The "Dictionary": UI Strings (EN/IT)
└── assets/
    ├── webview.html     # Dashboard layout
    ├── app.js           # Dashboard UI logic (Tabs, Rendering)
    ├── style.css        # Dashboard styling (Dark/Light mode)
    └── icon.svg         # Skill Icon
```

### The `ai_edge_gallery_get_result` API
The core of the skill is the `window["ai_edge_gallery_get_result"]` function in `brain.js`. The host app calls this function passing a JSON payload with an `action`.
Supported actions:
- `load_memory`: Returns current level, badges, and progress.
- `update_memory`: Updates concepts learned and issues new badges.
- `get_badges`: Returns the array of unlocked and locked badges.
- `get_learning_path`: Returns the 13-module roadmap status.
- `get_daily_pill`: Triggers the LLM to provide a dynamically generated economic news snippet (`llm_news`).
- `view_hub`: Returns the payload required to render `webview.html`.
- `switch_profile`: Swaps the active `localStorage` user profile.

---

## 🧠 Explanation (Understanding-Oriented)

### The Philosophy: Soul & Brain
Leo is designed not just to spit out financial facts, but to act as an empathetic mentor. This is achieved by dividing the skill into two distinct components:

1. **The Soul (`SKILL.md`)**: This file dictates Leo's personality to the LLM. It strictly enforces the **Zero Rule (No Investment Advice)**, ensuring Leo never recommends specific stocks or crypto, but instead focuses on education using relatable metaphors.
2. **The Brain (`brain.js`)**: An invisible runtime that provides persistence across sessions. Using the device's `localStorage`, it tracks what the user has learned. If the user asks about ETFs, the Brain records this, levels up the user to "Intermediate", and unlocks the "Smart Cart" badge.

### Why Vanilla JS?
To guarantee maximum compatibility and execution speed within the constrained Android Webview environment of the AI Edge Gallery app, the codebase relies entirely on Vanilla JavaScript, CSS variables, and HTML5. No bundlers or massive frameworks (like React) are used, keeping the payload footprint minuscule and the execution instantaneous.

---
*Disclaimer: This tool is exclusively for educational purposes and financial literacy. It does not constitute personalized financial advice or public savings solicitation.*
