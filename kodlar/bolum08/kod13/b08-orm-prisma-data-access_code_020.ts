// File: KullaniciServisi.ts
// Servis iş kuralına odaklanır; Prisma sorgusunu doğrudan yazmaz.
// Repository veri erişiminin nasıl yapılacağını bilir.
// Bu ayrım test edilebilirliği ve okunabilirliği artırır.

import { PrismaClient } from "@prisma/client";
import { KullaniciRepository } from "./KullaniciRepository";

const prisma = new PrismaClient();
const kullaniciRepository = new KullaniciRepository(prisma);

async function hosGeldinMesajiUret(epostaAdresi: string): Promise<void> {
  const kullanici = await kullaniciRepository.epostaIleBul(epostaAdresi);

  if (kullanici === null) {
    console.log("Kayıtlı kullanıcı bulunamadı.");
    return;
  }

  console.log(`Hoş geldiniz, ${kullanici.adSoyad}.`);
  // Çıktı: Hoş geldiniz, Zeliha Demir.
}

hosGeldinMesajiUret("ayse.demir@example.com")
  .finally(() => prisma.$disconnect());
