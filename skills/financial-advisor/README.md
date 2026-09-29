# <img src="assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Financial Advisor Skill (Leo) for Google AI Edge Gallery

This directory contains the official Google AI Edge Gallery skill for **Leo**, a personal financial education mentor with **Soul** (warmth, empathy, anti-advice ethics, and behavioral shields), **Brain** (on-device persistent memory in `localStorage`), and an **Achievement Badge System**.

## 📂 Directory Structure

```text
skills/financial-advisor/
├── SKILL.md             # Declarative contract: Leo persona, Soul, Rules, and Brain schemas
├── README.md            # Skill overview and Edge Gallery setup
├── scripts/
│   └── index.html       # Headless background logic runner (Brain: persistent localStorage, 10 badges, learning path)
└── assets/
    ├── webview.html     # Inline visual dashboard rendered inside the Edge Gallery chat UI with Badges tab
    ├── icon.svg         # SVG icon
    └── demo-profile.json # Local development and fallback fixture
```

## 🚀 Loading in Google AI Edge Gallery

Load the skill folder URL into the AI Edge Gallery app:

```text
https://raythekool.github.io/edge-skill-financial-advisor/skills/financial-advisor/
```

## 🌟 Key Features

1. **Leo Persona & Soul**: Warm, stoic against market noise, pedagogical analogies, no judgment.
2. **Zero Advice Policy**: Strictly educational; never prescribes specific investments or trades.
3. **Compound Learning Memory (Brain)**: Remembers concepts already explored across sessions, goals stated by the user, and adapts explanations to Beginner, Intermediate, or Advanced levels.
4. **🏆 Unlocked Badge Showcase**: 10 milestone badges (First Step, Snowball, Safety Belt, Anti-FOMO, Zen Mind, etc.) unlocked through conversations.
5. **Interactive Chat Webview**: Displays the user's progress bar, badges grid, daily pill, and mindset checklist directly inside the mobile app.
