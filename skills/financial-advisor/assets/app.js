let payload = {};
  try {
    const params = new URLSearchParams(location.search);
    const raw = params.get("payload");
    if (raw) payload = JSON.parse(decodeURIComponent(raw));
  } catch (e) {
    console.warn("Payload non valido o assente:", e);
  }

  function switchTab(tabId) {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    event.currentTarget.classList.add('active'); event.currentTarget.setAttribute('aria-selected', 'true');
    document.getElementById('tab-' + tabId).classList.add('active');
  }

  function render() {
    const level = payload.level || "beginner";
    const profile = payload.profile || {};
    const modules = payload.modules || [];
    const dailyPill = payload.daily_pill || {};
    const streak = payload.streak || 0;
    document.getElementById("streakCount").textContent = streak;
    const badgesData = payload.badges || { earned_count: 0, total: 10, badges: [] };

    // Badge Level
    const badge = document.getElementById('levelBadge');
    badge.textContent = level;
    badge.className = `badge-level ${level}`;

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
      document.getElementById('newsTopic').textContent = dailyPill.market_news_context.topic || 'Attualità Economica';
      document.getElementById('newsHeadline').textContent = dailyPill.market_news_context.headline || '';
      document.getElementById('newsImpact').innerHTML = `<strong>💡 ${dailyPill.market_news_context.tailored_impact}</strong><br><span style="font-size:11px; color:var(--muted);">${dailyPill.market_news_context.for_profile || ''}</span>`;
    }

    // Timeline Percorso
    const timeline = document.getElementById('timelineList');
    if (modules.length > 0) {
      timeline.innerHTML = modules.map((m, idx) => {
        let icon = m.status === 'mastered' ? '✓' : (m.status === 'current' ? '🎯' : (idx + 1));
        let badgeLabel = m.status === 'mastered' ? 'Completato' : (m.status === 'current' ? 'Tappa Attuale' : 'In Programma');
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
    document.getElementById('badgesRatio').textContent = `${badgesData.earned_count || 0} / ${badgesData.total || 10} Sbloccati`;

    const bGrid = document.getElementById('badgesGrid');
    if (badgesData.badges && badgesData.badges.length > 0) {
      bGrid.innerHTML = badgesData.badges.map(b => {
        if (b.unlocked) {
          return `
            <div class="badge-card unlocked">
              <div class="badge-icon">${b.icon}</div>
              <div class="badge-info">
                <div class="badge-name">${b.title} <span class="badge-status-tag">✓ SBLOCCATO</span></div>
                <div class="badge-desc">${b.desc}</div>
              </div>
            </div>
          `;
        } else {
          return `
            <div class="badge-card locked">
              <div class="badge-icon">🔒</div>
              <div class="badge-info">
                <div class="badge-name">${b.title} <span class="badge-status-tag">BLOCCATO</span></div>
                <div class="badge-desc"><em>${b.criteria}</em></div>
              </div>
            </div>
          `;
        }
      }).join('');
    }

    // Profilo
    document.getElementById('profLevel').textContent = level.toUpperCase();
    document.getElementById('profHorizon').textContent = profile.time_horizon || 'Medio-Lungo Termine';
    document.getElementById('profRisk').textContent = profile.risk_attitude || 'Equilibrata';
    document.getElementById('profTone').textContent = profile.tone_preference || 'Analogie e metafore';

    const goalsContainer = document.getElementById('goalsList');
    const goals = profile.goals || [];
    if (goals.length > 0) {
      goalsContainer.innerHTML = goals.map(g => `
        <div style="background:var(--bg); border:1px solid var(--line); border-radius:6px; padding:6px 10px; font-size:11.5px; margin-top:4px;">
          🎯 ${g}
        </div>
      `).join('');
    }
  }

  render();