// Dosya: asenkron-siparis.ts
// Bu örnek sipariş, müşteri ve stok verisini asenkron biçimde getirir.
// Bağımsız sorgular Promise.all ile aynı anda başlatılır.
// Dönüş türleri her fonksiyonun sözleşmesini açıklar.

interface Siparis {
  siparisNo: string;
  musteriKimlik: number;
  urunKodu: string;
}

interface Musteri {
  kimlik: number;
  ad: string;
}

interface StokDurumu {
  urunKodu: string;
  adet: number;
}

async function siparisGetir(): Promise<Siparis> {
  return { siparisNo: "S-100", musteriKimlik: 7, urunKodu: "K-20" };
}

async function musteriGetir(musteriKimlik: number): Promise<Musteri> {
  return { kimlik: musteriKimlik, ad: "Burak" };
}

async function stokGetir(urunKodu: string): Promise<StokDurumu> {
  return { urunKodu, adet: 12 };
}

async function siparisOzetiOlustur(): Promise<void> {
  const siparis = await siparisGetir();

  const [musteri, stokDurumu] = await Promise.all([
    musteriGetir(siparis.musteriKimlik),
    stokGetir(siparis.urunKodu)
  ]);

  console.log(`${musteri.ad} için ${siparis.siparisNo} numaralı sipariş hazır.`);
  console.log(`Stok: ${stokDurumu.adet}`);
}

siparisOzetiOlustur().catch((hata) => console.error(hata));

// Çıktı: Burak için S-100 numaralı sipariş hazır.
// Çıktı: Stok: 12
