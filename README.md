# Trento Attractions PWA 🏔️

Progressive Web App do odkrywania lokalnych atrakcji w okolicy Autostrady del Brennero (A22) - muzea, doświadczenia, punkty widokowe i więcej.

## ✨ Główne funkcje

- 🗺️ **Geolokalizacja** - Automatyczne obliczanie odległości od Twojej lokalizacji
- 🛣️ **Informacje o autostradzie A22** - Zjazdy i dodatkowe odległości od autostrady
- 🧭 **Nawigacja** - Integracja z Google Maps i Waze
- 📍 **Mapy tras** - Wizualizacja trasy do wybranych atrakcji
- ✨ **PWA** - Możliwość instalacji jako aplikacja mobilna
- 🌍 **Internacjonalizacja** - Pełne wsparcie dla 3 języków (EN/PL/IT)
- 💾 **Lokalna baza danych** - IndexedDB - wszystkie dane offline
- 📱 **Responsywny design** - Dopasowany do mobile i desktop
- ⚡ **Nuxt 4** + **Vue 3** + **TypeScript** + **Tailwind CSS**

## 🎯 Funkcjonalności

### Przeglądanie i zarządzanie
- 📋 Lista wszystkich atrakcji z filtrowaniem po typie
- ➕ Dodawanie nowych atrakcji z pełnymi danymi GPS
- 🔍 Szczegółowe widoki z informacjami o dojazdu
- ✏️ Edycja i usuwanie atrakcji
- 🌐 Przełączanie języków (EN/PL/IT)

### Lokalizacja i nawigacja
- 📍 Automatyczne wykrywanie Twojej lokalizacji
- 📏 Obliczanie odległości (wzór Haversine)
- ⏱️ Szacowanie czasu podróży
- 🛣️ Informacje o zjazdach z A22 Brennero
- 🗺️ Interaktywne mapy z trasą (Google Maps)
- 🚗 Bezpośrednie linki do Google Maps i Waze

### Tryb offline
- 💾 Wszystkie dane zapisane lokalnie
- 🔄 Pełna funkcjonalność bez internetu
- 📱 Instalacja jako natywna aplikacja PWA

## 🚀 Instalacja i uruchomienie

```bash
# Sklonuj repozytorium
git clone <repository-url>
cd trento-attractions

# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev
# Aplikacja dostępna na http://localhost:3000

# Build dla produkcji
npm run build

# Podgląd buildu produkcyjnego
npm run preview

# Generowanie statycznej strony
npm run generate
```

## 🛠️ Technologie
📁 Struktura projektu

