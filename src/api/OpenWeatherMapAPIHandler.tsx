import { WeatherData } from "../components/WeatherData";

const API_KEY = import.meta.env.VITE_APP_ID;

export const callOpenWeatherMapApiHandler = async (city: string, country: string): Promise<WeatherData>  => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&APPID=${API_KEY}`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
      city: data.name,
      country: data.sys.country,
      temp: data.main.temp,
      condition: data.weather[0].main,
      localTime: new Date().toLocaleTimeString(),
      humidity: data.main.humidity
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default callOpenWeatherMapApiHandler;

