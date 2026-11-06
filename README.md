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
css/hero.css           pierwszy ekran, typografia, ikony i układ mobilny
css/layout.css         wspólna siatka, szerokość treści i biała sekcja intro
css/case-study.css     układ osobnych stron case study
css/clients.css        poziomo przewijana lista klientów
css/editorial.css      nowe O mnie, niezależne obrazy i logotypy
css/process.css        sekcja Proces i trzy etapy współpracy
css/header.css         wysuwany nagłówek i rozmyta warstwa pod menu
projekty/              statyczne podstrony Dom, Flow, Perspektywy i Orbit
js/main.js             kontakt, menu, filtry i animacje specjalizacji
js/hero.js             proceduralne tło WebGL i sterowanie jego odtwarzaniem
js/theme.js            zapisany motyw ustawiany przed pierwszym renderowaniem
js/case-study.js       motyw i pasek postępu na podstronach projektów
js/clients.js          strzałki, gesty i przeciąganie listy klientów
assets/fonts/          lokalny font Manrope + licencja
assets/images/         zdjęcia demonstracyjne
assets/projects/       osobne pliki prezentacji projektów
assets/clients/        pliki logotypów klientów
assets/favicon.svg     tymczasowa ikona litery a
assets/hero-ribbon.svg zapasowe tło bez WebGL
docs/credits.html      autorzy i licencje fotografii
docs/design-notes.md   decyzje projektowe i wyniki weryfikacji
docs/redesign-notes.md opis aktualnej przebudowy i jej weryfikacja
docs/refinement-notes.md najnowsze poprawki gradientów i stabilności tekstu
docs/navigation-notes.md światło kursora, numeracja i stała nawigacja
docs/hero-notes.md     abstrakcyjny pierwszy ekran
docs/grid-notes.md     spokojne falowanie, siatka i przejścia do bieli
docs/scroll-colour-notes.md połączony blok i kolor zależny od scrolla
preview.mjs            opcjonalny lokalny serwer bez zależności
```

## Przed publikacją

1. Podmień koncepcje **Dom, Flow, Perspektywy i Orbit** na własne realizacje. Obecne projekty są demonstracyjne, bez fikcyjnych klientów, wyników i referencji.
2. Uzupełnij skróty i materiały projektów w `index.html`, a pełne opisy na odpowiadających im stronach w `projekty/`. Przycisk „Pełne case study” otwiera osobną podstronę.
3. Dodaj adres w `siteConfig.email`, numer w `siteConfig.phone` oraz linki w `siteConfig.socialLinks` na początku `js/main.js`. Do tego czasu stopka pokazuje neutralne teksty „Adres wkrótce”, „Numer wkrótce” i „Profile wkrótce”. Dla kontaktu bez JavaScript dodaj również bezpośrednie linki w `#contact-details` w HTML.
4. Dopasuj tekst „O mnie”, meta description i tytuł do siebie. Usuń oznaczenia demonstracyjne dopiero po dodaniu własnych prac.
5. Podmień zdjęcia inspiracyjne na własne. Jeśli zostawiasz obecne, zachowaj informacje o autorach w `docs/credits.html`.
6. Wgraj `index.html`, `projekty/`, `css/`, `js/`, `assets/` i `docs/credits.html` na dowolny hosting statyczny. Serwer Node nie jest potrzebny na hostingu. Pomocniczych plików `.taste-skill/` nie publikuj.

## Animowany pierwszy ekran

Układ inspiruje się kompozycją radekjedynak.pl: duży wyśrodkowany napis, podpis, ikony profili i dolny rząd opisu z przyciskami. Własna implementacja i żółta paleta portfolio. Zdjęcie zastąpiono proceduralnym tłem w `js/hero.js`; nie wymaga pliku wideo, obrazów, bibliotek ani połączenia z internetem. `css/hero.css` zawiera wyłącznie stylowanie pierwszego ekranu.

Tło spokojnie faluje wyłącznie w górnej części hero. Maska wygasza je całkowicie przed dolną częścią sekcji; również zapasowe SVG korzysta z tej maski. Reakcja na mysz jest subtelna. Renderowanie jest ograniczone do 30 klatek/s i szerokości bufora 1200 px. Po przewinięciu poza pierwszy ekran lub ukryciu karty pętla zatrzymuje się. Ograniczony ruch pozostawia statyczną kompozycję, także dla efektu tekstu i gwiazdki. Jasny motyw ma własny, delikatniejszy wariant na białym tle. Bez WebGL działa lokalne tło SVG; bez JavaScript pozostaje ono nieruchome.

