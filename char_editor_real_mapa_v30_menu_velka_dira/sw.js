const CURRENT_CACHE='velka-dira-current';
const ASSETS=["ammo_crate.png", "armored_enemy.png", "avatars/avatar_1.png", "avatars/avatar_2.png", "avatars/avatar_3.png", "avatars/jesus_lukamer.png", "awp_hold.png", "bench_lavice.png", "blood_splat.png", "char_editor_v2.html", "char_editor_v2_real.html", "char_editor_v2_real.html.js", "hudba.mp3", "index.html", "loading.html", "lobby.html", "lobby_crate.png", "lobby_map.png", "m4_hold.png", "m60_hold.png", "mapa.png", "menu.html", "menu_bg.png", "real_mapa.html", "real_mapa.html.js", "skeleton_editor.html", "strelba3.mp3", "sw.js", "version.json"];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CURRENT_CACHE).then(cache=>cache.addAll(ASSETS.map(a=>new Request(a,{cache:'reload'}))).catch(()=>null)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});
self.addEventListener('fetch',event=>{
  const req=event.request;
  if(req.method!=='GET')return;
  event.respondWith(
    caches.match(req).then(cached=>{
      const fetchPromise=fetch(req).then(res=>{
        try{const copy=res.clone();caches.open(CURRENT_CACHE).then(cache=>cache.put(req,copy));}catch(e){}
        return res;
      }).catch(()=>cached);
      return cached||fetchPromise;
    })
  );
});
