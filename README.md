# Cel projektu

## 1. Wprowadzenie

Celem projektu jest stworzenie zintegrowanego systemu informatycznego wspierającego zarządzanie przedsiębiorstwem zajmującym się skupem, sprzedażą oraz magazynowaniem palet.

Projekt zakłada nie tylko cyfryzację procesów operacyjnych, ale również implementację mechanizmów analitycznych umożliwiających kontrolę rentowności oraz optymalizację marży.

System ma stanowić narzędzie wspomagające podejmowanie decyzji biznesowych w oparciu o dane operacyjne generowane w czasie rzeczywistym.

---

## 2. Cel operacyjny

System ma umożliwiać:

- automatyzację procesu sprzedaży oraz generowanie faktur,
- obsługę zamówień online przez klientów,
- zarządzanie dostępnością produktów w czasie rzeczywistym,
- obsługę procesu skupu palet wraz z możliwością akceptacji lub odrzucenia ofert,
- ewidencję stanów magazynowych,
- rejestrowanie dostaw i przyjęć,
- identyfikację zasobów za pomocą kodów QR,
- zarządzanie użytkownikami i uprawnieniami,
- wdrożenie modelu subskrypcyjnego stabilizującego przychody.

---

## 3. Cel analityczny

Kluczowym elementem projektu jest przekształcenie systemu z narzędzia ewidencyjnego w narzędzie analityczne wspierające kontrolę rentowności przedsiębiorstwa.

System ma umożliwiać:

- analizę marży dla poszczególnych typów palet,
- analizę relacji ceny zakupu do ceny sprzedaży,
- analizę rentowności klientów,
- monitorowanie rotacji zapasów magazynowych,
- prognozowanie zapotrzebowania na podstawie danych historycznych,
- identyfikację produktów generujących najwyższy oraz najniższy zysk,
- wykrywanie sprzedaży poniżej ustalonego poziomu marży.

Celem jest zwiększenie kontroli nad zyskiem operacyjnym przedsiębiorstwa.

---

## 4. Cel biznesowy

Projekt ma przyczynić się do:

- zwiększenia przejrzystości finansowej działalności,
- ograniczenia strat wynikających z niekontrolowanego skupu,
- poprawy rotacji zapasów,
- stabilizacji przychodów poprzez model subskrypcyjny,
- zwiększenia dostępności oferty poprzez sprzedaż online,
- redukcji kosztów administracyjnych dzięki automatyzacji procesów.

---

## 5. Wartość dodana projektu

W przeciwieństwie do klasycznych systemów sprzedażowo-magazynowych, projekt zakłada implementację mechanizmów wspomagających decyzje biznesowe w oparciu o analizę danych.

System ma umożliwiać:

- podejmowanie decyzji cenowych na podstawie danych historycznych,
- kontrolę rentowności w czasie rzeczywistym,
- optymalizację struktury sprzedaży,
- zwiększenie zysku bez konieczności zwiększania wolumenu sprzedaży.

Projekt stanowi przykład zastosowania systemów informatycznych w obszarze controllingu operacyjnego oraz business intelligence w przedsiębiorstwie handlowym.

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
