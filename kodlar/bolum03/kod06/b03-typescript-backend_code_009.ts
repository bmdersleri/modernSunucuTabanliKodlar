// File: KitapSozlesmesi.ts
// Interface kitap verisinin zorunlu alanlarını açıklar.
// Her kitap nesnesi aynı veri sözleşmesine uymalıdır.
// Stok durumu hizmet katmanında hesaplanabilir.

interface Kitap {
  kimlik: number;
  ad: string;
  yazar: string;
  stokAdedi: number;
}

function stoktaMi(kitap: Kitap): boolean {
  return kitap.stokAdedi > 0;
}

const seciliKitap: Kitap = {
  kimlik: 15,
  ad: "Temiz Kod",
  yazar: "Robert C. Martin",
  stokAdedi: 6
};

console.log(stoktaMi(seciliKitap));
// Çıktı: true
