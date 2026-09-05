# certbot ile Nginx için otomatik TLS sertifikası al ve yapılandırmayı güncelle.
sudo certbot --nginx -d kutuphane.mehmetakif.edu.tr

# Sertifikanın otomatik yenilenmesini test et (sertifikalar genellikle 90 gün geçerlidir).
sudo certbot renew --dry-run
