# Proces

Sekcja `#proces` znajduje się po specjalizacjach, przed stopką kontaktową. Wspólna siatka, boczny opis, duży trzywierszowy tytuł oraz trzy numerowane panele nawiązują do referencji użytkownika i sekcji „O mnie”. Treść jest dostosowana do specjalizacji portfolio; nie skopiowano deklaracji dotyczących agentów AI, developmentu ani portalu klienta z cudzej strony.

Etapy: zrozumienie → projektowanie → przekazanie. Treści edytuje się bezpośrednio w `index.html`, wygląd w `css/process.css`. Na telefonie etapy tworzą jedną kolumnę. Hover podświetla panel i numer etapu, bez przesuwania tekstu. Animacja respektuje globalne ograniczenie ruchu. Oba motywy korzystają z istniejących tokenów palety. Sekcja nie wymaga własnego JavaScript; aktualizacja w `js/main.js` dodaje ją do trasy bocznych przycisków.

Wyjątki inspektora `numbering`, `hairline` i `headline-lines` odpowiadają wprost referencji: numerom etapów, obrysom paneli i trzywierszowemu tytułowi. Dotychczasowe wyjątki dla obrazów SVG i przewijanej listy klientów zachowano.

Kontrola: poprawna składnia JavaScript, brak zastrzeżeń lintera źródeł. Inspekcja przy 1440, 768 i 390 px nie wykazała przewijania strony w poziomie, uszkodzonych obrazów ani błędów konsoli. Zrzuty sprawdzono wizualnie na wszystkich trzech szerokościach. Wprowadzenie zachowuje większą skalę i pięciowierszową kompozycję na komputerze zgodnie z referencją. Pozostałe ostrzeżenia inspektora dotyczą zachowanego portfolio: wielu rozmiarów typografii, braku materiału wideo i celowo przewijanej listy klientów.
