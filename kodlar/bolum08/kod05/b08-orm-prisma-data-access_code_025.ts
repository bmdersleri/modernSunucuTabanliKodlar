// File: ChapterMiniApp.typescript
// Bu mini uygulama kullanıcı ve ilişkili gönderi oluşturur.
// Repository üzerinden yayınlanmış gönderi başlıklarını getirir.
// Çalışması için schema.prisma içindeki User ve Post modelleri gerekir.

import { PrismaClient } from "@prisma/client";

class KullaniciRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async kullaniciVeGonderiOlustur(
    adSoyad: string,
    epostaAdresi: string,
    baslik: string,
  ) {
    return this.prisma.user.create({
      data: {
        adSoyad,
        epostaAdresi,
        gonderiler: {
          create: {
            baslik,
            icerik: "Mini uygulama kapsamında oluşturuldu.",
            yayindaMi: true,
          },
        },
      },
    });
  }

  async yayinlanmisBasliklariGetir(epostaAdresi: string): Promise<string[]> {
    const kullanici = await this.prisma.user.findUnique({
      where: { epostaAdresi },
      select: {
        adSoyad: true,
        gonderiler: {
          where: { yayindaMi: true },
          select: { baslik: true },
        },
      },
    });

    if (kullanici === null) {
      return [];
    }

    return kullanici.gonderiler.map((gonderi) => gonderi.baslik);
  }
}

async function anaProgram(): Promise<void> {
  const prisma = new PrismaClient();
  const kullaniciRepository = new KullaniciRepository(prisma);

  try {
    await kullaniciRepository.kullaniciVeGonderiOlustur(
      "Bahar Çelik",
      "deniz.celik@example.com",
      "Veri Erişim Katmanı",
    );

    const baslikListesi =
      await kullaniciRepository.yayinlanmisBasliklariGetir(
        "deniz.celik@example.com",
      );

    console.log("Yayınlanmış gönderiler:");
    for (const baslik of baslikListesi) {
      console.log(`- ${baslik}`);
    }

    // Çıktı: Yayınlanmış gönderiler:
    // Çıktı: - Veri Erişim Katmanı
  } finally {
    await prisma.$disconnect();
  }
}

anaProgram().catch(console.error);
