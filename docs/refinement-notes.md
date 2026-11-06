# Poprawki prezentacji i ruchu

Aktualny kierunek wynika z najnowszej referencji użytkownika: wspólne ciemne tło z miękkim ciepłym gradientem, realizacje bez przycisków szczegółów i bez modali. Zachowano poprzedni kierunek „The dark room” (seed 451649124), typografię, treści i makiety.

## Zmiany

- Usunięto oba modale, ich HTML, JavaScript, style i powiązane dane. Przyciski projektów zmieniono na nieinteraktywne prezentacje, a zdjęcia na zwykłe figury.
- Wszystkie realizacje korzystają z tego samego ciemnego tła i ciepłego radialnego gradientu przy materiałach. Gradient zanika przy krawędziach, zamiast tworzyć kolorowe pasy. Akcenty opisów są jednakowe.
- Usunięto animacje wejścia tekstów, opóźnienia, skalowanie całych scen oraz przesuwanie napisu stopki. Teksty i nagłówki pozostają stale widoczne bez transformacji. Sekcje przewijają się w normalnym układzie dokumentu, także po zmianie trybu animacji.
- Pozostawiono subtelną paralaksę obrazów, o mniejszym zakresie ruchu. Nie ma animacji, której pozycja jest obliczana z własnego już przekształconego tekstu.
- Specjalizacje: gradient na hover/focus, rozwijający się pasek akcentu i obrót ikony. Tytuł nie przesuwa się po najechaniu. Kliknięcie animuje wysokość samej treści przez 420 ms, z obsługą przerwania i odwrócenia animacji. Ograniczony ruch i brak JavaScript zachowują natywne `details`.

Gradienty są świadomym odstępstwem od domyślnych zasad umiejętności projektowej, wyraźnie wymaganym przez użytkownika. Materiały demonstracyjne, autorzy fotografii i dane do uzupełnienia pozostają bez zmian; lista źródeł jest w `credits.html`.

## Weryfikacja

W przeglądarce sprawdzono pełny ruch, rozwijanie i szybkie ponowne kliknięcia specjalizacji. Potwierdzono brak elementów `dialog`, brak atrybutów uruchamiających projekty oraz `transform: none` na nagłówku startowym, opisach realizacji i napisie stopki. Pozostałe sprawdzenia oraz zrzuty dla 1440, 768 i 390 px są w `.taste-skill/refined/`.

Rozwijanie sprawdzono również klawiszem Enter: po zakończeniu animacji natywny stan `open` jest poprawny, a wysokość wraca do wartości automatycznej. Przy szybkim ponownym kliknięciu nowa animacja zaczyna się od aktualnej wysokości, zamiast przeskakiwać do początku.

Końcowy audyt: 0 FAIL, 2 WARN przy 1440, 768 i 390 px; brak błędów JavaScript, poziomego przepełnienia dokumentu i uszkodzonych obrazów. Lint źródeł: 0 FAIL, 0 WARN. Zachowane ostrzeżenia dotyczą rozmiarów typografii w demonstracyjnych pracach oraz braku wideo w portfolio graficznym. Obejrzano wszystkie końcowe zrzuty. Testy ręczne obejmują również mobilne rozwijanie treści i filtr UX/UI pokazujący dwie realizacje.

Wyjątki audytu: `gradient` to bezpośrednie wymaganie użytkownika; `eyebrow` dotyczy fałszywego rozpoznania etykiety kategorii „Landing page” jako nadtytułu makiety reklamowej; `hairline` i `outlined-box` to linie kontaktu i kontrolka przewijania; `still-page` uwzględnia systemowo ograniczony ruch. W źródłach nie występują zakazane wzorce poza opisanymi, świadomymi wyjątkami gradientów.

ROUND 1

Seen in one second: ciemna ekspozycja, ciepłe światło przy makietach, nieruchomy opis.

Idea (one sentence): kolejne realizacje są oświetlane tym samym miękkim światłem, zamiast tworzyć osobne kolorowe plansze.

Live thing: filtry i płynnie rozwijane specjalizacje z reakcją na hover i fokus.

Layout words by section: hero=photo / intro=statement / work=scenes / services=accordion / about=split / notes=images / footer=type.

Scores: design 8 · usability 8 · creativity 7 · content 6 → overall 7.6.

Caps applied: koncepcje demonstracyjne wciąż ograniczają indywidualność i ocenę treści.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Wcześniejsze widoki realizacji: odcinające się kolorowe powierzchnie. Wspólna baza i wygaszane gradienty.
2. Pełny tryb ruchu: nagłówki i opisy przesuwały się, a cała scena zmieniała skalę. Usunięto oba mechanizmy i przesuwanie stopki; ruch zachowano na obrazach.
3. Specjalizacje: otwieranie zmieniało wysokość od razu. Animowana jest sama zawartość, także przy przerwaniu animacji kolejnym kliknięciem.
