// File: eventLoopSirasi.ts
// Önce senkron satırlar çalışır.
// setTimeout callback'i daha sonra kuyruğa gelir.
// Çıktı: Başlangıç, Bitiş, ardından Zamanlayıcı tamamlandı.

console.log("1. Sipariş alınmaya başlandı.");

setTimeout(() => {
  console.log("3. Zamanlayıcı tamamlandı.");
}, 1000);

console.log("2. Başka sipariş işleniyor.");
