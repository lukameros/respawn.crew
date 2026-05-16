MADNESS RAIN v7

Start: otevři index.html nebo menu.html.

Nové soubory:
- menu.html = hlavní menu
- lobby.html = lobby s deštěm, bouřkou, bednou a výběrem mapy
- lobby_map.png = mapa lobby
- real_mapa.html = bojová mapa

Postup:
1) V editoru slož postavu a enemy.
2) Klikni na 🏠 LOBBY, nebo otevři menu.html -> HRÁT HRU.
3) V lobby klikni na bednu a vyber zbraň.
4) Klikni na lavici/mapy a spusť REAL MAPU.

Zvuky:
- hudba.mp3
- strelba3.mp3

Upraveno ve v7:
- větší rozptyl zbraní
- AWP má pomalejší kadenci
- pevnější kolize hráče na chodníku
- hráč nejde mimo mapu
- odstraněné náhodné zbraně po mapě
- bedny s municí jsou menší a náhodně pootočené
- zbraň se vybírá v lobby a přenese se do real_mapa.html


V8: lobby mapa je roztazena na celou sirku a dest dopada jen na strechu/strop, ne na podlahu.


v9 změny:
- lobby má vloženou PNG lavici a posunutou bednu pro výběr zbraně
- zbraň se vybírá v lobby a přenáší se do mapy přes localStorage
- editor už nemá tlačítko ZKUSIT a zbraně nejsou jako běžné vrstvy postavy
- real mapa má přísnější kolizi chodníku, větší rozptyl zbraní a pomalejší AWP
- menu má SERVER LIST + vytvoření/join lobby jako lokální základ; pro skutečný online server list je potřeba backend/databáze

v11:
- Obrněnec má výrazně víc HP.
- Obrněnec redukuje damage podle typu zbraně.
- Krvavé zásahy se můžou vrstvit vícekrát na tělo/hlavu.

v12:
- Postava v real mapě posunutá níž na chodník.
- Krvavé stopy jsou menší.
- Bedny s municí v real mapě zvětšené o cca 30 %.
- V lobby lavice posunutá doleva.
- Bedna v lobby zvětšená.

v13:
- Hudba má základní hlasitost sníženou o 50 %.
- Střelba/SFX má základní hlasitost sníženou o 20 %.
- Přidané ozubené kolečko nastavení do menu, lobby, real mapy a editoru.
- Nastavení umí grafiku, hudbu a SFX; ukládá se do localStorage.
- Postava v real mapě posunutá ještě níž.
- Postava v lobby posunutá výrazně níž.
- Lavice v lobby odstraněná; kliká se na mapový panel Start.
- Bedna v lobby je větší a osazená níž na zem.

v14:
- Lobby bedna kompletně odstraněná.
- Výběr zbraně se otevírá klikem na dveře ARMORY.
- Press Start/panel dál otevírá výběr mapy.
- Opravená chyba lobby.html: SETTINGS is not defined.
- Hlasitost a grafika dál používají localStorage nastavení.

v15:
- Postava v lobby posunutá výrazně dolů na zem.
- V lobby je zamknutý pohyb jen vodorovně po zemi.
- Odstraněné popisky ZBRANĚ a MAPY nad klikacími zónami.
- Klikací funkce oken zůstávají: ARMORY dveře otevřou zbraně, Start panel otevře výběr mapy.

v16:
- NPC při spawnu občas zobrazí chat bublinu s náhodnou hláškou.
- Vpravo dole přidaný hráčský panel: SQUAD: ???, nick a avatar.
- Nick se bere z MADNESS_PLAYER_NAME v localStorage, jinak PLAYER.

v17:
- V lobby vpravo nahoře přidané MONEY + xxxx.
- Money se ukládá do localStorage jako MADNESS_MONEY, základ 5000.
- V menu přidané pole ZADEJTE NICK, ukládá se jako MADNESS_PLAYER_NAME.
- Zbraně v ARMORY stojí money: AK 750, M4 1400, AWP 3000, M60 3600.
- Koupené zbraně se ukládají do MADNESS_OWNED_WEAPONS.

v18:
- Základní money snížené z 5000 na 2500.
- Money se získávají každou 5. dokončenou vlnu.
- Odměna za vlnu je menší: 300 + vlna × 45, aby hráč neměl hned všechno.
- ARMORY má kategorie ZBRANĚ a CLOTHS.
- CLOTHS je zatím prázdná kategorie.

v19:
- Do lobby přidaný friendly AI NPC.
- NPC občas chodí sem tam, ale ne pořád.
- NPC občas zobrazí chat bublinu s náhodnou blbou hláškou.
- NPC používá uložený sprite hráče bez zbraně.

