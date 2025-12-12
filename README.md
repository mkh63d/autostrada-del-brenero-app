# Trento Attractions PWA

Progressive Web App do zarządzania lokalnymi atrakcjami w Trydencie (muzea, doświadczenia).

## Funkcje

- ✨ **PWA** - Możliwość instalacji jako aplikacja mobilna
- 🌍 **Internacjonalizacja** - Wsparcie dla języków: angielski, polski, włoski
- 💾 **Lokalna baza danych** - IndexedDB do przechowywania danych offline
- 📱 **Responsywny design** - Dostosowany do urządzeń mobilnych i desktopowych
- ⚡ **Nuxt 3** + **Vue.ts** + **Tailwind CSS**

## Funkcjonalności

- Przeglądanie listy atrakcji
- Dodawanie nowych atrakcji (muzea, doświadczenia)
- Szczegółowe widoki atrakcji
- Edycja i usuwanie atrakcji
- Przełączanie języków (EN/PL/IT)
- Działanie offline
- Instalacja jako aplikacja PWA

## Instalacja

```bash
# Zainstaluj zależności
npm install

# Uruchom serwer deweloperski
npm run dev

# Build dla produkcji
npm run build

# Podgląd buildu produkcyjnego
npm run preview
```

## Technologie

- **Nuxt 3** - Framework Vue.js
- **TypeScript** - Typowanie
- **Tailwind CSS** - Style
- **@nuxtjs/i18n** - Internacjonalizacja
- **@vite-pwa/nuxt** - Progressive Web App
- **localforage** - IndexedDB wrapper

## Struktura projektu

```
trento-attractions/
├── app/
│   └── app.vue           # Główny komponent
├── assets/
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
│   └── icon-512x512.svg # Ikona PWA 512x512
├── types/
│   └── attraction.ts    # Typy TypeScript
└── nuxt.config.ts       # Konfiguracja Nuxt

```

## Użycie

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
