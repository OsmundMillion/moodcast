# 🌤️ Moodcast
> Enter any city. Get its current vibe, beautifully captured.

A browser-based weather mood board generator. Type any city name, and Moodcast fetches live weather data and renders a stunning, downloadable card with a color palette, mood label, and vibe text that matches the actual conditions outside.

![Built with JavaScript](https://img.shields.io/badge/Built%20with-JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML-5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS-3-1572B6?style=flat&logo=css3&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen?style=flat)
![Platform: Browser](https://img.shields.io/badge/Platform-Browser-4285F4?style=flat&logo=googlechrome&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)

**[→ Live Demo](https://moodcast.vercel.app/)**

## 📸 Preview

![Preview](./assets/screenshot.png)

## ✨ Features

- **Live weather data** — powered by Open-Meteo, fully free with no API key required
- **Mood mapping** — 23 WMO weather codes each mapped to a unique color palette, mood label, and vibe line
- **Dynamic backgrounds** — ambient blobs on the page shift color to match the city's weather on every search
- **Temperature toggle** — switch between Celsius and Fahrenheit without re-fetching
- **Download as PNG** — exports a high-quality 3x resolution card, ready to share
- **Extreme temperature overrides** — scorching heat and deep freeze get their own distinct palettes
- **Fully responsive** — works cleanly on desktop, tablet, and mobile
- **Zero dependencies** — vanilla HTML, CSS, and JavaScript (except html2canvas for PNG export)

## 📁 File Structure

```
weather-moodboard/
├── index.html          # App shell, search input, card markup
├── style.css           # All styling, layout, animations, card design
└── js/
    ├── weather-map.js  # WMO codes mapped to palettes, moods, and vibe text
    ├── api.js          # Geocoding and weather fetch functions (Open-Meteo)
    ├── card.js         # Card render logic and palette injection
    └── app.js          # Main entry point, wires search to API to card
```

## 🛠️ Tech Used

| What | Why |
|------|-----|
| Vanilla JS (ES6 modules) | No framework overhead for a project this size |
| Open-Meteo Geocoding API | Free city name to lat/lng conversion, no key needed |
| Open-Meteo Weather API | Free live weather data, no key needed |
| CSS custom properties | Single-source theming, blob colors driven by JS at runtime |
| Fraunces + DM Sans | Google Fonts, editorial serif paired with a clean body font |
| html2canvas 1.4.1 | DOM-to-canvas for the PNG download feature |

## 🌍 How It Works

```
User types a city name
        ↓
Open-Meteo Geocoding → lat, lng, country, timezone
        ↓
Open-Meteo Weather → temperature, weather code, humidity, wind, feels like
        ↓
weather-map.js → maps code to palette, mood label, vibe text
        ↓
card.js → renders card, injects gradient and colors
        ↓
Download as PNG
```

## 👤 Author

Made with ♥ by **[Osmund](https://github.com/OsmundMillion)** — © 2026

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.