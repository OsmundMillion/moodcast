// card.js
// Renders weather data into the card DOM and applies dynamic palette

// --- DOM References ---
const cardEl = document.getElementById("weather-card");
const cardCity = document.getElementById("card-city");
const cardCountry = document.getElementById("card-country");
const cardIcon = document.getElementById("card-icon");
const cardTemp = document.getElementById("card-temp");
const cardFeels = document.getElementById("card-feels");
const cardMood = document.getElementById("card-mood");
const cardVibe = document.getElementById("card-vibe");
const statHumidity = document.getElementById("stat-humidity");
const statWind = document.getElementById("stat-wind");
const statPrecip = document.getElementById("stat-precip");
const cardCondition = document.getElementById("card-condition");
const cardTime = document.getElementById("card-time");

/**
 * Main render function — populates all card fields and applies palette
 * @param {object} param0 - { location, weather, mood, unit }
 */
function renderCard({ location, weather, mood, unit = "C" }) {
  // Location
  cardCity.textContent = location.name;
  cardCountry.textContent = `${location.country}`;

  // Icon
  cardIcon.textContent = mood.icon;

  // Temperature
  updateTemperature(unit, weather);

  // Mood + Vibe
  cardMood.textContent = mood.mood;
  cardVibe.textContent = mood.vibe;

  // Stats
  statHumidity.textContent = weather.humidity !== null ? `${weather.humidity}%` : "—";
  statWind.textContent =
    unit === "C"
      ? `${Math.round(weather.windspeedKph)} km/h`
      : `${weather.windspeedMph} mph`;
  statPrecip.textContent =
    weather.precipChance !== null ? `${weather.precipChance}%` : "—";

  // Condition + timestamp
  cardCondition.textContent = mood.label;
  cardTime.textContent = formatTime(weather.time, location.timezone);

  // Apply palette
  applyPalette(mood.palette);
}

/**
 * Update only the temperature fields (used by unit toggle)
 * @param {string} unit - "C" or "F"
 * @param {object} weather
 */
function updateTemperature(unit, weather) {
  if (unit === "C") {
    cardTemp.textContent = `${Math.round(weather.temperatureC)}°C`;
    cardFeels.textContent =
      weather.feelsLikeC !== null
        ? `Feels like ${Math.round(weather.feelsLikeC)}°C`
        : "";
  } else {
    cardTemp.textContent = `${weather.temperatureF}°F`;
    cardFeels.textContent =
      weather.feelsLikeF !== null
        ? `Feels like ${weather.feelsLikeF}°F`
        : "";
  }
}

/**
 * Called by app.js when unit toggle is clicked
 * @param {string} unit - "C" or "F"
 * @param {object} currentData - { location, weather, mood }
 */
function setUnit(unit, { weather }) {
  updateTemperature(unit, weather);

  // Also update wind speed
  statWind.textContent =
    unit === "C"
      ? `${Math.round(weather.windspeedKph)} km/h`
      : `${weather.windspeedMph} mph`;
}

/**
 * Apply a weather palette to the card and page background blobs
 * @param {object} palette - { bg: [color1, color2, color3], text, accent, card }
 */
function applyPalette(palette) {
  const [c1, c2, c3] = palette.bg;

  // Card gradient
  cardEl.style.background = `linear-gradient(135deg, ${c1}, ${c2}, ${c3})`;
  cardEl.style.color = palette.text;

  // Accent elements inside the card
  cardEl.style.setProperty("--card-accent", palette.accent);
  cardEl.style.setProperty("--card-text", palette.text);
  cardEl.style.setProperty("--card-tint", palette.card);

  // Update divider and stat colors
  const divider = cardEl.querySelector(".card-divider");
  if (divider) divider.style.background = palette.accent + "55";

  const statIcons = cardEl.querySelectorAll(".stat-icon");
  statIcons.forEach((el) => (el.style.opacity = "0.8"));

  const statLabels = cardEl.querySelectorAll(".stat-label");
  statLabels.forEach((el) => (el.style.color = palette.accent));

  const watermark = cardEl.querySelector(".card-watermark");
  if (watermark) watermark.style.color = palette.accent + "88";

  const footer = cardEl.querySelector(".card-footer");
  if (footer) footer.style.color = palette.accent + "cc";

  const unitToggle = cardEl.querySelector(".unit-toggle");
  if (unitToggle) {
    unitToggle.style.borderColor = palette.accent + "66";
    unitToggle.style.color = palette.accent;
  }

  // Animate background blobs to match palette
  document.documentElement.style.setProperty("--blob-1", c1);
  document.documentElement.style.setProperty("--blob-2", c2);
  document.documentElement.style.setProperty("--blob-3", c3 || c1);

  // Animate card entrance
  cardEl.classList.remove("card-enter");
  void cardEl.offsetWidth; // force reflow
  cardEl.classList.add("card-enter");
}

/**
 * Format the weather timestamp into a readable string
 * @param {string} isoTime - ISO time string from Open-Meteo
 * @param {string} timezone - IANA timezone string
 * @returns {string} - e.g. "3:00 PM · Tue 12 May"
 */
function formatTime(isoTime, timezone) {
  try {
    const date = new Date(isoTime);
    const timeStr = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone,
    });
    const dateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: timezone,
    });
    return `${timeStr} · ${dateStr}`;
  } catch {
    return isoTime;
  }
}

export { renderCard, setUnit };