```
trento-attractions/
├── app.vue                        # Główny komponent aplikacji
├── assets/
│   └── css/
│       └── tailwind.css          # Style Tailwind CSS
├── components/
│   └── RouteMap.vue              # Komponent mapy z trasą i nawigacją
├── composables/
│   ├── useAttractions.ts         # CRUD operations (IndexedDB)
│   └── useGeolocation.ts         # Geolokalizacja i kalkulacje odległości
├── i18n/
│   └── locales/
│       ├── en.json               # Tłumaczenia angielskie
│       ├── pl.json               # Tłumaczenia polskie
│       └── it.json               # Tłumaczenia włoskie
├── layouts/
│   └── default.vue               # Layout z nawigacją i switcher języka
├── pages/
│   ├── index.vue                 # Lista atrakcji z odległościami
│   ├── add.vue                   # Formularz dodawania (GPS + A22)
│   └── attraction/
│       └── [id].vue              # Szczegóły/edycja + mapa trasy
├── plugins/
│   └── initData.client.ts        # Inicjalizacja przykładowych danych
├── public/
│   ├── icon-192x192.svg          # Ikona PWA 192x192
│   ├── icon-512x512.svg          # Ikona PWA 512x512
│   └── robots.txt                # SEO
├── types/
│   └── attraction.ts             # TypeScript types i interfaces
├── nuxt.config.ts                # Konfiguracja Nuxt
├── tailwind.config.js            # Konfiguracja Tailwind
└── tsconfig.json                 # Konfiguracja TypeScript├── assets/
│   └── css/
│       └── tailwind.css  # Style Tailwind
├── composables/
│   └── useAttractions.ts # Logika zarządzania danymi
├── layouts/
│   └── default.vue       # Layout z nawigacją
├── locales/
│   ├── en.json          # Tłumaczenia angielskie
│   ├── pl.json          # Tłumaczenia polskie
│   └── it.json          # Tłumaczenia włoskie
├── pages/
│   ├── index.vue        # Strona główna z listą
│   ├── add.vue          # Formularz dodawania
│   └── attraction/
│       └── [id].vue     # Szczegóły/edycja atrakcji
├── public/
│   ├── icon-192x192.svg # Ikona PWA 192x192
│  📖 Jak używać

### Podstawowe funkcje
1. **Przeglądanie atrakcji**
   - Otwórz stronę główną
   - Zezwól na dostęp do lokalizacji (opcjonalnie)
   - Zobacz listę z automatycznie obliczonymi odległościami
   - Filtruj po typie: Muzea / Doświadczenia

2. **Dodawanie nowej atrakcji**
   - Kliknij "Dodaj atrakcję"
   - Wypełnij formularz (nazwa, opis, typ, adres)
   - Opcjonalnie dodaj: telefon, strona WWW, godziny, cena
   - **GPS**: Dodaj współrzędne (lat/lng)
   - **Autostrada**: Podaj zjazd z A22 i odległość od zjazdu
   - Zapisz

3. **Szczegóły i nawigacja**
   - Kliknij na wybraną atrakcję
   - Zobacz pełne informacje + "Jak dojechać"
   - Kliknij "Pokaż trasę na mapie" aby zobaczyć:
   💾 Baza danych

Aplikacja używa **IndexedDB** (via localforage) do przechowywania danych lokalnie w przeglądarce:

- ✅ Wszystkie dane dostępne offline
- ✅ Nie wymaga konfiguracji serwera
- ✅ Automatyczne zapisywanie zmian
- ✅ Brak limitów liczby rekordów
- ✅ Przykładowe dane ładowane przy pierwszym uruchomieniu

### Wyczyść bazę danych
```javascript
// Otwórz konsolę przeglądarki (F12) i wklej:
localforage.clear().then(() => location.reload())
```

## 🗺️ Geolokalizacja

### Jak to działa
1. Aplikacja prosi o pozwolenie na lokalizację
2. Pobiera współrzędne GPS użytkownika
3. Oblicza odległość do każdej atrakcji (wzór Haversine)
4. Szacuje czas podróży na podstawie odległości
5. Wyświetla informacje o zjeździe z A22

### Funkcje geolokalizacji
- 📍 Automatyczne wykrywanie lokalizacji
- 📏 Dokładne obliczenia odległości w km
- ⏱️ Szacowanie czasu (autostrada 90km/h, lokalne 50km/h)
- 🗺️ Integracja z mapami (Google Maps, Waze)
- 🛣️ Informacje o Autostradzie del Brennero (A22)

## 🛣️ Autostrada del Brennero (A22)

Aplikacja jest zoptymalizowana dla podróżujących Autostradą del Brennero (A22):

- Każda atrakcja zawiera informację o najbliższym zjeździe
- Wyświetlana dodatkowa odległość od zjazdu
- Szacowany czas dojazdu od zjazdu
- Przykładowe zjazdy: Trento Centro, Rovereto Sud, etc.

## 🔧 Konfiguracja

### Zmiana języka domyślnego
W `nuxt.config.ts`:
```typescript
i18n: {
  defaultLocale: 'pl', // Zmień na 'en' lub 'it'
}
```

### PWA Manifest
Edytuj `nuxt.config.ts` > `pwa` > `manifest` aby zmienić:
- Nazwę aplikacji
- Opis
- Kolory motywu
- Ikony

### Google Maps API
Dla produkcji zamień klucz API w `components/RouteMap.vue`:
```typescript
const mapUrl = computed(() => {
  // Zmień AIzaSy... na swój klucz
  return `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY...`
})
```

## 📱 Instalacja PWA

### Na urządzeniach mobilnych (Android/iOS)
1. Otwórz aplikację w przeglądarce
2. W menu wybierz "Dodaj do ekranu głównego"
3. Potwierdź instalację
4. Aplikacja pojawi się na ekranie głównym

### Na komputerze (Chrome/Edge)
1. W pasku adresu kliknij ikonę instalacji PWA ⊕
2. Potwierdź "Zainstaluj"
3. Aplikacja otworzy się w osobnym oknie
4. Dodana do listy aplikacji systemu

## 🌍 Przykładowe dane

Aplikacja zawiera 5 przykładowych atrakcji:

1. **MUSE - Museo delle Scienze** (Muzeum)
2. **Castello del Buonconsiglio** (Muzeum) 
3. **Piazza Duomo** (Doświadczenie)
4. **Monte Bondone** (Doświadczenie)
5. **Lago di Garda** (Doświadczenie)

Wszystkie z pełnymi danymi GPS i informacjami o A22.

## 🐛 Debugowanie

### Problem: Brak lokalizacji
- Sprawdź uprawnienia przeglądarki
- Użyj HTTPS (geolocation wymaga bezpiecznego połączenia)
- W Chrome: Settings > Privacy > Location

### Problem: Nie ładują się dane
```javascript
// Konsola przeglądarki (F12):
localforage.keys().then(console.log) // Sprawdź klucze
localforage.clear()                   // Wyczyść i odśwież
```

### Problem: Mapa się nie wyświetla
- Sprawdź konsolę (F12) czy są błędy
- Dla produkcji użyj własnego Google Maps API key

## 🚀 Deployment

Zobacz [DEPLOYMENT.md](DEPLOYMENT.md) dla szczegółowych instrukcji deploymentu na:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

## 📄
4. **Edycja i usuwanie**
   - W widoku szczegółów kliknij "Edytuj"
   - Zmień dane i zapisz
   - Lub kliknij "Usuń" aby usunąć atrakcję

5. **Zmiana języka**
   - Użyj selektora w górnym menu (EN/PL/IT)
   - Interfejs zmieni się natychmiast

1. **Dodawanie atrakcji** - Kliknij przycisk "Dodaj atrakcję" i wypełnij formularz
2. **Przeglądanie** - Lista wszystkich atrakcji na stronie głównej
3. **Szczegóły** - Kliknij na atrakcję aby zobaczyć pełne informacje
4. **Edycja** - W widoku szczegółów kliknij "Edytuj"
5. **Usuwanie** - W widoku szczegółów kliknij "Usuń"
6. **Zmiana języka** - Użyj selektora języka w górnym menu

## Instalacja PWA

### Na urządzeniach mobilnych:
1. Otwórz aplikację w przeglądarce
2. W menu przeglądarki wybierz "Dodaj do ekranu głównego"
3. Aplikacja zostanie zainstalowana jako natywna aplikacja

### Na komputerze:
1. W pasku adresu pojawi się ikona instalacji PWA
2. Kliknij i potwierdź instalację
3. Aplikacja otworzy się w osobnym oknie

## Baza danych

Aplikacja używa **IndexedDB** do przechowywania danych lokalnie w przeglądarce. Wszystkie dane są zapisywane offline i synchronizowane automatycznie.

## Licencja

MIT
