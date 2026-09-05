// File: TersVekilYonlendirme.ts
// Bu örnek reverse proxy'nin yol bilgisine göre karar vermesini gösterir.
// Record türü, API yollarını backend servislerine bağlar.
// Çıktı, yönlendirme ve hata senaryolarını gösterir.

type ProxyYaniti = {
  durumKodu: number;
  hedef: string;
  mesaj: string;
};

class TersVekilSunucusu {
  private apiRotalari: Record<string, string> = {
    "/api/ogrenciler": "ogrenci-servisi",
    "/api/dersler": "ders-servisi"
  };

  istekYonlendir(yol: string, kimlikDogrulandiMi: boolean): ProxyYaniti {
    if (yol.startsWith("/api/") && !kimlikDogrulandiMi) {
      return {
        durumKodu: 401,
        hedef: "kimlik-denetimi",
        mesaj: "API erişimi için kimlik doğrulaması gerekir."
      };
    }

    if (this.apiRotalari[yol]) {
      return {
        durumKodu: 200,
        hedef: this.apiRotalari[yol],
        mesaj: "İstek backend servisine yönlendirildi."
      };
    }

    if (yol === "/" || yol.startsWith("/assets/")) {
      return {
        durumKodu: 200,
        hedef: "statik-icerik-sunucusu",
        mesaj: "İstek statik içeriğe yönlendirildi."
      };
    }

    return {
      durumKodu: 404,
      hedef: "hata-sayfasi",
      mesaj: "İstenen kaynak bulunamadı."
    };
  }
}

const tersVekil = new TersVekilSunucusu();

console.log(tersVekil.istekYonlendir("/api/ogrenciler", true));
console.log(tersVekil.istekYonlendir("/api/dersler", false));
console.log(tersVekil.istekYonlendir("/assets/logo.svg", false));

// Çıktı: { durumKodu: 200, hedef: 'ogrenci-servisi', ... }
// Çıktı: { durumKodu: 401, hedef: 'kimlik-denetimi', ... }
// Çıktı: { durumKodu: 200, hedef: 'statik-icerik-sunucusu', ... }
