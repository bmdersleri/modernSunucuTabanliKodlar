interface OneriYaniti {
  onerilenKitapKodlari: string[];
  guvenSkoru: number;
}

interface OneriKarari {
  gosterilsinMi: boolean;
  neden: string;
}

const MINIMUM_GUVEN_SKORU = 0.5;

function oneriKarariVer(yanit: OneriYaniti): OneriKarari {
  if (yanit.onerilenKitapKodlari.length === 0) {
    return { gosterilsinMi: false, neden: "Boş öneri listesi." };
  }
  if (yanit.guvenSkoru < MINIMUM_GUVEN_SKORU) {
    return { gosterilsinMi: false, neden: `Düşük güven skoru: ${yanit.guvenSkoru}` };
  }
  return { gosterilsinMi: true, neden: "Kabul edilebilir güven skoru." };
}

function oneriKarariniLogla(ogrenciId: number, karar: OneriKarari,
  guvenSkoru: number): void {
  console.log(
    `[oneri] ogrenci=${ogrenciId} gosterildi=${karar.gosterilsinMi} guvenSkoru=${guvenSkoru}`);
}

const yuksekGuvenYanit: OneriYaniti = { onerilenKitapKodlari: ["JAVA-101"],
  guvenSkoru: 0.82 };
const dusukGuvenYanit: OneriYaniti = { onerilenKitapKodlari: ["JAVA-101"],
  guvenSkoru: 0.31 };

const karar1 = oneriKarariVer(yuksekGuvenYanit);
oneriKarariniLogla(1, karar1, yuksekGuvenYanit.guvenSkoru);
console.log(karar1.gosterilsinMi);

const karar2 = oneriKarariVer(dusukGuvenYanit);
oneriKarariniLogla(1, karar2, dusukGuvenYanit.guvenSkoru);
console.log(karar2.gosterilsinMi);
// Çıktı: [oneri] ogrenci=1 gosterildi=true guvenSkoru=0.82
// Çıktı: true
// Çıktı: [oneri] ogrenci=1 gosterildi=false guvenSkoru=0.31
// Çıktı: false
