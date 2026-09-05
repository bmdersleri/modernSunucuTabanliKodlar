interface TelemetriVerisi {
  cihazId: string;
  sicaklik: number;
  nem: number;
}

interface DogrulamaSonucu {
  gecerli: boolean;
  hatalar: string[];
}

function telemetriyiDogrula(veri: TelemetriVerisi): DogrulamaSonucu {
  const hatalar: string[] = [];
  if (typeof veri.sicaklik !== "number" || veri.sicaklik < -40 || veri.sicaklik > 85) {
    hatalar.push("sicaklik aralık dışı (-40 ile 85 arası bekleniyor).");
  }
  if (typeof veri.nem !== "number" || veri.nem < 0 || veri.nem > 100) {
    hatalar.push("nem aralık dışı (0 ile 100 arası bekleniyor).");
  }
  return { gecerli: hatalar.length === 0, hatalar };
}

interface KaydedilenOlcum {
  cihazId: string;
  sicaklik: number;
  nem: number;
  sunucuZamanDamgasi: string;
}

async function olcumuKaydet(
  veri: TelemetriVerisi,
  veritabaniKaydetFn: (kayit: KaydedilenOlcum) => Promise<void>
): Promise<{ kaydedildi: boolean; hatalar: string[] }> {
  const dogrulama = telemetriyiDogrula(veri);
  if (!dogrulama.gecerli) {
    return { kaydedildi: false, hatalar: dogrulama.hatalar };
  }
  await veritabaniKaydetFn({
    ...veri,
    sunucuZamanDamgasi: new Date().toISOString()
  });
  return { kaydedildi: true, hatalar: [] };
}

const gecerliSonuc = await olcumuKaydet(
  { cihazId: "esp32-okuma-salonu-01", sicaklik: 21.5, nem: 45.2 },
  async (kayit) => console.log(`Veritabanına yazıldı: ${kayit.cihazId}`)
);
console.log(gecerliSonuc.kaydedildi);

const gecersizSonuc = await olcumuKaydet(
  { cihazId: "esp32-okuma-salonu-01", sicaklik: -999, nem: 45.2 },
  async () => console.log("Bu satır hiç çalışmamalı.")
);
console.log(gecersizSonuc.kaydedildi, gecersizSonuc.hatalar);
// Çıktı: Veritabanına yazıldı: esp32-okuma-salonu-01
// Çıktı: true
// Çıktı: false [ 'sicaklik aralık dışı (-40 ile 85 arası bekleniyor).' ]
