# 1. Dockerfile'dan bir image inşa et (build).
docker build -t kutuphane-api:1.0 .

# 2. Bu image'dan bir container çalıştır (run).
docker run --name kutuphane-api-container -p 3000:3000 kutuphane-api:1.0

# 3. Çalışan container'ları listele.
docker ps
# Çıktı: CONTAINER ID   IMAGE               ...   NAMES
# Çıktı: 3f2a9c1d8e0b   kutuphane-api:1.0   ...   kutuphane-api-container

# 4. Container'ı durdur ve kaldır.
docker stop kutuphane-api-container
docker rm kutuphane-api-container
