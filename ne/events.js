// ═══════════════════════════════════════════════════════════════════
//  EVENTS.JS — AlkoCase Global Events System
//  GlobalChest — 5 levelů, multiplayer Supabase sync
// ═══════════════════════════════════════════════════════════════════

// ── GLOBAL CHEST CONFIG ─────────────────────────────────────────────
const GLOBAL_CHEST_LEVELS = [
  { level: 1, hp: 500000,   armor: Math.floor(500000 * 0.15),   img: 'case_cs2',          name: 'Global Chest I',       color: '#4d79ff' },
  { level: 2, hp: 1000000,  armor: Math.floor(1000000 * 0.15),  img: 'case_cyber',        name: 'Global Chest II',      color: '#8847ff' },
  { level: 3, hp: 1500000,  armor: Math.floor(1500000 * 0.15),  img: 'case_topsecret',    name: 'Global Chest III',     color: '#d32ee6' },
  { level: 4, hp: 2000000,  armor: Math.floor(2000000 * 0.15),  img: 'case_danger_zone',  name: 'Global Chest IV',      color: '#eb4b4b' },
  { level: 5, hp: 2500000,  armor: Math.floor(2500000 * 0.15),  img: 'case_demon_box',    name: '💀 GLOBAL CHEST MAX',  color: '#c9a227' },
];

// Supabase table: global_chest
// columns: id(text PK), level(int), current_hp(int), max_hp(int), current_armor(int), max_armor(int), active(bool), started_at(text), killed_at(text)
// columns: global_chest_clicks: id(serial), chest_id(text), username(text), clicks(int), damage(int), updated_at(bigint)

const GC_CHEST_ID = 'global_chest_main';
let gcState = {
  active: false,
  level: 1,
  currentHp: 0,
  maxHp: 0,
  currentArmor: 0,
  maxArmor: 0,
  myDamage: 0,
  myClicks: 0,
  participants: [],
  lastSync: 0,
};

let gcSyncInterval = null;
let gcClickBuffer = 0; // damage to flush on next sync
let gcClicksBuffer = 0;
let gcAnimationFrame = null;
let gcLocalHp = 0;
let gcLocalArmor = 0;

// ── PLAYER UPGRADES FOR GLOBAL CHEST ────────────────────────────────
// These are stored in state.gcUpgrades = { dmgMult, critChance, autoHit }
function getGcUpgrades() {
  if (!window.state) return { dmgMult: 1, critChance: 0, autoHit: 0 };
  if (!state.gcUpgrades) state.gcUpgrades = { dmgMult: 1, critChance: 0, autoHit: 0, lvlDmg: 0, lvlCrit: 0, lvlAuto: 0 };
  return state.gcUpgrades;
}

function gcGetUpgCost(base, level) {
  return Math.floor(base * Math.pow(1.8, level));
}

// ── SUPABASE HELPERS ─────────────────────────────────────────────────
const SB_URL2 = 'https://qzhaoydzrrqahkajlkba.supabase.co';
const SB_KEY2 = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6aGFveWR6cnJxYWhrYWpsa2JhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0NzAzOTEsImV4cCI6MjA5MTA0NjM5MX0.fuuFZUIEMbvfw29MG5MHu5Cmmh_NzReBoYRJad7LSA4';

async function gcFetch(path, opts = {}) {
  try {
    const method = (opts.method || 'GET').toUpperCase();
    const isWrite = ['POST','PATCH','PUT','DELETE'].includes(method);
    const sep = path.includes('?') ? '&' : '?';
    const url = SB_URL2 + '/rest/v1/' + path + sep + 'apikey=' + encodeURIComponent(SB_KEY2);
    const headers = {
      'apikey': SB_KEY2,
      'Authorization': 'Bearer ' + SB_KEY2,
      'Accept': 'application/json',
      ...(isWrite ? { 'Content-Type': 'application/json' } : {}),
      'Prefer': 'return=minimal',
      ...(opts.headers || {}),
    };
    const r = await fetch(url, { ...opts, headers });
    if (!r.ok) { const t = await r.text(); console.warn('[GC]', r.status, t); return null; }
    const ct = r.headers.get('content-type') || '';
    if (ct.includes('json') && r.status !== 204) return await r.json();
    return true;
  } catch(e) { console.warn('[GC] fetch error:', e.message); return null; }
}

// ── FETCH CHEST STATE FROM SUPABASE ─────────────────────────────────
async function gcPullChest() {
  const data = await gcFetch('global_chest?id=eq.' + GC_CHEST_ID + '&limit=1');
  if (!Array.isArray(data) || !data.length) return null;
  return data[0];
}

