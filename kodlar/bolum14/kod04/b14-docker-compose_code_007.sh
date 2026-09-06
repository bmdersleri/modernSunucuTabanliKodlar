# Kalıcı veri için bir volume oluştur.
docker volume create kutuphane-db-verisi

# Servisler arası iletişim için özel bir network oluştur.
docker network create kutuphane-network

# PostgreSQL'i bu volume ve network ile çalıştır.
docker run -d --name kutuphane-db \
  --network kutuphane-network \
  -v kutuphane-db-verisi:/var/lib/postgresql/data \
  -e POSTGRES_PASSWORD=gelistirme_parolasi \
  postgres:17-alpine

# API container'ını aynı network'e ekle; API artık "kutuphane-db" adıyla veritabanına
# ulaşabilir.
docker run -d --name kutuphane-api \
  --network kutuphane-network \
  -e DATABASE_URL=postgresql://postgres:gelistirme_parolasi@kutuphane-db:5432/kutuphane \
  -p 3000:3000 \
  kutuphane-api:1.0
