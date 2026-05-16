<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>REAL MAPA - v16</title>
<style>
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#000;font-family:'Courier New',monospace;color:#ddd;user-select:none}
#game{position:fixed;inset:0;z-index:1;display:block;width:100vw;height:100vh;background:#000;cursor:crosshair}
#lightning{position:fixed;inset:0;background:rgba(210,235,255,.9);opacity:0;pointer-events:none;mix-blend-mode:screen;z-index:6}
#topHud{position:fixed;left:50%;top:10px;transform:translateX(-50%);width:min(920px,calc(100vw - 24px));min-height:54px;background:linear-gradient(180deg,rgba(18,18,20,.84),rgba(3,3,5,.72));border:1px solid rgba(190,20,20,.95);border-bottom:2px solid rgba(120,0,0,.95);box-shadow:0 0 24px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.08);z-index:8;padding:7px 12px;text-shadow:1px 1px #000;display:grid;grid-template-columns:135px 1fr 230px;gap:12px;align-items:center}
#topHud .waveText{font-size:16px;font-weight:bold;color:#ffd6d6;letter-spacing:1px;text-align:center;line-height:1.05;text-transform:uppercase}
#topHud .small{font-size:10px;color:#aaa;margin-top:2px;font-weight:normal;letter-spacing:0}
#waveTrack{height:15px;border:1px solid #5b1111;background:rgba(25,0,0,.82);box-shadow:inset 0 1px 4px #000;position:relative;overflow:hidden}
#waveFill{height:100%;width:0%;background:linear-gradient(90deg,#8a0000,#f23636,#ff9a4a);box-shadow:0 0 12px rgba(255,30,20,.75);transition:width .18s linear}
#statusLine{display:none}
#hpTrack{height:9px;border:1px solid #522;background:#180000;margin:2px 0 5px;box-shadow:inset 0 1px 3px #000}
#hpFill{height:100%;background:linear-gradient(90deg,#6b0000,#e53333)}
#ammoLine{font-size:12px;color:#eee;line-height:1.3;text-align:right;white-space:nowrap}
#msg{position:fixed;left:50%;top:74px;transform:translateX(-50%);padding:8px 14px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.72);color:#ddd;font-size:13px;z-index:9;opacity:0;transition:opacity .18s;pointer-events:none}
#missing{display:none;position:fixed;inset:0;background:#050507;align-items:center;justify-content:center;z-index:20;text-align:center;font:15px monospace;padding:30px}#missing b{color:#ff7777}

