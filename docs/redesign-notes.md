# Przebudowa portfolio — 5 listopada 2026

Zachowano HTML, CSS i JavaScript bez CMS i bibliotek. Kierunek poprzedniej wersji („The dark room”, seed 451649124) dostosowano do nowych, konkretnych referencji użytkownika; nie losowano nowej stylistyki.

## Zmiany

- Pierwszy ekran: pełne zdjęcie w tle, przyciemnienie pod tekstem, nawigacja nad fotografią, duży nagłówek w dolnej części okna. Plik do podmiany: `assets/images/hero.jpg`.
- Realizacje: zamiast poziomej galerii cztery pełne sceny, z opisem i zakresem po lewej oraz główną makietą i dwoma dodatkowymi materiałami po prawej. Wyróżnione słowa opisują zakres, nie fikcyjne wyniki biznesowe.
- Animacje: wejścia nagłówków, sekwencyjne pojawianie treści, paralaksa zdjęcia startowego i materiałów projektowych, skalowanie poprzedniej sceny, ruch zdjęcia w sekcji „O mnie”, reakcje przycisków i delikatne wejście napisu stopki. Bez przechwytywania przewijania.
- Stopka: duża żółta powierzchnia, zaokrąglone górne narożniki, napis „Pogadamy?” i duże wiersze danych kontaktowych.
- Ustawienie ruchu: systemowa preferencja ograniczenia animacji plus ręczny przełącznik w stopce. Bezpieczna, stale widoczna treść, również bez JS.

## Odstępstwa od domyślnych zasad stylistycznych

Duża żółta stopka, linie przy danych kontaktowych i nakładające się sceny wynikają wprost z załączonych referencji. Neutralny gradient jest wyłącznie przyciemnieniem fotografii. Mniejsze teksty wewnątrz przykładowych interfejsów stanowią zawartość makiet, nie nawigację strony.

## Materiały

Koncepcje Forma, Flow, Perspektywy i Orbit pozostają demonstracyjne. Zdjęcie `hero.jpg` jest kopią `city.jpg`: Padurariu Alexandru, fotografia architektury przez Lorem Picsum, Unsplash License. Pozostałe fotografie oraz lokalny font są opisane w `credits.html`. E-mail, telefon i profile pozostają do uzupełnienia w `siteConfig`.

## Weryfikacja

Sprawdzane szerokości: 1440, 768 i 390 px. Podgląd przed przebudową zachowano w `.taste-skill/before-redesign/`, aktualny audyt w `.taste-skill/after-redesign/`. Testy ręczne obejmują pełne animacje po użyciu przełącznika, przewijanie i nakładanie scen, filtr UX/UI, podgląd Flow, menu mobilne i stopkę. Składnia JavaScript sprawdzana przez `node --check`.

Domyślne środowisko zgłasza ograniczony ruch, więc automat używa wyjątku `still-page`; pełny ruch sprawdzany jest ręcznie przez dostępny przełącznik bez zmieniania ustawień systemowych. Linie danych kontaktowych i obramowanie kontrolki przewijania są świadomymi wyjątkami wynikającymi z referencji.

Końcowy wynik: **0 FAIL, 2 WARN** we wszystkich trzech szerokościach; źródłowy lint **0 FAIL, 0 WARN**. Dwa zachowane ostrzeżenia dotyczą liczby rozmiarów tekstu (w tym typografii przykładowych prac) i braku wideo (portfolio graficzne nie wymaga zastępczego filmu). Bez błędów JavaScript, przepełnienia dokumentu i uszkodzonych obrazów w raporcie. Pełny ruch, podglądy, klawisz strzałki, Escape, filtry, link do projektu i menu na telefonie sprawdzono ręcznie w przeglądarce. Zrzuty końcowe obejrzano dla komputera, tabletu i telefonu.

ROUND 1

Seen in one second: zdjęcie i duży nagłówek przy dolnej krawędzi.

Idea (one sentence): różne formaty pracy Augustynowicz stają się pełnoekranowymi scenami z własnym zestawem materiałów.

Live thing: sceny przewijane, filtrowanie i podglądy oraz wybór intensywności ruchu.

Layout words by section: hero=photo / intro=statement / work=scenes / services=accordion / about=split / notes=images / footer=type.

Scores: design 8 · usability 8 · creativity 7 · content 6 → overall 7.6.

Caps applied: oryginalność i treść ograniczone przez demonstracyjne projekty zamiast prac autora.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Mobile-page-01: zbyt długi nagłówek nad realizacjami. Zastąpiony krótkim „Wybrane realizacje”.
2. Mobile-page-01: etykieta podglądu zasłania podpis publikacji. Usunięto powtarzającą się etykietę z makiet; pozostał przycisk obok opisu i klikalna cała makieta.
3. Desktop-page-02: dodatkowa miniatura publikacji nachodzi na tytuł. Skorygowano kadrowanie i pozycję dolnej miniatury.

ROUND 2

Seen in one second: pełna fotografia, duży tytuł przy dolnej krawędzi.

Idea (one sentence): projekty są prezentowane jako osobne, duże sceny, z których każda pokazuje kilka formatów tej samej koncepcji.

Live thing: przewijane sceny, filtry, podglądy i przełącznik ruchu.

Layout words by section: hero=photo / intro=statement / work=scenes / services=accordion / about=split / notes=images / footer=type.

Scores: design 8 · usability 8 · creativity 7 · content 6 → overall 7.6.

Caps applied: creativity maksymalnie 7, ponieważ kompozycja pasuje także do innych projektantów; content 6 do czasu zastąpienia koncepcji prawdziwymi realizacjami.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Wszystkie widoki: demonstracyjne projekty. Gotowe miejsca na rzeczywiste prace użytkownika.
2. Stopka: brak danych kontaktowych. Konfiguracja obsługuje adres, telefon i profile.
3. Hero: zastępcza fotografia architektury. Dedykowany plik `hero.jpg` czeka na własne zdjęcie.
