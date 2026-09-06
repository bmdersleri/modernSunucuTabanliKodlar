// File: JsonSozlesmesi.ts
// Başarı ve hata yanıtları tek bir sözleşme kullanır.
// Union type, iki olası yanıt biçimini temsil eder.
// TypeScript daraltması basarili alanıyla yapılır.

type BasariliYanit<T> = {
  basarili: true;
  veri: T;
  mesaj: string;
};

type HataliYanit = {
  basarili: false;
  hataKodu: string;
  mesaj: string;
};

type ApiYaniti<T> = BasariliYanit<T> | HataliYanit;

function ekipmanYanitiOlustur(kimlik: number): ApiYaniti<{ kimlik: number; ad: string }> {
  if (kimlik !== 1) {
    return {
      basarili: false,
      hataKodu: "EKIPMAN_BULUNAMADI",
      mesaj: "İstenen ekipman bulunamadı."
    };
  }

  return {
    basarili: true,
    veri: { kimlik: 1, ad: "Mikroskop" },
    mesaj: "Ekipman başarıyla bulundu."
  };
}

const apiYaniti = ekipmanYanitiOlustur(1);

if (apiYaniti.basarili) {
  console.log(apiYaniti.veri.ad);
} else {
  console.log(apiYaniti.hataKodu);
}
// Çıktı: Mikroskop
