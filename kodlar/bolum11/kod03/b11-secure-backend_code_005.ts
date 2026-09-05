// Dosya: MerkeziHataYonetimi.typescript
// AppError, service katmanının bilinçli olarak fırlattığı, HTTP durum kodu taşıyan hatadır.
// Beklenmeyen hatalar (programlama hatası) ayrı işlenerek yığın izi istemciye sızdırılmaz.
// Çıktı, beklenen ve beklenmeyen hatanın farklı biçimde ele alındığını gösterir.

class AppError extends Error {
  constructor(public readonly durumKodu: number, message: string) {
    super(message);
    this.name = "AppError";
  }
}

interface HataYaniti {
  durumKodu: number;
  mesaj: string;
}

function merkeziHataIsleyici(hata: unknown): HataYaniti {
  if (hata instanceof AppError) {
    return { durumKodu: hata.durumKodu, mesaj: hata.message };
  }

  // Beklenmeyen hata: ayrıntı istemciye gösterilmez, sunucu tarafında loglanmalıdır.
  console.error("Beklenmeyen hata:", hata);
  return { durumKodu: 500, mesaj: "Sunucuda beklenmeyen bir hata oluştu." };
}

function kitapBul(kitapKodu: string): string {
  if (kitapKodu.trim() === "") {
    throw new AppError(400, "Kitap kodu boş olamaz.");
  }
  if (kitapKodu === "SILINMIS") {
    throw new TypeError("Beklenmeyen dahili hata: kayıt bulunamadı ama fonksiyon çağrıldı.");
  }
  return `${kitapKodu} bulundu.`;
}

try {
  kitapBul("");
} catch (hata) {
  console.log(merkeziHataIsleyici(hata));
}

try {
  kitapBul("SILINMIS");
} catch (hata) {
  console.log(merkeziHataIsleyici(hata));
}
// Çıktı: { durumKodu: 400, mesaj: 'Kitap kodu boş olamaz.' }
// Çıktı: { durumKodu: 500, mesaj: 'Sunucuda beklenmeyen bir hata oluştu.' }
