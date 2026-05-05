import { WeatherData } from '../types';
import { API_CONFIG } from '../config/api.config';

export const callOpenWeatherMapApiHandler = async (
  city: string,
  country: string
): Promise<WeatherData> => {
  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEATHER}?q=${city},${country}&units=${API_CONFIG.PARAMS.UNITS}&APPID=${API_CONFIG.API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();

    // Calculate the city's local time using the timezone offset from the API
    const nowUtcMs = Date.now() + new Date().getTimezoneOffset() * 60000;
    const cityLocalTime = new Date(nowUtcMs + data.timezone * 1000);
    const localTimeStr = cityLocalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
      localTime: localTimeStr,
      humidity: data.main.humidity
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export default callOpenWeatherMapApiHandler;
