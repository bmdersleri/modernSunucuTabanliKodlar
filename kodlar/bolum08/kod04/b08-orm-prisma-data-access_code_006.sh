# File: terminal-komutlari.sh
# Komut şema farkını inceleyerek yeni migration üretir.
// Migration daha sonra geliştirme veritabanına uygulanır.
// Prisma Client yeni alanları tanıyacak biçimde güncellenir.

npx prisma migrate dev --name kullanici_telefon_alani
npx prisma generate
# Çıktı: Applied migration ... kullanici_telefon_alani
