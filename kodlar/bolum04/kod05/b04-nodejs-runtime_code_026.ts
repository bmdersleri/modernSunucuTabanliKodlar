// File: ChapterMiniApp.typescript
// Bu sınıf, bölüm uygulamasının yapılandırmasını ve HTTP davranışını taşır.
// Environment variable verileri doğrulanarak okunur.
// Çıktı: Sunucu adresi ve arka plan bakım mesajı terminalde görünür.

import http from "node:http";

class BolumDurumUygulamasi {
  private readonly uygulamaPortu: number;
  private readonly kitapAdi: string;

  public constructor() {
    const portMetni = process.env.PORT ?? "3000";
    const portNumarasi = Number(portMetni);

    if (!Number.isInteger(portNumarasi) || portNumarasi < 1 || portNumarasi > 65535) {
      throw new Error("PORT, 1-65535 aralığında olmalıdır.");
    }

    this.uygulamaPortu = portNumarasi;
    this.kitapAdi = process.env.KITAP_ADI ?? "Java ile Programlama";
  }

  public baslat(): void {
    const sunucu = http.createServer((istek, yanit) => {
      const istekYolu = istek.url ?? "/";

      if (istekYolu === "/") {
        this.jsonYanitGonder(yanit, 200, {
          mesaj: "Bölüm hizmeti çalışıyor.",
          kitap: this.kitapAdi,
        });
        return;
      }

      if (istekYolu === "/durum") {
        this.jsonYanitGonder(yanit, 200, {
          durum: "hazır",
          nodeSurumu: process.version,
          calismaDizini: process.cwd(),
        });
        return;
      }

      this.jsonYanitGonder(yanit, 404, {
        hata: "İstenen kaynak bulunamadı.",
      });
    });

    sunucu.listen(this.uygulamaPortu, () => {
      console.log(`Sunucu http://localhost:${this.uygulamaPortu} adresinde çalışıyor.`);
    });

    setTimeout(() => {
      console.log("Arka plan bakım denetimi tamamlandı.");
    }, 1000);
  }

  private jsonYanitGonder(
    yanit: http.ServerResponse,
    durumKodu: number,
    veri: Record<string, string>,
  ): void {
    yanit.writeHead(durumKodu, {
      "Content-Type": "application/json; charset=utf-8",
    });
    yanit.end(JSON.stringify(veri));
  }
}

const uygulama = new BolumDurumUygulamasi();
uygulama.baslat();
