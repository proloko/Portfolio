# Augustynowicz — portfolio

Statyczne portfolio inspirowane sposobem prezentowania realizacji na https://garlak.pl/. Własny układ i kod; bez kopiowania treści, kodu ani materiałów referencji. Bez CMS, frameworka, instalowania paczek i procesu budowania.

## Uruchomienie

Otwórz `index.html` w aktualnej przeglądarce. Wszystkie fonty, style, skrypty i obrazy są lokalne; strona działa również offline. Opcjonalny podgląd HTTP (wymagany Node.js):

```powershell
node preview.mjs
```

Następnie otwórz http://127.0.0.1:4173. Zatrzymanie: Ctrl+C.

## Struktura

```text
index.html             treści, sekcje, karty projektów
css/styles.css         tokeny, układy, komponenty, mobile, ruch
js/main.js             kontakt, menu, filtry i animacje specjalizacji
js/theme.js            zapisany motyw ustawiany przed pierwszym renderowaniem
assets/fonts/          lokalny font Manrope + licencja
assets/images/         zdjęcia demonstracyjne
assets/favicon.svg     tymczasowa ikona litery a
docs/credits.html      autorzy i licencje fotografii
docs/design-notes.md   decyzje projektowe i wyniki weryfikacji
docs/redesign-notes.md opis aktualnej przebudowy i jej weryfikacja
docs/refinement-notes.md najnowsze poprawki gradientów i stabilności tekstu
docs/navigation-notes.md światło kursora, numeracja i stała nawigacja
preview.mjs            opcjonalny lokalny serwer bez zależności
```

## Przed publikacją

1. Podmień koncepcje **Forma, Flow, Perspektywy i Orbit** na własne realizacje. Obecne projekty są demonstracyjne, bez fikcyjnych klientów, wyników i referencji.
2. Uzupełnij opisy i materiały projektów bezpośrednio w `index.html`. Wszystkie realizacje są prezentowane na stronie, bez przycisków szczegółów i bez okien modalnych.
3. Dodaj adres w `siteConfig.email`, numer w `siteConfig.phone` oraz linki w `siteConfig.socialLinks` na początku `js/main.js`. Do tego czasu stopka pokazuje neutralne teksty „Adres wkrótce”, „Numer wkrótce” i „Profile wkrótce”. Dla kontaktu bez JavaScript dodaj również bezpośrednie linki w `#contact-details` w HTML.
4. Dopasuj tekst „O mnie”, meta description i tytuł do siebie. Usuń oznaczenia demonstracyjne dopiero po dodaniu własnych prac.
5. Podmień zdjęcia inspiracyjne na własne. Jeśli zostawiasz obecne, zachowaj informacje o autorach w `docs/credits.html`.
6. Wgraj `index.html`, `css/`, `js/`, `assets/` i `docs/credits.html` na dowolny hosting statyczny. Serwer Node nie jest potrzebny na hostingu. Pomocniczych plików `.taste-skill/` nie publikuj.

## Zdjęcie na pierwszym ekranie

Podmień **`assets/images/hero.jpg`** na własne zdjęcie. Obecnie jest tam kopia zdjęcia architektury z materiałów demonstracyjnych. Najlepiej sprawdzi się szeroki kadr o szerokości około 2400 px. W `.hero-background img` w CSS zmienisz `object-position`, jeśli trzeba przesunąć kadr; w `.hero-shade` ustawisz przyciemnienie pod napisami. Tekst pozostaje przy dolnej krawędzi pierwszego ekranu.

## Prezentacje realizacji

Każdy `.case-study` w HTML zawiera `.case-copy` z opisem oraz `.case-media` z główną makietą i dwoma dodatkowymi materiałami. Zastępuj zawartość tych elementów własnymi obrazami. Główna makieta ma klasę `.project-visual`; prezentacja nie jest klikalna. Kategorię ustawisz w `data-category`.

