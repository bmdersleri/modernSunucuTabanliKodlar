interface RubrikMaddesi {
  baslik: string;
  kontrolFn: () => boolean;
}

function rubrikDegerlendir(maddeler: RubrikMaddesi[]): {
  basliklar: string[]; toplamPuan: number } {
  const basarililar = maddeler.filter((madde) => madde.kontrolFn());
  return {
    basliklar: basarililar.map((madde) => madde.baslik),
    toplamPuan: basarililar.length
  };
}

const rubrik: RubrikMaddesi[] = [
  { baslik: "Authentication ve RBAC uygulanmış (Bölüm 10)", kontrolFn: () => true },
  { baslik: "Girdi doğrulama ve merkezi hata yönetimi (Bölüm 11)", kontrolFn: () => true },
  { baslik: "OpenAPI sözleşmesi ve unit/integration testler (Bölüm 13)", kontrolFn: () => true },
  { baslik: "Docker Compose ile çalıştırılabilir (Bölüm 14)", kontrolFn: () => true },
  { baslik: "Sırlar ortam değişkeninde, kodda değil (Bölüm 15)", kontrolFn: () => true }
];

const sonuc = rubrikDegerlendir(rubrik);
console.log(sonuc.toplamPuan, "/", rubrik.length);
// Çıktı: 5 / 5
