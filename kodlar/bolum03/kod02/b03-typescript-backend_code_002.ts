// File: KitapTemelBilgisi.typescript
// Kitap stok bilgisi sayı ile temsil edilir.
// Kitap adı ve yazarı metin alanlarıdır.
// Negatif stok kontrolü işletme kuralı olarak uygulanır.

const kitapAdi: string = "Algoritmalara Giriş";
const kitapStokAdedi: number = 12;
const kitapSatistaMi: boolean = kitapStokAdedi > 0;

console.log(`${kitapAdi}: satış durumu = ${kitapSatistaMi}`);
// Çıktı: Algoritmalara Giriş: satış durumu = true
