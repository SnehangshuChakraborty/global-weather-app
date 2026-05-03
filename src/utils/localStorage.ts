import { WeatherData } from '../types';

const STORAGE_KEY = 'weatherApp_cities';

/**
 * Save cities to localStorage
 * @param cities - Map of city names to their weather data
 */
export const saveCitiesToStorage = (cities: Map<string, WeatherData>): void => {
  try {
    const citiesArray = Array.from(cities.entries());
    const jsonString = JSON.stringify(citiesArray);
    localStorage.setItem(STORAGE_KEY, jsonString);
  } catch (error) {
    console.error('Error saving cities to localStorage:', error);
  }
};

/**
 * Load cities from localStorage
 * @returns Map of city names to their weather data, or empty Map if none found
 */
export const loadCitiesFromStorage = (): Map<string, WeatherData> => {
  try {
    const jsonString = localStorage.getItem(STORAGE_KEY);
    if (!jsonString) {
      return new Map();
    }
    const citiesArray: [string, WeatherData][] = JSON.parse(jsonString);
    return new Map(citiesArray);
  } catch (error) {
    console.error('Error loading cities from localStorage:', error);
    return new Map();
  }
};

/**
 * Clear all stored cities from localStorage
 */
export const clearCitiesFromStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing cities from localStorage:', error);
  }
};
