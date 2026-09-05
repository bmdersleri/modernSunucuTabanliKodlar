// File: TipCikarimi.typescript
// TypeScript değerlerden otomatik tip çıkarır.
// Fonksiyon dönüş türü de çoğu zaman çıkarılabilir.
// Kritik parametre türleri açıkça yazılmıştır.

function kitapFiyatiniHesapla(birimFiyat: number, adet: number) {
  const araToplam = birimFiyat * adet;
  const kargoUcretsizMi = araToplam >= 500;

  return { araToplam, kargoUcretsizMi };
}

const siparisOzeti = kitapFiyatiniHesapla(125, 4);
console.log(siparisOzeti.araToplam);
// Çıktı: 500