Ikony Dribbble, Behance i LinkedIn są przygotowane w HTML. Bez podanych adresów są nieklikalnymi symbolami. Aby podłączyć profile w pierwszym ekranie i stopce, dodaj do `siteConfig.socialLinks` wpisy z etykietami `Dribbble`, `Behance`, `LinkedIn` i własnymi adresami HTTPS. Skrypt zamieni odpowiadające symbole na linki. Nie przypisano profili innych osób.

## Siatka i przejścia sekcji

`css/layout.css` centralizuje układ całej strony. Wspólna ramka `.section-frame` ma maksymalnie 1440 px, 12 kolumn na dużych ekranach i 4 na mniejszych. Nagłówek, hero, intro, portfolio, specjalizacje, „O mnie”, treść stopki i podpisy mają te same zewnętrzne krawędzie. Z prawej pozostaje pas na stałe strzałki; tła sięgają krawędzi ekranu. Aby zmienić szerokość całości, edytuj `--content-max`.

„Pomysł to początek”, nagłówek „Wybrane realizacje” i filtry tworzą jeden blok `.work-intro` wewnątrz sekcji portfolio. Ma jednolite tło oraz ostre granice z hero i projektami. W ciemnym motywie pierwsze niewielkie przewinięcie wprowadzające blok do ekranu uruchamia pełne przejście 0–100%. Tło, tekst, licznik i filtry zmieniają kolory razem w ciągu 1000 ms; animacja kończy się samodzielnie, bez dalszego scrollowania. Kolejne ruchy nie restartują jej. Powrót do hero uruchamia przyciemnienie. `updateWorkIntro()` w `js/main.js` przełącza klasę `is-revealed`, a czas ustawia `--reveal-duration` w `css/layout.css`. Pierwsza paleta jest ustawiana bez animacji, również po odświeżeniu strony w środku sekcji. Sekcja zachowuje zwiększone odstępy pionowe. W jasnym motywie i przy ograniczonych animacjach pozostaje jasna. Bez JS ma statyczną paletę wybranego motywu. Napis w stopce skaluje się względem jej kontenera.

## Prezentacje realizacji

Każdy `.case-study` w HTML zawiera `.case-copy` z opisem oraz `.case-media.media-triptych` z trzema niezależnymi elementami `img`: `.fragment-top`, `.case-main` i `.fragment-bottom`. Podmień ich `src`, `alt`, `width` i `height` na własne materiały. Przykładowe grafiki znajdują się w `assets/projects/`, fotografie w `assets/images/`. Pliki SVG są samodzielne; prezentacja Perspektyw ma osadzone fotografie. Kategorię ustawisz w `data-category`. Makiety HTML na osobnych podstronach case study pozostają niezależne od tych skrótów.

Materiały są wyprostowane. W `.case-main` i `.case-fragment` możesz umieszczać bezpośrednio zdjęcia lub filmy, np. `<video src="assets/video/projekt.mp4" poster="assets/images/kadr.jpg" controls playsinline></video>`. Style dopasowują media do ich ramek.

Nad nazwą projektu znajduje się licznik `01 / 04`. Po filtrowaniu numeracja obejmuje wyłącznie widoczne realizacje. Dwa stałe przyciski po prawej obsługują całą trasę: pierwszy ekran → „O mnie” → połączone intro, nagłówek realizacji i filtry → widoczne projekty → klienci → specjalizacje → proces → kontakt. Połączony blok jest jednym przystankiem. Strzałka w górę przechodzi w odwrotnej kolejności, również z pierwszego projektu do wcześniejszych sekcji. Niedostępny kierunek jest wyłączony dopiero na początku lub końcu tej trasy. Osobny margines pozostawia miejsce na przyciski.

Realizacje mają wspólne tło zgodne z motywem i ciepły, miękki gradient w `.case-study::before`. Sceny przewijają się w zwykłym układzie dokumentu, a delikatna paralaksa dotyczy wyłącznie materiałów graficznych. Nagłówki i opisy pozostają nieruchome. Żaden skrypt nie przechwytuje przewijania kółkiem ani dotykiem.

## Interakcje i dostępność

