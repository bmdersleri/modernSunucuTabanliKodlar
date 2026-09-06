// File: IliskiliVeriOkuma.ts
// Bu sorgu kullanıcıları yayımlanmış gönderileriyle birlikte getirir.
// `where` ilişkili kayıtlar üzerinde filtre uygulayabilir.
// `select` yalnızca ekranda ihtiyaç duyulan alanları sınırlar.

import { prisma } from "./prisma";

async function yazarlarVeYayinlariListele(): Promise<void> {
  const yazarListesi = await prisma.user.findMany({
    where: {
      gonderiler: {
        some: { yayindaMi: true },
      },
    },
    select: {
      adSoyad: true,
      gonderiler: {
        where: { yayindaMi: true },
        select: { baslik: true },
      },
    },
  });

  for (const yazar of yazarListesi) {
    console.log(`${yazar.adSoyad}: ${yazar.gonderiler.length} yayın`);
  }
  // Çıktı: Elif Arslan: 1 yayın
}

yazarlarVeYayinlariListele().finally(() => prisma.$disconnect());
