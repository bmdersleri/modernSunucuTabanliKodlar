// File: PrismaBaslangic.typescript
// Bu örnek Prisma Client ile kullanıcı kaydı oluşturur.
// Ardından tüm kullanıcıları veritabanından okur.
// Program tamamlandığında bağlantı güvenli biçimde kapatılır.

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function anaProgram(): Promise<void> {
  const yeniKullanici = await prisma.user.create({
    data: {
      adSoyad: "Ayşe Demir",
      epostaAdresi: "ayse.demir@example.com",
    },
  });

  const kullaniciListesi = await prisma.user.findMany({
    orderBy: { id: "asc" },
  });

  console.log("Eklenen kullanıcı:", yeniKullanici.adSoyad);
  console.log("Kullanıcı sayısı:", kullaniciListesi.length);
  // Çıktı: Eklenen kullanıcı: Ayşe Demir
  // Çıktı: Kullanıcı sayısı: 1
}

anaProgram()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
