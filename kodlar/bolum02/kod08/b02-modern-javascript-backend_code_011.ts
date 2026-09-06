// Dosya: istek-verisi-ayristirma.ts
// Bu örnek API benzeri sipariş isteğinden gerekli alanları ayırır.
// Alan yeniden adlandırma ve varsayılan değer kullanılır.
// Rest operatörü kalan alanları ayrı bir nesnede toplar.

interface SiparisIstegi {
  musteriKimlik: number;
  teslimatAdresi?: string;
  urunKodlari: string[];
  oncelik?: "normal" | "hizli";
  kampanyaKodu?: string;
}

const istekVerisi: SiparisIstegi = {
  musteriKimlik: 42,
  urunKodlari: ["KITAP-1", "KALEM-2"],
  kampanyaKodu: "GELENEKSEL"
};

const {
  musteriKimlik: kimlik,
  teslimatAdresi = "Adres daha sonra doğrulanacak",
  urunKodlari: [ilkUrun, ...digerUrunler],
  oncelik = "normal",
  ...ekAlanlar
} = istekVerisi;

console.log(`Müşteri: ${kimlik}`);
console.log(`İlk ürün: ${ilkUrun}, diğer ürün sayısı: ${digerUrunler.length}`);
console.log(`Öncelik: ${oncelik}, kampanya: ${ekAlanlar.kampanyaKodu}`);

// Çıktı: Müşteri: 42
// Çıktı: İlk ürün: KITAP-1, diğer ürün sayısı: 1
// Çıktı: Öncelik: normal, kampanya: GELENEKSEL
