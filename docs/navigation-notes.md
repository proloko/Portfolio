# Światło i nawigacja projektów

Zachowano dotychczasową kompozycję oraz kierunek „The dark room” (seed 451649124). Nowe wymagania użytkownika zastępują domyślne ograniczenia umiejętności projektowej dotyczące gradientów i numeracji.

## Zmiany

- Jedna nierozpraszająca warstwa światła pod kursorem. Wygładzanie pozycji jest obliczane na klatkę, a pętla zatrzymuje się po dojściu do celu. `pointer-events: none` zachowuje kliknięcia. Ekrany dotykowe i ograniczony ruch wyłączają efekt.
- Usunięto obroty wszystkich makiet, ich części i materiałów. Ramki obsługują bezpośrednie elementy `img` oraz `video`.
- Numeracja nad każdym tytułem. Filtry aktualizują indeks, sumę i etykietę dostępną dla czytnika ekranu.
- Dwa stałe przyciski po prawej, wzorowane na wskazanej kontrolce. Działają na całej stronie, obsługują filtry, przewijanie ręczne, ograniczony ruch i powtarzane kliknięcia podczas przewijania. Nieaktywne kierunki są widoczne, lecz wyłączone. Margines nawigacji zapobiega zasłanianiu treści.
- Otwarta specjalizacja: pełne tło `#f5db4b`, ciemny tekst i kontrastowa ikona.
- Usunięto całą sekcję „Rytm. Forma. Detal.” i jej style.

Materiały pozostają demonstracyjne i mają dotychczasowe źródła opisane w `credits.html`. Dane kontaktowe wymagają uzupełnienia w `siteConfig`.

## Weryfikacja

W przeglądarce sprawdzono przejście z początku strony do Formy, następnie Flow i powrót. Po wybraniu UX/UI licznik zmienia się na 01/02 i 02/02, a nawigacja przełącza wyłącznie Flow i Orbit. Po ostatniej realizacji przycisk następnego projektu pozostaje aktywny i przechodzi do kolejnej sekcji.

Potwierdzone wartości: otwarta specjalizacja `rgb(245, 219, 75)`, brak obrotu głównej makiety Flow i elementu przeglądarki Orbit, brak usuniętej sekcji w DOM oraz aktywna warstwa światła z pozycją odpowiadającą kursorowi. Audyt i końcowe zrzuty znajdują się w `.taste-skill/project-navigation/`.

Na telefonie sprawdzono miejsce na przyciski obok treści oraz aktywny blok specjalizacji. Klawisz Enter na stałym przycisku z sekcji specjalizacji przechodzi do ostatniej realizacji. Nie wykryto błędów JavaScript, uszkodzonych obrazów ani poziomego przepełnienia dokumentu przy 1440, 768 i 390 px. Końcowy lint źródeł i pomiary układu nie zgłaszają błędów po uwzględnieniu opisanych wyjątków.

Świadome wyjątki audytu: gradient i numeracja wynikają bezpośrednio z polecenia; etykiety nad makietami są zawartością demonstracyjnych prac; asymetria zewnętrznego marginesu stanowi zarezerwowany pas stałej nawigacji; cienkie obramowania przycisków odtwarzają wskazaną referencję. Brak wideo jest tymczasowy do dostarczenia własnych materiałów.

ROUND 1

Seen in one second: wyprostowana duża makieta, numer realizacji i stałe strzałki.

Idea (one sentence): portfolio działa jak numerowana ekspozycja, po której można poruszać się bez wracania do listy.

Live thing: światło pod kursorem, filtrowanie i nawigacja kontekstowa.

Layout words by section: hero=photo / intro=statement / work=scenes / services=accordion / about=split / footer=type.

Scores: design 8 · usability 8 · creativity 7 · content 6 → overall 7.6.

Caps applied: demonstracyjne projekty i brak indywidualnych materiałów nadal ograniczają treść i oryginalność.

## Uzupełnienie: motywy i akordeon

