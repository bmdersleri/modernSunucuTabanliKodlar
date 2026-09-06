// File: IliskiliKayitOlusturma.ts
// `create` içindeki `gonderiler` alanı iç içe kayıt üretir.
// Prisma önce kullanıcıyı, ardından kullanıcıya bağlı gönderiyi oluşturur.
// İlişki yabancı anahtar değeriyle otomatik biçimde kurulur.

import { prisma } from "./prisma";

async function yazarVeGonderiOlustur(): Promise<void> {
  const yazar = await prisma.user.create({
    data: {
      adSoyad: "Elif Arslan",
      epostaAdresi: "elif.arslan@example.com",
      gonderiler: {
        create: {
          baslik: "Prisma ile İlk Gün",
          icerik: "Tür güvenli veri erişimine giriş.",
          yayindaMi: true,
        },
      },
    },
    include: { gonderiler: true },
  });

  console.log(`${yazar.adSoyad}: ${yazar.gonderiler[0].baslik}`);
  // Çıktı: Elif Arslan: Prisma ile İlk Gün
}

yazarVeGonderiOlustur().finally(() => prisma.$disconnect());
