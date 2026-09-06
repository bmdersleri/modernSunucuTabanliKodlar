-- Yazar tablosu bu örnekte kurulur; kitaplar tablosu önceki örnekten gelir.
DROP TABLE IF EXISTS yazarlar CASCADE;

-- Yazar her kayıt için benzersiz bir kimlik alır.
-- Kitap, yazar_id alanı ile yazara bağlanır.
-- FOREIGN KEY geçersiz yazar kimliğini engeller.
-- Önceki örnekteki kitaplar tablosu korunur ve evrilir: silinip yeniden
-- oluşturulmaz, yeni sütun ve kısıt eklenir. Gerçek projelerde şema
-- migration ile böyle evrilir.

CREATE TABLE yazarlar (
  yazar_id SERIAL PRIMARY KEY,
  ad_soyad VARCHAR(120) NOT NULL UNIQUE
);

ALTER TABLE kitaplar
  ADD COLUMN yazar_id INTEGER;

ALTER TABLE kitaplar
  ADD CONSTRAINT fk_kitap_yazar
  FOREIGN KEY (yazar_id)
  REFERENCES yazarlar(yazar_id);

INSERT INTO yazarlar (ad_soyad)
VALUES ('Yaşar Kemal');

INSERT INTO kitaplar (kitap_adi, yazar_adi, yayin_yili, yazar_id)
VALUES ('İnce Memed', 'Yaşar Kemal', 1973, 1);

-- Çıktı: Kitap, yazar_id=1 olan Yaşar Kemal ile ilişkilendirilir.
