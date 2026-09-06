-- INNER JOIN yalnızca eşleşen satırları getirir.
-- LEFT JOIN tüm yazarları, kitap olmasa da getirir.
-- Takma adlar sorguyu okunabilir kılar.

SELECT y.ad_soyad, k.kitap_adi
FROM yazarlar AS y
INNER JOIN kitaplar AS k
  ON k.yazar_id = y.yazar_id;

SELECT y.ad_soyad, k.kitap_adi
FROM yazarlar AS y
LEFT JOIN kitaplar AS k
  ON k.yazar_id = y.yazar_id
ORDER BY y.ad_soyad;

-- Çıktı: LEFT JOIN, kitabı olmayan yazar için kitap_adi alanında NULL döndürür.
