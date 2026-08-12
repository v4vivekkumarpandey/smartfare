# Obrazy — /lp/xljuicer

Campaign photos for the XL Juicer landing page. The page references these exact
names; a missing file renders a grey placeholder rather than breaking the
layout.

| Plik | Zdjęcie | Gdzie na stronie |
|---|---|---|
| `hero.png` | Sokowirówka z marchewką i szklanką soku | górny blok |
| `doctor.png` | Specjalistka w fartuchu z jabłkiem | sekcja o odporności (kadr kołowy) |
| `juicer-dark.jpg` | Sokowirówka z sokiem truskawkowym przy oknie | sekcja o sokach pakowanych |
| `video-poster.png` | Rząd kolorowych soków, warzywa i owoce | sekcja „Wideo" (do czasu podania id Vimeo) |
| `press.png` | Ręka wkładająca całe jabłko do otworu | „Ta najwyższej jakości sokowirówka…" |
| `power.jpg` | Sokowirówka z arbuzem i ananasem | sekcja „Najwyższa moc" |
| `level-1.jpg` | Banany, jabłka, pomarańcza — miękkie owoce | „2 poziomy intensywności" |
| `level-2.jpg` | Marchew na desce — twarde warzywa | „2 poziomy intensywności" |
| `family.jpg` | Mama z dzieckiem pijący sok | „Łatwiejsze i szybsze niż krojenie jabłka!" |
| `offer.jpg` | Sokowirówka z dzbankiem na białym tle | „Nasza oferta obejmuje" |
| `video-bg.jpg` | Zbliżenie sokowirówki z dzbankiem (oryg. `fondoVideo`) | tło sekcji „Wideo" oraz opinii |
| `health.jpg` | Truskawki, borówki i limonka (flat lay) | sekcja o naturalnych sokach |

Notes:

- Reviews use the reviewer's initial in a coral circle; no portrait files needed.
- Once a Vimeo id is set in the page (`VIDEO_ID`), the real player replaces
  `video-poster.png`.

## `_unused/`

- `giphy.gif` (5,4 MB) i `giphy-downsized-large.gif` (8 MB) — animacje z paczki
  kampanii. Razem ważą ok. 13 MB, czyli wielokrotnie więcej niż cała reszta
  strony; wstawione na LP zabiłyby czas ładowania i wynik Page Experience w
  Google Ads. Jeśli ta animacja ma się pojawić, lepiej wrzucić ją jako klip
  Vimeo i podać id (`VIDEO_ID`).
