// Dosya: KayitValidasyonu.test.typescript
// Bu test dosyası Bölüm 11'deki kayitIstegiDogrula fonksiyonunu izole biçimde test eder.
// Gerçek projede bu dosya *.test.ts uzantısıyla ilgili kaynak dosyanın yanında tutulur.

import { describe, it, expect } from "vitest";
import { kayitIstegiDogrula } from "./validation";

describe("kayitIstegiDogrula", () => {
  it("geçerli bir kayıt isteğini kabul eder", () => {
    const sonuc = kayitIstegiDogrula({
      kullaniciAdi: "elif",
      parola: "guclu-Parola1",
      rol: "ogrenci"
    });

    expect(sonuc.gecerliMi).toBe(true);
    expect(sonuc.hatalar).toHaveLength(0);
  });

  it("kısa parolayı reddeder", () => {
    const sonuc = kayitIstegiDogrula({
      kullaniciAdi: "elif",
      parola: "123",
      rol: "ogrenci"
    });

    expect(sonuc.gecerliMi).toBe(false);
    expect(sonuc.hatalar).toContain(
      "parola en az 8 karakter uzunluğunda bir metin olmalıdır.");
  });

  it("geçersiz rolü reddeder", () => {
    const sonuc = kayitIstegiDogrula({
      kullaniciAdi: "elif",
      parola: "guclu-Parola1",
      rol: "admin"
    });

    expect(sonuc.gecerliMi).toBe(false);
  });
});
