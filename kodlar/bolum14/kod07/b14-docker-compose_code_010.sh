# Tüm servisleri build edip başlat (arka planda).
docker compose up --build -d

# Servislerin durumunu listele.
docker compose ps
# Çıktı: NAME              STATUS
# Çıktı: kutuphane-api     running
# Çıktı: kutuphane-db      running

# Yalnızca API servisinin loglarını izle.
docker compose logs -f kutuphane-api

# Tüm servisleri durdur ve kaldır (volume'lar varsayılan olarak korunur).
docker compose down
