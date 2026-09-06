class AppError extends Error {
  constructor(public readonly durumKodu: number, message: string) {
    super(message);
  }
}

interface Rezervasyon {
  id: number;
  ekipmanId: number;
  ogrenciId: number;
  baslangic: string;
  bitis: string;
  durum: "aktif" | "iptal" | "tamamlandi";
}

interface RezervasyonRepository {
  ekipmaninAktifRezervasyonlariniBul(ekipmanId: number): Promise<Rezervasyon[]>;
  kaydet(rezervasyon: Omit<Rezervasyon, "id">): Promise<Rezervasyon>;
}

function tarihAraliklariCakisiyorMu(baslangic1: string, bitis1: string,
  baslangic2: string, bitis2: string): boolean {
  return baslangic1 < bitis2 && baslangic2 < bitis1;
}

// --- Servis katmanı: iş kuralı burada yaşar (bkz. b09 katmanlı mimari) ---
async function rezervasyonOlustur(
  ekipmanId: number,
  ogrenciId: number,
  baslangic: string,
  bitis: string,
  repository: RezervasyonRepository
): Promise<Rezervasyon> {
  if (baslangic >= bitis) {
    throw new AppError(400, "Başlangıç tarihi bitiş tarihinden önce olmalıdır.");
  }
  const mevcutRezervasyonlar = await repository.ekipmaninAktifRezervasyonlariniBul(ekipmanId);
  const cakisan = mevcutRezervasyonlar.find((r) =>
    tarihAraliklariCakisiyorMu(baslangic, bitis, r.baslangic, r.bitis)
  );
  if (cakisan) {
    throw new AppError(409, "Bu ekipman seçilen tarih aralığında zaten rezerve edilmiş.");
  }
  return repository.kaydet({ ekipmanId, ogrenciId, baslangic, bitis, durum: "aktif" });
}

// --- Bellek içi test repository'si (bkz. b13 test veritabanı ilkesi) ---
class BellekIciRezervasyonRepository implements RezervasyonRepository {
  private rezervasyonlar: Rezervasyon[] = [];
  private sonrakiId = 1;

  async ekipmaninAktifRezervasyonlariniBul(ekipmanId: number): Promise<Rezervasyon[]> {
    return this.rezervasyonlar.filter((r) => r.ekipmanId === ekipmanId
      && r.durum === "aktif");
  }

  async kaydet(rezervasyon: Omit<Rezervasyon, "id">): Promise<Rezervasyon> {
    const yeni = { ...rezervasyon, id: this.sonrakiId++ };
    this.rezervasyonlar.push(yeni);
    return yeni;
  }
}

async function rezervasyonOrneklerini(): Promise<void> {
  const repository = new BellekIciRezervasyonRepository();
  const ilkRezervasyon = await rezervasyonOlustur(1, 10, "2026-09-10", "2026-09-12",
    repository);
  console.log(ilkRezervasyon.durum);

  try {
    await rezervasyonOlustur(1, 11, "2026-09-11", "2026-09-13", repository);
  } catch (hata) {
    console.log((hata as AppError).durumKodu, (hata as AppError).message);
  }
}

void rezervasyonOrneklerini();
// Çıktı: aktif
// Çıktı: 409 Bu ekipman seçilen tarih aralığında zaten rezerve edilmiş.
