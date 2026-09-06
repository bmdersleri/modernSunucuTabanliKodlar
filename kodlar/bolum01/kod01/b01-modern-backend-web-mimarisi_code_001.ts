// File: IstemciSunucuAkisi.ts
// Bu örnek basit bir istemci-sunucu iletişimini taklit eder.
// Gerçek ağ bağlantısı yerine sınıflar kullanılır.
// Çıktı, isteğin hangi aşamalardan geçtiğini gösterir.

type Istek = {
  ogrenciNumarasi: string;
};

type Yanit = {
  basarili: boolean;
  mesaj: string;
};

class OgrenciSunucusu {
  bilgiGetir(istek: Istek): Yanit {
    if (istek.ogrenciNumarasi === "2026001") {
      return { basarili: true, mesaj: "Zeliha Yılmaz bulundu." };
    }

    return { basarili: false, mesaj: "Öğrenci kaydı bulunamadı." };
  }
}

class TarayiciIstemcisi {
  constructor(private sunucu: OgrenciSunucusu) {}

  ogrenciBilgisiIste(ogrenciNumarasi: string): void {
    const istek: Istek = { ogrenciNumarasi };
    const yanit = this.sunucu.bilgiGetir(istek);

    if (yanit.basarili) {
      console.log(`Başarılı yanıt: ${yanit.mesaj}`);
    } else {
      console.log(`Hata yanıtı: ${yanit.mesaj}`);
    }
  }
}

const sunucu = new OgrenciSunucusu();
const istemci = new TarayiciIstemcisi(sunucu);

istemci.ogrenciBilgisiIste("2026001");
istemci.ogrenciBilgisiIste("2026999");

// Çıktı: Başarılı yanıt: Zeliha Yılmaz bulundu.
// Çıktı: Hata yanıtı: Öğrenci kaydı bulunamadı.
