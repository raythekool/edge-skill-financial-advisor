# <img src="assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Financial Advisor Skill for Google AI Edge Gallery

This directory contains the official Google AI Edge Gallery skill for a personal financial literacy mentor with **Soul** (empathy, ethics, guardrails, non-prescriptive education) and **Brain** (on-device persistent memory in `localStorage`, adaptive level estimation).

## 📂 Directory Structure

```text
skills/financial-advisor/
├── SKILL.md             # Declarative contract, Soul, Persona, Rules, and Brain invocation schemas
├── README.md            # Skill overview and Edge Gallery setup
├── scripts/
│   └── index.html       # Headless background logic runner (Brain: persistent localStorage memory)
└── assets/
    ├── webview.html     # Inline visual dashboard rendered inside the Edge Gallery chat UI
    ├── icon.svg         # SVG icon
    └── demo-profile.json # Local development and fallback fixture
```

## 🚀 Loading in Google AI Edge Gallery

Host this repository on a static web host supporting direct JavaScript MIME execution, such as **GitHub Pages**.

Load the skill folder URL into the AI Edge Gallery app:

```text
https://raythekool.github.io/edge-skill-financial-advisor/skills/financial-advisor/
```

> **Important**: The root `.nojekyll` file ensures that GitHub Pages serves the raw `SKILL.md` and JavaScript files without Jekyll post-processing.

## 🌟 Key Features

1. **Soul & Empathetic Persona**: Educational, non-judgmental, clear metaphors, psychological guardrails against FOMO and panic selling.
2. **Zero Advice Policy**: Strictly complies with educational standards (no specific stock picking, no buying/selling recommendations).
3. **Compound Learning Memory (Brain)**: Remembers concepts already explored across sessions, goals stated by the user, and adapts explanations to Beginner, Intermediate, or Advanced levels.
4. **Interactive Chat Webview**: Displays the user's progress bar, mastered concept tags, and mindset checklist directly inside the mobile app.
