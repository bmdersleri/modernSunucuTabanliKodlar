// File: HttpApiSozlesmesi.ts
// Bu örnek HTTP isteği ve API yanıtı sözleşmesini tanımlar.
// Union type yalnızca izin verilen metotları kabul eder.
// Çıktı, başarılı ve hatalı API yanıtlarını gösterir.

type HttpMetodu = "GET" | "POST";
type DurumKodu = 200 | 400 | 404;

interface HttpIstegi {
  metod: HttpMetodu;
  yol: string;
  basliklar: Record<string, string>;
}

interface BasariliYanit {
  basarili: true;
  durumKodu: 200;
  veri: { ogrenciAdi: string; dersler: string[] };
}

interface HataliYanit {
  basarili: false;
  durumKodu: 400 | 404;
  hataMesaji: string;
}

type ApiYaniti = BasariliYanit | HataliYanit;

function ogrenciApiIsteginiIsle(istek: HttpIstegi): ApiYaniti {
  if (istek.metod !== "GET") {
    return {
      basarili: false,
      durumKodu: 400,
      hataMesaji: "Bu uç nokta yalnızca GET kabul eder."
    };
  }

  if (istek.yol !== "/api/ogrenciler/2026001") {
    return {
      basarili: false,
      durumKodu: 404,
      hataMesaji: "İstenen uç nokta bulunamadı."
    };
  }

  return {
    basarili: true,
    durumKodu: 200,
    veri: {
      ogrenciAdi: "Ayşe Yılmaz",
      dersler: ["Algoritmalar", "Web Programlama"]
    }
  };
}

const istekler: HttpIstegi[] = [
  { metod: "GET", yol: "/api/ogrenciler/2026001", basliklar: { Kabul: "application/json" } },
  { metod: "POST", yol: "/api/ogrenciler/2026001", basliklar: { Kabul: "application/json" } }
];

for (const istek of istekler) {
  const yanit = ogrenciApiIsteginiIsle(istek);
  console.log(JSON.stringify(yanit));
}

// Çıktı: {"basarili":true,"durumKodu":200,"veri":{...}}
// Çıktı: {"basarili":false,"durumKodu":400,"hataMesaji":"Bu uç nokta yalnızca GET kabul eder."}
