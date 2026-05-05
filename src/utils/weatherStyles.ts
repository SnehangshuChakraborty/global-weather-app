// Determines day/night from the OpenWeatherMap icon code (ends in 'd' = day, 'n' = night)
export const isNightTime = (icon: string): boolean => icon.endsWith('n');

export interface GradientStyle {
  gradient: string;
  isDark: boolean;
}

// Combines weather condition, temperature, and day/night to produce a contextual gradient
export const getDynamicGradient = (condition: string, temp: number, icon: string): GradientStyle => {
  const night = isNightTime(icon);
  const t = Math.round(temp);

  if (night) {
    // ── Night Gradients ──
    switch (condition) {
      case 'Clear':
        if (t < 10) return { gradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', isDark: true };
        return { gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', isDark: true };
      case 'Clouds':
        if (t < 10) return { gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', isDark: true };
        return { gradient: 'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)', isDark: true };
      case 'Rain':
      case 'Drizzle':
        return { gradient: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', isDark: true };
      case 'Thunderstorm':
        return { gradient: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a2e 50%, #3d1a5c 100%)', isDark: true };
      case 'Snow':
        return { gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)', isDark: true };
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return { gradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)', isDark: true };
      default:
        return { gradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', isDark: true };
    }
  } else {
    // ── Day Gradients ──
    switch (condition) {
      case 'Clear':
        if (t < 10) return { gradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', isDark: false };
        if (t < 25) return { gradient: 'linear-gradient(135deg, #56ccf2 0%, #2f80ed 100%)', isDark: false };
        return { gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', isDark: false };
      case 'Clouds':
        if (t < 10) return { gradient: 'linear-gradient(135deg, #bdc3c7 0%, #a8c0d6 100%)', isDark: false };
        if (t < 25) return { gradient: 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)', isDark: false };
        return { gradient: 'linear-gradient(135deg, #e0c3a0 0%, #c9aa88 100%)', isDark: false };
      case 'Rain':
      case 'Drizzle':
        return { gradient: 'linear-gradient(135deg, #4b79a1 0%, #283e51 100%)', isDark: true };
      case 'Thunderstorm':
        return { gradient: 'linear-gradient(135deg, #485563 0%, #29323c 100%)', isDark: true };
      case 'Snow':
        return { gradient: 'linear-gradient(135deg, #e6dada 0%, #b0c4de 100%)', isDark: false };
      case 'Mist':
      case 'Haze':
      case 'Fog':
        return { gradient: 'linear-gradient(135deg, #757f9a 0%, #d7dde8 100%)', isDark: false };
      default:
        return { gradient: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)', isDark: false };
    }
  }
};
