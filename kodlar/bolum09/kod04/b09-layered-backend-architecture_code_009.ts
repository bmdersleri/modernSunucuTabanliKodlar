// Dosya: Repositoryler.ts
// Repository sınıfları bellek içi veriyi örnek olarak kullanır.
// Gerçek uygulamada burada veritabanı veya ORM çağrıları bulunabilir.
// Çıktı, bulunan kitabın bilgisini gösterir.

class KitapRepository {
  private kitapListesi: Kitap[] = [
    { kod: "JAVA-101", ad: "Java ile Programlama", uygunMu: true },
    { kod: "TS-201", ad: "TypeScript Temelleri", uygunMu: false }
  ];

  kitapBul(kitapKodu: string): Kitap | undefined {
    return this.kitapListesi.find((kitap) => kitap.kod === kitapKodu);
  }
}

class OgrenciRepository {
  private ogrenciListesi: Ogrenci[] = [
    { numara: "2024001", mevcutOduncSayisi: 1 }
  ];

  ogrenciBul(ogrenciNumarasi: string): Ogrenci | undefined {
    return this.ogrenciListesi.find((ogrenci) => ogrenci.numara === ogrenciNumarasi);
  }
}

const kitapRepository = new KitapRepository();
console.log(kitapRepository.kitapBul("JAVA-101")?.ad);
// Çıktı: Java ile Programlama
