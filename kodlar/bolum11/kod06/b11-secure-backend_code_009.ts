// Dosya: RateLimiter.typescript
// Bellek içi sabit pencere (fixed window) rate limiter.
// Gerçek projede çoklu sunucu örneği varsa paylaşımlı bir depo (Redis) kullanılmalıdır.
// Çıktı, sınır aşıldığında isteklerin reddedildiğini gösterir.

interface PencereKaydi {
  sayac: number;
  pencereBaslangici: number;
}

class SabitPencereRateLimiter {
  private kayitlar = new Map<string, PencereKaydi>();

  constructor(
    private readonly maksimumIstek: number,
    private readonly pencereMs: number
  ) {}

  istegeIzinVer(anahtar: string, simdi: number = Date.now()): boolean {
    const kayit = this.kayitlar.get(anahtar);

    if (!kayit || simdi - kayit.pencereBaslangici >= this.pencereMs) {
      this.kayitlar.set(anahtar, { sayac: 1, pencereBaslangici: simdi });
      return true;
    }

    if (kayit.sayac >= this.maksimumIstek) {
      return false;
    }

    kayit.sayac += 1;
    return true;
  }
}

const loginLimiter = new SabitPencereRateLimiter(3, 60_000);
const ipAdresi = "203.0.113.10";
const baslangic = Date.now();

for (let deneme = 1; deneme <= 5; deneme++) {
  const izinVerildi = loginLimiter.istegeIzinVer(ipAdresi, baslangic);
  console.log(`Deneme ${deneme}: ${izinVerildi ? "kabul edildi" : "429 Too Many Requests"}`);
}
// Çıktı: Deneme 1: kabul edildi
// Çıktı: Deneme 2: kabul edildi
// Çıktı: Deneme 3: kabul edildi
// Çıktı: Deneme 4: 429 Too Many Requests
// Çıktı: Deneme 5: 429 Too Many Requests