v20:
- Friendly NPC v lobby se občas zeptá otázkou.
- Jen když má NPC aktivní otázku, můžeš na něj kliknout a odpovědět.
- 85 % jeho otázek jsou troll otázky; odpověď na troll otázku dá automaticky AWP zdarma.
- AWP v real mapě má extrémní recoil: po výstřelu tě fyzikálně odhodí dozadu až k hraně mapy.
- Přidaná jednoduchá horizontální fyzika recoil odhozu, tření a odraz od krajů.

v21:
- Online server list přes Supabase: tabulka madness_servers.
- Lobby chat přes Supabase: tabulka madness_chat_messages, zprávy jsou vázané na aktivní server_id/lobby.
- Přidaný supabase_setup.sql pro vytvoření tabulek, RLS policy a realtime publication.
- Troll AWP z friendly NPC má jen 2 rány.
- Po 2 ranách se troll AWP odstraní z výběru i vlastněných zbraní.
- AWP recoil má složitější horizontální fyziku: akcelerace, tření, knockback, rotace, odraz od hran mapy.

v22:
- Opraveno: po připojení do cizí lobby už vidíš online hráče ve stejné lobby/serveru.
- Přidaná tabulka madness_lobby_players pro lobby presence.
- Lobby každých ~650 ms posílá svoji pozici a každých ~850 ms načítá ostatní hráče.
- Nad hráči se vykresluje nick.
- Server list teď bere počet hráčů z presence tabulky, pokud je dostupná.
- Do supabase_setup.sql přidaná tabulka, RLS policy a realtime publication pro madness_lobby_players.

v23:
- Odstraněný editor z menu. Editor zůstává v souborech jen pro vývojáře.
- Odstraněné zadávání nicku z menu.
- Když hráč nemá postavu, lobby ukáže výběr ze 3 základních postav + nick.
- Vybraná postava se uloží do MADNESS_REAL_PAYLOAD a rovnou portne hráče do lobby reloadem.
- Lobby povoluje malý pohyb nahoru/dolů přes W/S. Mise/real_mapa zůstává beze změny.
- Po odchodu hráče se presence maže přes REST keepalive a navíc se mažou stale hráči starší než 25 s.
- Přidaný společný start mise: host vybere mapu, ostatní hráči musí dát READY, poté mise startuje všem.
- Přidaná tabulka madness_lobby_missions a sloupec host_player_id v madness_servers.
- Editor teď při uložení uloží enemy jako MADNESS_CURRENT_NPC.
- Real mapa používá MADNESS_CURRENT_NPC jako aktuální NPC/enemy do misí.

v24:
- V lobby NPC po cca 2 sekundách spustí intro příběh.
- Kamera při intru opticky zaostří/zoomne na friendly NPC.
- Intro má 6 částí, trvá cca 25 sekund a jde přeskočit.
- Vedle money je LEVEL a XP bar.
- Maximum level je 10.
- Za každou 5. dokončenou vlnu dostane hráč money i XP.
- Zbraně jsou zamčené podle levelu: AK lvl 1, M4 lvl 3, AWP lvl 5, M60 lvl 8.
- Troll AWP z NPC level lock obchází, protože je to troll odměna.

v25:
- Nad friendly NPC v lobby se zobrazuje náhodné jméno.
- Kamera vpravo v lobby má hover tooltip: „Lukáš tě hlídá, neboj!“
- Přidané klikací popisky v lobby:
  - SHOP nad Armory dveře.
  - MISE nad Start panel.
  - ZEBŘÍČEK nad bednu; klik otevře zebříček slávy.
  - ACHIEVEMENTY nad klimatizaci; klik otevře achievementy.
- Přidané počítání killů, slávy, levelů, misí a nejlepší vlny.
- Přidaný online leaderboard přes Supabase tabulku madness_player_stats.
- Přidané funkční achievementy odvozené z killů, misí, levelu, money, slávy a vlny.
- Real mapa zapisuje killy, mise, nejlepší vlnu a synchronizuje statistiky do Supabase.

v26:
- Opravené ozubené kolečko v menu: už nepřebírá velké menu button styly.
- Zvětšený hráčský panel SQUAD / nick / avatar.
- Hráčský panel přidaný i do lobby.
- Do ZIPu přidaný kompletní SQL reset soubor: SUPABASE_SQL_RESET_FULL_v26.sql.
- Soubor supabase_setup.sql je nyní stejný kompletní reset/setup, aby se tabulky a policy nehádaly.

v27:
- Do pravé zbraňové stěny přidaný nápis SQUAD.
- Klik na SQUAD otevře okno squad.
- Ve squad okně jde vytvořit/přejmenovat squad.
- Aktuální squad se ukazuje vpravo dole v hráčském panelu.
- Squad se posílá i do lobby presence, takže ho uvidí ostatní hráči.
- V okně squad jde pozvat hráče, kteří jsou aktuálně ve stejné lobby.
- Pozvánka se zapíše do Supabase tabulky madness_squad_invites a pošle i zprávu do chatu.
- Na pravý pracovní stůl přidaný nápis HELP.
- Klik na HELP otevře okno: „Pracujeme na tom :-)“.
- Přidaný kompletní SQL reset v27 v souboru SUPABASE_SQL_RESET_FULL_v27.sql.

