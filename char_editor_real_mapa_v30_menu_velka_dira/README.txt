Velká díra 1

v39:
- AntiCheat: pokud hráči náhle přibude víc než 20 000 money během krátkého času, vrátí money na předchozí hodnotu a dá 1h ban.
- Účet/nick lukamer má AntiCheat vypnutý.
- Pokud je AntiCheat poškozený nebo chybí běhový token, hra se zablokuje.
- Lobby i mise kontrolují AntiCheat při startu a během herní smyčky.
- Přidaná offline fronta statistik: když hráč hraje offline, statistiky se uloží lokálně a po návratu online se nahrají.
- Online funkce offline neběží, ale hra samotná běží z cache.
- loading.html teď stahuje celou hru do Cache Storage pro offline hraní.
- Přidaný sw.js service worker.
- index.html vede na loading.html.

v40:
- Odstraněné generované/canvas profilové avatary z výběru hráče.
- Přidané 3 normální avatary pro běžné hráče.
- Přidaný speciální JESUS avatar jen pro nick lukamer.
- Pokud se běžný hráč pokusí mít JESUS avatar v localStorage, automaticky se přepne na normální avatar.
- Starter výběr dole používá nové obrázkové avatary.
- Player card v lobby i misi používá nový profilový avatar.
- Avatary jsou uložené ve složce avatars/ a přidané do offline cache.

v41:
- Přepracovaný engine mise / real_mapa směrem k rychlejšímu classic combat feelingu.
- Přidaný fixed timestep 60 FPS pro stabilnější pohyb a střelbu.
- Kamera má nově plynulé sledování místo tvrdého skoku.
- Přidaný engine screen shake a hit-stop při zásahu.
- Přidané částice zásahů a silnější odezva headshotů.
- Headshot systém: zásah do hlavy dává vyšší damage a krátký hit-stop.
- Enemy AI rozšířené na typy: melee, rusher, gunner, tank.
- Gunner enemy umí držet odstup a strafovat.
- Rusher enemy je rychlejší, tank má víc HP.
- Spawn vln je pestřejší a škáluje obtížnost plynuleji.
- Lobby smyčka taky přepnutá na fixed timestep.
- HUD v misi ukazuje ENGINE v41.

v42:
- Opraven bug v lobby: PROFILE_AVATARS is not defined.
- Postavy už nestojí jako socha: přidané idle dýchání, jemný sway, krokové houpání a živější držení zbraně.
- Živější animace jsou v lobby i v misi / real_mapa.
- Engine badge změněný na ENGINE v42 • ALIVE FLOW.
- Přidané chybějící hudba.mp3 a strelba3.mp3 jako tiché fallback soubory, aby prohlížeč neházel 404.
- Loading nově kontroluje version.json.
- Když je nová verze, porovná manifest a stahuje jen nové / změněné soubory.
- Při file:// režimu loading ukáže upozornění a nepouští cache updater, protože service worker a online věci vyžadují GitHub Pages nebo localhost.

v43:
- Loading už po načtení automaticky nepřesměruje do menu.
- Po kontrole/stáhnutí se zobrazí tlačítko HRÁT, které vede do menu.html.
- Pokud existuje nová verze, ale hráč je offline, loading spustí starou uloženou offline verzi.
- Pokud novou verzi nejde stáhnout, loading ukáže okno „Používáš starou verzi“ a dovolí hrát uloženou offline verzi.
- Update se stahuje do dočasné cache. Do hlavní cache se přepne až po úspěšném stažení, aby se nerozbila stará verze.
- Service worker už nemaže staré cache automaticky.

v44:
- Postava je ještě víc rozhýbaná: silnější idle dýchání, sway těla, krokové houpání a náklon.
- Ruce / zbraň se hýbou výrazně víc při pohybu i v idle.
- Stejné živější animace jsou v lobby i v misi.
- V misi odstraněný druhý HP bar u hráče; zůstává jen HP bar v labelu hráče + horní HUD.
- Label nad hráčem už nemá slovo LEVEL:
  - bez squadu: 1nick
  - se squadem: 1(SQUAD)nick
- Engine marker aktualizovaný na v44.
- Opravené fallback avatary/audio zůstávají zachované.

v45:
- Odstraněný žlutý hit efekt při zásahu/melee; zůstávají jen malé tmavě červené částečky.
- Ještě víc rozhýbané tělo, zbraň a ruce v lobby i misi.
- Přidaný skeleton_editor.html pro nastavení animace:
  idle dýchání, sway, krokové houpání, pohyb rukou, sway zbraně, rychlost animace.
- Editor má tlačítko 🦴 SKELET ANIMACE.
- Runtime čte MADNESS_ANIM_PRESET z localStorage a podle toho rozhýbává postavu.
- Label hráče zůstává bez slova LEVEL: 1nick nebo 1(SQUAD)nick.
- Druhý HP bar u hráče v misi odstraněný.
- Version/cache aktualizované na v45.

v46:
- skeleton_editor.html přepracovaný na ASSET ANIMACE.
- Už tam není žádný canvas/falešný panák. Preview používá skutečné uložené assety postavy/enemy z MADNESS_REAL_PAYLOAD.
- Editor animace je pouze pro nick lukamer; jiný hráč uvidí ADMIN ONLY.
- Přidané dva presety:
  - POSTAVY / ALLIES: MADNESS_ANIM_PRESET_PLAYER
  - ENEMY / NPC: MADNESS_ANIM_PRESET_ENEMY
- Presety lze uložit lokálně i online do madness_global_payloads:
  - global_anim_player
  - global_anim_enemy
- Lobby a mise si zkusí stáhnout globální animace ze Supabase a použít je pro všechny.
- Postavy/allies používají player preset, enemy/NPC používají enemy preset.
- Tlačítko v editoru přejmenované na 🎞️ ASSET ANIMACE.

v47:
- Odstraněný falešný canvas/CSS panák z animačního editoru.
- skeleton_editor.html je nyní skutečný ASSET KEYFRAME editor:
  - používá reálné vrstvy z char editoru / payload.layers a enemyLayers.
  - vybereš vrstvu assetu, například ruce/pěst/tělo/hlava.
  - nastavíš souřadnice X/Y, rotaci, scale, alpha.
  - ukládáš frame 0–3 pro akce idle, walk, útok, skok, pád.
- Editor je jen pro lukamer.
- Char editor nově ukládá layerImages do MADNESS_REAL_PAYLOAD, aby šly skutečné vrstvy animovat i mimo editor.
- Runtime umí číst online animace:
  - global_asset_anim_player
  - global_asset_anim_enemy
- Runtime se pokusí kreslit animované vrstvy assetů; pokud chybí layerImages, použije starý slepený sprite jako fallback.
- Yellow hit efekt odstraněný / přebarvený na tmavě červené minimum.
- Version/cache aktualizované na v47.
