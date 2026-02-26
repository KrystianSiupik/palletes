# Deployment: Nginx + Cloudflare + Let’s Encrypt (aplikacja na :3000)

## Co zostało zrobione (done)

### 1) Cloudflare DNS

- Dodano rekord `A`:
  - `palletes.org` → `167.86.105.75`
- Dodano rekord dla `www` (wymagane dla certyfikatu):
  - `www` → CNAME → `palletes.org`  
    (alternatywnie: rekord A `www` → IP)

### 2) Nginx reverse proxy

- Nginx skonfigurowany jako reverse proxy:
  - `palletes.org` / `www.palletes.org` → `http://127.0.0.1:3000`
- Włączone nagłówki proxy (Host, X-Forwarded-\*, Real-IP)

### 3) SSL/TLS (Let’s Encrypt)

- Zainstalowano Certbot + integrację z nginx
- Wydano certyfikat dla:
  - `palletes.org`
  - `www.palletes.org`
- Nginx ma obsługę HTTPS na `443`
- (Zalecane) przekierowanie HTTP → HTTPS

### 4) Cloudflare SSL mode

- Cloudflare SSL/TLS ustawione docelowo na:
  - **Full (strict)**

---

## Lokalizacja konfiguracji

- Nginx site:
  - `/etc/nginx/sites-available/palletes.org`
  - `/etc/nginx/sites-enabled/palletes.org`

- Certyfikaty (Let’s Encrypt):
  - `/etc/letsencrypt/live/palletes.org/`
  - logi: `/var/log/letsencrypt/letsencrypt.log`

---
