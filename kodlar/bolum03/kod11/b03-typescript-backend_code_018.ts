// File: GenericListeleme.typescript
// Generic fonksiyon dizinin eleman türünü korur.
// Fonksiyon farklı model listelerinde tekrar kullanılabilir.
// İlk eleman bulunamazsa undefined dönebilir.

function ilkKaydiGetir<T>(kayitListesi: T[]): T | undefined {
  return kayitListesi[0];
}

const kitapListesi = [{ kimlik: 1, ad: "Java Temelleri" }];
const kullaniciListesi = [{ kimlik: 9, ad: "Zeliha Demir" }];

console.log(ilkKaydiGetir(kitapListesi)?.ad);
console.log(ilkKaydiGetir(kullaniciListesi)?.ad);
// Çıktı: Java Temelleri
// Çıktı: Zeliha Demir