Materiały są wyprostowane. W `.case-main` i `.case-fragment` możesz umieszczać bezpośrednio zdjęcia lub filmy, np. `<video src="assets/video/projekt.mp4" poster="assets/images/kadr.jpg" controls playsinline></video>`. Style dopasowują media do ich ramek.

Nad nazwą projektu znajduje się licznik `01 / 04`. Po filtrowaniu numeracja obejmuje wyłącznie widoczne realizacje. Dwa stałe przyciski po prawej obsługują całą trasę: pierwszy ekran → „Pomysł to początek” → nagłówek realizacji i filtry → widoczne projekty → specjalizacje → „O mnie” → kontakt. Strzałka w górę przechodzi w odwrotnej kolejności, również z pierwszego projektu do wcześniejszych sekcji. Niedostępny kierunek jest wyłączony dopiero na początku lub końcu tej trasy. Osobny margines pozostawia miejsce na przyciski.

Realizacje mają wspólne tło zgodne z motywem i ciepły, miękki gradient w `.case-study::before`. Sceny przewijają się w zwykłym układzie dokumentu, a delikatna paralaksa dotyczy wyłącznie materiałów graficznych. Nagłówki i opisy pozostają nieruchome. Żaden skrypt nie przechwytuje przewijania kółkiem ani dotykiem.

## Interakcje i dostępność

- Duże sceny realizacji obsługują zwykłe przewijanie, filtry i klawiaturę. Linki do poszczególnych projektów mają postać `#projekt-forma`, `#projekt-flow` itd.
- Filtry korzystają z `aria-pressed`, liczba projektów jest ogłaszana przez `aria-live`.
- Makiety i fotografie są statycznymi materiałami na stronie; brak modali i powiększeń.
- Specjalizacje: akordeon z jednym aktywnym elementem. Klikalna jest cała powierzchnia bloku, wraz z marginesami wewnętrznymi i opisem. Wybranie innej pozycji płynnie zwija poprzednią. Hover zmienia tło na kolor akcji `#f5db4b`, a tytuł płynnie przechodzi z wagi 500 do 750. Niewidoczna kopia tytułu rezerwuje miejsce na cięższą odmianę; przy zmianie treści zachowaj identyczny tekst w `data-title` i wewnętrznym `span`. Enter i Spacja działają przez natywny `summary`. Bez JS pozostaje natywny akordeon z grupą `name`.
- Otwarta specjalizacja ma żółte tło `#f5db4b` i ciemny tekst.
- Subtelne światło podąża za kursorem na urządzeniach z myszą. Warstwa jest nieklikalna, nie działa na ekranie dotykowym ani przy ograniczeniu ruchu i przestaje animować po zatrzymaniu kursora lub opuszczeniu okna.
- Menu mobilne, widoczny fokus, odnośnik pomijający nawigację, obsługa `prefers-reduced-motion`.
- Stały przełącznik słońce/księżyc w prawym górnym rogu zmienia jasny i ciemny motyw. Jasny motyw ma białe tło `#ffffff` i znacznie subtelniejsze gradienty scen. Domyślny jest ciemny; wybór jest zapamiętywany w `localStorage` i odtwarzany przed wyświetleniem strony. Zdjęcia, makiety i żółta stopka zachowują własne kolory. Tokeny obu motywów są na początku CSS.
- Przełącznik **Animacje** w stopce włącza lub ogranicza ruch. Domyślnie respektuje ustawienia systemowe; ręczny wybór jest zapamiętywany w `localStorage`. W obu trybach tekst pozostaje stale widoczny i nie ma animacji przesuwających tekst.
- Bez JS treści, realizacje, obrazy i specjalizacje pozostają dostępne; filtrowanie i płynne animacje rozwijania wymagają JS.

Treści demonstracyjne nie stanowią deklaracji doświadczenia ani efektów biznesowych. Strona nie zawiera analityki, cookies, formularza wysyłającego dane ani zewnętrznych zależności w czasie działania.
