# Nagłówek przy przewijaniu

Przyczyną znikania napisu „Porozmawiajmy” była reguła `.navigation > a:hover`, która ustawiała kolor tekstu na żółty także na żółtym przycisku. Stan hover przycisku otrzymał jawny kolor `--dark-ink`, z uwzględnieniem wersji mobilnej i fokusu klawiatury.

Nagłówek jest teraz stały. Przy ruchu w dół po opuszczeniu górnej części strony chowa się za górną krawędź; po 8 px ruchu w górę wraca w ciągu 420 ms. Ukrywanie wymaga 18 px ruchu, co ogranicza przypadkowe przełączanie. Na początku strony, przy otwartym menu mobilnym i podczas nawigacji klawiaturą pozostaje widoczny. Przełącznik motywu nadal jest dostępny niezależnie od nagłówka.

Warstwa pod nagłówkiem ma pełną szerokość okna, półprzezroczyste tło, rozmycie i miękko wygaszoną dolną krawędź, zgodnie z referencją użytkownika. Jasny motyw ma białą warstwę, ciemny — ciemną. Tekst i przyciski pozostają nad nią. Układ treści i miejsce na boczne kontrolki zachowano. Ograniczenie animacji wyłącza przejścia przez istniejące reguły globalne.

Logika używa istniejącej aktualizacji `requestAnimationFrame` w `js/main.js`, bez nowego nasłuchiwania kółka i bez przejmowania scrollowania. Test kierunku obejmuje chowanie, pokazywanie, drobne zmiany kierunku, przypięcie otwartego menu, fokus klawiatury, początek strony i sprężyste przewijanie poza jej granice.

Weryfikacja: test logiki kierunku i stanów przeszedł, podobnie linter źródeł. Inspekcja działającej strony przy 1440, 768 i 390 px nie wykazała błędów konsoli ani poziomego przepełnienia. Jasny, odsłonięty nagłówek sprawdzono dodatkowo w izolowanym podglądzie wizualnym, bez sterownika automatycznego chowania; zrzut zapisano w `docs/preview-header.jpg`. Inspekcja całej trasy tego statycznego podglądu zgłasza przykrywanie treści, ponieważ nagłówek celowo pozostaje w nim widoczny. Nie jest to raport działającej logiki strony. Interaktywne sterowanie przeglądarką było niedostępne; zachowanie kierunku sprawdzono osobnym testem, a wygląd renderami przeglądarki.

Lokalna poprawka dla białego intro portfolio: gdy środek nagłówka znajduje się nad jasnym `.work-intro.is-revealed`, klasa `is-over-light-intro` ustawia białe rozmyte tło oraz ciemne napisy i złoty hover linków. Dotyczy również otwartego menu mobilnego. Po opuszczeniu intro wraca paleta wybranego motywu, bez zmiany ustawienia całej strony. Test obejmuje wnętrze sekcji, obie granice i nierozjaśnione intro. Stan palety intro jest aktualizowany przed nagłówkiem w tej samej klatce.
