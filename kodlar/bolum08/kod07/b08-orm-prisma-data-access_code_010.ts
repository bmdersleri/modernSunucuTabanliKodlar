// File: KullaniciCrud.typescript
// Bu örnek CRUD işlemlerinin temel sırasını gösterir.
// `select` yalnızca gerekli alanları getirerek veri yükünü azaltır.
// Her işlem Prisma schema tarafından üretilen türlere göre denetlenir.

import { prisma } from "./prisma";

async function kullaniciCrudOrnegi(): Promise<void> {
  const yeniKullanici = await prisma.user.create({
    data: {
      adSoyad: "Zeynep Akın",
      epostaAdresi: "zeynep.akin@example.com",
    },
  });

  const kullaniciListesi = await prisma.user.findMany({
    select: { id: true, adSoyad: true, epostaAdresi: true },
  });

  const guncellenenKullanici = await prisma.user.update({
    where: { id: yeniKullanici.id },
    data: { adSoyad: "Zeynep Akın Yılmaz" },
  });

  await prisma.user.delete({
    where: { id: yeniKullanici.id },
  });

  console.log(kullaniciListesi.length);
  console.log(guncellenenKullanici.adSoyad);
  // Çıktı: 1
  // Çıktı: Zeynep Akın Yılmaz
}

kullaniciCrudOrnegi().finally(() => prisma.$disconnect());