#animOverlay{position:fixed;inset:0;z-index:2;pointer-events:none;overflow:hidden}
.anim-gif{position:absolute;display:none;image-rendering:auto;transform-origin:center center;will-change:left,top,width,height,transform}
#gameOver{display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:30;align-items:center;justify-content:center;text-align:center;color:#eee;text-shadow:2px 2px #000}
#gameOver .box{min-width:320px;background:rgba(8,8,10,.94);border:2px solid #8a0000;box-shadow:0 0 32px #000;padding:26px 34px;font-family:'Courier New',monospace}
#gameOver h1{margin:0 0 12px;color:#ff3333;font-size:38px;letter-spacing:3px}
#gameOver p{margin:8px 0 18px;color:#ccc;font-size:14px}
#gameOver button{background:#270000;color:#ffd0d0;border:1px solid #b00000;padding:10px 18px;font-family:inherit;cursor:pointer;font-weight:bold}
#gameOver button:hover{background:#500000}
#settingsBtn{position:fixed;right:14px;top:12px;z-index:40;width:42px;height:42px;border:1px solid #8a0000;background:rgba(10,10,12,.86);color:#ffd2d2;font-size:23px;line-height:39px;text-align:center;cursor:pointer;box-shadow:0 0 18px #000;border-radius:4px}
#settingsBtn:hover{background:#3a0000;color:#fff}
#settingsModal{display:none;position:fixed;inset:0;background:rgba(0,0,0,.74);z-index:45;align-items:center;justify-content:center}
#settingsModal .sbox{width:min(420px,92vw);background:#08080a;border:2px solid #7c0000;box-shadow:0 0 35px #000;padding:20px;color:#ddd}
#settingsModal h2{margin:0 0 14px;color:#ffb5b5;letter-spacing:2px}
#playerCard{position:fixed;right:14px;bottom:14px;z-index:9;min-width:176px;text-align:center;font-family:'Courier New',monospace;text-shadow:1px 1px #000;pointer-events:none}
#pcSquad{font-size:13px;color:#ffbebe;background:rgba(0,0,0,.70);border:1px solid rgba(130,0,0,.85);padding:5px 8px;margin-bottom:5px;letter-spacing:1px}
#pcNick{font-size:16px;color:#eee;background:rgba(0,0,0,.72);border:1px solid rgba(90,90,90,.8);padding:6px 8px;margin-bottom:6px;font-weight:bold}
#pcAvatarBox{width:124px;height:124px;margin-left:auto;background:rgba(5,5,6,.86);border:3px solid #880000;box-shadow:0 0 20px #000,inset 0 0 0 1px rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center}
#pcAvatar{max-width:94%;max-height:94%;object-fit:contain;image-rendering:auto}
.setRow{margin:12px 0;font-size:13px;color:#ccc}
.setRow label{display:flex;justify-content:space-between;margin-bottom:5px}
.setRow input,.setRow select{width:100%;accent-color:#b00000}
.sbtn{background:#260000;color:#ffd0d0;border:1px solid #a00000;padding:9px 14px;font-family:inherit;cursor:pointer;margin-top:12px}
.sbtn:hover{background:#520000}

body.shake #game{animation:shake .22s linear 1}@keyframes shake{0%{transform:translate(0,0)}20%{transform:translate(-2px,1px)}40%{transform:translate(2px,-1px)}60%{transform:translate(-1px,-1px)}80%{transform:translate(1px,2px)}100%{transform:translate(0,0)}}
</style>
</head>
<body>
<canvas id="game"></canvas>
<button id="settingsBtn" title="Nastavení" onclick="openSettings()">⚙</button>
<div id="settingsModal">
  <div class="sbox">
    <h2>NASTAVENÍ</h2>
    <div class="setRow"><label><span>Grafika</span><span id="qualityLbl">střední</span></label><select id="qualitySel" onchange="setQuality(this.value)"><option value="low">nízká</option><option value="mid">střední</option><option value="high">vysoká</option></select></div>
    <div class="setRow"><label><span>Hudba</span><span id="musicVolLbl">50%</span></label><input id="musicVol" type="range" min="0" max="100" value="50" oninput="setMusicVol(this.value)"></div>
    <div class="setRow"><label><span>Střelba / SFX</span><span id="sfxVolLbl">80%</span></label><input id="sfxVol" type="range" min="0" max="100" value="80" oninput="setSfxVol(this.value)"></div>
    <button class="sbtn" onclick="closeSettings()">ZAVŘÍT</button>
  </div>
</div>
<div id="animOverlay"></div>
<div id="lightning"></div>
<div id="topHud">
  <div class="waveText"><div id="waveTitle">VLNA 1</div><div class="small" id="waveCount">0 / 0</div></div>
  <div><div id="waveTrack"><div id="waveFill"></div></div><div id="statusLine">A/D pohyb • W/S chodník • E zbraň • R reload • LMB střelba</div></div>
  <div><div id="hpTrack"><div id="hpFill"></div></div><div id="ammoLine">HP 100/100<br>AK 30/30 • zás. 3</div></div>
</div>
<div id="msg"></div>
<div id="gameAlertModal"><div id="gameAlertBox"><h2>HLÁŠENÍ</h2><div id="gameAlertText"></div><button class="sbtn" onclick="closeGameAlert()">ZAVŘÍT</button></div></div>
<div id="playerCard">
  <div id="pcSquad">SQUAD: ???</div>
  <div id="pcNick">PLAYER</div>
  <div id="pcAvatarBox"><img id="pcAvatar" alt=""></div>
</div>
<div id="gameOver"><div class="box"><h1>KONEC HRY</h1><p id="gameOverStats">Enemy tě zabili.</p><button onclick="restartGame()">RESTART</button></div></div>
<div id="missing"><div><b>Chybí uložená postava.</b><br><br>Otevři nejdřív <b>char_editor_v2_real.html</b>, slož postavu/enemy a klikni na <b>🌧 REAL MAPA</b>.</div></div>
<audio id="music" src="hudba.mp3" loop preload="auto"></audio>
<audio id="shotAudio" src="strelba3.mp3" preload="auto"></audio>
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script>
const SUPABASE_URL="https://fokguuucpoejkxklwrpw.supabase.co";
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZva2d1dXVjcG9lamt4a2x3cnB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NTc2NTgsImV4cCI6MjA5NDUzMzY1OH0.2nNJFm1yzgiaNuIsj4DWgS9zJunIYc1uKkWndw23VrY";
let SB=null;try{if(window.supabase)SB=window.supabase.createClient(SUPABASE_URL,SUPABASE_KEY)}catch(e){SB=null}
const cv=document.getElementById('game'), ctx=cv.getContext('2d');
const animOverlay=document.getElementById('animOverlay');
const lightning=document.getElementById('lightning'), msg=document.getElementById('msg'), missing=document.getElementById('missing');
const gameOverEl=document.getElementById('gameOver'), gameOverStats=document.getElementById('gameOverStats');
const music=document.getElementById('music'), shotAudio=document.getElementById('shotAudio');
const waveTitle=document.getElementById('waveTitle'), waveCount=document.getElementById('waveCount'), waveFill=document.getElementById('waveFill'), statusLine=document.getElementById('statusLine'), hpFill=document.getElementById('hpFill'), ammoLine=document.getElementById('ammoLine');
const pcNick=document.getElementById('pcNick'), pcAvatar=document.getElementById('pcAvatar');
let W=0,H=0,DPR=1,last=performance.now(),msgTimer=0,gameEnded=false;
const SETTINGS={quality:localStorage.getItem('MADNESS_QUALITY')||'mid',musicVol:localStorage.getItem('MADNESS_MUSIC_VOL')??'50',sfxVol:localStorage.getItem('MADNESS_SFX_VOL')??'80'};
let payload=null;try{payload=JSON.parse(localStorage.getItem('MADNESS_REAL_PAYLOAD')||'null')}catch(e){payload=null}
let currentNpc=null;try{currentNpc=JSON.parse(localStorage.getItem('MADNESS_CURRENT_NPC')||'null')}catch(e){currentNpc=null}
if(!payload||!payload.player||!payload.player.src){missing.style.display='flex'}
function makeImg(src){const i=new Image();if(src)i.src=src;return i}
const mapImg=makeImg('mapa.png');
const crateImg=makeImg('ammo_crate.png');
const bloodSplatImg=makeImg('blood_splat.png');
const armoredEnemyImg=makeImg('armored_enemy.png');
const playerFullImg=makeImg(payload?.player?.src);
const playerNoHandsImg=makeImg(payload?.playerNoHands?.src || payload?.player?.src);
const enemyFullImg=makeImg(currentNpc?.src || payload?.enemy?.src || payload?.player?.src);
const enemyNoHandsImg=makeImg(currentNpc?.noHandsSrc || currentNpc?.src || payload?.enemyNoHands?.src || payload?.enemy?.src || payload?.playerNoHands?.src || payload?.player?.src);
const akHoldImg=makeImg(payload?.assets?.ak_hold);
const akGroundImg=makeImg(payload?.assets?.ak_ground || payload?.assets?.ak_hold);
const m4HoldImg=makeImg(payload?.assets?.m4_hold || 'm4_hold.png');
const awpHoldImg=makeImg(payload?.assets?.awp_hold || 'awp_hold.png');
const m60HoldImg=makeImg(payload?.assets?.m60_hold || 'm60_hold.png');
const playerGifMeta=payload?.gif?.player || null;
const playerGifEl=playerGifMeta?.src ? document.createElement('img') : null;
let playerGifFrozenSrc=null, playerGifMode='';
if(playerGifEl){
  playerGifEl.className='anim-gif';
  playerGifEl.src=playerGifMeta.src;
  playerGifEl.onload=()=>capturePlayerGifFrame();
  animOverlay.appendChild(playerGifEl);
  setTimeout(capturePlayerGifFrame,120);
}
function capturePlayerGifFrame(){
  if(!playerGifEl||playerGifFrozenSrc)return;
  try{
    const c=document.createElement('canvas');
    c.width=playerGifEl.naturalWidth||playerGifMeta.iw||40;
    c.height=playerGifEl.naturalHeight||playerGifMeta.ih||40;
    c.getContext('2d').drawImage(playerGifEl,0,0,c.width,c.height);
    playerGifFrozenSrc=c.toDataURL('image/png');
  }catch(e){}
}
function setPlayerGifMode(mode){
  if(!playerGifEl||playerGifMode===mode)return;
  playerGifMode=mode;
  if(mode==='walk') playerGifEl.src=playerGifMeta.src;
  else if(playerGifFrozenSrc) playerGifEl.src=playerGifFrozenSrc;
}
const grip=payload?.grip || {x:0,y:8,rot:0,scale:100};
const MAG_SIZE=30;
const PLAYER_FIRE_DELAY=.144;
const WEAPONS={
  ak47:{label:'AK-47',hold:()=>akHoldImg,ground:()=>akGroundImg,drawW:170,worldW:170,spread:.175,speed:2050,damage:34,recoil:8,fireDelay:PLAYER_FIRE_DELAY},
  m4:{label:'M4',hold:()=>m4HoldImg,ground:()=>m4HoldImg,drawW:170,worldW:170,spread:.12,speed:2140,damage:30,recoil:6,fireDelay:.145},
  awp:{label:'AWP',hold:()=>awpHoldImg,ground:()=>awpHoldImg,drawW:190,worldW:190,spread:.05,speed:2600,damage:92,recoil:13,fireDelay:1.85},
  m60:{label:'M60',hold:()=>m60HoldImg,ground:()=>m60HoldImg,drawW:190,worldW:190,spread:.22,speed:2000,damage:40,recoil:10,fireDelay:.205}
};
const selectedWeaponFromLobby = (()=>{
  const v=(localStorage.getItem('MADNESS_SELECTED_WEAPON')||'').toLowerCase();
  return WEAPONS[v] ? v : '';
})();
function weaponDef(type){return WEAPONS[type]||WEAPONS.ak47}
function weaponLabel(type){return weaponDef(type).label}
function getMoney(){let v=Number(localStorage.getItem('MADNESS_MONEY'));if(!Number.isFinite(v)){v=2500;localStorage.setItem('MADNESS_MONEY',String(v))}return Math.max(0,Math.floor(v))}
function setMoney(v){localStorage.setItem('MADNESS_MONEY',String(Math.max(0,Math.floor(v))))}
const MAX_LEVEL=10;
function levelNeed(lvl){return 100 + (Math.max(1,lvl)-1)*85}
function getLevel(){let v=Number(localStorage.getItem('MADNESS_LEVEL'));if(!Number.isFinite(v)||v<1){v=1;localStorage.setItem('MADNESS_LEVEL','1')}return Math.min(MAX_LEVEL,Math.floor(v))}
function getXp(){let v=Number(localStorage.getItem('MADNESS_XP'));if(!Number.isFinite(v)||v<0){v=0;localStorage.setItem('MADNESS_XP','0')}return Math.floor(v)}
function setLevel(v){localStorage.setItem('MADNESS_LEVEL',String(Math.min(MAX_LEVEL,Math.max(1,Math.floor(v)))))}
function setXp(v){localStorage.setItem('MADNESS_XP',String(Math.max(0,Math.floor(v))))}
function addXp(amount){let lvl=getLevel(),xp=getXp()+Math.max(0,Math.floor(amount));let up=0;while(lvl<MAX_LEVEL&&xp>=levelNeed(lvl)){xp-=levelNeed(lvl);lvl++;up++}if(lvl>=MAX_LEVEL)xp=0;setLevel(lvl);setXp(xp);return up}
function waveMoneyReward(wave){return 300 + Math.floor(wave*45)}
function waveXpReward(wave){return 70 + Math.floor(wave*9)}
function getClientId(){let id=localStorage.getItem('MADNESS_CLIENT_ID');if(!id){id='p_'+Math.random().toString(36).slice(2,10)+'_'+Date.now().toString(36);localStorage.setItem('MADNESS_CLIENT_ID',id)}return id}
function playerNick(){return (localStorage.getItem('MADNESS_PLAYER_NAME')||'PLAYER').trim()||'PLAYER'}
function getSquadName(){return (localStorage.getItem('MADNESS_SQUAD_NAME')||'???').trim()||'???'}
function squadBonusActive(){return getSquadName()!=='???'}
function applySquadBonus(v){return Math.floor(v*(squadBonusActive()?1.25:1))}
function getKills(){return Math.max(0,Math.floor(Number(localStorage.getItem('MADNESS_KILLS')||'0')||0))}
function setKills(v){localStorage.setItem('MADNESS_KILLS',String(Math.max(0,Math.floor(v))))}
function addKill(){setKills(getKills()+1);if(getKills()%5===0)syncPlayerStats()}
function getMissions(){return Math.max(0,Math.floor(Number(localStorage.getItem('MADNESS_MISSIONS')||'0')||0))}
function setMissions(v){localStorage.setItem('MADNESS_MISSIONS',String(Math.max(0,Math.floor(v))))}
function countMissionStart(){if(sessionStorage.getItem('MADNESS_THIS_MISSION_COUNTED')==='1')return;sessionStorage.setItem('MADNESS_THIS_MISSION_COUNTED','1');setMissions(getMissions()+1);syncPlayerStats()}
function getBestWave(){return Math.max(0,Math.floor(Number(localStorage.getItem('MADNESS_BEST_WAVE')||'0')||0))}
function setBestWave(v){localStorage.setItem('MADNESS_BEST_WAVE',String(Math.max(getBestWave(),Math.floor(v))))}
function calcGlory(){return getKills()*10 + getMissions()*45 + getLevel()*100 + getBestWave()*15}
function unlockedAchievementIds(){const k=getKills(),m=getMissions(),lvl=getLevel(),money=getMoney(),wave=getBestWave(),g=calcGlory();const ids=[];if(k>=1)ids.push('first_blood');if(k>=10)ids.push('killer_10');if(k>=50)ids.push('killer_50');if(m>=1)ids.push('mission_1');if(m>=5)ids.push('mission_5');if(wave>=5)ids.push('wave_5');if(lvl>=5)ids.push('lvl_5');if(lvl>=10)ids.push('lvl_10');if(money>=5000)ids.push('rich_5k');if(g>=1000)ids.push('glory_1000');return ids}
async function syncPlayerStats(){if(!SB)return;const row={player_id:getClientId(),nick:playerNick(),kills:getKills(),glory:calcGlory(),level:getLevel(),missions:getMissions(),best_wave:getBestWave(),achievements:unlockedAchievementIds(),updated_at:new Date().toISOString()};try{await SB.from('madness_player_stats').upsert(row,{onConflict:'player_id'})}catch(e){}}
function grantWaveReward(doneWave){
  if(doneWave>0 && doneWave%5===0){
    const baseReward=waveMoneyReward(doneWave), baseXp=waveXpReward(doneWave);
    const reward=applySquadBonus(baseReward), xp=applySquadBonus(baseXp);
    setMoney(getMoney()+reward);
    const ups=addXp(xp);
    setBestWave(doneWave);
    syncPlayerStats();
    showMsg('VLNA '+doneWave+' ODMĚNA: +'+reward+' money, +'+xp+' XP'+(squadBonusActive()?' • SQUAD +25%':'')+(ups?' • LEVEL UP!':''));
  }
}
function randomWeaponType(){const arr=['ak47','m4','awp','m60'];return arr[Math.floor(Math.random()*arr.length)]}
function applySpread(vec,spread){const a=(Math.random()*2-1)*spread,c=Math.cos(a),s=Math.sin(a);return {dx:vec.dx*c-vec.dy*s,dy:vec.dx*s+vec.dy*c}}

const state={
  mapW:1916,mapH:821,scale:1,mapDrawW:1916,mapDrawH:821,mapY:0,camX:0,
  player:{x:340,y:525,vx:0,vy:0,face:-1,hp:100,maxHp:100,weapon:!!selectedWeaponFromLobby,weaponType:selectedWeaponFromLobby||null,ammo:selectedWeaponFromLobby?MAG_SIZE:0,mags:selectedWeaponFromLobby?3:0,reloading:false,reloadT:0,invuln:0,recoil:0,physVx:0,knockVx:0,knockT:0,recoilTilt:0,recoilSpin:0,bloodMark:null},
  droppedWeapon:{x:420,y:525,on:false,type:selectedWeaponFromLobby||'ak47'},
  groundWeapons:[],
  ammoCrates:[],
  decorCount:{bench:1},
  wave:1,waveTotal:0,waveKilled:0,waveDelay:0,enemies:[],
  keys:{w:0,a:0,s:0,d:0},mouseX:0,mouseY:0,shooting:false,shootTimer:0,muzzleFlashes:[],bullets:[],enemyBullets:[],rain:[],splashes:[],hitEffects:[]
};
function rand(a,b){return a+Math.random()*(b-a)}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
const NPC_CHAT_LINES=[
  'Rushuju!',
  'Kde jsi?',
  'Tohle nedáš.',
  'Reload!',
  'Za squad!',
  'Vidím tě.',
  'Jdu si pro tebe.',
  'Nemáš šanci.',
  'EZ loot.',
  'Drž pozici!',
  'Kryj mě!',
  'Kontakt!'
];
function randomNpcChat(){return NPC_CHAT_LINES[Math.floor(Math.random()*NPC_CHAT_LINES.length)]}
function gameAlert(t){const m=document.getElementById('gameAlertModal'),x=document.getElementById('gameAlertText');if(x)x.textContent=String(t||'');if(m)m.style.display='flex'}function closeGameAlert(){const m=document.getElementById('gameAlertModal');if(m)m.style.display='none'}window.alert=gameAlert;function showMsg(t){msg.textContent=t;msg.style.opacity='1';msgTimer=1.4}
function endGame(){if(gameEnded)return;gameEnded=true;state.shooting=false;gameOverStats.textContent='Dostal ses do vlny '+state.wave+' • zabito '+state.waveKilled+' / '+state.waveTotal;gameOverEl.style.display='flex';}
function restartGame(){location.reload()}
function walkTop(){return state.mapH*.655}
function walkBottom(){return state.mapH*.678}
function playerMinX(){return 70}
function playerMaxX(){return state.mapW-70}
function resize(){DPR=Math.max(1,Math.min(devicePixelRatio||1,2));W=innerWidth;H=innerHeight;cv.width=Math.floor(W*DPR);cv.height=Math.floor(H*DPR);cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);recalcMap();makeRain()}
function recalcMap(){const mw=mapImg.naturalWidth||1916,mh=mapImg.naturalHeight||821;state.mapW=mw;state.mapH=mh;state.scale=Math.max(H/mh,W/mw*.72);state.mapDrawW=mw*state.scale;state.mapDrawH=mh*state.scale;state.mapY=(H-state.mapDrawH)/2;state.player.x=clamp(state.player.x||340,playerMinX(),playerMaxX());state.player.y=centerLane();state.droppedWeapon.y=clamp(mh*.63,walkTop(),walkBottom());state.ammoCrates.forEach(c=>c.y=clamp(c.y||mh*.63,walkTop(),walkBottom()));state.groundWeapons.forEach(w=>w.y=clamp(w.y||mh*.63,walkTop(),walkBottom()));for(const e of state.enemies)e.y=clamp(e.y,walkTop(),walkBottom())}
function makeRain(){state.rain=[];const q=SETTINGS.quality;const base=q==='low'?210:q==='high'?620:380;const count=Math.max(q==='low'?120:240,Math.round(base*(W/1920)));for(let i=0;i<count;i++)state.rain.push({x:rand(-W*.2,W*1.2),y:rand(-H,H),v:rand(760,1400),len:rand(12,34),a:rand(.22,.55),w:rand(.7,1.35)})}
function addSplash(x,y){if(state.splashes.length>170)state.splashes.shift();state.splashes.push({x,y,life:0,max:rand(.16,.3),size:rand(5,13),a:rand(.35,.72)})}
function startMusic(){music.volume=(Number(SETTINGS.musicVol)||0)/100*.5;music.play().catch(()=>{})}
function playShotSound(vol=1){try{const a=shotAudio.cloneNode(true);a.volume=Math.min(1,vol*((Number(SETTINGS.sfxVol)||0)/100)*.8);a.play().catch(()=>{})}catch(e){}}
function flashLightning(){const s=rand(.35,.85);lightning.style.transition='none';lightning.style.opacity=s.toFixed(2);document.body.classList.add('shake');setTimeout(()=>{lightning.style.transition='opacity 90ms linear';lightning.style.opacity='0'},rand(35,85));setTimeout(()=>{lightning.style.transition='none';lightning.style.opacity=(s*.42).toFixed(2);setTimeout(()=>{lightning.style.transition='opacity 180ms linear';lightning.style.opacity='0'},rand(28,70))},rand(130,280));setTimeout(()=>document.body.classList.remove('shake'),260);setTimeout(flashLightning,rand(2800,7600))}
function worldToScreenX(x){return x*state.scale-state.camX}
function worldToScreenY(y){return state.mapY+y*state.scale}
function screenToWorldX(x){return (x+state.camX)/state.scale}
function centerLane(){return (walkTop()+walkBottom())*.5}
function canStand(x,y){return x>=playerMinX()&&x<=playerMaxX()&&y>=walkTop()&&y<=walkBottom()}
function movePlayer(dt){
  const p=state.player;
  const left=playerMinX(), right=playerMaxX();
  let input=0,acc=1850,maxSpeed=310,groundFriction=7.5;
  if(state.keys.a)input-=1;
  if(state.keys.d)input+=1;

  p.physVx=(p.physVx||0)+input*acc*dt;
  if(!input)p.physVx*=Math.exp(-groundFriction*dt);
  p.physVx=clamp(p.physVx,-maxSpeed,maxSpeed);

  if(p.knockT>0){
    p.knockT-=dt;
    p.knockVx*=Math.exp(-1.15*dt);
    p.recoilSpin=(p.recoilSpin||0)*Math.exp(-2.4*dt);
  }else{
    p.knockVx*=Math.exp(-5.2*dt);
    p.recoilSpin=(p.recoilSpin||0)*Math.exp(-3.2*dt);
  }

  let nx=p.x+(p.physVx+(p.knockVx||0))*dt;
  if(nx<left){
    nx=left;
    p.knockVx=Math.abs(p.knockVx||0)*.42;
    p.physVx=Math.abs(p.physVx||0)*.18;
    p.recoilSpin*= -.45;
    document.body.classList.add('shake');setTimeout(()=>document.body.classList.remove('shake'),130);
  }
  if(nx>right){
    nx=right;
    p.knockVx=-Math.abs(p.knockVx||0)*.42;
    p.physVx=-Math.abs(p.physVx||0)*.18;
    p.recoilSpin*= -.45;
    document.body.classList.add('shake');setTimeout(()=>document.body.classList.remove('shake'),130);
  }
  p.x=clamp(nx,left,right);
  p.y=centerLane();
  p.recoilTilt=(p.recoilTilt||0)+(p.recoilSpin||0)*dt;
  p.recoilTilt=clamp(p.recoilTilt,-0.28,0.28);
  p.recoilTilt*=Math.exp(-2.6*dt);
  const mw=screenToWorldX(state.mouseX);
  if(Math.abs(mw-p.x)>8)p.face=mw>p.x?-1:1;
}
function spawnWave(){
  state.waveKilled=0;state.enemies=[];
  const count=Math.min(34,2+state.wave*2);
  state.waveTotal=count;
  const guns=state.wave>=8;
  for(let i=0;i<count;i++){
    const useLeft=state.wave>=5 && Math.random()<.45;
    const x=useLeft ? -rand(90,560)-i*22 : state.mapW+rand(90,560)+i*22;
    const y=rand(walkTop()+10,walkBottom()-10);
    const wt=guns?randomWeaponType():null;
    const armored=state.wave>=3 && Math.random()<Math.min(.14+state.wave*.018,.42);
    const hpBase=80+state.wave*12+(armored?(115+state.wave*9):0);
    state.enemies.push({id:Date.now()+i,x,y,face:useLeft?-1:1,hp:hpBase,maxHp:hpBase,dead:false,hasGun:!!wt,weaponType:wt,reloadT:0,shootT:rand(.65,1.6),attackT:rand(.35,.95),speed:rand(62,112)+Math.min(60,state.wave*4.3)-(armored?18:0),recoil:0,drop:false,armored,bloodMark:null,chat:Math.random()<.38?{text:randomNpcChat(),life:rand(1.8,3.8),max:rand(1.8,3.8)}:null,armT:rand(0,6.28),armAmp:rand(1.5,5.5)});
  }
  showMsg('VLNA '+state.wave);updateHud();
}
function nextWave(){grantWaveReward(state.wave);state.wave++;state.waveDelay=0;spawnWave()}
function drawSprite(img,obj,face,targetH=150){
  if(!img||!img.complete||!img.naturalWidth)return;
  const sc=(targetH/img.naturalHeight)*state.scale;
  const w=img.naturalWidth*sc,h=img.naturalHeight*sc;
  const sx=worldToScreenX(obj.x),sy=worldToScreenY(obj.y);
  const aliveMotion=(obj!==state.player && !obj.hasGun && !obj.dead && !obj.armored);
  const t=performance.now()/1000+(obj.armT||0);
  const bob=aliveMotion?Math.sin(t*2.7)*(obj.armAmp||2)*.28:0;
  const rot=aliveMotion?Math.sin(t*2.2)*(0.012+(obj.armAmp||2)*0.001):0;
  ctx.save();ctx.translate(sx,sy+bob*state.scale);ctx.rotate(rot*face + ((obj===state.player)?(obj.recoilTilt||0):0));ctx.scale(face,1);ctx.drawImage(img,-w/2,-h,w,h);ctx.restore();
}
function ensureBloodMark(obj){
  if(!obj)return;
  if(!obj.bloodMarks)obj.bloodMarks=[];
  const maxMarks = obj===state.player ? 3 : (obj.armored ? 4 : 3);
  if(obj.bloodMarks.length>=maxMarks)return;
  const head=Math.random()<.48;
  obj.bloodMarks.push({part:head?'head':'body',rot:rand(-0.75,0.75),size:head?rand(.46,.68):rand(.55,.78),dx:head?rand(-10,10):rand(-13,13),dy:head?rand(-120,-98):rand(-78,-48)});
  obj.bloodMark=obj.bloodMarks[0];
}
function drawBloodMark(obj,targetH=160){
  if(!obj||!bloodSplatImg.complete||!bloodSplatImg.naturalWidth)return;
  const marks=obj.bloodMarks || (obj.bloodMark?[obj.bloodMark]:[]);
  for(const mark of marks){
    const x=worldToScreenX(obj.x)+(mark.dx||0)*state.scale*(obj.face<0?-1:1);
    const y=worldToScreenY(obj.y)+(mark.dy||0)*state.scale;
    const base=(mark.part==='head'?34:46)*(mark.size||1)*state.scale;
    const w=base,h=base*(bloodSplatImg.naturalHeight/bloodSplatImg.naturalWidth);
    ctx.save();
    ctx.globalAlpha=.86;
    ctx.translate(x,y);
    ctx.rotate(mark.rot||0);
    ctx.drawImage(bloodSplatImg,-w/2,-h/2,w,h);
    ctx.restore();
  }
}
function armorDamage(dmg,weaponType,armored){
  if(!armored)return dmg;
  const mult = weaponType==='awp' ? .72 : weaponType==='m60' ? .62 : weaponType==='m4' ? .48 : .45;
  return Math.max(3, Math.round(dmg*mult));
}
function updatePlayerGifOverlay(){
  if(!playerGifEl||!playerGifMeta||!payload?.player||state.player.hp<=0||gameEnded){if(playerGifEl)playerGifEl.style.display='none';return}
  const sprite=state.player.weapon?(payload.playerNoHands||payload.player):payload.player;
  if(!sprite||!sprite.w||!sprite.h){playerGifEl.style.display='none';return}
  const p=state.player;
  const moving=!!(state.keys.a||state.keys.d||state.keys.w||state.keys.s);
  setPlayerGifMode(moving?'walk':'idle');
  if(!moving && !playerGifFrozenSrc){playerGifEl.style.display='none';return}
  const targetH=170, drawH=targetH*state.scale, drawScale=drawH/sprite.h;
  const mx=(playerGifMeta.x-(sprite.w/2))*drawScale;
  const my=(-drawH)+(playerGifMeta.y*drawScale);
  const x=worldToScreenX(p.x)+(p.face*mx), y=worldToScreenY(p.y)+my;
  const w=(playerGifMeta.iw||40)*drawScale, h=(playerGifMeta.ih||40)*drawScale;
  const fh=playerGifMeta.flipH?-1:1, fv=playerGifMeta.flipV?-1:1;
  playerGifEl.style.display='block';
  playerGifEl.style.left=x+'px';playerGifEl.style.top=y+'px';playerGifEl.style.width=w+'px';playerGifEl.style.height=h+'px';
  playerGifEl.style.opacity=((playerGifMeta.alpha??100)/100);
  playerGifEl.style.transform=`translate(-50%,-50%) scaleX(${p.face*fh}) scaleY(${fv}) rotate(${playerGifMeta.rot||0}deg)`;
}

function drawSingleGroundWeapon(wp){
  if(!wp||wp.picked)return;
  const def=weaponDef(wp.type||'ak47');
  const img=(def.ground&&def.ground())||def.hold();
  if(!img||!img.complete||!img.naturalWidth)return;
  const x=worldToScreenX(wp.x),y=worldToScreenY(wp.y);
  const w=(wp.type==='awp'?145:125)*state.scale,h=w*(img.naturalHeight/img.naturalWidth);
  ctx.save();ctx.translate(x,y-18*state.scale);ctx.rotate(-.045);ctx.drawImage(img,-w/2,-h/2,w,h);ctx.restore();
}
function drawGroundWeapon(){
  state.groundWeapons.forEach(drawSingleGroundWeapon);
  if(state.droppedWeapon.on)drawSingleGroundWeapon(state.droppedWeapon);
}
function barrelPos(o){
  const dir=o.face<0?1:-1;
  const def=weaponDef(o.weaponType||'ak47');
  const centerX=o.x+dir*((grip.x||0)-(o.recoil||0)*.55);
  const centerY=o.y-78+(grip.y||8);
  const gunWWorld=(def.worldW||170)*((grip.scale||100)/100);
  return {x:centerX+dir*(gunWWorld*.52+4),y:centerY-1,dir};
}
function drawGun(o,withFlash){
  const def=weaponDef(o.weaponType||'ak47'), img=def.hold();
  if(!img||!img.complete||!img.naturalWidth)return;
  const dir=o.face<0?1:-1;
  const sx=worldToScreenX(o.x+dir*((grip.x||0)-(o.recoil||0))),sy=worldToScreenY(o.y-78+(grip.y||8));
  const base=(def.drawW||170)*state.scale*(grip.scale||100)/100;
  const hw=base,hh=hw*(img.naturalHeight/img.naturalWidth);
  ctx.save();ctx.translate(sx,sy);ctx.rotate((grip.rot||0)*Math.PI/180*dir);ctx.scale(dir,1);ctx.drawImage(img,-hw/2,-hh/2,hw,hh);ctx.restore();
}
function addMuzzle(x,y,dir){state.muzzleFlashes.push({x,y,dir,life:.07,max:.07,size:rand(22,32)})}
function drawMuzzles(){for(const f of state.muzzleFlashes){const t=f.life/f.max,x=worldToScreenX(f.x),y=worldToScreenY(f.y);ctx.save();ctx.globalAlpha=clamp(t,0,1);ctx.translate(x,y);ctx.scale(f.dir,1);const s=f.size*state.scale*(.7+(1-t)*.7);const g=ctx.createRadialGradient(0,0,0,0,0,s);g.addColorStop(0,'rgba(255,255,220,1)');g.addColorStop(.36,'rgba(255,155,20,.9)');g.addColorStop(1,'rgba(255,60,0,0)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(0,-s*.35);ctx.lineTo(s*1.3,0);ctx.lineTo(0,s*.35);ctx.lineTo(s*.22,0);ctx.closePath();ctx.fill();ctx.restore()}}
function drawAmmoCrate(c){
  if(c.picked)return;
  const x=worldToScreenX(c.x), y=worldToScreenY(c.y);
  ctx.save();
  ctx.translate(x,y-8*state.scale);
  ctx.rotate(c.rot||0);
  if(crateImg&&crateImg.complete&&crateImg.naturalWidth){
    const w=44*state.scale, h=w*(crateImg.naturalHeight/crateImg.naturalWidth);
    ctx.drawImage(crateImg,-w/2,-h+8*state.scale,w,h);
  }else{
    ctx.fillStyle='rgba(60,60,60,.95)';ctx.strokeStyle='rgba(190,30,30,.9)';ctx.lineWidth=2;
    ctx.fillRect(-11*state.scale,-10*state.scale,22*state.scale,10*state.scale);ctx.strokeRect(-11*state.scale,-10*state.scale,22*state.scale,10*state.scale);
  }
  ctx.restore();
}
function dropAmmoCrate(x,y,chance=.42){
  if(Math.random()>chance)return;
  state.ammoCrates.push({x:clamp(x,90,state.mapW-90),y:clamp(y,walkTop(),walkBottom()),picked:false,amount:1+Math.floor(Math.random()*2),rot:rand(-0.28,0.28)});
}
function pickupAmmoCrates(){
  const p=state.player;
  for(const c of state.ammoCrates){
    if(!c.picked&&Math.hypot(p.x-c.x,p.y-c.y)<74){
      c.picked=true;
      const add=c.amount||1;
      p.mags+=add;
      if(p.weapon&&p.ammo===0&&!p.reloading&&p.mags>0)reload();
      showMsg('BEDNA: +'+add+' zásobník'+(add>1?'y':''));
    }
  }
}
function aimLimitedFromMouse(bp){
  const dir=bp.dir;
  const sx=worldToScreenX(bp.x), sy=worldToScreenY(bp.y);
  const raw=Math.atan2(state.mouseY-sy,Math.max(40,Math.abs(state.mouseX-sx)));
  const ang=clamp(raw,-0.20,0.20);
  return {dx:dir*Math.cos(ang),dy:Math.sin(ang)};
}
function aimLimitedToTarget(bp,tx,ty){
  const dir=tx>=bp.x?1:-1;
  const raw=Math.atan2(ty-bp.y,Math.max(40,Math.abs(tx-bp.x)));
  const ang=clamp(raw,-0.18,0.18);
  return {dx:dir*Math.cos(ang),dy:Math.sin(ang)};
}
function isTrollAwpActive(){
  return localStorage.getItem('MADNESS_TROLL_AWP')==='1' && (state.player.weaponType||'')==='awp';
}
function trollAwpShotsLeft(){
  return Math.max(0,Number(localStorage.getItem('MADNESS_TROLL_AWP_SHOTS')||'0')||0);
}
function consumeTrollAwpShot(){
  if(!isTrollAwpActive())return true;
  let left=trollAwpShotsLeft();
  if(left<=0){
    disableTrollAwp();
    showMsg('TROLL AWP došla. Měla jen 2 rány.');
    return false;
  }
  left--;
  localStorage.setItem('MADNESS_TROLL_AWP_SHOTS',String(left));
  if(left<=0){
    setTimeout(()=>disableTrollAwp(),250);
  }else{
    showMsg('TROLL AWP: zbývá '+left+' rána');
  }
  return true;
}
function disableTrollAwp(){
  localStorage.removeItem('MADNESS_TROLL_AWP');
  localStorage.removeItem('MADNESS_TROLL_AWP_SHOTS');
  const owned=JSON.parse(localStorage.getItem('MADNESS_OWNED_WEAPONS')||'[]').filter(x=>x!=='awp');
  localStorage.setItem('MADNESS_OWNED_WEAPONS',JSON.stringify(owned));
  if((state.player.weaponType||'')==='awp'){
    state.player.weapon=false;
    state.player.weaponType=null;
    state.player.ammo=0;
    state.player.mags=0;
    state.shooting=false;
    localStorage.removeItem('MADNESS_SELECTED_WEAPON');
    showMsg('TROLL AWP se rozpadla.');
  }
}
function reload(){const p=state.player;if(!p.weapon||p.reloading||p.ammo>=MAG_SIZE)return;if(p.mags<=0){showMsg('Nemáš zásobník');return}p.reloading=true;p.reloadT=.85;showMsg('Reload')}
function finishReload(){const p=state.player;if(p.mags<=0){p.reloading=false;return}p.mags--;p.ammo=MAG_SIZE;p.reloading=false;showMsg('Nabito')}
function fire(){
  const p=state.player;if(!p.weapon||p.reloading||p.hp<=0)return;
  if((p.weaponType||'')==='awp'&&!consumeTrollAwpShot())return;
  if(p.ammo<=0){reload();return}
  p.ammo--;
  const bp=barrelPos(p), def=weaponDef(p.weaponType||'ak47');
  let aim=aimLimitedFromMouse(bp);
  aim=applySpread(aim,def.spread||.08);
  const speed=(def.speed||1700)/state.scale;
  state.bullets.push({x:bp.x,y:bp.y,vx:aim.dx*speed,vy:aim.dy*speed,life:2.15,damage:(def.damage||22)+Math.floor(state.wave*.55),weaponType:p.weaponType||'ak47',hit:false});
  p.recoil=Math.min(18,p.recoil+(def.recoil||8));
  if((p.weaponType||'ak47')==='awp'){
    const burst=rand(2350,3150);
    p.knockVx += -bp.dir*burst;
    p.physVx += -bp.dir*rand(220,520);
    p.knockT=1.25;
    p.recoilSpin += -bp.dir*rand(.55,.95);
    document.body.classList.add('shake');
    setTimeout(()=>document.body.classList.remove('shake'),320);
    showMsg(isTrollAwpActive()?'TROLL AWP RECOIL: odpal dozadu':'AWP RECOIL');
  }
  addMuzzle(bp.x,bp.y,bp.dir);playShotSound(.92);
  if(p.ammo<=0&&p.mags>0)setTimeout(()=>{if(state.player.ammo<=0)reload()},80)
}
function enemyFire(e){
  const p=state.player;if(e.dead||p.hp<=0)return;
  const dist=Math.hypot(p.x-e.x,p.y-e.y)||1;if(dist>1350)return;
  const bp=barrelPos(e), def=weaponDef(e.weaponType||'ak47');
  let aim=aimLimitedToTarget(bp,p.x,p.y-66);aim=applySpread(aim,(def.spread||.05)*1.65);
  const speed=(def.speed||1700)*.7;
  state.enemyBullets.push({x:bp.x,y:bp.y,vx:aim.dx*speed,vy:aim.dy*speed,life:1.95,damage:Math.max(4,Math.floor((def.damage||22)*.22))+Math.floor(state.wave*.4)});
  e.recoil=Math.min(13,e.recoil+(def.recoil||6));addMuzzle(bp.x,bp.y,bp.dir);playShotSound(.55)
}
function damagePlayer(dmg){const p=state.player;if(p.invuln>0||p.hp<=0)return;ensureBloodMark(p);p.hp-=dmg;p.invuln=.16;document.body.classList.add('shake');setTimeout(()=>document.body.classList.remove('shake'),160);if(p.hp<=0){p.hp=0;showMsg('Mrtvý - enemy tě zabili');endGame()}}
function updateEnemies(dt){const p=state.player;for(const e of state.enemies){if(e.dead)continue;if(e.chat){e.chat.life-=dt;if(e.chat.life<=0)e.chat=null}if(e.recoil>0)e.recoil=Math.max(0,e.recoil-42*dt);e.face=p.x>e.x?-1:1;const dx=p.x-e.x,dy=p.y-e.y,dist=Math.hypot(dx,dy)||1;if(e.hasGun){if(dist>390){e.x+=dx/dist*e.speed*dt;e.y=clamp(e.y+dy/dist*e.speed*.42*dt,walkTop(),walkBottom())}e.shootT-=dt;if(e.shootT<=0){enemyFire(e);e.shootT=rand(1.05,2.25)+(weaponDef(e.weaponType||'ak47').fireDelay||.22)-Math.min(.12,state.wave*.005)}}else{if(dist>45){e.x+=dx/dist*e.speed*dt;e.y=clamp(e.y+dy/dist*e.speed*.55*dt,walkTop(),walkBottom())}else{e.attackT-=dt;if(e.attackT<=0){damagePlayer(7+Math.floor(state.wave*1.15));state.hitEffects.push({x:p.x+rand(-20,20),y:p.y-70+rand(-15,15),life:.18,max:.18});e.attackT=rand(.55,.95)}}}
  }
}
function update(dt){if(msgTimer>0){msgTimer-=dt;if(msgTimer<=0)msg.style.opacity='0'}if(gameEnded){updateHud();return}const p=state.player;if(p.hp>0)movePlayer(dt);if(p.invuln>0)p.invuln-=dt;if(p.recoil>0)p.recoil=Math.max(0,p.recoil-55*dt);pickupAmmoCrates();if(p.reloading){p.reloadT-=dt;if(p.reloadT<=0)finishReload()}if(state.shooting&&p.weapon&&p.hp>0){state.shootTimer-=dt;if(state.shootTimer<=0){fire();state.shootTimer=(weaponDef(p.weaponType||'ak47').fireDelay||PLAYER_FIRE_DELAY)}}updateEnemies(dt);
state.bullets=state.bullets.filter(b=>{b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;for(const e of state.enemies){if(e.dead||b.hit)continue;const dx=b.x-e.x,dy=b.y-(e.y-72);if(Math.hypot(dx,dy)<46){b.hit=true;b.life=0;ensureBloodMark(e);const dealt=armorDamage(b.damage,b.weaponType,e.armored);e.hp-=dealt;state.hitEffects.push({x:e.x+rand(-18,18),y:e.y-72+rand(-18,14),life:.2,max:.2});if(e.hp<=0){e.hp=0;e.dead=true;state.waveKilled++;addKill();dropAmmoCrate(e.x,e.y,state.wave>=8?.48:.36);showMsg(e.armored?'Obrněnec down':'Enemy down')}}}return b.life>0&&b.x>-220&&b.x<state.mapW+220&&b.y>-120&&b.y<state.mapH+120});
state.enemyBullets=state.enemyBullets.filter(b=>{b.x+=b.vx*dt;b.y+=b.vy*dt;b.life-=dt;if(p.hp>0){const dx=b.x-p.x,dy=b.y-(p.y-70);if(Math.hypot(dx,dy)<39){damagePlayer(b.damage);b.life=0}}return b.life>0&&b.x>-260&&b.x<state.mapW+260&&b.y>-140&&b.y<state.mapH+140});
for(let i=state.muzzleFlashes.length-1;i>=0;i--){state.muzzleFlashes[i].life-=dt;if(state.muzzleFlashes[i].life<=0)state.muzzleFlashes.splice(i,1)}for(let i=state.hitEffects.length-1;i>=0;i--){state.hitEffects[i].life-=dt;if(state.hitEffects[i].life<=0)state.hitEffects.splice(i,1)}
if(state.enemies.length&&state.waveKilled>=state.waveTotal&&p.hp>0){state.waveDelay+=dt;if(state.waveDelay>.95)nextWave()}const target=p.x*state.scale-W*.5;state.camX=clamp(target,0,Math.max(0,state.mapDrawW-W));const ground=worldToScreenY(state.mapH*.64);for(const r of state.rain){r.x+=-160*dt;r.y+=r.v*dt;if(r.y>ground+rand(-8,18)){if(Math.random()<.72)addSplash(r.x,ground+rand(-3,7));r.x=rand(-W*.15,W*1.15);r.y=rand(-100,-10);r.v=rand(760,1400)}if(r.x<-120)r.x=W+rand(0,140)}for(let i=state.splashes.length-1;i>=0;i--){state.splashes[i].life+=dt;if(state.splashes[i].life>=state.splashes[i].max)state.splashes.splice(i,1)}updateHud()}
function drawRain(){ctx.save();ctx.lineCap='round';for(const r of state.rain){ctx.strokeStyle=`rgba(165,190,210,${r.a})`;ctx.lineWidth=r.w;ctx.beginPath();ctx.moveTo(r.x,r.y);ctx.lineTo(r.x-160*.028,r.y+r.len);ctx.stroke()}ctx.restore();ctx.save();for(const s of state.splashes){const t=s.life/s.max,a=s.a*(1-t),spread=s.size*(.45+t*1.6);ctx.strokeStyle=`rgba(180,205,225,${a})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(s.x,s.y,spread,2+t*3,0,0,Math.PI*2);ctx.stroke();ctx.fillStyle=`rgba(180,205,225,${a*.85})`;ctx.beginPath();ctx.arc(s.x-spread*.55,s.y-t*7,1.1,0,Math.PI*2);ctx.arc(s.x+spread*.42,s.y-t*6,1,0,Math.PI*2);ctx.fill()}ctx.restore()}
function drawBullets(arr,enemy=false){for(const b of arr){const x=worldToScreenX(b.x),y=worldToScreenY(b.y);ctx.fillStyle=enemy?'rgba(255,80,80,.95)':'rgba(255,220,60,.95)';ctx.beginPath();ctx.arc(x,y,enemy?2.5:3,0,Math.PI*2);ctx.fill();ctx.strokeStyle=enemy?'rgba(255,50,50,.45)':'rgba(255,160,0,.5)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-b.vx*state.scale*.026,y-b.vy*state.scale*.026);ctx.stroke()}}
function drawWorldHp(obj,max,dy){const x=worldToScreenX(obj.x),y=worldToScreenY(obj.y-dy);ctx.fillStyle='rgba(30,0,0,.85)';ctx.fillRect(x-30,y,60,6);ctx.fillStyle='rgba(0,210,0,.9)';ctx.fillRect(x-30,y,60*clamp(obj.hp/max,0,1),6);ctx.strokeStyle='rgba(0,0,0,.75)';ctx.strokeRect(x-30,y,60,6)}
function drawHitEffects(){for(const h of state.hitEffects){const t=h.life/h.max,x=worldToScreenX(h.x),y=worldToScreenY(h.y);ctx.save();ctx.globalAlpha=t;ctx.strokeStyle='rgba(190,0,0,.9)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x-8,y-4);ctx.lineTo(x+8,y+5);ctx.moveTo(x+6,y-7);ctx.lineTo(x-5,y+6);ctx.stroke();ctx.restore()}}
function updateHud(){const p=state.player;const alive=state.enemies.filter(e=>!e.dead).length;waveTitle.textContent='VLNA '+state.wave;waveCount.textContent='enemy '+alive+' / '+state.waveTotal;waveFill.style.width=(state.waveTotal?clamp(state.waveKilled/state.waveTotal*100,0,100):0)+'%';hpFill.style.width=clamp(p.hp/p.maxHp*100,0,100)+'%';ammoLine.innerHTML='HP '+Math.round(p.hp)+'/'+p.maxHp+'<br>'+(p.weapon?weaponLabel(p.weaponType)+' '+p.ammo+'/'+MAG_SIZE+' • zás. '+p.mags+(isTrollAwpActive()?' • troll '+trollAwpShotsLeft()+'/2':''):'bez zbraně')+(p.reloading?' • reload':'');statusLine.textContent=''}
function drawNpcChat(e){
  if(!e.chat||!e.chat.text)return;
  const alpha=clamp(e.chat.life/.45,0,1);
  const x=worldToScreenX(e.x), y=worldToScreenY(e.y-(e.armored?210:195));
  const text=e.chat.text;
  ctx.save();
  ctx.globalAlpha=alpha;
  ctx.font='bold '+Math.max(10,12*state.scale)+'px Courier New';
  const pad=7*state.scale, tw=ctx.measureText(text).width, bw=tw+pad*2, bh=24*state.scale;
  ctx.fillStyle='rgba(245,245,245,.92)';
  ctx.strokeStyle='rgba(30,30,30,.9)';
  ctx.lineWidth=2;
  ctx.beginPath();
  const r=6*state.scale, bx=x-bw/2, by=y-bh;
  ctx.moveTo(bx+r,by);ctx.lineTo(bx+bw-r,by);ctx.quadraticCurveTo(bx+bw,by,bx+bw,by+r);ctx.lineTo(bx+bw,by+bh-r);ctx.quadraticCurveTo(bx+bw,by+bh,bx+bw-r,by+bh);ctx.lineTo(x+7*state.scale,by+bh);ctx.lineTo(x,by+bh+9*state.scale);ctx.lineTo(x-7*state.scale,by+bh);ctx.lineTo(bx+r,by+bh);ctx.quadraticCurveTo(bx,by+bh,bx,by+bh-r);ctx.lineTo(bx,by+r);ctx.quadraticCurveTo(bx,by,bx+r,by);ctx.closePath();
  ctx.fill();ctx.stroke();
  ctx.fillStyle='#111';ctx.textAlign='center';ctx.textBaseline='middle';
  ctx.fillText(text,x,by+bh*.52);
  ctx.restore();
}
function draw(){ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);if(mapImg.complete&&mapImg.naturalWidth)ctx.drawImage(mapImg,-state.camX,state.mapY,state.mapDrawW,state.mapDrawH);ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(0,0,W,H);drawGroundWeapon();state.ammoCrates.forEach(drawAmmoCrate);for(const e of state.enemies){if(e.dead)continue;const eimg=e.armored?armoredEnemyImg:(e.hasGun?enemyNoHandsImg:enemyFullImg);drawSprite(eimg,e,e.face,e.armored?172:160);if(e.hasGun)drawGun(e,false);drawBloodMark(e,e.armored?172:160);drawWorldHp(e,e.maxHp,162);drawNpcChat(e)}const pimg=state.player.weapon?playerNoHandsImg:playerFullImg;drawSprite(pimg,state.player,state.player.face,170);if(state.player.weapon)drawGun(state.player,true);drawBloodMark(state.player,170);drawWorldHp(state.player,state.player.maxHp,178);updatePlayerGifOverlay();drawBullets(state.bullets,false);drawBullets(state.enemyBullets,true);drawMuzzles();drawHitEffects();drawRain()}
function loop(now){const dt=Math.min(.033,(now-last)/1000);last=now;update(dt);draw();requestAnimationFrame(loop)}
function actionE(){
  const p=state.player;
  if(p.weapon){
    state.groundWeapons.push({type:p.weaponType||'ak47',x:clamp(p.x+(p.face<0?70:-70),playerMinX(),playerMaxX()),y:p.y,picked:false});
    p.weapon=false;p.weaponType=null;state.shooting=false;showMsg('Zbraň odhozená');return;
  }
  let best=null,bestDist=9999;
  const pool=[...state.groundWeapons]; if(state.droppedWeapon.on)pool.push(state.droppedWeapon);
  for(const w of pool){if(w.picked)continue;const d=Math.hypot(p.x-w.x,p.y-w.y);if(d<82&&d<bestDist){best=w;bestDist=d}}
  if(best){best.picked=true;if(best===state.droppedWeapon)state.droppedWeapon.on=false;p.weapon=true;p.weaponType=best.type||'ak47';p.ammo=MAG_SIZE;showMsg(weaponLabel(p.weaponType)+' sebraná');return}
  showMsg('Žádná zbraň poblíž')
}

function applySettingsUI(){
  const q=document.getElementById('qualitySel'),mv=document.getElementById('musicVol'),sv=document.getElementById('sfxVol');
  if(q)q.value=SETTINGS.quality;if(mv)mv.value=SETTINGS.musicVol;if(sv)sv.value=SETTINGS.sfxVol;
  const qlbl=document.getElementById('qualityLbl'),ml=document.getElementById('musicVolLbl'),sl=document.getElementById('sfxVolLbl');
  if(qlbl)qlbl.textContent=SETTINGS.quality==='low'?'nízká':SETTINGS.quality==='high'?'vysoká':'střední';
  if(ml)ml.textContent=SETTINGS.musicVol+'%'; if(sl)sl.textContent=SETTINGS.sfxVol+'%';
  music.volume=(Number(SETTINGS.musicVol)||0)/100*.5;
}
function openSettings(){applySettingsUI();document.getElementById('settingsModal').style.display='flex';startMusic()}
function closeSettings(){document.getElementById('settingsModal').style.display='none'}
function setQuality(v){SETTINGS.quality=v;localStorage.setItem('MADNESS_QUALITY',v);applySettingsUI();makeRain()}
function setMusicVol(v){SETTINGS.musicVol=String(v);localStorage.setItem('MADNESS_MUSIC_VOL',SETTINGS.musicVol);applySettingsUI()}
function setSfxVol(v){SETTINGS.sfxVol=String(v);localStorage.setItem('MADNESS_SFX_VOL',SETTINGS.sfxVol);applySettingsUI()}

function initPlayerCard(){
  const name=(localStorage.getItem('MADNESS_PLAYER_NAME')||'PLAYER').trim()||'PLAYER';
  if(pcNick)pcNick.textContent=name;
  if(pcAvatar&&payload?.player?.src)pcAvatar.src=payload.player.src;
}
addEventListener('resize',resize);
addEventListener('keydown',e=>{const k=e.key.toLowerCase();if(k in state.keys){state.keys[k]=1;e.preventDefault()}if(k==='r'){reload();e.preventDefault()}if(k==='e'){actionE();e.preventDefault()}startMusic()});
addEventListener('keyup',e=>{const k=e.key.toLowerCase();if(k in state.keys)state.keys[k]=0});
cv.addEventListener('mousemove',e=>{state.mouseX=e.clientX;state.mouseY=e.clientY});
cv.addEventListener('mousedown',e=>{if(e.button===0){state.shooting=true;state.shootTimer=0;startMusic();e.preventDefault()}});
addEventListener('mouseup',e=>{if(e.button===0)state.shooting=false});
addEventListener('pointerdown',startMusic,{once:true});addEventListener('touchstart',startMusic,{once:true,passive:true});
mapImg.onload=()=>{recalcMap();if(selectedWeaponFromLobby)showMsg('Zbraň z lobby: '+weaponLabel(selectedWeaponFromLobby));else showMsg('Bez zbraně - vyber ji v lobby bedně');if(!state.waveTotal)spawnWave()};initPlayerCard();resize();applySettingsUI();startMusic();setTimeout(()=>{if(!state.waveTotal)spawnWave()},350);setTimeout(flashLightning,rand(2000,5000));requestAnimationFrame(loop);
</script>
</body>
</html>
