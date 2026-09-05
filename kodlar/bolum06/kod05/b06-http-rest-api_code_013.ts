// Rezervasyon modülü endpoint tablosu: belge ile kod aynı listeyi vermelidir.
type UcNokta = {
  metot: "GET" | "POST" | "PATCH" | "DELETE";
  yol: string;
  basari: number;
};

const rezervasyonUclari: UcNokta[] = [
  { metot: "GET", yol: "/api/rezervasyonlar", basari: 200 },
  { metot: "GET", yol: "/api/rezervasyonlar/7", basari: 200 },
  { metot: "POST", yol: "/api/rezervasyonlar", basari: 201 },
  { metot: "PATCH", yol: "/api/rezervasyonlar/7", basari: 200 },
  { metot: "DELETE", yol: "/api/rezervasyonlar/7", basari: 204 },
  { metot: "GET", yol: "/api/ekipmanlar?durum=musait", basari: 200 },
];

for (const uc of rezervasyonUclari) {
  console.log(`${uc.metot} ${uc.yol} -> ${uc.basari}`);
}
console.log(`Toplam endpoint: ${rezervasyonUclari.length}`);
