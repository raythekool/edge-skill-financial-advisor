
  
  function getStoredState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        let parsed = JSON.parse(raw);
        // Migrate old format to multi-profile
        if (!parsed.profiles) {
          return { activeId: 'default', profiles: { 'default': parsed } };
        }
        return parsed;
      }
    } catch (e) {
      console.warn("Lettura localStorage fallita:", e);
    }
    return null;
  }

  function saveStoredState(globalState) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(globalState));
    } catch (e) {
      console.error("Salvataggio fallito:", e);
    }
  }

  function initializeOrGetState() {
    let globalState = getStoredState();
    if (!globalState) {
      globalState = {
        activeId: 'default',
        profiles: {
          'default': JSON.parse(JSON.stringify(DEFAULT_STATE))
        }
      };
      saveStoredState(globalState);
    }
    let state = globalState.profiles[globalState.activeId];
    if (!state.badges_earned) state.badges_earned = [...DEFAULT_STATE.badges_earned];
    if (!state.user_profile) state.user_profile = { ...DEFAULT_STATE.user_profile };
    if (state.streak === undefined) state.streak = 0;
    
    // Update streak logic
    const today = new Date().toISOString().split("T")[0];
    if (state.last_interaction_date) {
      const lastDate = new Date(state.last_interaction_date);
      const todayDate = new Date(today);
      const diffTime = Math.abs(todayDate - lastDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays === 1) {
        state.streak += 1;
      } else if (diffDays > 1) {
        state.streak = 0; // reset
      }
    }
    state.last_interaction_date = today;
    
    return { globalState, state };
  }


    function calculateLearningPath(learnedConcepts, lang = "en") {
    const list = learnedConcepts.map(c => String(c).toLowerCase().trim());
    let currentFound = false;

    return CURRICULUM.map(mod => {
      const isMastered = list.includes(mod.concept.toLowerCase());
      let status = "upcoming";
      if (isMastered) {
        status = "mastered";
      } else if (!currentFound) {
        status = "current";
        currentFound = true;
      }
      const title = (lang === "en" && mod.title_en) ? mod.title_en : mod.title;
      const desc = (lang === "en" && mod.desc_en) ? mod.desc_en : mod.desc;
      const pillar = (lang === "en" && mod.pillar_en) ? mod.pillar_en : mod.pillar;
      return { ...mod, title, desc, pillar, status };
    });
  }

  // Verifica e sblocca badge in base a concetti, azioni o profilo
  function evaluateBadges(state, context) {
    const newlyUnlocked = [];
    const earnedIds = (state.badges_earned || []).map(b => b.id);
    const concepts = (state.concepts_learned || []).map(c => c.toLowerCase());

    const checkAndAward = (badgeId) => {
      if (!earnedIds.includes(badgeId)) {
        const entry = { id: badgeId, unlocked_at: new Date().toISOString() };
        state.badges_earned.push(entry);
        earnedIds.push(badgeId);
        const fullBadge = BADGES_CATALOG.find(b => b.id === badgeId);
        newlyUnlocked.push(fullBadge);
      }
    };

    // Controllo criteri
    checkAndAward("first_step");

    if (concepts.includes("interesse composto")) checkAndAward("snowball");
    if (concepts.includes("fondo di emergenza")) checkAndAward("safety_belt");
    if (concepts.includes("etf")) checkAndAward("smart_cart");
    if (concepts.includes("costi e ter") || concepts.includes("fondo pensione")) checkAndAward("tax_smart");

    if (context) {
      if (context.fomo_triggered) checkAndAward("anti_fomo");
      if (context.volatility_discussed) checkAndAward("zen_mind");
      if (context.goal_set) checkAndAward("goal_setter");
      if (context.daily_pill_called) checkAndAward("daily_learner");
      if (context.roadmap_viewed) checkAndAward("roadmap_explorer");
    }

    return newlyUnlocked;
  }

    function getBadgesStatus(state, lang = "en") {
    const earnedMap = new Map();
    (state.badges_earned || []).forEach(b => earnedMap.set(b.id, b.unlocked_at));

    const allBadges = BADGES_CATALOG.map(b => {
      const isUnlocked = earnedMap.has(b.id);
      const title = (lang === "en" && b.title_en) ? b.title_en : b.title;
      const desc = (lang === "en" && b.desc_en) ? b.desc_en : b.desc;
      const criteria = (lang === "en" && b.criteria_en) ? b.criteria_en : b.criteria;
      return {
        ...b,
        title,
        desc,
        criteria,
        unlocked: isUnlocked,
        unlocked_at: isUnlocked ? earnedMap.get(b.id) : null
      };
    });

    return {
      total: BADGES_CATALOG.length,
      earned_count: earnedMap.size,
      badges: allBadges
    };
  }

  
    function getDailyPillData(state, context, lang = "en") {
    const path = calculateLearningPath(state.concepts_learned || [], lang);
    const nextMod = path.find(m => m.status === "current") || CURRICULUM[0];
    
    const userLevel = state.level || "beginner";
    const defaultImpact = lang === "en"
      ? "Lower interest rates reduce borrowing costs for mortgages, but lower yields on basic savings accounts."
      : "Se i tassi scendono, i nuovi mutui costano meno ma i conti deposito renderanno leggermente meno.";

    const llmNews = context && context.llm_news ? context.llm_news : {
      topic: lang === "en" ? "Central Bank Rates (ECB/Fed)" : "Tassi delle Banche Centrali (BCE)",
      headline: lang === "en" ? "Central banks review economic trends and interest rates" : "La BCE valuta l'andamento dei tassi guida",
      tailored_impact: defaultImpact
    };

    const profileNotice = lang === "en"
      ? `Calibrated for ${userLevel.toUpperCase()} profile with horizon: ${state.user_profile.time_horizon}`
      : `Calibrato per profilo ${userLevel.toUpperCase()} con orizzonte ${state.user_profile.time_horizon}`;

    const dateStr = new Date().toLocaleDateString(lang === "en" ? "en-US" : "it-IT", { weekday: "long", day: "numeric", month: "long" });

    return {
      date: dateStr,
      concept_pill: {
        title: nextMod.title,
        concept: nextMod.concept,
        pillar: nextMod.pillar,
        level: nextMod.level,
        explanation: nextMod.desc
      },
      market_news_context: {
        topic: llmNews.topic,
        headline: llmNews.headline,
        tailored_impact: llmNews.tailored_impact,
        for_profile: profileNotice
      }
    };
  }


  window["ai_edge_gallery_get_result"] = async (data) => {
    try {
      const request = typeof data === "string" ? JSON.parse(data || "{}") : (data || {});
      const action = request.action || "load_memory";
      const lang = request.lang || "en";
      let { globalState, state } = initializeOrGetState();

      if (action === "load_memory") {
        const path = calculateLearningPath(state.concepts_learned, lang);
        const currentStep = path.find(m => m.status === "current");
        const badgesStatus = getBadgesStatus(state, lang);

        const payload = {
          mentor: "Leo",
          status: "ready",
          current_level: state.level || "beginner",
          user_profile: state.user_profile,
          concepts_already_learned: state.concepts_learned || [],
          concepts_count: (state.concepts_learned || []).length,
          current_learning_step: currentStep ? currentStep.title : "Tutti i moduli completati!",
          badges: badgesStatus,
          user_notes: (state.user_notes || []).slice(-5),
          recent_topics: (state.history_summaries || []).slice(-3),
          last_updated: state.last_updated
        };

        return JSON.stringify({ result: JSON.stringify(payload) });
      }

      if (action === "update_memory") {
        if (request.new_level && ["beginner", "intermediate", "advanced"].includes(request.new_level)) {
          state.level = request.new_level;
        }

        if (Array.isArray(request.add_concepts)) {
          for (const c of request.add_concepts) {
            const clean = String(c).trim().toLowerCase();
            if (clean && !state.concepts_learned.includes(clean)) {
              state.concepts_learned.push(clean);
            }
          }
        }

        if (request.profile_update && typeof request.profile_update === "object") {
          state.user_profile = { ...state.user_profile, ...request.profile_update };
        }

        if (request.add_note && typeof request.add_note === "string") {
          state.user_notes.push(request.add_note.trim());
          if (state.user_notes.length > 30) state.user_notes.shift();
        }

        if (request.summary && typeof request.summary === "string") {
          state.history_summaries.push({
            date: new Date().toISOString().split("T")[0],
            summary: request.summary.trim()
          });
          if (state.history_summaries.length > 20) state.history_summaries.shift();
        }

        // Valutazione nuovi badge sbloccati
        const context = {
          fomo_triggered: request.fomo_triggered || false,
          volatility_discussed: request.volatility_discussed || false,
          goal_set: Boolean(request.profile_update && (request.profile_update.goals || request.profile_update.time_horizon)),
          daily_pill_called: request.daily_pill_called || false,
          roadmap_viewed: request.roadmap_viewed || false
        };
        const newlyUnlocked = evaluateBadges(state, context);

        saveStoredState(globalState);

        return JSON.stringify({
          result: JSON.stringify({
            message: `Memoria di Leo aggiornata: livello=${state.level}, concetti=${state.concepts_learned.length}.`,
            newly_unlocked_badges: newlyUnlocked,
            total_badges_earned: state.badges_earned.length
          })
        });
      }

      if (action === "get_badges") {
        const badgesStatus = getBadgesStatus(state, lang);
        return JSON.stringify({
          result: JSON.stringify(badgesStatus)
        });
      }

      if (action === "get_learning_path") {
        evaluateBadges(state, { roadmap_viewed: true });
        saveStoredState(globalState);

        const path = calculateLearningPath(state.concepts_learned || [], lang);
        const completed = path.filter(p => p.status === "mastered").length;
        const progressPct = Math.round((completed / path.length) * 100);

        return JSON.stringify({
          result: JSON.stringify({
            mentor: "Leo",
            progress_percent: progressPct,
            completed_modules: completed,
            total_modules: path.length,
            current_level: state.level,
            modules: path
          })
        });
      }

      if (action === "get_daily_pill") {
        const newlyUnlocked = evaluateBadges(state, { daily_pill_called: true });
        saveStoredState(globalState);

        const pillData = getDailyPillData(state, request, lang);
        return JSON.stringify({
          result: JSON.stringify({
            ...pillData,
            newly_unlocked_badges: newlyUnlocked
          })
        });
      }

      if (action === "view_hub") {
        const path = calculateLearningPath(state.concepts_learned || [], lang);
        const pill = getDailyPillData(state, request, lang);
        const badgesStatus = getBadgesStatus(state, lang);

        const webviewPayload = {
          mentor: "Leo",
          level: state.level || "beginner",
          profile: state.user_profile || {},
          concepts: state.concepts_learned || [],
          modules: path,
          daily_pill: pill,
          badges: badgesStatus,
          notes: (state.user_notes || []).slice(-4),
          summaries: (state.history_summaries || []).slice(-4),
          updatedAt: state.last_updated,
          streak: state.streak || 0,
          activeProfile: globalState.activeId
        };

        const webviewUrl = `../assets/webview.html?payload=${encodeURIComponent(JSON.stringify(webviewPayload))}&lang=${lang}`;

        return JSON.stringify({
          result: `Ecco la dashboard completa di Leo: pillola odierna, percorso, bacheca dei badge e profilo.`,
          webview: {
            url: webviewUrl,
            aspectRatio: 1.25
          }
        });
      }

      if (action === "switch_profile") {
        const newProfileId = request.profile_id || 'default';
        if (!globalState.profiles[newProfileId]) {
            globalState.profiles[newProfileId] = JSON.parse(JSON.stringify(DEFAULT_STATE));
        }
        globalState.activeId = newProfileId;
        saveStoredState(globalState);
        return JSON.stringify({ result: `Profilo cambiato a ${newProfileId}` });
      }

      if (action === "reset_memory") {
        localStorage.removeItem(STORAGE_KEY);
        state = JSON.parse(JSON.stringify(DEFAULT_STATE));
        saveStoredState(globalState);
        return JSON.stringify({
          result: "Memoria e trofei ripristinati. Leo è pronto per iniziare un nuovo viaggio didattico con te!"
        });
      }

      throw new Error(`Azione non riconosciuta: ${action}`);

    } catch (err) {
      console.error("Errore nel Brain di Leo:", err);
      return JSON.stringify({
        error: `Leo Brain Error: ${err.message}`
      });
    }
  };