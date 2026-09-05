-- Örnek bağımsız çalışsın diye önce temizlenir.
DROP TABLE IF EXISTS kitaplar CASCADE;

-- Kitaplık şeması oluşturulur.
-- Her komut tek bir veri yönetimi amacı taşır.
-- Örnekler PostgreSQL üzerinde çalışacak biçimdedir.

CREATE TABLE kitaplar (
  kitap_id SERIAL PRIMARY KEY,
  kitap_adi VARCHAR(150) NOT NULL,
  yazar_adi VARCHAR(100) NOT NULL,
  yayin_yili INTEGER
);

INSERT INTO kitaplar (kitap_adi, yazar_adi, yayin_yili)
VALUES ('Saatleri Ayarlama Enstitüsü', 'Ahmet Hamdi Tanpınar', 1961);

SELECT kitap_id, kitap_adi, yayin_yili
FROM kitaplar;

UPDATE kitaplar
SET yayin_yili = 1962
WHERE kitap_id = 1;

DELETE FROM kitaplar
WHERE kitap_id = 1;

-- Çıktı: SELECT sorgusu ilgili kitap satırını döndürür.
