// File: RestKaynaklari.typescript
// Laboratuvar alanındaki temel kaynakları temsil eder.
// Her kaynak benzersiz bir kimlik taşır.
// Çıktı, kaynak URL'lerinin nasıl kurulduğunu gösterir.

interface Ekipman {
  kimlik: number;
  ad: string;
  durum: "musait" | "rezerve";
}

const mikroskop: Ekipman = {
  kimlik: 12,
  ad: "Elektron Mikroskobu",
  durum: "musait"
};

const koleksiyonYolu = "/api/ekipmanlar";
const tekilKaynakYolu = `${koleksiyonYolu}/${mikroskop.kimlik}`;

console.log(koleksiyonYolu);
console.log(tekilKaynakYolu);
// Çıktı: /api/ekipmanlar
// Çıktı: /api/ekipmanlar/12
