# Animowany pierwszy ekran

Referencja kompozycji i ruchu: [radekjedynak.pl](https://radekjedynak.pl/). Zachowano własną treść „Design z myślą o efekcie”, Manrope, żółć `#f5db4b`, oba motywy i działającą nawigację. Kod, shader, ikona gwiazdki i tło zapasowe są lokalne; nie przeniesiono skryptów ani materiałów referencji.

## Zmiany

- Zamiast fotografii: proceduralny materiał WebGL, powoli zmieniający kształt i reagujący na mysz. Ciemniejszy dolny obszar chroni czytelność podpisu i przycisków. Jasny wariant bazuje na bieli.
- Duży wyśrodkowany nagłówek z przesuwającym się akcentem koloru oraz obracającą się gwiazdką. Tekst ma stałe położenie i nie zmienia wymiarów w trakcie efektu.
- Pod nagłówkiem: podpis, ikony Dribbble/Behance/LinkedIn, opis oraz odnośniki do realizacji i kontaktu. Ikony nie udają linków, dopóki nie zostaną podane własne adresy profili.
- Nowe pliki `css/hero.css` i `js/hero.js`. Usunięto wcześniejsze style zdjęcia, jego warianty mobilne i obsługę paralaksy fotografii z `main.js`.
- Bufor ograniczony do szerokości 1200 px i skali 1,25; maksymalnie 30 renderowanych klatek/s. IntersectionObserver i widoczność dokumentu zatrzymują pętlę poza ekranem. Statyczny kadr przy ograniczonym ruchu; zapasowe SVG przy braku WebGL lub bez JS.

Gradient tekstu i ruch abstrakcyjnego tła są świadomymi wyjątkami od reguł umiejętności projektowej, zgodnie z bezpośrednią prośbą użytkownika. Monochromatyczny znak `a.` nawiązuje do istniejącej tymczasowej ikony strony; nie zastępuje logotypu tekstowego.

## Weryfikacja w przeglądarce

WebGL uruchamia się poprawnie, bez błędów JavaScript. Oba motywy sprawdzono wizualnie. Przy 320 px brak poziomego przepełnienia; treść mieści się w pierwszym ekranie o wysokości 760 px, a podpis kończy się przed dolną krawędzią. Po ograniczeniu ruchu stan odtwarzania tła zmienia się na wyłączony. Po przywróceniu pełnych animacji poza pierwszym ekranem tło pozostaje zatrzymane; wznowienie następuje po powrocie.

W porównaniu z poprzednią wersją nagłówek na komputerze wzrósł ze 122 do 131 px, waga zmieniła się z 750 na 600, a liczba obrazów strony spadła z 6 do 5 dzięki zastąpieniu fotografii proceduralnym tłem. Zrzuty i pomiary: `.taste-skill/abstract-hero-final/`. Własne prace i adresy profili pozostają do uzupełnienia przez właściciela portfolio.

Końcowy audyt: 0 błędów, 4 znane ostrzeżenia dotyczące całej strony (powtarzalne kontrolki, rozmiary typografii makiet, brak właściwych filmów projektowych i pięć linii akapitu intro na telefonie). Lint sześciu plików źródłowych: 0 błędów. Zapasowy wariant bez WebGL sprawdzono osobno na 390 px w jasnym motywie: 0 błędów, 2 ostrzeżenia dotyczące wielkości typografii i akapitu intro. Przejścia do realizacji i kontaktu oraz powrót strzałkami potwierdzono w interfejsie.

Ocena po obejrzeniu zrzutów: design 8, użyteczność 8, kreatywność 8, treść 6. Pierwszy ekran ma wyraźniejszą kompozycję, a materiał tła pracuje bez przesuwania tekstu. Najważniejsze pozostałe ograniczenia: materiały demonstracyjne, brak adresów profili i kontrast nagłówka zależny od wybranej klatki tła; dolny obszar został celowo przyciemniony. Świadome wyjątki: animowany materiał, gwiazdka i akcent tekstu wynikają z przekazanej referencji oraz prośby użytkownika.
