// File: ChapterMiniAppOpenApiTesting.typescript
// Bu dosya, gerçek bir projede birden fazla dosyaya (openapi.ts, service.ts, *.test.ts) yayılacak
// parçaları tek bir yerde, akışı göstermek amacıyla bir araya getirir.

// --- 1. OpenAPI sözleşmesi (openapi.ts) ---
const oduncAlmaPathTanimi = {
  "/kitaplar/{kitapKodu}/odunc-al": {
    post: {
      summary: "Belirtilen kitabı giriş yapmış öğrenci adına ödünç alır.",
      responses: {
        "201": { description: "Ödünç alma başarılı." },
        "400": { description: "Kitap uygun değil veya limit aşıldı." },
        "401": { description: "Kimlik doğrulanamadı." }
      }
    }
  }
};

// --- 2. Servis mantığı (service.ts) ---
interface EmailService {
  gonder(aliciEposta: string, konu: string, govde: string): Promise<boolean>;
}

class AppError extends Error {
  constructor(public readonly durumKodu: number, message: string) {
    super(message);
  }
}

interface OduncAlmaSonucu {
  mesaj: string;
}

async function oduncAl(
  kitapUygunMu: boolean,
  ogrenciMevcutOduncSayisi: number,
  ogrenciEposta: string,
  emailService: EmailService
): Promise<OduncAlmaSonucu> {
  if (!kitapUygunMu) {
    throw new AppError(400, "Kitap uygun değildir.");
  }
  if (ogrenciMevcutOduncSayisi >= 3) {
    throw new AppError(400, "Öğrenci limitine ulaştı.");
  }

  await emailService.gonder(ogrenciEposta, "Ödünç alma onaylandı", "Kitabınız başarıyla ödünç alındı.");
  return { mesaj: "Kitap başarıyla ödünç alındı." };
}

// --- 3. Unit test (service.test.ts) — mock ile izole ---
class KaydediciMockEmailService implements EmailService {
  readonly cagrilar: { aliciEposta: string; konu: string }[] = [];

  async gonder(aliciEposta: string, konu: string): Promise<boolean> {
    this.cagrilar.push({ aliciEposta, konu });
    return true;
  }
}

async function unitTestOrnegiCalistir(): Promise<void> {
  const mockEmailService = new KaydediciMockEmailService();

  const sonuc = await oduncAl(true, 1, "elif@ogrenci.mehmetakif.edu.tr", mockEmailService);
  console.log(sonuc.mesaj);
  console.log(mockEmailService.cagrilar.length);

  try {
    await oduncAl(false, 1, "elif@ogrenci.mehmetakif.edu.tr", mockEmailService);
  } catch (hata) {
    console.log((hata as AppError).durumKodu, (hata as AppError).message);
  }
}

void unitTestOrnegiCalistir();
// Çıktı: Kitap başarıyla ödünç alındı.
// Çıktı: 1
// Çıktı: 400 Kitap uygun değildir.

// --- 4. Integration test iskeleti (service.integration.test.ts) — gerçek projede ayrı dosyada ---
// describe("POST /kitaplar/:kitapKodu/odunc-al (integration)", () => {
//   beforeEach(async () => { await testVeritabaniniSifirla(); await testKitapVeOgrenciEkle(); });
//   it("uygun kitap için 201 döner", async () => {
//     const yanit = await request(app).post("/kitaplar/JAVA-101/odunc-al").set("Authorization", `Bearer ${token}`);
//     expect(yanit.status).toBe(201);
//   });
// });
