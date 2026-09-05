// Gereksinim: "Öğrenciler bir ekipmanı belirli bir tarih aralığında rezerve edebilmeli."
// Bu cümleden çıkarılan veri modeli ve endpoint'ler:

interface Ekipman {
  id: number;
  ad: string;
  laboratuvarKodu: string;
  bakimdaMi: boolean;
}

interface Rezervasyon {
  id: number;
  ekipmanId: number;
  ogrenciId: number;
  baslangic: string; // ISO 8601 tarih
  bitis: string; // ISO 8601 tarih
  durum: "aktif" | "iptal" | "tamamlandi";
}

// Gereksinimden çıkarılan endpoint'ler:
const rezervasyonEndpointleri = [
  "POST /ekipmanlar/:ekipmanId/rezervasyonlar", // yeni rezervasyon oluştur
  "GET /ekipmanlar/:ekipmanId/rezervasyonlar", // bir ekipmanın rezervasyonlarını listele
  "DELETE /rezervasyonlar/:rezervasyonId" // rezervasyonu iptal et
];

console.log(rezervasyonEndpointleri.length);
// Çıktı: 3
