// File: ChapterMiniAppCapstoneLabManagement.typescript
// Bu dosya, kitap boyunca öğrenilen katmanların (RBAC, iş kuralı, tutarlı durum güncelleme)
// laboratuvar yönetim sisteminde nasıl bir araya geldiğini gösterir.

class AppError extends Error {
  constructor(public readonly durumKodu: number, message: string) {
    super(message);
  }
}

type Rol = "ogrenci" | "laboratuvar_gorevlisi";

interface Ekipman {
  id: number;
  ad: string;
  bakimdaMi: boolean;
}

interface BakimKaydi {
  ekipmanId: number;
  aciklama: string;
}

function requireRole(izinliRoller: Rol[]) {
  return (rol: Rol): void => {
    if (!izinliRoller.includes(rol)) {
      throw new AppError(403, `Bu işlem için gereken rol: ${izinliRoller.join(" veya ")}`);
    }
  };
}

const sadeceGorevliyeIzinVer = requireRole(["laboratuvar_gorevlisi"]);

class EkipmanRepository {
  private ekipmanlar: Ekipman[] = [{ id: 1, ad: "Osiloskop-01", bakimdaMi: false }];

  bul(id: number): Ekipman | undefined {
    return this.ekipmanlar.find((e) => e.id === id);
  }

  bakimDurumunuGuncelle(id: number, bakimdaMi: boolean): void {
    const ekipman = this.bul(id);
    if (ekipman) {
      ekipman.bakimdaMi = bakimdaMi;
    }
  }
}

async function bakimKaydiOlusturVeEkipmaniGuncelle(
  kayit: BakimKaydi,
  istekYapanRol: Rol,
  ekipmanRepository: EkipmanRepository
): Promise<{ mesaj: string }> {
  sadeceGorevliyeIzinVer(istekYapanRol);

  const ekipman = ekipmanRepository.bul(kayit.ekipmanId);
  if (!ekipman) {
    throw new AppError(404, "Ekipman bulunamadı.");
  }

  // İş kuralı: bakım kaydı oluşturulduğunda ekipman aynı anda bakıma alınır (tutarlı
  // güncelleme).
  ekipmanRepository.bakimDurumunuGuncelle(kayit.ekipmanId, true);

  return { mesaj: `${ekipman.ad} bakıma alındı: ${kayit.aciklama}` };
}

async function bakimOrneklerini(): Promise<void> {
  const ekipmanRepository = new EkipmanRepository();

  const basariliSonuc = await bakimKaydiOlusturVeEkipmaniGuncelle(
    { ekipmanId: 1, aciklama: "Kalibrasyon yapıldı" },
    "laboratuvar_gorevlisi",
    ekipmanRepository
  );
  console.log(basariliSonuc.mesaj);
  console.log(ekipmanRepository.bul(1)?.bakimdaMi);

  try {
    await bakimKaydiOlusturVeEkipmaniGuncelle(
      { ekipmanId: 1, aciklama: "Yetkisiz deneme" },
      "ogrenci",
      ekipmanRepository
    );
  } catch (hata) {
    console.log((hata as AppError).durumKodu, (hata as AppError).message);
  }
}

void bakimOrneklerini();
// Çıktı: Osiloskop-01 bakıma alındı: Kalibrasyon yapıldı
// Çıktı: true
// Çıktı: 403 Bu işlem için gereken rol: laboratuvar_gorevlisi
