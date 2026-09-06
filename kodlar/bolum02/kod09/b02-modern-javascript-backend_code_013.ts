// Dosya: guvenli-hata-yonetimi.ts
// Bu örnek özel hata sınıfı ve type guard kullanır.
// Teknik ayrıntı günlükleme için ayrılabilir.
// İstemciye güvenli ve anlaşılır mesaj döndürülür.

class KaynakBulunamadiHatasi extends Error {
  constructor(public readonly kaynakAdi: string) {
    super(`${kaynakAdi} bulunamadı.`);
    this.name = "KaynakBulunamadiHatasi";
  }
}

function hataMesajiGetir(hata: unknown): string {
  if (hata instanceof KaynakBulunamadiHatasi) {
    return `${hata.kaynakAdi} için kayıt bulunamadı.`;
  }

  if (hata instanceof Error) {
    return "İşlem sırasında teknik bir sorun oluştu.";
  }

  return "Bilinmeyen bir sorun oluştu.";
}

async function raporGetir(raporKimlik: number): Promise<string> {
  if (raporKimlik !== 10) {
    throw new KaynakBulunamadiHatasi("Rapor");
  }

  return "Aylık satış raporu";
}

async function raporIsteginiIsle(): Promise<void> {
  try {
    const raporAdi = await raporGetir(8);
    console.log(`Rapor hazır: ${raporAdi}`);
  } catch (hata: unknown) {
    console.error(hataMesajiGetir(hata));
  } finally {
    console.log("İstek işleme kaynağı serbest bırakıldı.");
  }
}

raporIsteginiIsle();

// Çıktı: Rapor için kayıt bulunamadı.
// Çıktı: İstek işleme kaynağı serbest bırakıldı.
