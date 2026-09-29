const I18N = {
  it: {
    tab_pill: "☀️ Pillola Oggi",
    tab_path: "🗺️ Percorso",
    tab_badges: "🏆 Badge",
    tab_profile: "👤 Profilo",
    tab_mindset: "🧠 Mindset",
    level_beginner: "Principiante",
    level_intermediate: "Intermedio",
    level_advanced: "Avanzato",
    streak_label: "Giorni consecutivi:",
    quiz_button: "Test di Verifica",
    profile_risk: "Attitudine al Rischio"
  },
  en: {
    tab_pill: "☀️ Daily Pill",
    tab_path: "🗺️ Pathway",
    tab_badges: "🏆 Badges",
    tab_profile: "👤 Profile",
    tab_mindset: "🧠 Mindset",
    level_beginner: "Beginner",
    level_intermediate: "Intermediate",
    level_advanced: "Advanced",
    streak_label: "Daily streak:",
    quiz_button: "Knowledge Check",
    profile_risk: "Risk Attitude"
  }
};

let currentLang = "it";

function t(key) {
  return I18N[currentLang][key] || key;
}
