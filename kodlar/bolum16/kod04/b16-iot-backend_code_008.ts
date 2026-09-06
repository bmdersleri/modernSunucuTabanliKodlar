// File: ChapterMiniAppIotBackend.typescript
// Bu dosya, bir telemetri isteğinin uçtan uca işlenişini tek bir yerde gösterir.

interface CihazKaydi {
  cihazId: string;
  apiAnahtari: string;
  aktif: boolean;
}

class CihazDogrulamaHatasi extends Error {
  constructor(public readonly durumKodu: number, message: string) {
    super(message);
  }
}

const kayitliCihazlar: CihazKaydi[] = [
  { cihazId: "esp32-okuma-salonu-01", apiAnahtari: "anahtar-abc-123", aktif: true }
];

function cihaziDogrula(cihazId: string, sunulanAnahtar: string): CihazKaydi {
  const cihaz = kayitliCihazlar.find((c) => c.cihazId === cihazId);
  if (!cihaz || !cihaz.aktif || cihaz.apiAnahtari !== sunulanAnahtar) {
    throw new CihazDogrulamaHatasi(401, "Cihaz doğrulanamadı.");
  }
  return cihaz;
}

interface TelemetriIstegi {
  cihazId: string;
  apiAnahtari: string;
  sicaklik: number;
  nem: number;
}

interface KaydedilenOlcum {
  cihazId: string;
  sicaklik: number;
  nem: number;
  sunucuZamanDamgasi: string;
}

async function telemetriIsteginiUctanUcaIsle(
  istek: TelemetriIstegi,
  veritabaniKaydetFn: (kayit: KaydedilenOlcum) => Promise<void>
): Promise<{ durumKodu: number; mesaj: string }> {
  try {
    cihaziDogrula(istek.cihazId, istek.apiAnahtari);
  } catch (hata) {
    return { durumKodu: (hata as CihazDogrulamaHatasi).durumKodu,
      mesaj: (hata as CihazDogrulamaHatasi).message };
  }

  if (istek.sicaklik < -40 || istek.sicaklik > 85 || istek.nem < 0 || istek.nem > 100) {
    return { durumKodu: 400, mesaj: "Telemetri aralık dışı." };
  }

  await veritabaniKaydetFn({
    cihazId: istek.cihazId,
    sicaklik: istek.sicaklik,
    nem: istek.nem,
    sunucuZamanDamgasi: new Date().toISOString()
  });
  return { durumKodu: 201, mesaj: "Telemetri kaydedildi." };
}

async function telemetriOrneklerini(): Promise<void> {
  const basariliSonuc = await telemetriIsteginiUctanUcaIsle(
    { cihazId: "esp32-okuma-salonu-01", apiAnahtari: "anahtar-abc-123", sicaklik: 22.1,
      nem: 40.0 },
    async (kayit) => console.log(
      `Kaydedildi: ${kayit.cihazId} @ ${kayit.sunucuZamanDamgasi}`.slice(0, 10))
  );
  console.log(basariliSonuc.durumKodu, basariliSonuc.mesaj);

  const yanlisAnahtarSonucu = await telemetriIsteginiUctanUcaIsle(
    { cihazId: "esp32-okuma-salonu-01", apiAnahtari: "yanlis-anahtar", sicaklik: 22.1,
      nem: 40.0 },
    async () => console.log("Bu satır hiç çalışmamalı.")
  );
  console.log(yanlisAnahtarSonucu.durumKodu, yanlisAnahtarSonucu.mesaj);
}

void telemetriOrneklerini();
// Çıktı: Kaydedildi
// Çıktı: 201 Telemetri kaydedildi.
// Çıktı: 401 Cihaz doğrulanamadı.
