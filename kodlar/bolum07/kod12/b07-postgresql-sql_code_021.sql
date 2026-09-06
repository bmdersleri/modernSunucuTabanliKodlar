-- Örnek bağımsız çalışsın diye önce temizlenir.
DROP INDEX IF EXISTS idx_kitaplar_yayin_yili;

-- Üyeler e-posta ile sık aranıyorsa index yararlıdır.
-- EXPLAIN sorgu planını incelemek için kullanılır.
-- PK ve UNIQUE alanları zaten index oluşturabilir.

CREATE INDEX idx_kitaplar_yayin_yili
ON kitaplar (yayin_yili);

EXPLAIN ANALYZE
SELECT kitap_adi, yazar_id
FROM kitaplar
WHERE yayin_yili = 1943;

-- Çıktı: PostgreSQL'in sorgu planı ve çalışma süresi görüntülenir.
