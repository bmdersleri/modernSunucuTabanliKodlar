// File: BackendIsKurali.ts
// Bu örnek backend içindeki not doğrulama kuralını gösterir.
// private alan, not kayıtlarının dışarıdan doğrudan değişmesini engeller.
// Çıktı, başarılı ve hatalı kayıt işlemlerini gösterir.

type IslemSonucu = {
  basarili: boolean;
  mesaj: string;
};

class NotYonetimServisi {
  private notKayitlari: Record<string, number> = {};

  notKaydet(ogrenciNumarasi: string, notDegeri: number): IslemSonucu {
    if (ogrenciNumarasi.trim().length === 0) {
      return { basarili: false, mesaj: "Öğrenci numarası boş bırakılamaz." };
    }

    if (notDegeri < 0 || notDegeri > 100) {
      return { basarili: false, mesaj: "Not değeri 0 ile 100 arasında olmalıdır." };
    }

    this.notKayitlari[ogrenciNumarasi] = notDegeri;

    return {
      basarili: true,
      mesaj: `${ogrenciNumarasi} numaralı öğrencinin notu kaydedildi.`
    };
  }

  notGetir(ogrenciNumarasi: string): number | undefined {
    return this.notKayitlari[ogrenciNumarasi];
  }
}

const notServisi = new NotYonetimServisi();

console.log(notServisi.notKaydet("2026001", 88).mesaj);
console.log(notServisi.notKaydet("2026002", 145).mesaj);
console.log(`Kaydedilen not: ${notServisi.notGetir("2026001")}`);

// Çıktı: 2026001 numaralı öğrencinin notu kaydedildi.
// Çıktı: Not değeri 0 ile 100 arasında olmalıdır.
// Çıktı: Kaydedilen not: 88