async function gcPullParticipants() {
  const data = await gcFetch('global_chest_clicks?chest_id=eq.' + GC_CHEST_ID + '&order=damage.desc&limit=50');
  return Array.isArray(data) ? data : [];
}

async function gcPushDamage(dmg, clicks) {
  if (!dmg || dmg <= 0) return;
  const username = (window.state && state.username) ? state.username : 'Anonym';
  await gcFetch('global_chest_clicks', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      chest_id: GC_CHEST_ID,
      username: username,
      clicks: clicks,
      damage: dmg,
      updated_at: Date.now()
    })
  });
}

async function gcApplyDamageToServer(dmg) {
  // Use RPC or direct patch — we patch current_hp and current_armor
  const chest = await gcPullChest();
  if (!chest || !chest.active) return;
  let newArmor = chest.current_armor;
  let newHp = chest.current_hp;
  if (newArmor > 0) {
    const armorDmg = Math.min(newArmor, dmg);
    newArmor -= armorDmg;
    const overflow = dmg - armorDmg;
    if (overflow > 0) newHp -= overflow;
  } else {
    newHp -= dmg;
  }
  if (newHp <= 0) {
    newHp = 0;
    // Chest killed!
    await gcFetch('global_chest?id=eq.' + GC_CHEST_ID, {
      method: 'PATCH',
      body: JSON.stringify({ current_hp: 0, current_armor: 0, active: false, killed_at: new Date().toISOString() })
    });
    await gcChestKilled(chest.level);
    return;
  }
  await gcFetch('global_chest?id=eq.' + GC_CHEST_ID, {
    method: 'PATCH',
    body: JSON.stringify({ current_hp: newHp, current_armor: Math.max(0, newArmor) })
  });
}

// ── CHEST KILLED — give rewards to all participants ──────────────────
async function gcChestKilled(level) {
  const participants = await gcPullParticipants();
  const username = (window.state && state.username) ? state.username : null;
  const myEntry = username ? participants.find(p => p.username === username) : null;
  if (myEntry && myEntry.damage > 0) {
    // Give rewards to this player
    const REWARD_CASES = 20;
    const REWARD_MONEY = 5000;
    const REWARD_COINS = 20;

    if (!state.clickerChests) state.clickerChests = [];
    const caseIds = Object.keys(window.casePools || {});
    for (let i = 0; i < REWARD_CASES; i++) {
      const rndCaseId = caseIds[Math.floor(Math.random() * caseIds.length)];
      const sc = typeof getCaseById === 'function' ? getCaseById(rndCaseId) : null;
      state.clickerChests.push({
        uid: Date.now().toString(36) + '_' + i,
        caseId: rndCaseId,
        name: sc ? sc.name : rndCaseId,
        img: sc ? sc.caseImg : 'case_cs2',
        level: level,
        obtainedAt: new Date().toLocaleDateString('cs-CZ'),
        fromEvent: true
      });
    }
    if (typeof addMoney === 'function') addMoney(REWARD_MONEY);
    if (typeof addCoins === 'function') addCoins(REWARD_COINS);
    if (typeof saveState === 'function') saveState();
    if (typeof showToast === 'function') {
      showToast(`🏆 GLOBAL CHEST LVL ${level} zabit! +${REWARD_CASES} beden, +$${REWARD_MONEY}, +${REWARD_COINS}💎!`, 'success');
    }
    if (typeof spawnConfetti === 'function') spawnConfetti('#c9a227');
    // Show big reward overlay
    gcShowKillReward(level, REWARD_CASES, REWARD_MONEY, REWARD_COINS);
  }

  // Advance to next level or end event
  const nextLevel = level + 1;
  if (nextLevel <= GLOBAL_CHEST_LEVELS.length) {
    await gcSpawnNextLevel(nextLevel);
  } else {
    // Event ended
    gcState.active = false;
    gcUpdateEventActiveBadge(false);
    if (typeof renderEventsPage === 'function') renderEventsPage();
  }
}

