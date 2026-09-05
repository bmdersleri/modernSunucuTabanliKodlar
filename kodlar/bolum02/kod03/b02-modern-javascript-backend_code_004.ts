// Dosya: kullanici-servisi.ts
// Bu modül iş kuralını veri erişiminden ayırır.
// Kullanıcının aktifliği servis katmanında denetlenir.
// Named import yalnızca gerekli değerleri alır.

import { Kullanici, kullaniciBul } from "./kullanici-verisi.js";

export function aktifKullaniciGetir(kimlik: number): Kullanici {
  const kullanici = kullaniciBul(kimlik);

  if (!kullanici) {
    throw new Error("Kullanıcı bulunamadı.");
  }

  if (!kullanici.aktifMi) {
    throw new Error("Kullanıcı aktif değildir.");
  }

  return kullanici;
}
