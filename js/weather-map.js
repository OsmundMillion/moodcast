// weather-map.js
// Maps WMO weather codes → palette, mood label, vibe text, and icon

const WEATHER_MAP = {
  0: {
    label: "Clear Sky",
    mood: "Golden Hour",
    vibe: "Go touch grass. It's beautiful out.",
    icon: "☀️",
    palette: {
      bg: ["#f9a825", "#fb8c00", "#ff7043"],
      text: "#1a0a00",
      accent: "#fff3e0",
      card: "rgba(255, 248, 220, 0.15)",
    },
  },

  1: {
    label: "Mostly Clear",
    mood: "Laid Back",
    vibe: "Blue skies with room to breathe.",
    icon: "🌤️",
    palette: {
      bg: ["#64b5f6", "#42a5f5", "#f9a825"],
      text: "#0d1b2a",
      accent: "#e3f2fd",
      card: "rgba(227, 242, 253, 0.15)",
    },
  },

  2: {
    label: "Partly Cloudy",
    mood: "Undecided",
    vibe: "Neither here nor there, and that's okay.",
    icon: "⛅",
    palette: {
      bg: ["#90a4ae", "#78909c", "#b0bec5"],
      text: "#1c2b36",
      accent: "#eceff1",
      card: "rgba(236, 239, 241, 0.15)",
    },
  },

  3: {
    label: "Overcast",
    mood: "Moody",
    vibe: "The sky is thinking.",
    icon: "☁️",
    palette: {
      bg: ["#546e7a", "#455a64", "#607d8b"],
      text: "#eceff1",
      accent: "#b0bec5",
      card: "rgba(176, 190, 197, 0.15)",
    },
  },

  45: {
    label: "Foggy",
    mood: "Mysterious",
    vibe: "You can't see far. That's the point.",
    icon: "🌫️",
    palette: {
      bg: ["#b39ddb", "#9e9e9e", "#e0e0e0"],
      text: "#1a1a2e",
      accent: "#ede7f6",
      card: "rgba(237, 231, 246, 0.15)",
    },
  },

  48: {
    label: "Icy Fog",
    mood: "Ghostly",
    vibe: "The world dissolved overnight.",
    icon: "🌫️",
    palette: {
      bg: ["#cfd8dc", "#b0bec5", "#e1f5fe"],
      text: "#102027",
      accent: "#e1f5fe",
      card: "rgba(225, 245, 254, 0.15)",
    },
  },

  51: {
    label: "Light Drizzle",
    mood: "Gentle",
    vibe: "Barely raining. Almost romantic.",
    icon: "🌦️",
    palette: {
      bg: ["#4fc3f7", "#0288d1", "#4dd0e1"],
      text: "#01182a",
      accent: "#e1f5fe",
      card: "rgba(225, 245, 254, 0.15)",
    },
  },

  53: {
    label: "Drizzle",
    mood: "Melancholic",
    vibe: "Perfect weather for tea and bad decisions.",
    icon: "🌧️",
    palette: {
      bg: ["#1565c0", "#0d47a1", "#1976d2"],
      text: "#e3f2fd",
      accent: "#90caf9",
      card: "rgba(144, 202, 249, 0.15)",
    },
  },

  55: {
    label: "Heavy Drizzle",
    mood: "Brooding",
    vibe: "The city is washing itself clean.",
    icon: "🌧️",
    palette: {
      bg: ["#0d47a1", "#1a237e", "#283593"],
      text: "#e8eaf6",
      accent: "#7986cb",
      card: "rgba(121, 134, 203, 0.15)",
    },
  },

  61: {
    label: "Light Rain",
    mood: "Reflective",
    vibe: "Windows were made for days like this.",
    icon: "🌧️",
    palette: {
      bg: ["#1e88e5", "#1565c0", "#0d47a1"],
      text: "#e3f2fd",
      accent: "#64b5f6",
      card: "rgba(100, 181, 246, 0.15)",
    },
  },

  63: {
    label: "Rain",
    mood: "Melancholic",
    vibe: "Puddles everywhere. Step carefully.",
    icon: "🌧️",
    palette: {
      bg: ["#1565c0", "#0a3880", "#1976d2"],
      text: "#e3f2fd",
      accent: "#90caf9",
      card: "rgba(144, 202, 249, 0.15)",
    },
  },

  65: {
    label: "Heavy Rain",
    mood: "Dramatic",
    vibe: "Nature said not today.",
    icon: "⛈️",
    palette: {
      bg: ["#0a237e", "#01002e", "#1a237e"],
      text: "#e8eaf6",
      accent: "#5c6bc0",
      card: "rgba(92, 107, 192, 0.15)",
    },
  },

  71: {
    label: "Light Snow",
    mood: "Ethereal",
    vibe: "The world is putting on a coat.",
    icon: "🌨️",
    palette: {
      bg: ["#e0f7fa", "#b2ebf2", "#80deea"],
      text: "#002f3a",
      accent: "#ffffff",
      card: "rgba(255, 255, 255, 0.2)",
    },
  },

  73: {
    label: "Snow",
    mood: "Hushed",
    vibe: "The world is on mute.",
    icon: "❄️",
    palette: {
      bg: ["#b3e5fc", "#81d4fa", "#e1f5fe"],
      text: "#01182a",
      accent: "#ffffff",
      card: "rgba(255, 255, 255, 0.2)",
    },
  },

  75: {
    label: "Heavy Snow",
    mood: "Brutal",
    vibe: "Your eyelashes are freezing. Go inside.",
    icon: "❄️",
    palette: {
      bg: ["#546e7a", "#b0bec5", "#cfd8dc"],
      text: "#0a1520",
      accent: "#ffffff",
      card: "rgba(255, 255, 255, 0.2)",
    },
  },

  77: {
    label: "Snow Grains",
    mood: "Bitter",
    vibe: "Not quite snow. Not quite anything.",
    icon: "🌨️",
    palette: {
      bg: ["#78909c", "#90a4ae", "#b0bec5"],
      text: "#0d1b2a",
      accent: "#eceff1",
      card: "rgba(236, 239, 241, 0.15)",
    },
  },

  80: {
    label: "Light Showers",
    mood: "Playful",
    vibe: "Quick — before the next cloud arrives.",
    icon: "🌦️",
    palette: {
      bg: ["#29b6f6", "#0288d1", "#f9a825"],
      text: "#01182a",
      accent: "#e1f5fe",
      card: "rgba(225, 245, 254, 0.15)",
    },
  },

  81: {
    label: "Rain Showers",
    mood: "Restless",
    vibe: "On and off. Make up your mind, sky.",
    icon: "🌧️",
    palette: {
      bg: ["#1976d2", "#0d47a1", "#42a5f5"],
      text: "#e3f2fd",
      accent: "#90caf9",
      card: "rgba(144, 202, 249, 0.15)",
    },
  },

  82: {
    label: "Heavy Showers",
    mood: "Intense",
    vibe: "Cancel your plans. All of them.",
    icon: "⛈️",
    palette: {
      bg: ["#0d47a1", "#01002e", "#283593"],
      text: "#e8eaf6",
      accent: "#5c6bc0",
      card: "rgba(92, 107, 192, 0.15)",
    },
  },

  95: {
    label: "Thunderstorm",
    mood: "Electric",
    vibe: "The sky is having a breakdown. Relatable.",
    icon: "⛈️",
    palette: {
      bg: ["#1a0050", "#4a148c", "#311b92"],
      text: "#ede7f6",
      accent: "#ce93d8",
      card: "rgba(206, 147, 216, 0.15)",
    },
  },

  96: {
    label: "Storm with Hail",
    mood: "Chaotic",
    vibe: "Do not go outside. Seriously.",
    icon: "⛈️",
    palette: {
      bg: ["#12005e", "#1a0050", "#4a148c"],
      text: "#ede7f6",
      accent: "#b39ddb",
      card: "rgba(179, 157, 219, 0.15)",
    },
  },

  99: {
    label: "Heavy Storm & Hail",
    mood: "Apocalyptic",
    vibe: "Nature has chosen violence today.",
    icon: "🌩️",
    palette: {
      bg: ["#0a0020", "#12005e", "#1a0050"],
      text: "#ede7f6",
      accent: "#9575cd",
      card: "rgba(149, 117, 205, 0.15)",
    },
  },
};

