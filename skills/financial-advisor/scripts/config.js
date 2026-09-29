const STORAGE_KEY = "financial_advisor_leo_brain_v3";

  // Official Catalog of Unlockable Badges
    const BADGES_CATALOG = [
    {
      id: "first_step",
      icon: "🌱",
      title: "Primo Passo",
      title_en: "First Step",
      desc: "Hai iniziato a dialogare con Leo per prendere in mano il tuo futuro economico.",
      desc_en: "You started chatting with Leo to take charge of your financial future.",
      criteria: "Poni la tua prima domanda a Leo",
      criteria_en: "Ask your first question to Leo"
    },
    {
      id: "safety_belt",
      icon: "🦺",
      title: "Cintura Allacciata",
      title_en: "Safety Belt",
      desc: "Hai compreso e pianificato la sicurezza del Fondo di Emergenza (3-6 mesi).",
      desc_en: "You planned and understood the security of an Emergency Fund (3-6 months).",
      criteria: "Affronta il tema del fondo di emergenza o della liquidità",
      criteria_en: "Discuss emergency funds or cash buffers"
    },
    {
      id: "snowball",
      icon: "⛄",
      title: "Effetto Valanga",
      title_en: "Snowball Effect",
      desc: "Hai compreso il potere esponenziale dell'Interesse Composto nel tempo.",
      desc_en: "You grasped the exponential power of Compound Interest over time.",
      criteria: "Esplora il concetto di interesse composto",
      criteria_en: "Explore the compound interest concept"
    },
    {
      id: "smart_cart",
      icon: "🛒",
      title: "Carrello Globale",
      title_en: "Global Cart",
      desc: "Hai compreso la diversificazione e la forza degli ETF a basso costo.",
      desc_en: "You understood diversification and the power of low-cost index ETFs.",
      criteria: "Approfondisci come funzionano gli ETF indicizzati",
      criteria_en: "Learn how index ETFs work"
    },
    {
      id: "anti_fomo",
      icon: "🛡️",
      title: "Scudo Anti-FOMO",
      title_en: "Anti-FOMO Shield",
      desc: "Hai riconosciuto la trappola del guadagno facile e le regole etiche del no-advice.",
      desc_en: "You recognized get-rich-quick traps and the ethical Rule Zero.",
      criteria: "Discuti di mode speculative o ricevi la spiegazione della Regola Zero",
      criteria_en: "Discuss speculative fads or learn Rule Zero"
    },
    {
      id: "zen_mind",
      icon: "🧘",
      title: "Mente Zen",
      title_en: "Zen Mind",
      desc: "Hai imparato a non farti spaventare dalla volatilità fisiologica dei mercati.",
      desc_en: "You learned not to panic during natural market volatility and dips.",
      criteria: "Esplora come gestire il panico e i crolli di borsa",
      criteria_en: "Learn how to manage anxiety and market drops"
    },
    {
      id: "goal_setter",
      icon: "🎯",
      title: "Bussola Accesa",
      title_en: "Compass Activated",
      desc: "Hai definito nel tuo profilo un obiettivo concreto e un orizzonte temporale.",
      desc_en: "You set a clear goal and time horizon in your profile.",
      criteria: "Condividi la tua età, un orizzonte temporale o un obiettivo (es. casa)",
      criteria_en: "Share your age, a time horizon, or a goal (e.g. buying a house)"
    },
    {
      id: "daily_learner",
      icon: "☀️",
      title: "Costanza Quotidiana",
      title_en: "Daily Consistency",
      desc: "Hai consultato la Pillola del Giorno e l'impatto delle notizie economiche.",
      desc_en: "You checked the Daily Pill and practical economic news impact.",
      criteria: "Richiedi la pillola del giorno a Leo",
      criteria_en: "Request today's daily pill from Leo"
    },
    {
      id: "tax_smart",
      icon: "⚖️",
      title: "Occhio ai Costi & Fisco",
      title_en: "Fees & Taxes Savvy",
      desc: "Hai compreso l'impatto devastante del TER e la deducibilità della previdenza.",
      desc_en: "You understood the compounding drag of TER fees and pension deductions.",
      criteria: "Approfondisci i costi dei fondi o la previdenza integrativa",
      criteria_en: "Explore fund fees or supplementary pension deductions"
    },
    {
      id: "roadmap_explorer",
      icon: "🧭",
      title: "Esploratore della Roadmap",
      title_en: "Roadmap Explorer",
      desc: "Hai esaminato il tuo percorso formativo completo a 13 moduli.",
      desc_en: "You reviewed your full 13-module learning curriculum.",
      criteria: "Esamina la roadmap del tuo percorso didattico",
      criteria_en: "Examine the learning path roadmap"
    }
  ];

  // 13-Module Learning Curriculum
    const CURRICULUM = [
    { id: "mod_1", pillar: "Fondamenta", pillar_en: "Foundations", level: "beginner", title: "Budgeting & Regola 50/30/20", title_en: "Budgeting & The 50/30/20 Rule", concept: "budgeting", desc: "Gestire entrate e uscite separando necessità (50%), desideri (30%) e risparmio (20%).", desc_en: "Manage income and expenses: needs (50%), wants (30%), and savings (20%)." },
    { id: "mod_2", pillar: "Fondamenta", pillar_en: "Foundations", level: "beginner", title: "L'Inflazione & Potere d'Acquisto", title_en: "Inflation & Purchasing Power", concept: "inflazione", desc: "Capire perché lasciare tutti i soldi fermi sul conto corrente li svaluta nel tempo.", desc_en: "Understand why leaving all money idle in checking accounts erodes wealth over time." },
    { id: "mod_3", pillar: "Fondamenta", pillar_en: "Foundations", level: "beginner", title: "Fondo di Emergenza", title_en: "Emergency Fund", concept: "fondo di emergenza", desc: "La cintura di sicurezza: 3-6 mesi di spese vive liquide prima di qualsiasi investimento.", desc_en: "The financial seatbelt: 3-6 months of liquid expenses before investing." },
    { id: "mod_4", pillar: "Fondamenta", pillar_en: "Foundations", level: "beginner", title: "Conto Corrente vs Conto Deposito", title_en: "Checking vs Savings Account", concept: "conto deposito", desc: "Distinguere lo strumento per le spese quotidiane da quello per remunerare la liquidità.", desc_en: "Differentiate daily expense checking accounts from liquidity-remunerating savings." },

    { id: "mod_5", pillar: "Investimenti", pillar_en: "Investments", level: "intermediate", title: "Interesse Composto & Tempo", title_en: "Compound Interest & Time", concept: "interesse composto", desc: "L'effetto valanga: generare rendimenti sui rendimenti passati grazie alla leva degli anni.", desc_en: "The snowball effect: generating returns on previous returns using the leverage of time." },
    { id: "mod_6", pillar: "Investimenti", pillar_en: "Investments", level: "intermediate", title: "Azioni vs Obbligazioni", title_en: "Stocks vs Bonds", concept: "differenza tra azioni e obbligazioni", desc: "La differenza tra diventare socio di un'azienda (azioni) o prestarle del denaro (obbligazioni/bond).", desc_en: "The difference between becoming a business shareholder (stocks) vs lending money (bonds)." },
    { id: "mod_7", pillar: "Investimenti", pillar_en: "Investments", level: "intermediate", title: "ETF & Diversificazione Globale", title_en: "ETFs & Global Diversification", concept: "etf", desc: "Il carrello della spesa: comprare migliaia di titoli mondiali con un'unica quota a bassissimo costo.", desc_en: "The grocery cart: owning thousands of global companies in one low-cost basket." },
    { id: "mod_8", pillar: "Investimenti", pillar_en: "Investments", level: "intermediate", title: "Il PAC (Piano di Accumulo)", title_en: "DCA (Dollar-Cost Averaging)", concept: "pac", desc: "Investire una somma fissa ogni mese per non farsi condizionare dall'ansia del market timing.", desc_en: "Investing fixed monthly amounts to neutralize market timing anxiety." },
    { id: "mod_9", pillar: "Investimenti", pillar_en: "Investments", level: "intermediate", title: "Costi e Fisco (TER e Tassazione)", title_en: "Costs & Taxes (TER & Taxation)", concept: "costi e ter", desc: "Impatto devastante dei costi di gestione attivi a 20 anni e tassazione sulle rendite (26% vs 12.5%).", desc_en: "The massive long-term drag of active management fees (TER) and capital gains taxation." },

    { id: "mod_10", pillar: "Previdenza & Strategia", pillar_en: "Retirement & Strategy", level: "advanced", title: "Previdenza Integrativa & Vantaggi Fiscali", title_en: "Supplementary Pension & Tax Relief", concept: "fondo pensione", desc: "Costruire il secondo pilastro pensionistico sfruttando la deduzione fiscale annuale.", desc_en: "Building a secondary retirement pillar leveraging annual tax deductions." },
    { id: "mod_11", pillar: "Previdenza & Strategia", pillar_en: "Retirement & Strategy", level: "advanced", title: "Volatilità, Rischio & Drawdown", title_en: "Volatility, Risk & Drawdown", concept: "volatilita e rischio", desc: "Capire che le oscillazioni di breve periodo sono il prezzo pagato per il rendimento a lungo termine.", desc_en: "Understanding that short-term fluctuations are the toll for long-term real growth." },
    { id: "mod_12", pillar: "Previdenza & Strategia", pillar_en: "Retirement & Strategy", level: "advanced", title: "Asset Allocation & Ribilanciamento", title_en: "Asset Allocation & Rebalancing", concept: "asset allocation", desc: "Calibrare pesi tra azioni e bond nel ciclo di vita e ripristinarli una volta all'anno.", desc_en: "Calibrating stock/bond weights across life cycles and restoring them periodically." },
    { id: "mod_13", pillar: "Previdenza & Strategia", pillar_en: "Retirement & Strategy", level: "advanced", title: "Finanza Comportamentale & Bias", title_en: "Behavioral Finance & Biases", concept: "finanza comportamentale", desc: "Difendersi da FOMO, overconfidence e dalla paura paralizzante dei crolli di borsa.", desc_en: "Defending yourself against FOMO, overconfidence, and panic during market downturns." }
  ];

  const DEFAULT_STATE = {
    mentor_name: "Leo",
    level: "beginner",
    user_profile: {
      goals: ["Build emergency fund", "Achieve financial peace of mind"],
      age_range: "not specified",
      time_horizon: "medium-long term (> 5 years)",
      risk_attitude: "prudent / balanced",
      tone_preference: "everyday analogies and empathetic warmth"
    },
    concepts_learned: ["inflazione", "fondo di emergenza"],
    badges_earned: [
      { id: "first_step", unlocked_at: new Date().toISOString() },
      { id: "safety_belt", unlocked_at: new Date().toISOString() }
    ],
    user_notes: [
      "Profile oriented towards peace of mind and risk awareness",
      "Started personal finance fundamentals journey with Leo"
    ],
    history_summaries: [
      { date: "2026-09-28", summary: "Inaugurated pathway with Leo: explored inflation and emergency fund concepts." }
    ],
    last_updated: new Date().toISOString(),
    streak: 0,
    last_interaction_date: null
  };
