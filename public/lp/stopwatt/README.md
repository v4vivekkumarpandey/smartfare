# Obrazy — /lp/stopwatt

Campaign photos for the STOP WATT landing page. The page references these exact
names; a missing file renders a grey placeholder rather than breaking the
layout.

| Plik | Zdjęcie | Gdzie na stronie |
|---|---|---|
| `hero-bg.jpg` | Gniazdko w pokoju + koło ze sprzętem AGD (szeroki kadr) | przygaszone tło hero |
| `product.jpg` | To samo ujęcie w kwadracie | hero, prawa kolumna |
| `saving.jpg` | Zielony kolaż: lodówka, pralka, klimatyzator, mikrofalówka, piekarnik | „Zacznij oszczędzać już dziś" |
| `benefits.jpg` | Schemat stabilizacji napięcia z tarczą ochronną | sekcja „Korzyści" |
| `specs.jpg` | Urządzenie w gniazdku w kuchni + 4 zielone ikony | „Specyfikacja techniczna" |
| `kit.jpg` | Samo urządzenie na białym tle | sekcja „W zestawie" |
| `review-bg.jpg` | Uśmiechnięta kobieta na białym tle | tło sekcji opinii |

Notes:

- There is **no logo file** in the campaign pack, so the navbar renders the words
  „STOP WATT" instead. Drop a white `logo.png` here and swap the `<span>` in the
  page header for an `LpImage` if one arrives.
- The video is a Vimeo clip (id `1213899005`, square 1:1 creative), embedded
  directly — no poster image needed.
- Reviews use the reviewer's initial in a green circle; no portrait files needed.

## `_unused/`

- `reference-screenshot.png` — zrzut ekranu oryginalnej strony kampanii,
  wykorzystany jako wzór układu. Nie jest to materiał produktowy.
