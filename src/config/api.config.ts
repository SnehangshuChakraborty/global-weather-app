export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  ENDPOINTS: {
    WEATHER: '/weather'
  },
  PARAMS: {
    UNITS: 'metric'
  },
  API_KEY: import.meta.env.VITE_APP_ID
};
