# Spokojne tło i wspólna siatka

Opis przejść poniżej dokumentuje poprzedni etap. Aktualna wersja łączy intro i nagłówek portfolio oraz zmienia ich jednolity kolor podczas przewijania; szczegóły znajdują się w `scroll-colour-notes.md`.

Zgodnie z prośbą użytkownika spowolniono falowanie: czas shadera 0,16 → 0,055, wpływ myszy 0,12 → 0,035, a siła deformacji 0,38 → 0,20. Wygładzanie ruchu myszy jest wolniejsze. Zapasowe SVG ma cykl 40 zamiast 18 sekund i mniejszy zakres ruchu.

Maska tła osiąga pełną przezroczystość przy 67% wysokości hero. Dolna część pozostaje jednolita i łączy się z pierwszym kolorem gradientu intro. Shader dodatkowo tłumi dolne światło i ziarno. Efekt nie przykrywa opisów ani przycisków.

Nowy `css/layout.css` definiuje jedną ramkę do 1440 px oraz siatkę 12/4 kolumn. Dotychczasowe komponenty i treści pozostają w swoich plikach; nagłówek, sekcje i stopka korzystają ze wspólnego systemu. W intro i stopce dodano wewnętrzne ramki, aby tło mogło sięgać do krawędzi ekranu. Makieta Orbit i typografia stopki zostały dopasowane do szerokości kontenerów.

Intro jest białe w obu motywach. Gradienty przed i po białej części zajmują własne miejsce, bez przykrywania treści. W jasnym motywie mają białe wypełnienie i zachowują wysokość, dzięki czemu przełącznik motywu nie zmienia położenia sekcji. To świadomy wyjątek od reguły umiejętności projektowej dotyczącej gradientów, wynikający z bezpośredniej prośby użytkownika.

Pomiary w interfejsie: przy 1440 px wszystkie ramki mają tę samą lewą krawędź 51,84 px i szerokość 1269,11 px (z uwzględnieniem paska przewijania i miejsca na strzałki). Przy 2560 px szerokość ramki wynosi 1440 px. Przy 320 px ramka stopki ma 226,8 px, a napis skaluje się do 38,56 px i mieści się w kontenerze. Nie wykryto poziomego przepełnienia. Białe intro: `rgb(255, 255, 255)`; tekst: `rgb(23, 26, 23)`.

Audyt 1440/1920/768/390 px: 0 błędów, 4 dotychczasowe ostrzeżenia (kontrolki i akordeon, typografia makiet, brak własnych filmów oraz długość akapitu intro na telefonie). Zrzuty i raport: `.taste-skill/calm-grid-final/`. Wymagane gradienty i numeracja są świadomymi wyjątkami. Materiały demonstracyjne nadal ograniczają ocenę treści. Ocena po weryfikacji wizualnej: design 8, użyteczność 8, kreatywność 8, treść 6.

Po końcowej poprawce mobilna górna część stopki układa opis i przełącznik animacji w jednej kolumnie. Przy 320 px potwierdzono brak przepełnienia, poprawne dopasowanie tytułu i odstęp między menu a przełącznikiem motywu. Zmiana motywu zachowuje geometrię: wysokość intro 653 px oraz początek portfolio 1413 px przed i po przełączeniu. Konsola przeglądarki nie zgłasza błędów JavaScript. Końcowy lint siedmiu plików źródłowych przechodzi po uwzględnieniu wymaganych efektów wizualnych.