async function gcSpawnNextLevel(level) {
  const cfg = GLOBAL_CHEST_LEVELS[level - 1];
  if (!cfg) return;
  await gcFetch('global_chest', {
    method: 'POST',
    headers: { 'Prefer': 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify({
      id: GC_CHEST_ID,
      level: cfg.level,
      max_hp: cfg.hp,
      current_hp: cfg.hp,
      max_armor: cfg.armor,
      current_armor: cfg.armor,
      active: true,
      started_at: new Date().toISOString(),
      killed_at: null
    })
  });
  // Reset click records for new level
  await gcFetch('global_chest_clicks?chest_id=eq.' + GC_CHEST_ID, { method: 'DELETE' });
  if (typeof showToast === 'function') showToast(`⚡ Global Chest Level ${level} se respawnul!`, 'info');
}

// ── CLICK ON GLOBAL CHEST ────────────────────────────────────────────
let gcLocalClickBuffer = 0;
let gcLocalDmgBuffer = 0;
let gcFlushTimeout = null;

function gcClickChest(e) {
  if (!gcState.active) return;

  const upg = getGcUpgrades();
  let dmg = Math.max(1, Math.floor((window.clkState ? clkState.clickDmg : 1) * upg.dmgMult));
  let isCrit = false;
  const critChance = (window.clkState ? clkState.critChance : 0) + upg.critChance;
  if (critChance > 0 && Math.random() < critChance) {
    dmg = Math.floor(dmg * 3);
    isCrit = true;
  }

  gcState.myDamage += dmg;
  gcState.myClicks++;
  gcLocalDmgBuffer += dmg;
  gcLocalClickBuffer++;

  // Optimistic local HP update
  if (gcLocalArmor > 0) {
    const armorDmg = Math.min(gcLocalArmor, dmg);
    gcLocalArmor -= armorDmg;
    const overflow = dmg - armorDmg;
    if (overflow > 0) gcLocalHp -= overflow;
  } else {
    gcLocalHp -= dmg;
  }
  gcLocalHp = Math.max(0, gcLocalHp);
  gcUpdateChestHpBar();

  // Floating damage number
  if (e && e.currentTarget) {
    const el = e.currentTarget;
    const float = document.createElement('div');
    float.style.cssText = `position:absolute;left:${30+Math.random()*40}%;top:40%;font-family:'Oswald',sans-serif;font-weight:900;font-size:${isCrit?'1.6rem':'1rem'};color:${isCrit?'#ffd700':'#ff6b6b'};pointer-events:none;animation:dmgFloat 0.7s ease-out forwards;z-index:100`;
    float.textContent = isCrit ? `⭐ ${dmg.toLocaleString('cs-CZ')}!` : `-${dmg.toLocaleString('cs-CZ')}`;
    el.appendChild(float);
    setTimeout(() => float.remove(), 700);
  }

  // Flush to server debounced (every 300ms)
  clearTimeout(gcFlushTimeout);
  gcFlushTimeout = setTimeout(gcFlushToServer, 300);
}

async function gcFlushToServer() {
  if (gcLocalDmgBuffer <= 0) return;
  const dmg = gcLocalDmgBuffer;
  const clicks = gcLocalClickBuffer;
  gcLocalDmgBuffer = 0;
  gcLocalClickBuffer = 0;
  await gcPushDamage(dmg, clicks);
  await gcApplyDamageToServer(dmg);
}

// ── HP BAR UPDATE ────────────────────────────────────────────────────
function gcUpdateChestHpBar() {
  const hpBar = document.getElementById('gcHpBar');
  const hpText = document.getElementById('gcHpText');
  const armorBar = document.getElementById('gcArmorBar');
  const armorText = document.getElementById('gcArmorText');
  if (!hpBar) return;

  const cfg = GLOBAL_CHEST_LEVELS[(gcState.level || 1) - 1];
  if (!cfg) return;

  const hp = Math.max(0, gcLocalHp);
  const armor = Math.max(0, gcLocalArmor);

  const hpPct = Math.min(100, (hp / gcState.maxHp) * 100);
  hpBar.style.width = hpPct + '%';
  hpBar.style.background = `linear-gradient(90deg, #eb4b4b, #ff6b6b)`;
  if (hpText) hpText.textContent = hp.toLocaleString('cs-CZ') + ' / ' + gcState.maxHp.toLocaleString('cs-CZ') + ' HP';

  if (armorBar && gcState.maxArmor > 0) {
    const armorPct = Math.min(100, (armor / gcState.maxArmor) * 100);
    armorBar.style.width = armorPct + '%';
    if (armorText) armorText.textContent = '🛡️ ' + armor.toLocaleString('cs-CZ') + ' / ' + gcState.maxArmor.toLocaleString('cs-CZ');
  }
}

// ── SYNC STATE FROM SERVER ───────────────────────────────────────────
async function gcSync() {
  const chest = await gcPullChest();
  if (!chest) {
    gcState.active = false;
    gcUpdateEventActiveBadge(false);
    if (window.currentPage === 'events') renderEventsPage();
    return;
  }
  const wasActive = gcState.active;
  gcState.active = !!chest.active;
  gcState.level = chest.level || 1;
  gcState.maxHp = chest.max_hp || 0;
  gcState.maxArmor = chest.max_armor || 0;

  // Only update local optimistic values if server is lower (server is authoritative for HP)
  const serverHp = chest.current_hp || 0;
  const serverArmor = chest.current_armor || 0;
  if (serverHp < gcLocalHp || gcLocalHp === 0) { gcLocalHp = serverHp; }
  if (serverArmor <= gcLocalArmor || gcLocalArmor === 0) { gcLocalArmor = serverArmor; }

  gcUpdateChestHpBar();
  gcUpdateEventActiveBadge(gcState.active);

  const parts = await gcPullParticipants();
  gcState.participants = parts;
  gcUpdateParticipantsList();

  if (!wasActive && gcState.active && window.currentPage !== 'events') {
    if (typeof showToast === 'function') showToast('🔴 LIVE EVENT: Global Chest je aktivní!', 'info');
  }
  if (window.currentPage === 'events') renderEventsPage();
}

function gcUpdateEventActiveBadge(active) {
  const badge = document.getElementById('eventActiveBadge');
  const tabEl = document.getElementById('tab-events');
  if (badge) badge.style.display = active ? 'block' : 'none';
  if (tabEl) {
    if (active) {
      tabEl.style.color = '#ff4444';
      tabEl.style.textShadow = '0 0 12px rgba(255,68,68,0.6)';
      tabEl.style.borderColor = 'rgba(255,68,68,0.4)';
      tabEl.style.background = 'rgba(255,68,68,0.08)';
    } else {
      tabEl.style.color = '';
      tabEl.style.textShadow = '';
      tabEl.style.borderColor = '';
      tabEl.style.background = '';
    }
  }
  const pulse = document.getElementById('eventsActivePulse');
  if (pulse) pulse.style.display = active ? 'flex' : 'none';
}

function gcUpdateParticipantsList() {
  const el = document.getElementById('gcParticipantsList');
  if (!el) return;
  const parts = gcState.participants;
  if (!parts.length) { el.innerHTML = '<div style="color:var(--muted);text-align:center;padding:12px 0;font-size:0.75rem">Žádní účastníci zatím</div>'; return; }
  el.innerHTML = parts.slice(0, 10).map((p, i) => {
    const isMe = p.username === (window.state && state.username ? state.username : '');
    return `<div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:${isMe?'rgba(0,207,255,0.08)':'rgba(255,255,255,0.02)'};border:1px solid ${isMe?'rgba(0,207,255,0.3)':'var(--border)'};border-radius:3px;margin-bottom:4px;">
      <span style="font-family:'Oswald',sans-serif;font-weight:700;color:var(--muted);width:20px">${i+1}</span>
      <span style="flex:1;font-size:0.82rem;color:${isMe?'var(--gold2)':'var(--white)'}">${p.username}${isMe?' (ty)':''}</span>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.72rem;color:#eb4b4b">${(p.damage||0).toLocaleString('cs-CZ')} DMG</span>
      <span style="font-family:'Share Tech Mono',monospace;font-size:0.62rem;color:var(--muted)">${(p.clicks||0)} kliků</span>
    </div>`;
  }).join('');
}

// ── SHOW KILL REWARD OVERLAY ─────────────────────────────────────────
function gcShowKillReward(level, cases, money, coins) {
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;z-index:2500;background:rgba(0,0,0,0.9);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease';
  overlay.innerHTML = `
    <div style="background:linear-gradient(180deg,#0d1a2e,#08101e);border:2px solid #c9a227;border-radius:8px;padding:40px 56px;text-align:center;max-width:440px;box-shadow:0 0 80px rgba(201,162,39,0.3),0 0 200px rgba(0,207,255,0.08);animation:winnerPop 0.5s cubic-bezier(0.34,1.56,0.64,1);position:relative;overflow:hidden">
      <div style="font-size:0.65rem;letter-spacing:5px;color:#c9a227;font-family:'Share Tech Mono',monospace;margin-bottom:12px">🏆 GLOBAL CHEST LEVEL ${level} ZNIČEN</div>
      <div style="font-size:4rem;margin:12px 0">💀</div>
      <div style="font-family:'Oswald',sans-serif;font-size:1.8rem;font-weight:700;color:#c9a227;text-shadow:0 0 20px rgba(201,162,39,0.5);margin-bottom:20px">ODMĚNY OBDRŽENY!</div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-bottom:24px">
        <div style="background:rgba(0,207,255,0.08);border:1px solid rgba(0,207,255,0.3);border-radius:4px;padding:10px 16px;display:flex;align-items:center;gap:10px">
          <span style="font-size:1.4rem">📦</span>
          <span style="font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;color:var(--white)">+${cases}× NÁHODNÉ BEDNY</span>
        </div>
        <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.3);border-radius:4px;padding:10px 16px;display:flex;align-items:center;gap:10px">
          <span style="font-size:1.4rem">💵</span>
          <span style="font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;color:#4ade80">+$${money.toLocaleString('cs-CZ')}</span>
        </div>
        <div style="background:rgba(58,141,255,0.08);border:1px solid rgba(58,141,255,0.3);border-radius:4px;padding:10px 16px;display:flex;align-items:center;gap:10px">
          <span style="font-size:1.4rem">💎</span>
          <span style="font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;color:#3a8dff">+${coins} DIAMANTŮ</span>
        </div>
      </div>
      <button onclick="this.closest('[style*=fixed]').remove()" style="background:linear-gradient(135deg,#c9a227,#f0cc60);color:#111;border:none;padding:14px 40px;font-family:'Oswald',sans-serif;font-size:1rem;font-weight:700;letter-spacing:3px;text-transform:uppercase;border-radius:3px;cursor:pointer">SUPER!</button>
    </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  if (typeof spawnConfetti === 'function') spawnConfetti('#c9a227');
}

// ── RENDER EVENTS PAGE ───────────────────────────────────────────────
window.renderEventsPage = async function() {
  const container = document.getElementById('eventsPageContent');
  if (!container) return;

  const cfg = GLOBAL_CHEST_LEVELS[(gcState.level || 1) - 1] || GLOBAL_CHEST_LEVELS[0];
  const upg = getGcUpgrades();
  const isActive = gcState.active;

  // Compute level progress (levels completed)
  const levelsBar = GLOBAL_CHEST_LEVELS.map((l, i) => {
    const done = !isActive && gcState.level > l.level;
    const current = isActive && gcState.level === l.level;
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">
      <div style="width:36px;height:36px;border-radius:50%;background:${done?'#4ade80':current?cfg.color:'var(--border2)'};border:2px solid ${done?'#4ade80':current?cfg.color:'var(--border)'};display:flex;align-items:center;justify-content:center;font-family:'Oswald',sans-serif;font-size:0.75rem;font-weight:700;color:${done||current?'#111':'var(--muted)'}">
        ${done?'✓':l.level}
      </div>
      <div style="font-size:0.52rem;letter-spacing:1px;color:${done?'#4ade80':current?cfg.color:'var(--muted)'};text-align:center">LVL ${l.level}</div>
    </div>
    ${i < GLOBAL_CHEST_LEVELS.length-1 ? `<div style="height:2px;flex:0.5;background:${done?'#4ade80':'var(--border2)'};margin-top:17px"></div>` : ''}`;
  }).join('');

  if (!isActive) {
    container.innerHTML = `
      <div style="text-align:center;max-width:600px;margin:0 auto">
        <div style="font-size:0.65rem;letter-spacing:4px;color:var(--muted);font-family:'Share Tech Mono',monospace;margin-bottom:16px">GLOBAL CHEST EVENT</div>
        <!-- Level progress -->
        <div style="display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:28px;background:var(--panel);border:1px solid var(--border2);border-radius:6px;padding:16px">${levelsBar}</div>
        <div style="background:var(--panel);border:1px solid var(--border2);border-radius:8px;padding:36px 28px;margin-bottom:20px">
          <div style="font-size:3rem;margin-bottom:12px">🎪</div>
          <div style="font-family:'Oswald',sans-serif;font-size:1.2rem;font-weight:700;letter-spacing:3px;color:var(--muted);text-transform:uppercase;margin-bottom:8px">Žádný aktivní event</div>
          <div style="font-size:0.8rem;color:var(--muted2);line-height:1.6">Global Chest event momentálně neprobíhá.</div>
          ${(window.state && state.username || '').toLowerCase() === 'lukamer' ? `
            <div style="margin-top:20px;padding:16px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);border-radius:6px">
              <div style="font-family:'Oswald',sans-serif;font-size:0.8rem;letter-spacing:2px;color:#a78bfa;margin-bottom:10px">⚙️ ADMIN — SPUSTIT EVENT</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center">
                ${GLOBAL_CHEST_LEVELS.map(l => `<button onclick="gcAdminSpawn(${l.level})" style="background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.5);color:#a78bfa;border-radius:4px;padding:6px 14px;font-family:'Oswald',sans-serif;font-size:0.72rem;letter-spacing:1px;cursor:pointer">LVL ${l.level}</button>`).join('')}
              </div>
            </div>` : ''}
        </div>
      </div>`;
    return;
  }

  // Active chest
  const hp = Math.max(0, gcLocalHp);
  const armor = Math.max(0, gcLocalArmor);
  const hpPct = Math.min(100, (hp / gcState.maxHp) * 100);
  const armorPct = gcState.maxArmor > 0 ? Math.min(100, (armor / gcState.maxArmor) * 100) : 0;

  // Upgrade costs
  const costDmg  = gcGetUpgCost(500,   upg.lvlDmg  || 0);
  const costCrit = gcGetUpgCost(1200,  upg.lvlCrit || 0);
  const costAuto = gcGetUpgCost(2000,  upg.lvlAuto || 0);

  container.innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 320px;gap:20px;max-width:1100px;margin:0 auto;height:100%">

      <!-- LEFT: Chest area -->
      <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
        <!-- Level progress -->
        <div style="display:flex;align-items:center;justify-content:center;gap:0;width:100%;background:var(--panel);border:1px solid var(--border2);border-radius:6px;padding:12px">${levelsBar}</div>

        <div style="font-family:'Oswald',sans-serif;font-size:1.3rem;font-weight:700;letter-spacing:3px;color:${cfg.color};text-shadow:0 0 20px ${cfg.color}66">${cfg.name}</div>

        <!-- HP bars -->
        <div style="width:100%;max-width:440px;display:flex;flex-direction:column;gap:6px">
          ${gcState.maxArmor > 0 ? `
          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.62rem;color:#7aafff;font-family:'Share Tech Mono',monospace;margin-bottom:3px">
              <span>🛡️ ARMOR</span><span id="gcArmorText">${armor.toLocaleString('cs-CZ')} / ${gcState.maxArmor.toLocaleString('cs-CZ')}</span>
            </div>
            <div style="height:16px;background:var(--bg3);border:1px solid var(--border2);border-radius:3px;overflow:hidden">
              <div id="gcArmorBar" style="height:100%;width:${armorPct}%;background:linear-gradient(90deg,#4a6fa5,#7aafff);transition:width 0.2s"></div>
            </div>
          </div>` : ''}
          <div>
            <div style="display:flex;justify-content:space-between;font-size:0.62rem;color:#ff6b6b;font-family:'Share Tech Mono',monospace;margin-bottom:3px">
              <span>❤️ HP</span><span id="gcHpText">${hp.toLocaleString('cs-CZ')} / ${gcState.maxHp.toLocaleString('cs-CZ')}</span>
            </div>
            <div style="height:22px;background:var(--bg3);border:1px solid var(--border2);border-radius:3px;overflow:hidden;position:relative">
              <div id="gcHpBar" style="height:100%;width:${hpPct}%;background:linear-gradient(90deg,#eb4b4b,#ff6b6b);transition:width 0.15s ease-out"></div>
              <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Share Tech Mono',monospace;font-size:0.68rem;color:#fff;font-weight:bold;white-space:nowrap;text-shadow:0 1px 3px rgba(0,0,0,0.8)">${Math.round(hpPct)}%</div>
            </div>
          </div>
        </div>

        <!-- Chest image — clickable -->
        <div id="gcChestClickArea" onclick="gcClickChest(event)" style="position:relative;cursor:pointer;user-select:none;-webkit-tap-highlight-color:transparent;touch-action:manipulation">
          <div style="width:280px;height:280px;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 50%,${cfg.color}22 0%,transparent 70%);border:2px solid ${cfg.color}44;border-radius:50%;box-shadow:0 0 40px ${cfg.color}22,inset 0 0 30px ${cfg.color}11;animation:enemyPulse 2s ease-in-out infinite;transition:transform 0.08s">
            <img src="assets/${cfg.img}.png" style="width:220px;height:220px;object-fit:contain;filter:drop-shadow(0 0 24px ${cfg.color}88);animation:enemyFloat 2.5s ease-in-out infinite;pointer-events:none">
          </div>
          <div style="position:absolute;top:-8px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,${cfg.color},#f0cc60);color:#111;font-family:'Oswald',sans-serif;font-size:0.72rem;font-weight:700;letter-spacing:2px;padding:2px 12px;border-radius:20px;white-space:nowrap">GLOBAL LVL ${gcState.level}</div>
        </div>

        <div style="font-size:0.75rem;color:var(--muted);letter-spacing:1px;text-align:center">Klikej na bednu — poškozuj ji spolu s ostatními hráči!</div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:0.78rem;color:${cfg.color}">Tvoje poškození: <strong>${gcState.myDamage.toLocaleString('cs-CZ')}</strong></div>
      </div>

      <!-- RIGHT: Upgrades + participants -->
      <div style="display:flex;flex-direction:column;gap:12px;overflow-y:auto;padding-right:4px">

        <!-- Upgrades -->
        <div style="font-family:'Oswald',sans-serif;font-size:0.72rem;letter-spacing:3px;text-transform:uppercase;color:var(--muted);padding-bottom:6px;border-bottom:1px solid var(--border)">⚡ Vylepšení pro Event</div>

        <div class="clk-upgrade-card">
          <div class="clk-upgrade-info">
            <div class="clk-upgrade-name">⚔️ Event DMG</div>
            <div class="clk-upgrade-desc">×${(upg.dmgMult||1).toFixed(1)} násobič poškození</div>
            <div class="clk-upgrade-level" style="color:var(--gold2)">Lvl ${upg.lvlDmg||0} · ×${(upg.dmgMult||1).toFixed(2)} DMG</div>
          </div>
          <button class="btn-clk-upgrade" onclick="gcBuyUpgrade('dmg')" ${(window.state&&state.money>=costDmg)?'':'disabled'}>
            $${costDmg.toLocaleString('cs-CZ')}
          </button>
        </div>

        <div class="clk-upgrade-card">
          <div class="clk-upgrade-info">
            <div class="clk-upgrade-name">💥 Event Crit</div>
            <div class="clk-upgrade-desc">+5% šance na 3× crit zásah</div>
            <div class="clk-upgrade-level" style="color:var(--gold2)">Lvl ${upg.lvlCrit||0} · ${Math.floor((upg.critChance||0)*100)}% crit</div>
          </div>
          <button class="btn-clk-upgrade" onclick="gcBuyUpgrade('crit')" ${(window.state&&state.money>=costCrit)?'':'disabled'}>
            $${costCrit.toLocaleString('cs-CZ')}
          </button>
        </div>

        <div class="clk-upgrade-card">
          <div class="clk-upgrade-info">
            <div class="clk-upgrade-name">🤖 Auto-Útok</div>
            <div class="clk-upgrade-desc">Auto-damage na Global Chest</div>
            <div class="clk-upgrade-level" style="color:var(--gold2)">Lvl ${upg.lvlAuto||0} · ${(upg.autoHit||0)} auto DMG/5s</div>
          </div>
          <button class="btn-clk-upgrade" onclick="gcBuyUpgrade('auto')" ${(window.state&&state.money>=costAuto)?'':'disabled'}>
            $${costAuto.toLocaleString('cs-CZ')}
          </button>
        </div>

        <!-- Rewards info -->
        <div style="background:rgba(201,162,39,0.06);border:1px solid rgba(201,162,39,0.3);border-radius:6px;padding:14px">
          <div style="font-family:'Oswald',sans-serif;font-size:0.78rem;letter-spacing:2px;color:#c9a227;margin-bottom:10px">🏆 ODMĚNA ZA ZNIČENÍ</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            <div style="display:flex;align-items:center;gap:8px;font-size:0.75rem"><span>📦</span><span style="color:var(--white);font-weight:700">20×</span><span style="color:var(--muted)">náhodných beden</span></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:0.75rem"><span>💵</span><span style="color:#4ade80;font-weight:700">+$5,000</span><span style="color:var(--muted)">pro každého účastníka</span></div>
            <div style="display:flex;align-items:center;gap:8px;font-size:0.75rem"><span>💎</span><span style="color:#3a8dff;font-weight:700">+20 diamantů</span><span style="color:var(--muted)">pro každého účastníka</span></div>
          </div>
          <div style="margin-top:8px;font-size:0.62rem;color:var(--muted2)">Musíš alespoň 1× kliknout pro získání odměny.</div>
        </div>

        <!-- Participants -->
        <div style="font-family:'Oswald',sans-serif;font-size:0.72rem;letter-spacing:3px;text-transform:uppercase;color:var(--muted);padding-bottom:6px;border-bottom:1px solid var(--border)">👥 Účastníci (${gcState.participants.length})</div>
        <div id="gcParticipantsList"></div>

        <!-- Admin spawn (only lukamer) -->
        ${(window.state && (state.username||'').toLowerCase() === 'lukamer') ? `
        <div style="padding:12px;background:rgba(124,58,237,0.1);border:1px solid rgba(124,58,237,0.3);border-radius:6px">
          <div style="font-family:'Oswald',sans-serif;font-size:0.72rem;letter-spacing:2px;color:#a78bfa;margin-bottom:8px">⚙️ ADMIN</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap">
            ${GLOBAL_CHEST_LEVELS.map(l => `<button onclick="gcAdminSpawn(${l.level})" style="background:rgba(124,58,237,0.2);border:1px solid rgba(124,58,237,0.5);color:#a78bfa;border-radius:4px;padding:4px 10px;font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:1px;cursor:pointer">LVL ${l.level}</button>`).join('')}
            <button onclick="gcAdminEnd()" style="background:rgba(235,75,75,0.2);border:1px solid rgba(235,75,75,0.5);color:#eb4b4b;border-radius:4px;padding:4px 10px;font-family:'Oswald',sans-serif;font-size:0.65rem;letter-spacing:1px;cursor:pointer">END</button>
          </div>
        </div>` : ''}
      </div>
    </div>`;

  gcUpdateParticipantsList();
};

// ── UPGRADE PURCHASES ────────────────────────────────────────────────
window.gcBuyUpgrade = function(type) {
  if (!window.state) return;
  const upg = getGcUpgrades();
  let cost = 0;
  if (type === 'dmg') {
    cost = gcGetUpgCost(500, upg.lvlDmg || 0);
    if (state.money < cost) { if (typeof showToast === 'function') showToast('Nedostatek $!', 'error'); return; }
    state.money -= cost;
    upg.lvlDmg = (upg.lvlDmg || 0) + 1;
    upg.dmgMult = 1 + upg.lvlDmg * 0.5;
    if (typeof showToast === 'function') showToast(`⚔️ Event DMG ×${upg.dmgMult.toFixed(1)}!`, 'info');
  } else if (type === 'crit') {
    cost = gcGetUpgCost(1200, upg.lvlCrit || 0);
    if (state.money < cost) { if (typeof showToast === 'function') showToast('Nedostatek $!', 'error'); return; }
    state.money -= cost;
    upg.lvlCrit = (upg.lvlCrit || 0) + 1;
    upg.critChance = Math.min(0.4, (upg.lvlCrit) * 0.05);
    if (typeof showToast === 'function') showToast(`💥 Crit: ${Math.floor(upg.critChance*100)}%!`, 'info');
  } else if (type === 'auto') {
    cost = gcGetUpgCost(2000, upg.lvlAuto || 0);
    if (state.money < cost) { if (typeof showToast === 'function') showToast('Nedostatek $!', 'error'); return; }
    state.money -= cost;
    upg.lvlAuto = (upg.lvlAuto || 0) + 1;
    upg.autoHit = upg.lvlAuto * 2;
    if (typeof showToast === 'function') showToast(`🤖 Auto-útok: ${upg.autoHit} DMG/5s!`, 'info');
  }
  state.gcUpgrades = upg;
  if (typeof updateCurrencyDisplay === 'function') updateCurrencyDisplay();
  if (typeof saveState === 'function') saveState();
  if (window.currentPage === 'events') renderEventsPage();
};

// Auto-hit interval (fires every 5s)
setInterval(() => {
  if (!gcState.active) return;
  if (window.currentPage !== 'events') return;
  const upg = getGcUpgrades();
  if (!upg.autoHit || upg.autoHit <= 0) return;
  const dmg = upg.autoHit;
  gcState.myDamage += dmg;
  gcState.myClicks++;
  gcLocalDmgBuffer += dmg;
  gcLocalClickBuffer++;
  if (gcLocalArmor > 0) {
    const ad = Math.min(gcLocalArmor, dmg);
    gcLocalArmor -= ad;
    const ov = dmg - ad;
    if (ov > 0) gcLocalHp -= ov;
  } else {
    gcLocalHp -= dmg;
  }
  gcLocalHp = Math.max(0, gcLocalHp);
  gcUpdateChestHpBar();
  clearTimeout(gcFlushTimeout);
  gcFlushTimeout = setTimeout(gcFlushToServer, 300);
}, 5000);

// ── ADMIN FUNCTIONS ──────────────────────────────────────────────────
window.gcAdminSpawn = async function(level) {
  await gcSpawnNextLevel(level);
  if (typeof showToast === 'function') showToast(`⚡ Global Chest LVL ${level} spuštěn!`, 'success');
  await gcSync();
};

window.gcAdminEnd = async function() {
  await gcFetch('global_chest?id=eq.' + GC_CHEST_ID, {
    method: 'PATCH',
    body: JSON.stringify({ active: false })
  });
  gcState.active = false;
  gcUpdateEventActiveBadge(false);
  if (typeof showToast === 'function') showToast('Event ukončen.', 'info');
  renderEventsPage();
};

// ── INIT ─────────────────────────────────────────────────────────────
async function gcInit() {
  const chest = await gcPullChest();
  if (chest) {
    gcState.active = !!chest.active;
    gcState.level = chest.level || 1;
    gcState.maxHp = chest.max_hp || 0;
    gcState.maxArmor = chest.max_armor || 0;
    gcLocalHp = chest.current_hp || 0;
    gcLocalArmor = chest.current_armor || 0;
    const parts = await gcPullParticipants();
    gcState.participants = parts;
  }
  gcUpdateEventActiveBadge(gcState.active);
  if (window.currentPage === 'events') renderEventsPage();

  // Sync every 3 seconds
  gcSyncInterval = setInterval(gcSync, 3000);
}

setTimeout(gcInit, 1200);
