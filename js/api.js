// api.js
// Handles all external API calls — geocoding and weather fetching
// Uses Open-Meteo (free, no API key required)

const GEO_BASE_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast";

/**
 * Geocode a city name → lat, lng, country, timezone
 * @param {string} cityName
 * @returns {Promise<object>} - { name, country, countryCode, latitude, longitude, timezone }
 */
async function geocodeCity(cityName) {
  const params = new URLSearchParams({
    name: cityName.trim(),
    count: 1,
    language: "en",
    format: "json",
  });

  const response = await fetch(`${GEO_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.status}`);
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error(`City not found: "${cityName}". Try a different spelling.`);
  }

  const result = data.results[0];

  return {
    name: result.name,
    country: result.country,
    countryCode: result.country_code,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
  };
}

/**
 * Fetch current weather for a lat/lng location
 * @param {number} latitude
 * @param {number} longitude
 * @param {string} timezone
 * @returns {Promise<object>} - Parsed weather data
 */
async function fetchWeather(latitude, longitude, timezone) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone,
    current_weather: true,
    hourly: "relativehumidity_2m,apparent_temperature,precipitation_probability",
    forecast_days: 1,
  });

  const response = await fetch(`${WEATHER_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.status}`);
  }

  const data = await response.json();
  const cw = data.current_weather;

  // Hourly data is returned as arrays — find the index closest to current time
  const currentHour = new Date(cw.time).getHours();
  const hourlyTimes = data.hourly.time.map((t) => new Date(t).getHours());
  const hourIndex = hourlyTimes.findIndex((h) => h === currentHour) ?? 0;

  const humidity = data.hourly.relativehumidity_2m[hourIndex] ?? null;
  const feelsLikeC = data.hourly.apparent_temperature[hourIndex] ?? null;
  const precipChance = data.hourly.precipitation_probability[hourIndex] ?? null;

  return {
    temperatureC: cw.temperature,
    temperatureF: celsiusToFahrenheit(cw.temperature),
    feelsLikeC,
    feelsLikeF: feelsLikeC !== null ? celsiusToFahrenheit(feelsLikeC) : null,
    windspeedKph: cw.windspeed,
    windspeedMph: kphToMph(cw.windspeed),
    weatherCode: cw.weathercode,
    isDay: cw.is_day === 1,
    humidity,
    precipChance,
    time: cw.time,
  };
}

/**
 * Main function — takes a city name, returns everything needed for the card
 * @param {string} cityName
 * @returns {Promise<object>} - { location, weather }
 */
async function getWeatherForCity(cityName) {
  const location = await geocodeCity(cityName);
  const weather = await fetchWeather(
    location.latitude,
    location.longitude,
    location.timezone
  );

  return { location, weather };
}

// --- Helpers ---

function celsiusToFahrenheit(c) {
  return Math.round((c * 9) / 5 + 32);
}

function kphToMph(kph) {
  return Math.round(kph * 0.621371);
}

export { getWeatherForCity, geocodeCity, fetchWeather };