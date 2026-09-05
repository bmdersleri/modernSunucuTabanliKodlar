# Aynı image'dan iki farklı container, iki farklı port ile çalıştırılıyor.
docker run -d --name kutuphane-api-1 -p 3000:3000 kutuphane-api:1.0
docker run -d --name kutuphane-api-2 -p 3001:3000 kutuphane-api:1.0

docker ps --format "{{.Names}}\t{{.Ports}}"
# Çıktı: kutuphane-api-1   0.0.0.0:3000->3000/tcp
# Çıktı: kutuphane-api-2   0.0.0.0:3001->3000/tcp

# Bir container'ın loglarını izle.
docker logs -f kutuphane-api-1

# Container'ı durdur (imaj ve veriler silinmez), sonra tamamen kaldır.
docker stop kutuphane-api-1
docker rm kutuphane-api-1

# İmajı da silmek istenirse (tüm container'lar kaldırıldıktan sonra):
docker rmi kutuphane-api:1.0
