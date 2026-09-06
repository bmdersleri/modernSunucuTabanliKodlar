// File: MigrationSonrasi.ts
// Bu örnek migration ile eklenen alanı kullanır.
// Alan isteğe bağlı olduğu için değer gönderilmeden de kayıt yapılabilir.
// Prisma Client yeni şemaya göre tür üretmiştir.

import { prisma } from "./prisma";

async function telefonluKullaniciOlustur(): Promise<void> {
  const kullanici = await prisma.user.create({
    data: {
      adSoyad: "İsmail Kaya",
      epostaAdresi: "mehmet.kaya@example.com",
      telefonNumarasi: "0532 000 00 00",
    },
  });

  console.log(`${kullanici.adSoyad}: ${kullanici.telefonNumarasi}`);
  // Çıktı: İsmail Kaya: 0532 000 00 00
}

telefonluKullaniciOlustur().finally(() => prisma.$disconnect());
