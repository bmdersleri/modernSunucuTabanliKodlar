// File: CrudIslemleri.ts
// Bu örnek bellek içindeki ekipman listesini yönetir.
// Her fonksiyon farklı bir CRUD işlemini temsil eder.
// Örnek, gerçek HTTP sunucusundan bağımsız çalışır.

interface Ekipman {
  kimlik: number;
  ad: string;
  durum: "musait" | "rezerve";
}

let ekipmanListesi: Ekipman[] = [
  { kimlik: 1, ad: "Mikroskop", durum: "musait" }
];

function ekipmanOlustur(ad: string): Ekipman {
  const yeniEkipman = { kimlik: 2, ad, durum: "musait" as const };
  ekipmanListesi.push(yeniEkipman);
  return yeniEkipman;
}

function ekipmanGetir(kimlik: number): Ekipman | undefined {
  return ekipmanListesi.find((ekipman) => ekipman.kimlik === kimlik);
}

function ekipmanGuncelle(kimlik: number, yeniDurum: Ekipman["durum"]): Ekipman | undefined {
  const ekipman = ekipmanGetir(kimlik);
  if (ekipman) ekipman.durum = yeniDurum;
  return ekipman;
}

function ekipmanSil(kimlik: number): boolean {
  const oncekiUzunluk = ekipmanListesi.length;
  ekipmanListesi = ekipmanListesi.filter((ekipman) => ekipman.kimlik !== kimlik);
  return ekipmanListesi.length < oncekiUzunluk;
}

console.log(ekipmanOlustur("Spektrometre"));
console.log(ekipmanGuncelle(1, "rezerve"));
console.log(ekipmanSil(2));
// Çıktı: { kimlik: 2, ad: 'Spektrometre', durum: 'musait' }
// Çıktı: { kimlik: 1, ad: 'Mikroskop', durum: 'rezerve' }
// Çıktı: true
