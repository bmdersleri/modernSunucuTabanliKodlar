// File: KullaniciArama.typescript
// Bu örnek benzersiz e-posta alanıyla tek kullanıcı arar.
// Sonuç bulunamadığında Prisma `null` döndürebilir.
// Bu nedenle sonuç kullanılmadan önce kontrol edilmelidir.

import { prisma } from "./prisma";

async function epostaIleKullaniciBul(): Promise<void> {
  const bulunanKullanici = await prisma.user.findUnique({
    where: { epostaAdresi: "ayse.demir@example.com" },
  });

  if (bulunanKullanici === null) {
    console.log("Kullanıcı bulunamadı.");
    return;
  }

  console.log(`Bulunan kullanıcı: ${bulunanKullanici.adSoyad}`);
  // Çıktı: Bulunan kullanıcı: Zeliha Demir
}

epostaIleKullaniciBul().finally(() => prisma.$disconnect());
