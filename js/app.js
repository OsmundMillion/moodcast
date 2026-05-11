// app.js
// Main entry point — wires up search → API → card render

import { getWeatherForCity } from "./api.js";
import { getWeatherMood } from "./weather-map.js";
import { renderCard, setUnit } from "./card.js";

// --- DOM References ---
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const errorMsg = document.getElementById("error-msg");
const errorText = document.getElementById("error-text");
const loading = document.getElementById("loading");
const cardSection = document.getElementById("card-section");
const downloadBtn = document.getElementById("download-btn");
const newSearchBtn = document.getElementById("new-search-btn");
const unitToggle = document.getElementById("unit-toggle");

// --- App State ---
let currentUnit = "C"; // "C" or "F"
let currentData = null; // last successful fetch result

// --- Event Listeners ---

// Search on button click
searchBtn.addEventListener("click", handleSearch);

// Search on Enter key
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

// Unit toggle (°C / °F)
unitToggle.addEventListener("click", () => {
  currentUnit = currentUnit === "C" ? "F" : "C";
  unitToggle.textContent = currentUnit === "C" ? "°C / °F" : "°F / °C";
  if (currentData) {
    setUnit(currentUnit, currentData);
  }
});

// Download card as PNG
downloadBtn.addEventListener("click", handleDownload);

// Reset to search
newSearchBtn.addEventListener("click", resetToSearch);

// --- Core Flow ---

async function handleSearch() {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  showLoading();

  try {
    const { location, weather } = await getWeatherForCity(city);
    const mood = getWeatherMood(weather.weatherCode, weather.temperatureC);

    currentData = { location, weather, mood };

    renderCard({ location, weather, mood, unit: currentUnit });
    showCard();
  } catch (err) {
    showError(err.message || "Something went wrong. Please try again.");
  }
}

async function handleDownload() {
  const card = document.getElementById("weather-card");

  // Temporarily hide the unit toggle button from the export
  unitToggle.style.display = "none";

  try {
    downloadBtn.textContent = "Generating...";
    downloadBtn.disabled = true;

    const canvas = await html2canvas(card, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.getElementById("weather-card");
        const original = document.getElementById("weather-card");
        const computed = window.getComputedStyle(original);

        // Copy inline gradient and text color directly
        clonedCard.style.background = original.style.background;
        clonedCard.style.color = original.style.color;

        // Resolve CSS variables into concrete values on the clone
        clonedCard.style.setProperty(
          "--card-accent",
          computed.getPropertyValue("--card-accent").trim()
        );
        clonedCard.style.setProperty(
          "--card-text",
          computed.getPropertyValue("--card-text").trim()
        );
        clonedCard.style.setProperty(
          "--card-tint",
          computed.getPropertyValue("--card-tint").trim()
        );
      },
    });

    const link = document.createElement("a");
    const cityName = currentData?.location?.name || "weather";
    link.download = `moodcast-${cityName.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } catch (err) {
    showError("Download failed. Please try again.");
  } finally {
    unitToggle.style.display = "";
    downloadBtn.innerHTML = "<span>↓</span> Download Card";
    downloadBtn.disabled = false;
  }
}

// --- UI State Helpers ---

function showLoading() {
  hideAll();
  loading.hidden = false;
  searchBtn.disabled = true;
  searchBtn.querySelector(".btn-text").textContent = "Loading...";
}

function showCard() {
  hideAll();
  cardSection.hidden = false;
}

function showError(message) {
  hideAll();
  errorText.textContent = message;
  errorMsg.hidden = false;
  searchBtn.disabled = false;
  searchBtn.querySelector(".btn-text").textContent = "Get Vibe";
}

function resetToSearch() {
  hideAll();
  cityInput.value = "";
  cityInput.focus();
  searchBtn.disabled = false;
  searchBtn.querySelector(".btn-text").textContent = "Get Vibe";
  currentData = null;

  // Reset background blobs to default
  document.documentElement.style.removeProperty("--blob-1");
  document.documentElement.style.removeProperty("--blob-2");
  document.documentElement.style.removeProperty("--blob-3");
}

function hideAll() {
  loading.hidden = true;
  cardSection.hidden = true;
  errorMsg.hidden = true;
}

// --- Init ---
cityInput.focus();