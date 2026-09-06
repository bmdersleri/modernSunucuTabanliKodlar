// File: YoneticiKullanici.ts
// Kullanici temel sözleşmedir.
// YoneticiKullanici ek yetki alanını miras alır.
// Interface genişletme ortak alan tekrarını önler.

interface Kullanici {
  kimlik: number;
  ad: string;
  eposta: string;
}

interface YoneticiKullanici extends Kullanici {
  panelErisimiVarMi: boolean;
}

const yonetici: YoneticiKullanici = {
  kimlik: 7,
  ad: "Meliha Kaya",
  eposta: "selin@example.com",
  panelErisimiVarMi: true
};

console.log(yonetici.panelErisimiVarMi);
// Çıktı: true
