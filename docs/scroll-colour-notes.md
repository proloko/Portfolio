# Pełne przejście po jednym przewinięciu

Intro, nagłówek realizacji i filtry pozostają jednym blokiem z jednolitym tłem oraz ostrymi granicami. Wysokość, siatka i treści nie zostały zmienione.

Pierwsze wejście bloku na 16 px w ekran przełącza klasę is-revealed. Tło, teksty, licznik i filtry przechodzą razem do jasnej palety przez 1000 ms ease-in-out. Zatrzymanie scrolla nie zatrzymuje animacji — jeden ruch wystarcza do zmiany 0–100%. Kolejne zdarzenia scroll nie restartują przejścia. Przy powrocie do hero klasa jest usuwana, gdy blok niemal opuszcza ekran. Różne progi wejścia i wyjścia ograniczają migotanie na krawędzi.

Czas jest zapisany jako --reveal-duration w css/layout.css. JavaScript jedynie wybiera stan, a przejście wykonuje CSS. Usunięto wcześniejsze obliczanie palety dla każdej pozycji scrolla oraz osobne opóźnienie kolorów tekstu. Pierwsza paleta jest ustawiana bez animacji, również po odświeżeniu strony w środku sekcji. Jasny motyw i ograniczony ruch pozostają statycznie jasne.

Weryfikacja w przeglądarce 1440 × 900: przed przewinięciem góra bloku 900 px i tło rgb(16,17,16). Jeden ruch o 45,6 px ustawia górę na 854,4 px i uruchamia przejście. Zaobserwowano pośrednie tło rgb(51,52,51) oraz tekst rgb(209,211,208), a następnie pełne białe tło i ciemny tekst bez zmiany pozycji bloku. Właściwości CSS tła i tekstu mają czas 1 s. Cofnięcie tego samego ruchu przywraca ciemne tło.

Na telefonie 390 × 844 pojedynczy ruch o 42,4 px zmienia pozycję góry z 844 do 801,6 px i uruchamia pełne rozjaśnienie. Po zakończeniu tło jest białe przy niezmienionej pozycji. Przełącznik ograniczenia ruchu zmienia czas CSS na 0 s, a przywrócenie animacji ponownie daje 1 s. Nie wykryto poziomego przepełnienia.

Audyt 1440/390 px: 0 błędów i 4 dotychczasowe ostrzeżenia dotyczące kontrolki/akordeonu, typografii makiet, brakujących własnych filmów i długości akapitu intro. Zrzuty: .taste-skill/one-scroll-reveal/. Kontrola składni i lint źródeł przechodzą. Materiały demonstracyjne nadal ograniczają ocenę treści; kompozycja pozostaje zgodna z zaakceptowanym układem.
