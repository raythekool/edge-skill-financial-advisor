let payload = {};
let lang = "en";

try {
  const params = new URLSearchParams(location.search);
  lang = params.get("lang") || "en";
  const raw = params.get("payload");
  if (raw) {
    payload = JSON.parse(decodeURIComponent(raw));
    if (payload.lang) lang = payload.lang;
  }
} catch (e) {
  console.warn("Payload invalid or missing:", e);
}

function switchTab(tabId, targetEl) {
  document.querySelectorAll('.tab').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  
  const btn = targetEl || (typeof event !== 'undefined' && event && event.currentTarget) || document.querySelector(`button[onclick*="'${tabId}'"]`) || document.querySelector(`[aria-controls="tab-${tabId}"]`);
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
  }
  const content = document.getElementById('tab-' + tabId);
  if (content) content.classList.add('active');
}

function applyTranslations(lang) {
  if (lang === "en") {
    const subtitle = document.getElementById('lastSyncLabel');
    if (subtitle) subtitle.textContent = "Your Personal Financial Literacy Mentor";

    const progLabel = document.querySelector('.progress-label span:first-child');
    if (progLabel) progLabel.textContent = "Learning Roadmap Progress";

    const tabs = document.querySelectorAll('.tab');
    if (tabs.length >= 5) {
      tabs[0].childNodes[0].textContent = "☀️ Daily Pill ";
      tabs[1].childNodes[0].textContent = "🗺️ Pathway ";
      tabs[2].childNodes[0].textContent = "🏆 Badges ";
      tabs[3].childNodes[0].textContent = "👤 Profile ";
      tabs[4].childNodes[0].textContent = "🧠 Mindset ";
    }

    const pillHeader = document.querySelector('.pill-header span:first-child');
    if (pillHeader) pillHeader.textContent = "💡 Concept of the Day with Leo";

    const timelineInfo = document.querySelector('#tab-path > div:first-child');
    if (timelineInfo) timelineInfo.textContent = "13-module learning roadmap with Leo:";

    const badgesInfo = document.querySelector('.badges-header span:first-child');
    if (badgesInfo) badgesInfo.textContent = "Trophies unlocked chatting with Leo:";

    const profInfo = document.querySelector('#tab-profile > div:first-child');
    if (profInfo) profInfo.textContent = "Profile memorized by Leo based on your conversations:";

    const profLabels = document.querySelectorAll('.profile-box-label');
    if (profLabels.length >= 4) {
      profLabels[0].textContent = "Current Level";
      profLabels[1].textContent = "Time Horizon";
      profLabels[2].textContent = "Risk Attitude";
      profLabels[3].textContent = "Communication Style";
    }

    const goalsTitle = document.querySelector('#tab-profile div[style*="uppercase"]');
    if (goalsTitle) goalsTitle.textContent = "Declared Goals";

    const mindsetInfo = document.querySelector('#tab-mindset > div:first-child');
    if (mindsetInfo) mindsetInfo.textContent = "Mental clarity & cognitive bias protection with Leo:";

    const mindsetBoxes = document.querySelectorAll('#tab-mindset > div');
    if (mindsetBoxes.length >= 4) {
      mindsetBoxes[1].innerHTML = "<strong>🛡️ Rule Zero:</strong> Leo educates and guides, never advising on speculative investments.";
      mindsetBoxes[2].innerHTML = "<strong>🌊 Volatility vs Risk:</strong> Temporary fluctuations are the toll for long-term growth.";
      mindsetBoxes[3].innerHTML = "<strong>🚫 No FOMO:</strong> Time always beats timing, and calmness always beats rush.";
    }

    const disclaimer = document.querySelector('.disclaimer');
    if (disclaimer) disclaimer.innerHTML = "⚠️ Leo is a digital financial educator. He does not provide personalized investment advice.";
  }
}

