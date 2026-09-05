# 1. SSH ile Linux sunucuya bağlan.
ssh dagitim@kutuphane-sunucu.mehmetakif.edu.tr

# 2. Sunucuda proje deposunu klonla veya güncelle.
git clone https://github.com/bmdersleri/kutuphane-api.git
cd kutuphane-api

# 3. Docker Compose ile servisleri üretim modunda ayağa kaldır.
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

# 4. Servislerin çalıştığını doğrula.
docker compose ps
curl http://localhost:3000/saglik
# Çıktı: {"durum":"ayakta"}