// Fallback for unmapped codes
const FALLBACK = {
  label: "Unknown",
  mood: "Mysterious",
  vibe: "The sky is keeping secrets today.",
  icon: "🌡️",
  palette: {
    bg: ["#546e7a", "#455a64", "#607d8b"],
    text: "#eceff1",
    accent: "#b0bec5",
    card: "rgba(176, 190, 197, 0.15)",
  },
};

// Extra mood overlays for extreme temperatures
const TEMP_OVERRIDES = {
  scorching: {
    // 35°C / 95°F and above
    threshold: 35,
    mood: "Scorching",
    vibe: "Touch the steering wheel at your own risk.",
    palette: {
      bg: ["#bf360c", "#e64a19", "#ff6d00"],
      text: "#fff8f0",
      accent: "#ffccbc",
      card: "rgba(255, 204, 188, 0.15)",
    },
  },
  freezing: {
    // -10°C / 14°F and below
    threshold: -10,
    mood: "Brutal",
    vibe: "Your eyelashes are freezing. Go inside.",
    palette: {
      bg: ["#0d47a1", "#1a237e", "#102027"],
      text: "#e1f5fe",
      accent: "#b3e5fc",
      card: "rgba(179, 229, 252, 0.15)",
    },
  },
};

/**
 * Get weather data for a given WMO code and temperature
 * @param {number} code - WMO weather code
 * @param {number} tempC - Temperature in Celsius
 * @returns {object} - Full weather mood object
 */
function getWeatherMood(code, tempC) {
  // Check for extreme temperature overrides first
  if (tempC >= TEMP_OVERRIDES.scorching.threshold) {
    return { ...WEATHER_MAP[0], ...TEMP_OVERRIDES.scorching };
  }
  if (tempC <= TEMP_OVERRIDES.freezing.threshold) {
    return { ...WEATHER_MAP[75], ...TEMP_OVERRIDES.freezing };
  }

  return WEATHER_MAP[code] || FALLBACK;
}

export { getWeatherMood, WEATHER_MAP, FALLBACK };