v28:
- Opravená chyba: Cannot access 'FRIEND_NAMES' before initialization.
- Friendly NPC jméno se nastavuje až po inicializaci seznamu jmen.
- Přidané vlastní herní okno HLÁŠENÍ místo browser alertů / „stránka hlásí“.
- Custom hlášení přidané do lobby, menu, real mapy i editorů.
- Tracking Prevention u jsDelivr je jen warning pro file:// / CDN; pro online Supabase test použij lokální server nebo hosting.

v29:
- Achievementy dávají money odměny; odměna se vybere jen jednou.
- Pokud jsi ve squadu, dostáváš +25 % money a +25 % XP za každou 5. vlnu.
- Přidané tlačítko LEAVNOUT SQUAD.
- Název squadu se ukazuje vedle nicku nad postavou: (SQUAD) nick.
- Ready jde zrušit tlačítkem ZRUŠIT READY.
- Po ready všech hráčů běží 5s odpočet.
- Odpočet říká friendly NPC v bublině nad hlavou.
- Pokud hráč nemá postavu, automaticky dostane default postavu.
- Online pozice hráčů v lobby se synchronizuje rychleji a kreslí se plynuleji přes interpolaci.
- Editor ukládá vytvořenou postavu/NPC globálně do Supabase tabulky madness_global_payloads.
- Noví hráči s default postavou si stáhnou globální postavu z editoru, pokud existuje.
- Přidaný kompletní SQL reset v29 v souboru SUPABASE_SQL_RESET_FULL_v29.sql.

v30:
- Hlavní menu přejmenované na Velká díra 1.
- Do hlavního menu přidané nové pozadí menu_bg.png z dodaného obrázku.
- Odstraněné INFO tlačítko a popisek o vytvoření postavy/editoru.
- Vpravo dole přidané badge: 2026, NO QUALITY, CREATED BY LUKAMER, PROTECTED BY LUKCHEAT.

v31:
- Hra si automaticky vezme nick z hlavního indexu:
  - URL ?nick=
  - localStorage squad_session
  - localStorage RESPAWN_NICK
  - localStorage MADNESS_PLAYER_NAME
- Main index při spuštění GOPNIK uloží nick do MADNESS_PLAYER_NAME i RESPAWN_NICK.
- GOPNIK link vede na dira/menu.html?nick=...
- Pokud se nenačte postava z editoru, lobby zobrazí hlášku, že běží default postava.
- Důvod default postavy: editor ještě neuložil globální payload do Supabase, nebo hra běží přes file:///CDN blokuje Supabase.

v32:
- Editor má nové tlačítko 💾 ULOŽIT GLOBAL ONLINE.
- Save v editoru teď ukládá správnou strukturu payloadu: player:{src}, enemy:{src}.
- Globální online save zapisuje do Supabase:
  - madness_global_payloads / global_character
  - madness_global_payloads / global_npc
- Lobby a real mapa umí číst starý payload string i nový payload {src}.
- Když hráč nemá hotovou vlastní postavu, použije default a potom si stáhne globální postavu z editoru.
- Zatím je zapojený jeden globální starter/charakter pro všechny hráče, dokud nedoděláš další 2.
- Open Lobby / Real mapa z editoru taky uloží globálně online, pokud Supabase běží.

v33:
- Klik na avatar vpravo dole otevře výběr avataru.
- Zatím jsou 3 avatary; mění se jen profilový obrázek, ne herní postava.
- Nad postavou je nový label: LVLx(SQUAD)nick.
- Pod labelem je HP bar.
- Max HP roste s levelem: 100 + 28 HP za každý level nad 1.
- Squad přidává +5 % max HP.
- Real mapa používá levelové HP a squad +5 % HP bonus.
- Lobby presence posílá i level, takže ostatní vidí level v labelu.
- Editor se pokusí automaticky načíst nožní GIF z ezgif.com-animated-gif-maker.gif.
- Do menu vlevo dole přidané Update 0.1 okno.
- SQL reset v33 přidává level sloupec do madness_lobby_players.

v34:
- Do zebříčku slávy přidané progres badge vedle nicku.
- Badge podle postupu: ROOKIE, BRONZE, SILVER, GOLD, EPIC, EPIC+, LEGEND, DEV.
- Zebříček má nové řádkování, zvýrazněné statistiky a lepší čitelnost.
- Vylepšený lobby HUD, money/level box, player card, chat, modaly a armory karty.
- Vylepšený HUD v real mapě: wave bar, HP bar, ammo box a LVL/HP info.
- Menu lehce vizuálně dopolírované.
