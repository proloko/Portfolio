# Case study i filtrowanie portfolio

Kategorie przewijają do pierwszego widocznego projektu. Fokus trafia na jego nagłówek bez dodatkowego skoku ekranu. Przewinięcie rozpoczyna się w kolejnej klatce po filtrowaniu. Respektuje zapisany tryb animacji i systemowe ograniczenie ruchu. Stałe strzałki zachowują trasę przez widoczne projekty i pozostałe sekcje.

Pięć specjalizacji korzysta ze strzałek SVG zamiast plusów. Strzałka obraca się po rozwinięciu, a cała powierzchnia modułu nadal obsługuje akordeon z jednym aktywnym elementem.

Każda realizacja prowadzi do własnego pliku HTML w `projekty/`. Układ inspirowany strukturą https://radekjedynak.pl/pl/projekty/sesame: duża prezentacja projektu, metryka, kontekst, podejście i kolejna praca. Teksty, kod i materiały są własne; niczego nie pobrano z referencji. Zastosowano istniejącą typografię Manrope, żółty akcent, wspólną siatkę i oba motywy portfolio.

Podstrony opisują wyłącznie koncepcje demonstracyjne. Nie deklarują badań, klientów ani wyników biznesowych. Obecne makiety HTML pozostają materiałami do podmiany na właściwe zdjęcia, filmy i dokumentację pracy. Flow celowo prezentuje interfejs zamiast przypadkowych fotografii; wyjątek `few-pictures` w inspektorze dotyczy tej demonstracyjnej prezentacji aplikacji. Brak filmu wynika z braku autorskiego materiału wideo. Wyjątek `icon-cards` na stronie głównej zachowuje wskazany przez użytkownika akordeon specjalizacji ze strzałkami. Wiele rozmiarów pisma obejmuje makiety prac oraz responsywne nagłówki istniejącego portfolio.

Podstrony używają wspólnego CSS i małego niezależnego skryptu. Nie ładują skryptu strony głównej ani WebGL. Wszystkie ścieżki są względne i nie wymagają routingu po stronie serwera.

Weryfikacja: składnia obu skryptów poprawna; 89 lokalnych odwołań na pięciu stronach bez brakujących plików i kotwic. Inspekcja strony głównej przy 1440, 768 i 390 px nie wykazała przewijania poziomego, uszkodzonych obrazów ani błędów konsoli. W przeglądarce sprawdzono filtrowanie i fokus na projekcie, pojedynczą aktywną specjalizację, przyciski case study, pełny cykl kolejnych projektów, powrót do właściwej pracy i zapamiętanie jasnego motywu. Dodatkowo sprawdzono podstrony przy 320 px.

Inspektor Flow ma wyjątek `lopsided`: wyśrodkowany telefon i dwie autorskie plansze typograficzne stanowią materiały demonstracyjne, a zasady projektu układają się na tablecie w czytelną pojedynczą kolumnę. Ostrzeżenie o samym tytule projektu jest fałszywym alarmem: bezpośrednio poniżej nazwy widnieje opis „UX/UI aplikacji wspierającej codzienne nawyki”. Pięciowierszowy opis istniejącego intro na telefonie zachowano zgodnie z wcześniejszym układem i treścią użytkownika.
