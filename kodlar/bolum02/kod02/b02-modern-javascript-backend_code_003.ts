// Dosya: kullanici-verisi.ts
// Bu modül yalnızca veri modeli ve veri erişiminden sorumludur.
// readonly alanlar kayıtların istemeden değiştirilmesini önler.
// Örnek veri, gerçek projedeki veri tabanı sorgusunu temsil eder.

export interface Kullanici {
  readonly kimlik: number;
  readonly ad: string;
  readonly eposta: string;
  readonly aktifMi: boolean;
}

const kullaniciKayitlari: readonly Kullanici[] = [
  { kimlik: 1, ad: "Elif", eposta: "elif@ornek.com", aktifMi: true },
  { kimlik: 2, ad: "Meliha", eposta: "meliha@ornek.com", aktifMi: false }
];

export function kullaniciBul(kimlik: number): Kullanici | undefined {
  return kullaniciKayitlari.find((kullanici) => kullanici.kimlik === kimlik);
}
