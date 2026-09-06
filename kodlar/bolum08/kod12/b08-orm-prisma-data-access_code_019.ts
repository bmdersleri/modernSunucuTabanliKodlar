// File: KullaniciRepository.typescript
// Repository, Prisma sorgularını tek sınıfta toplar.
// Metot adları veritabanı değil uygulama niyeti üzerinden belirlenir.
// Dönüş türleri Prisma'nın ürettiği türlerden yararlanır.

import { PrismaClient, User } from "@prisma/client";

export class KullaniciRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async epostaIleBul(epostaAdresi: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { epostaAdresi },
    });
  }

  async kullaniciOlustur(
    adSoyad: string,
    epostaAdresi: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: { adSoyad, epostaAdresi },
    });
  }

  async yayinlanmisBasliklariGetir(kullaniciKimligi: number): Promise<string[]> {
    const kullanici = await this.prisma.user.findUnique({
      where: { id: kullaniciKimligi },
      select: {
        gonderiler: {
          where: { yayindaMi: true },
          select: { baslik: true },
        },
      },
    });

    return kullanici?.gonderiler.map((gonderi) => gonderi.baslik) ?? [];
  }
}
