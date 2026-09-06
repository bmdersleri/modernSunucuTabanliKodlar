// File: asenkronMesaj.typescript
// Promise bekleyen bir işlemi temsil eder.
// await, yalnızca bu async fonksiyonun devamını bekletir.
// Çıktı: Hazırlık, diğer iş, sonra tamamlanma mesajı.

function siparisHazirla(): Promise<string> {
  return new Promise((coz) => {
    setTimeout(() => coz("Sipariş hazır."), 500);
  });
}

async function mutfagiYonet(): Promise<void> {
  console.log("Hazırlık başlatıldı.");
  const sonucMesaji = await siparisHazirla();
  console.log(sonucMesaji);
}

void mutfagiYonet();
console.log("Mutfak başka siparişleri karşılıyor.");