function render() {
  const isEn = lang === "en";
  applyTranslations(lang);

  const level = payload.level || "beginner";
  const profile = payload.profile || {};
  const modules = payload.modules || [];
  const dailyPill = payload.daily_pill || {};
  const streak = payload.streak || 0;
  
  const streakEl = document.getElementById("streakCount");
  if (streakEl) streakEl.textContent = streak;

  const badgesData = payload.badges || { earned_count: 0, total: 10, badges: [] };

  // Badge Level
  const badge = document.getElementById('levelBadge');
  if (badge) {
    badge.textContent = level.toUpperCase();
    badge.className = `badge-level ${level}`;
  }

  // Progress
  const masteredCount = modules.filter(m => m.status === 'mastered').length;
  const totalCount = modules.length || 13;
  const pct = Math.round((masteredCount / totalCount) * 100);
  document.getElementById('progressPercent').textContent = pct + '%';
  document.getElementById('progressFill').style.width = pct + '%';

  // Pillola del Giorno
  if (dailyPill.concept_pill) {
    document.getElementById('pillTitle').textContent = dailyPill.concept_pill.title;
    document.getElementById('pillDesc').textContent = dailyPill.concept_pill.explanation;
    document.getElementById('pillLevelTag').textContent = (dailyPill.concept_pill.level || 'Beginner').toUpperCase();
  }
  if (dailyPill.market_news_context) {
    document.getElementById('newsTopic').textContent = dailyPill.market_news_context.topic || (isEn ? 'ECONOMIC CONTEXT' : 'ATTUALITÀ ECONOMICA');
    document.getElementById('newsHeadline').textContent = dailyPill.market_news_context.headline || '';
    document.getElementById('newsImpact').innerHTML = `<strong>💡 ${dailyPill.market_news_context.tailored_impact}</strong><br><span style="font-size:11px; color:var(--muted);">${dailyPill.market_news_context.for_profile || ''}</span>`;
  }

  // Timeline Percorso
  const timeline = document.getElementById('timelineList');
  if (modules.length > 0) {
    timeline.innerHTML = modules.map((m, idx) => {
      let icon = m.status === 'mastered' ? '✓' : (m.status === 'current' ? '🎯' : (idx + 1));
      let badgeLabel = m.status === 'mastered' 
        ? (isEn ? 'Mastered' : 'Completato') 
        : (m.status === 'current' ? (isEn ? 'Current Step' : 'Tappa Attuale') : (isEn ? 'Upcoming' : 'In Programma'));
      return `
        <div class="step-item ${m.status}">
          <div class="step-dot">${icon}</div>
          <div class="step-content">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="step-title">${m.title}</span>
              <span style="font-size:9.5px; font-weight:700; text-transform:uppercase; color:${m.status==='mastered'?'var(--success)':(m.status==='current'?'var(--accent)':'var(--muted)')};">${badgeLabel}</span>
            </div>
            <div class="step-desc">${m.desc}</div>
          </div>
        </div>
      `;
    }).join('');
  }

  // BADGES GRID
  document.getElementById('tabBadgeCount').textContent = badgesData.earned_count || 0;
  document.getElementById('badgesRatio').textContent = `${badgesData.earned_count || 0} / ${badgesData.total || 10} ${isEn ? 'Unlocked' : 'Sbloccati'}`;

  const bGrid = document.getElementById('badgesGrid');
  if (badgesData.badges && badgesData.badges.length > 0) {
    bGrid.innerHTML = badgesData.badges.map(b => {
      if (b.unlocked) {
        return `
          <div class="badge-card unlocked">
            <div class="badge-icon">${b.icon}</div>
            <div class="badge-info">
              <div class="badge-name">${b.title} <span class="badge-status-tag">✓ ${isEn ? 'UNLOCKED' : 'SBLOCCATO'}</span></div>
              <div class="badge-desc">${b.desc}</div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="badge-card locked">
            <div class="badge-icon">🔒</div>
            <div class="badge-info">
              <div class="badge-name">${b.title} <span class="badge-status-tag">${isEn ? 'LOCKED' : 'BLOCCATO'}</span></div>
              <div class="badge-desc"><em>${b.criteria}</em></div>
            </div>
          </div>
        `;
      }
    }).join('');
  }

  // Profilo
  document.getElementById('profLevel').textContent = level.toUpperCase();
  document.getElementById('profHorizon').textContent = profile.time_horizon || (isEn ? 'Medium-Long Term (> 5 years)' : 'Medio-Lungo (> 5 anni)');
  document.getElementById('profRisk').textContent = profile.risk_attitude || (isEn ? 'Prudent / Balanced' : 'Prudente / Equilibrata');
  document.getElementById('profTone').textContent = profile.tone_preference || (isEn ? 'Everyday analogies and empathy' : 'Analogie e metafore');

  const goalsContainer = document.getElementById('goalsList');
  const goals = profile.goals || [];
  if (goals.length > 0) {
    goalsContainer.innerHTML = goals.map(g => `
      <div style="background:var(--bg); border:1px solid var(--line); border-radius:6px; padding:6px 10px; font-size:11.5px; margin-top:4px;">
        🎯 ${g}
      </div>
    `).join('');
  }

  // Activate initial tab if specified in URL query params
  try {
    const initTab = (new URLSearchParams(location.search)).get("tab");
    if (initTab && ['pill', 'path', 'badges', 'profile', 'mindset'].includes(initTab)) {
      switchTab(initTab);
    }
  } catch (e) {
    console.warn("Could not set initial tab:", e);
  }
}

render();
