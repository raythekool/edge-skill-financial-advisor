const STORAGE_KEY = "financial_advisor_leo_brain_v3";

  // Catalogo Ufficiale dei Badge Guadagnabili
  const BADGES_CATALOG = [
    {
      id: "first_step",
      icon: "🌱",
      title: "Primo Passo",
      desc: "Hai iniziato a dialogare con Leo per prendere in mano il tuo futuro economico.",
      criteria: "Poni la tua prima domanda a Leo"
    },
    {
      id: "safety_belt",
      icon: "🦺",
      title: "Cintura Allacciata",
      desc: "Hai compreso e pianificato la sicurezza del Fondo di Emergenza (3-6 mesi).",
      criteria: "Affronta il tema del fondo di emergenza o della liquidità"
    },
    {
      id: "snowball",
      icon: "⛄",
      title: "Effetto Valanga",
      desc: "Hai compreso il potere esponenziale dell'Interesse Composto nel tempo.",
      criteria: "Esplora il concetto di interesse composto"
    },
    {
      id: "smart_cart",
      icon: "🛒",
      title: "Carrello Globale",
      desc: "Hai compreso la diversificazione e la forza degli ETF a basso costo.",
      criteria: "Approfondisci come funzionano gli ETF indicizzati"
    },
    {
      id: "anti_fomo",
      icon: "🛡️",
      title: "Scudo Anti-FOMO",
      desc: "Hai riconosciuto la trappola del guadagno facile e le regole etiche del no-advice.",
      criteria: "Discuti di mode speculative o ricevi la spiegazione della Regola Zero"
    },
    {
      id: "zen_mind",
      icon: "🧘",
      title: "Mente Zen",
      desc: "Hai imparato a non farti spaventare dalla volatilità fisiologica dei mercati.",
      criteria: "Esplora come gestire il panico e i crolli di borsa"
    },
    {
      id: "goal_setter",
      icon: "🎯",
      title: "Bussola Accesa",
      desc: "Hai definito nel tuo profilo un obiettivo concreto e un orizzonte temporale.",
      criteria: "Condividi la tua età, un orizzonte temporale o un obiettivo (es. casa)"
    },
    {
      id: "daily_learner",
      icon: "☀️",
      title: "Costanza Quotidiana",
      desc: "Hai consultato la Pillola del Giorno e l'impatto delle notizie economiche.",
      criteria: "Richiedi la pillola del giorno a Leo"
    },
    {
      id: "tax_smart",
      icon: "⚖️",
      title: "Occhio ai Costi & Fisco",
      desc: "Hai compreso l'impatto devastante del TER e la deducibilità della previdenza.",
      criteria: "Approfondisci i costi dei fondi o la previdenza integrativa"
    },
    {
      id: "roadmap_explorer",
      icon: "🧭",
      title: "Esploratore della Roadmap",
      desc: "Hai esaminato il tuo percorso formativo completo a 13 moduli.",
      criteria: "Esamina la roadmap del tuo percorso didattico"
    }
  ];

  // Curriculum di apprendimento a 13 moduli
  const CURRICULUM = [
    { id: "mod_1", pillar: "Fondamenta", level: "beginner", title: "Budgeting & Regola 50/30/20", concept: "budgeting", desc: "Gestire entrate e uscite separando necessità (50%), desideri (30%) e risparmio (20%)." },
    { id: "mod_2", pillar: "Fondamenta", level: "beginner", title: "L'Inflazione & Potere d'Acquisto", concept: "inflazione", desc: "Capire perché lasciare tutti i soldi fermi sul conto corrente li svaluta nel tempo." },
    { id: "mod_3", pillar: "Fondamenta", level: "beginner", title: "Fondo di Emergenza", concept: "fondo di emergenza", desc: "La cintura di sicurezza: 3-6 mesi di spese vive liquide prima di qualsiasi investimento." },
    { id: "mod_4", pillar: "Fondamenta", level: "beginner", title: "Conto Corrente vs Conto Deposito", concept: "conto deposito", desc: "Distinguere lo strumento per le spese quotidiane da quello per remunerare la liquidità." },

    { id: "mod_5", pillar: "Investimenti", level: "intermediate", title: "Interesse Composto & Tempo", concept: "interesse composto", desc: "L'effetto valanga: generare rendimenti sui rendimenti passati grazie alla leva degli anni." },
    { id: "mod_6", pillar: "Investimenti", level: "intermediate", title: "Azioni vs Obbligazioni", concept: "differenza tra azioni e obbligazioni", desc: "La differenza tra diventare socio di un'azienda (azioni) o prestarle del denaro (obbligazioni/bond)." },
    { id: "mod_7", pillar: "Investimenti", level: "intermediate", title: "ETF & Diversificazione Globale", concept: "etf", desc: "Il carrello della spesa: comprare migliaia di titoli mondiali con un'unica quota a bassissimo costo." },
    { id: "mod_8", pillar: "Investimenti", level: "intermediate", title: "Il PAC (Piano di Accumulo)", concept: "pac", desc: "Investire una somma fissa ogni mese per non farsi condizionare dall'ansia del market timing." },
    { id: "mod_9", pillar: "Investimenti", level: "intermediate", title: "Costi e Fisco (TER e Tassazione)", concept: "costi e ter", desc: "Impatto devastante dei costi di gestione attivi a 20 anni e tassazione sulle rendite (26% vs 12.5%)." },

    { id: "mod_10", pillar: "Previdenza & Strategia", level: "advanced", title: "Previdenza Integrativa & Vantaggi Fiscali", concept: "fondo pensione", desc: "Costruire il secondo pilastro pensionistico sfruttando la deduzione fiscale annuale fino a 5.164€." },
    { id: "mod_11", pillar: "Previdenza & Strategia", level: "advanced", title: "Volatilità, Rischio & Drawdown", concept: "volatilita e rischio", desc: "Capire che le oscillazioni di breve periodo sono il prezzo pagato per il rendimento a lungo termine." },
    { id: "mod_12", pillar: "Previdenza & Strategia", level: "advanced", title: "Asset Allocation & Ribilanciamento", concept: "asset allocation", desc: "Calibrare pesi tra azioni e bond nel ciclo di vita e ripristinarli una volta all'anno." },
    { id: "mod_13", pillar: "Previdenza & Strategia", level: "advanced", title: "Finanza Comportamentale & Bias", concept: "finanza comportamentale", desc: "Difendersi da FOMO, overconfidence e dalla paura paralizzante dei crolli di borsa." }
  ];

  const DEFAULT_STATE = {
    mentor_name: "Leo",
    level: "beginner",
    user_profile: {
      goals: ["Creare fondo di emergenza", "Acquisire sicurezza economica"],
      age_range: "non specificata",
      time_horizon: "medio-lungo termine (> 5 anni)",
      risk_attitude: "prudente / equilibrata",
      tone_preference: "analogie quotidiane e calore empatico"
    },
    concepts_learned: ["inflazione", "fondo di emergenza"],
    badges_earned: [
      { id: "first_step", unlocked_at: new Date().toISOString() },
      { id: "safety_belt", unlocked_at: new Date().toISOString() }
    ],
    user_notes: [
      "Profilo orientato alla serenità e alla comprensione del rischio",
      "Ha iniziato il percorso dalle fondamenta della finanza personale con Leo"
    ],
    history_summaries: [
      { date: "2026-09-28", summary: "Inaugurato il percorso con Leo: discussi i primi concetti su inflazione e fondo emergenza." }
    ],
    last_updated: new Date().toISOString(),
    streak: 0,
    last_interaction_date: null
  };
