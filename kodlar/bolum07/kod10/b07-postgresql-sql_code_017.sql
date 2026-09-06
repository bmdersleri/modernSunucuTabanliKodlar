-- Örnek bağımsız çalışsın diye önce temizlenir.
DROP TABLE IF EXISTS uyeler CASCADE;
DROP TABLE IF EXISTS odunc_islemleri CASCADE;

-- NOT NULL zorunlu alanı tanımlar.
-- UNIQUE e-posta tekrarını engeller.
-- CHECK yaş için kabul edilen aralığı denetler.

CREATE TABLE uyeler (
  uye_id SERIAL PRIMARY KEY,
  ad_soyad VARCHAR(120) NOT NULL,
  eposta VARCHAR(150) NOT NULL UNIQUE,
  yas INTEGER CHECK (yas >= 12 AND yas <= 120)
);

CREATE TABLE odunc_islemleri (
  odunc_id SERIAL PRIMARY KEY,
  uye_id INTEGER NOT NULL REFERENCES uyeler(uye_id),
  kitap_id INTEGER NOT NULL REFERENCES kitaplar(kitap_id),
  iade_tarihi DATE,
  CONSTRAINT chk_iade_tarihi
    CHECK (iade_tarihi IS NULL OR iade_tarihi >= CURRENT_DATE)
);

-- Çıktı: Geçersiz e-posta tekrarı veya olmayan üye kimliği reddedilir.
