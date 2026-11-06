# Kierunek i weryfikacja

## Założenia

Portfolio Augustynowicz dla projektowania graficznego, UX/UI, aplikacji webowych i mobilnych, DTP oraz Growth Marketingu. Czysty HTML, CSS i JS w oddzielnych, sformatowanych plikach. Bez CMS, zależności runtime i procesu budowania. Nazwa w nagłówku jest zwykłym tekstem.

Referencja: [garlak.pl](https://garlak.pl/). Zaczerpnięte zasady: ciemna scena, mocna typografia, żółty akcent, duże prezentacje prac i przewijana galeria. Kod, teksty i prace referencji nie są kopiowane.

Kierunek z biblioteki design-taste-frontend: **The dark room**, seed **451649124**. Zachowana atmosfera ekspozycji na ciemnym tle. Po doprecyzowaniu specjalizacji przez użytkownika zdjęcia i portrety zastąpiono autorskimi makietami identyfikacji, aplikacji i publikacji; układ z portretami nie pasował do dostępnej treści. Kompozycja startowa jest pełniejsza i mocniejsza typograficznie niż pierwotna propozycja kierunku, zgodnie z referencją użytkownika. Nie przeprowadzano kolejnych losowań.

Idea: różne specjalizacje Augustynowicz spotykają się w jednym stole projektowym; identyfikacja, ekran telefonu i publikacja są równorzędnymi obiektami do obejrzenia. Element interaktywny: filtrowanie i przeglądanie projektów z dostępnymi podglądami. Pełna indywidualizacja wymaga własnych realizacji i biografii.

Argument strony: najpierw pokazanie zakresu poprzez makiety, następnie projekty z opisem zakresu, specjalizacje, podejście i kontakt. Nie wymyślano klientów, wyników kampanii, doświadczenia, nagród ani danych kontaktowych.

## Materiały do podmiany

- Forma: demonstracyjna identyfikacja wizualna.
- Flow: demonstracyjny interfejs aplikacji mobilnej.
- Perspektywy: demonstracyjny projekt magazynu.
- Orbit: demonstracyjny landing page produktu cyfrowego.
- Biografia i teksty ofertowe: robocze, oparte jedynie na podanych specjalizacjach.
- E-mail i profile: puste pola w `siteConfig` w `js/main.js`.
- Sześć fotografii: inspiracje z Lorem Picsum, nie prace autora portfolio. Pełny wykaz autorów i licencji w [credits.html](credits.html), dostępny również ze stopki. Własne koncepcje graficzne są wykonane w HTML/CSS.

## Weryfikacja

- `node --check js/main.js` i `node --check preview.mjs`: poprawna składnia.
- Lint design-taste-frontend: 0 FAIL i 0 WARN.
- Audyt w rzeczywistej przeglądarce przy 1440×900, 768×1024 i 390×844: brak poziomego przepełnienia dokumentu i uszkodzonych obrazów; poprawnie załadowany lokalny Manrope. Zrzuty pierwszego ekranu i całej strony obejrzano dla wszystkich szerokości.
- Audyt końcowy: 0 FAIL, 4 WARN z wyjaśnionym wyjątkiem `still-page`. Windows zgłasza preferencję ograniczenia ruchu; potwierdzono w przeglądarce `animation-name: none` i brak ukrytych elementów oczekujących na animację. Nie zmieniano ustawień dostępności systemu. Animacji w trybie bez ograniczenia ruchu nie zweryfikowano wizualnie.
- Ostrzeżenia: liczba rozmiarów tekstu uwzględnia typografię demonstracyjnych projektów; brak wideo jest celowy dla portfolio graficznego; przewijanie poziome jest wymaganym mechanizmem galerii; „empty-middle” dotyczy geometrii elementów poza widocznym obszarem tej galerii, nie pustej sekcji strony.
- Testy interakcji w przeglądarce: filtr UX/UI pokazuje dwa projekty, otwarcie Flow, przycisk następnego projektu i klawisz → przełączają podgląd, Escape zamyka okno, menu mobilne otwiera się i zamyka po wyborze sekcji, powiększenie fotografii działa, oferta Growth Marketing rozwija treść.
- W podglądzie HTTP nie odnotowano błędów JavaScript. Bezpośrednie otwarcie `file://` w narzędziu przeglądarkowym zostało zablokowane przez jego politykę dozwolonych protokołów; nie było testowane. Kod nie używa fetch, modułów ani zasobów wymagających serwera.

## Ocena wizualna

ROUND 1

Seen in one second: duży tytuł i trzy makiety projektów.

Idea (one sentence): wspólny stół projektowy dla identyfikacji, interfejsu i druku.

Live thing: filtrowana galeria i natywne okna podglądów.

Layout words by section: hero=collage / intro=statement / work=rail / services=accordion / about=split / notes=images / contact=type.

Scores: design 7 · usability 7 · creativity 6 · content 6 → overall 6.7.

Caps applied: nakładanie się tekstów makiet w hero na tablecie; brak prac rzeczywistych ogranicza treść i oryginalność.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Tablet-fold: tekst na makietach w hero zasłaniają sąsiednie karty. Zmniejszono karty i ustawiono je obok siebie.
2. Mobile-page: ucięte podpisy kolejnego projektu przy krawędzi ekranu. Karta mobilna zajmuje pełną szerokość galerii, dodano przyciski przewijania.
3. Mobile-page: drobne podpisy. Podniesiono teksty poza samymi makietami interfejsów do minimum 13 px.

ROUND 2

Seen in one second: duży tytuł, żółta identyfikacja, ekran aplikacji i projekt editorialowy.

Idea (one sentence): różne formaty portfolio tworzą wspólną, ciemną ekspozycję.

Live thing: filtrowanie i przeglądanie projektów z obsługą klawiaturą.

Layout words by section: hero=collage / intro=statement / work=rail / services=accordion / about=split / notes=images / contact=type.

Scores: design 8 · usability 8 · creativity 7 · content 6 → overall 7.6.

Caps applied: pomysł nadal pasuje do innego projektanta, więc creativity maksymalnie 7. Bez prawdziwych realizacji i osobistej biografii content pozostaje 6.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Wszystkie widoki: przykładowe prace nie opowiadają osobistej historii. Następna iteracja wymaga prac autora.
2. Sekcja kontaktu: brak rzeczywistych danych. Konfiguracja jest gotowa, adres należy uzupełnić.
3. Hero na telefonie: pokazuje dwie z trzech makiet. Celowa kompozycja mobilna; cały zakres jest dostępny w galerii.
