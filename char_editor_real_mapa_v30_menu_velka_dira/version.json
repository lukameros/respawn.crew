self.addEventListener('install',event=>{event.waitUntil(self.skipWaiting())});
self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.filter(k=>String(k).indexOf('velka-dira')===0).map(k=>caches.delete(k)));
    }catch(e){}
    try{await self.registration.unregister()}catch(e){}
    await self.clients.claim();
  })());
});
