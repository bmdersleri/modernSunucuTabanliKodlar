// File: Sayfalama.typescript
// Ekipmanlar filtrelenir ve istenen sayfaya ayrılır.
// Sayfa numarası birden küçük olamaz.
// Yanıt metadata ile birlikte döndürülür.

interface Ekipman {
  kimlik: number;
  ad: string;
  durum: "musait" | "rezerve";
}

const ekipmanListesi: Ekipman[] = [
  { kimlik: 1, ad: "Mikroskop", durum: "musait" },
  { kimlik: 2, ad: "Spektrometre", durum: "rezerve" },
  { kimlik: 3, ad: "Mikropipet", durum: "musait" },
  { kimlik: 4, ad: "Santrifüj", durum: "musait" }
];

function ekipmanlariSayfala(
  sayfa: number,
  sayfaBoyutu: number,
  arama: string,
  durum?: Ekipman["durum"]
) {
  const filtrelenmisListe = ekipmanListesi.filter((ekipman) => {
    const adUyuyor = ekipman.ad.toLocaleLowerCase("tr-TR")
      .includes(arama.toLocaleLowerCase("tr-TR"));
    const durumUyuyor = !durum || ekipman.durum === durum;
    return adUyuyor && durumUyuyor;
  });

  const baslangicIndeksi = (sayfa - 1) * sayfaBoyutu;
  const veri = filtrelenmisListe.slice(baslangicIndeksi, baslangicIndeksi + sayfaBoyutu);

  return {
    basarili: true,
    veri,
    metadata: {
      sayfa,
      sayfaBoyutu,
      toplamKayit: filtrelenmisListe.length,
      toplamSayfa: Math.ceil(filtrelenmisListe.length / sayfaBoyutu)
    }
  };
}

console.log(ekipmanlariSayfala(1, 2, "mikro", "musait"));
// Çıktı: veri içinde Mikroskop ve Mikropipet bulunur.
// Çıktı: toplamKayit 2'dir.
// Çıktı: toplamSayfa 1'dir.