Aktualizacja: trasa obejmuje również pierwszy ekran, intro oraz nagłówek realizacji. Z pierwszej pracy można wrócić strzałkami do wszystkich wcześniejszych sekcji. Bieżąca sekcja jest rozpoznawana przy górnej części ekranu, aby krótki nagłówek portfolio nie był pomijany.

Jasny motyw ma tło `#ffffff`, neutralne powierzchnie bloków i przytłumiony gradient projektów. Cała powierzchnia specjalizacji reaguje na kliknięcie; hover zmienia ją na `#f5db4b`. Waga tytułu przechodzi płynnie z 500 do 750, z miejscem zarezerwowanym dla cięższej odmiany. To bezpośrednie wymaganie użytkownika zastępuje zasadę umiejętności o unikaniu zmian wagi tekstu na hover. Zmierzona wysokość zamkniętego bloku przed i po hover: 107,84 px. Pośrednia waga w czasie animacji: 696,25; końcowa: 750. Kliknięcie na lewym marginesie bloku poprawnie otwiera wybraną pozycję. Biały kolor tła potwierdzony jako `rgb(255, 255, 255)`.

Audyt po tej aktualizacji: 0 błędów i te same 4 ostrzeżenia; źródła 0 błędów. Motyw ciemny sprawdzony przy 1440/768/390 px, jasny przy 1440/390 px. Zrzuty: `.taste-skill/whole-card/` i `.taste-skill/whole-card-light/`. Pomocniczy HTML jasnego podglądu ustawia wyłącznie zapisany wybór motywu przed uruchomieniem identycznych skryptów i styli.

- Ostatni projekt prowadzi strzałką do specjalizacji, następnie do „O mnie” i kontaktu. Nawigacja działa również po filtrowaniu; aktualne etykiety odczytuje czytnik ekranu.
- Akordeon ma jeden aktywny element. Otwarcie innej pozycji zwija poprzednią, także przy szybkiej zmianie wyboru; trwająca animacja może być płynnie odwrócona. Ograniczony ruch przełącza stan natychmiast.
- Stały przełącznik słońce/księżyc ma semantykę `switch`. Motyw jest zapamiętywany, a osobny `js/theme.js` ustawia go przed pierwszym wyświetleniem CSS. Jasny motyw zmienia tło, tekst, powierzchnie i kontrolki; fotografie i makiety zachowują kolory.
- Menu przechodzi do układu mobilnego przy 1050 px, aby pozostawić miejsce na stały przełącznik. Przy 320 px potwierdzono rozdzielenie obszarów menu i przełącznika.

Weryfikacja w przeglądarce: ostatnia realizacja → specjalizacje → „O mnie” → kontakt i powrót; filtr UX/UI z licznikami 01/02 i 02/02; szybka zmiana specjalizacji i Enter; jasny motyw po odświeżeniu; menu telefonu. Po zakończeniu animacji pozostaje dokładnie jeden otwarty element. Brak przepełnienia przy 320 px. Kontrola składni obu skryptów i lint źródeł przechodzą. Audyt układu 1440/768/390 px: 0 błędów i 4 wcześniejsze ostrzeżenia (skala makiet, powtarzalne kontrolki, demonstracyjne materiały bez wideo, pięciowierszowy akapit na telefonie). Zrzuty: `.taste-skill/theme-navigation/`.

Porównanie z poprzednią wersją: liczba błędów audytu 0 → 0; pełny przełącznik motywu i przejście poza portfolio dodano bez zmiany kompozycji strony. Ocena po obejrzeniu zrzutów: design 8, użyteczność 8, kreatywność 7, treść 6; ograniczeniem pozostają materiały demonstracyjne.

Top three problems (most visible first), each with the screenshot it shows in and the fix:

1. Telefon: stałe przyciski mogły zasłaniać treść. Zarezerwowano węższy pas z prawej strony i zmniejszono kontrolki.
2. Footer: duży napis wymaga miejsca na stałą nawigację. Dopasowano jego skalę do dostępnej szerokości.
3. Intro na telefonie: tekst miał pięć linii. Rozmiar akapitu zmniejszono do 22 px, zachowując treść.
