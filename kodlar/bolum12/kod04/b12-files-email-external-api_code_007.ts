// Dosya: HariciApiCagrisi.typescript
// AbortController, belirlenen sürede yanıt gelmezse isteği iptal eder.
// Gerçek projede taban URL ve API anahtarı ortam değişkeninden okunmalıdır.
// Çıktı, zaman aşımına uğrayan bir isteğin anlamlı bir hatayla sonuçlandığını gösterir.

interface KitapBilgisiYaniti {
  isbn: string;
  baslik: string;
  yazar: string;
}

class HariciServisHatasi extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HariciServisHatasi";
  }
}

async function kitapBilgisiGetir(isbn: string,
  zamanAsimiMs = 3000): Promise<KitapBilgisiYaniti> {
  const controller = new AbortController();
  const zamanlayici = setTimeout(() => controller.abort(), zamanAsimiMs);

  try {
    const yanit = await fetch(`https://kitap-bilgi-servisi.example.com/isbn/${isbn}`, {
      signal: controller.signal
    });

    if (!yanit.ok) {
      throw new HariciServisHatasi(`Harici servis ${yanit.status} durum kodu döndürdü.`);
    }

    return (await yanit.json()) as KitapBilgisiYaniti;
  } catch (hata) {
    if (hata instanceof Error && hata.name === "AbortError") {
      throw new HariciServisHatasi(
        `Harici servis ${zamanAsimiMs} ms içinde yanıt vermedi.`);
    }
    throw hata;
  } finally {
    clearTimeout(zamanlayici);
  }
}

try {
  await kitapBilgisiGetir("978-0-13-468599-1", 1);
} catch (hata) {
  console.log((hata as Error).message);
}
// Çıktı: Harici servis 1 ms içinde yanıt vermedi.