- Duże sceny realizacji obsługują zwykłe przewijanie, filtry i klawiaturę. Linki do poszczególnych projektów mają postać `#projekt-forma`, `#projekt-flow` itd.
- Filtry korzystają z `aria-pressed`, liczba projektów jest ogłaszana przez `aria-live`. Wybór kategorii przewija płynnie do pierwszej pasującej realizacji i ustawia fokus na jej tytule. Przy ograniczeniu ruchu przejście jest natychmiastowe.
- Makiety i fotografie są statycznymi materiałami na stronie; brak modali i powiększeń.
- Specjalizacje: akordeon z jednym aktywnym elementem. Klikalna jest cała powierzchnia bloku, wraz z marginesami wewnętrznymi i opisem. Wybranie innej pozycji płynnie zwija poprzednią. Hover zmienia tło na kolor akcji `#f5db4b`, a tytuł płynnie przechodzi z wagi 500 do 750. Niewidoczna kopia tytułu rezerwuje miejsce na cięższą odmianę; przy zmianie treści zachowaj identyczny tekst w `data-title` i wewnętrznym `span`. Enter i Spacja działają przez natywny `summary`. Bez JS pozostaje natywny akordeon z grupą `name`.
- Otwarta specjalizacja ma żółte tło `#f5db4b` i ciemny tekst. Strzałka wskazuje dół przy zwiniętym bloku i górę po rozwinięciu.
- Subtelne światło podąża za kursorem na urządzeniach z myszą. Warstwa jest nieklikalna, nie działa na ekranie dotykowym ani przy ograniczeniu ruchu i przestaje animować po zatrzymaniu kursora lub opuszczeniu okna.
- Menu mobilne, widoczny fokus, odnośnik pomijający nawigację, obsługa `prefers-reduced-motion`.
- Nagłówek pozostaje na górze ekranu, chowa się przy przewijaniu w dół i płynnie wraca przy ruchu w górę. Niewielki próg ruchu zapobiega migotaniu przy drobnych zmianach kierunku. Otwarte menu mobilne oraz fokus klawiatury utrzymują nagłówek widoczny. Rozmyta, półprzezroczysta warstwa wygasa pod menu i korzysta z palety aktywnego motywu. Napis na przycisku kontaktowym pozostaje ciemny także po najechaniu.
- Stały przełącznik słońce/księżyc w prawym górnym rogu zmienia jasny i ciemny motyw. Jasny motyw ma białe tło `#ffffff` i znacznie subtelniejsze gradienty scen. Domyślny jest ciemny; wybór jest zapamiętywany w `localStorage` i odtwarzany przed wyświetleniem strony. Zdjęcia, makiety i żółta stopka zachowują własne kolory. Tokeny obu motywów są na początku CSS.
- Przełącznik **Animacje** w stopce włącza lub ogranicza ruch. Domyślnie respektuje ustawienia systemowe; ręczny wybór jest zapamiętywany w `localStorage`. W obu trybach tekst pozostaje stale widoczny i nie ma animacji przesuwających tekst.
- Bez JS treści, realizacje, obrazy i specjalizacje pozostają dostępne; filtrowanie i płynne animacje rozwijania wymagają JS.

Treści demonstracyjne nie stanowią deklaracji doświadczenia ani efektów biznesowych. Strona nie zawiera analityki, cookies, formularza wysyłającego dane ani zewnętrznych zależności w czasie działania.

## Pełne case study

Aktualny układ „O mnie”, trzy niezależne obrazy projektów oraz podmiana logotypów: zobacz `docs/editorial-notes.md`. Tymczasowy logotyp jest wspólnym SVG; właściwe pliki PNG lub SVG podmieniaj w `src` poszczególnych `.client-logo` w `index.html`.

`projekty/dom.html`, `flow.html`, `perspektywy.html` i `orbit.html` zawierają osobne prezentacje: wprowadzenie, metrykę, dużą makietę, kontekst i cel, galerię, podejście oraz zasady projektowe. Każda ma powrót do właściwej realizacji w portfolio, link do następnego projektu i kontaktu, przełącznik motywu oraz pasek postępu. Treści i materiały są lokalne, dostępne także bez JavaScript. Bez JS nie działa przełączanie motywu ani pasek postępu. Podstrony są demonstracyjne; zastąp je rzeczywistym procesem, materiałami i wynikami przed publikacją.
