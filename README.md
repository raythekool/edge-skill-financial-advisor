# <img src="skills/financial-advisor/assets/icon.svg" width="28" height="28" alt="Financial Advisor Icon" style="vertical-align: middle;"> Financial Advisor for Google AI Edge Gallery

> A Google AI Edge Gallery Agent Skill acting as a personal financial literacy mentor equipped with **Soul** (empathy, pedagogical clarity, psychological guardrails, strict no-advice compliance) and **Brain** (on-device persistent memory, adaptive proficiency progression, and concept tracking).

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Platform](https://img.shields.io/badge/platform-Google%20AI%20Edge%20Gallery-blue)
![Type](https://img.shields.io/badge/type-JS%20Skill%20%2B%20Webview-orange)
![Compliance](https://img.shields.io/badge/compliance-Educational%20Only-green)

---

## ✨ Overview

This skill is built following the official [Google AI Edge Gallery Skills Specification](https://github.com/google-ai-edge/gallery/tree/main/skills).

Unlike standard chatbots that lack persistent memory across sessions or venture into risky financial speculations, this skill provides:
1. **A Compassionate Soul (L'Anima)**: Guides users through financial concepts without judgment, using everyday analogies, de-escalating anxiety around money, and actively shielding against common behavioral biases (FOMO, panic selling, overconfidence).
2. **A Compounding Brain (Il Cervello)**: Remembers previous conversations and topics via on-device `localStorage`, continuously calibrates the user's proficiency level (*Beginner*, *Intermediate*, *Advanced*), and builds an interconnected mental map of mastered concepts.
3. **Strict Non-Prescriptive Policy**: Strictly complies with educational standards — it explains *mechanisms and principles* (compound interest, inflation, index ETFs, bond duration, pension funds, risk tolerance) without ever recommending specific investment products or stock picks.

---

## 🏛️ Architecture: Soul & Brain

```text
skills/financial-advisor/
├── SKILL.md             # The SOUL (Persona, ethics, guardrails) + Brain invocation protocol
├── README.md            # Skill overview and deployment details
├── scripts/
│   └── index.html       # The BRAIN (Hidden headless webview runner with localStorage persistence)
└── assets/
    ├── webview.html     # Interactive on-device mobile chat UI dashboard
    ├── icon.svg         # Skill vector badge
    └── demo-profile.json # Local offline development fixture
```

### 🌟 1. The Soul (L'Anima)
- **Pedagogical Empathy**: Recognizes that money is an emotional and stressful topic. It celebrates curiosity and breaks down barriers.
- **Analogy-First Teaching**: Replaces confusing jargon with intuitive metaphors (e.g. *compound interest as a rolling snowball*, *ETFs as a diversified shopping basket*).
- **Behavioral Bias Alerts**: Surfaces warnings when detecting emotions like FOMO or market-crash anxiety.
- **No-Advice Guardrail**: Never dispenses personalized investment recommendations; directs users to certified independent advisors for asset management.

### 🧠 2. The Brain (Il Cervello)
- **Autonomous Persistence**: Executes in a hidden WebView (`scripts/index.html`) using the standardized `ai_edge_gallery_get_result` contract.
- **Adaptive Leveling**: Dynamically adjusts language depth:
  - **Beginner**: Visual analogies, zero technical jargon, foundational topics (emergency fund, cash flow, inflation).
  - **Intermediate**: Practical mechanisms, index funds, asset allocation, TER/expense ratios, dollar-cost averaging (PAC).
  - **Advanced**: Statistical risk metrics, Sharpe ratio, bond duration, rebalancing strategies, tax drag.
- **Knowledge State Tracking**: Maintains an append-only list of verified mastered concepts and past session summaries.

---

## 📱 Interactive In-Chat Dashboard

When the user asks *"What have we learned so far?"* or *"Show my progress"*, the skill triggers the official `webview` response payload to render an inline, touch-friendly dashboard inside the chat feed:

- **Level Indicator**: Visual badge with real-time proficiency tier.
- **Mastery Progress**: Progress bar tracking conceptual milestones.
- **Tag Cloud**: Mastered concepts with verified checkmarks.
- **Journal & Notes**: Summaries of past discussions and declared financial goals.
- **Mindset & Bias Shield**: Quick reminders on market psychology and discipline.

---

## 🚀 Loading the Skill into Google AI Edge Gallery

### Method 1: Load from GitHub Pages (Recommended)

1. Enable **GitHub Pages** for this repository (Settings > Pages > Source: `main` branch `/ (root)`).
2. Open the **AI Edge Gallery** app on your device with a supported model (e.g. Gemma 4).
3. Tap the **Skills** chip to enter the Skill Manager.
4. Tap **(+)** and select **Load skill from URL**.
5. Enter the skill directory URL:
   ```text
   https://raythekool.github.io/edge-skill-financial-advisor/skills/financial-advisor/
   ```

> 💡 The repository includes `.nojekyll` in the root directory so GitHub Pages serves raw Markdown and JS files directly.

### Method 2: Local Import via ADB

1. Push the skill folder directly to your Android device:
   ```bash
   adb push skills/financial-advisor/ /sdcard/Download/
   ```
2. In the AI Edge Gallery app, tap **Skills** > **(+)** > **Import local skill**.
3. Select the `financial-advisor` folder using the system file picker.

---

## 🧪 Local Simulation & Testing

You can test the entire skill, memory state transitions, and UI dashboard directly in your desktop browser:

```bash
# Start the local development server
node serve.js
```

Then visit:
```text
http://localhost:3000/test-runner.html
```

The simulator embeds the headless `scripts/index.html` runner and simulates the `ai_edge_gallery_get_result` lifecycle with live inspection logs.

---

## ⚠️ Disclaimer

This tool is strictly designed for **financial education and literacy purposes only**. It does not provide personalized investment advice, trading signals, or portfolio management services. Past performance does not guarantee future results. Consult a qualified, independent financial advisor for individual investment decisions.
