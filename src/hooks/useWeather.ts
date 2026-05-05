import { useState, useEffect, useMemo } from 'react';
import { WeatherData } from '../types';

export const useWeather = () => {
  const [locationMap, setLocationMap] = useState<Map<string, WeatherData>>(() => {
    const saved = localStorage.getItem('weatherTiles');
    if (saved) {
      try {
        return new Map(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse weather tiles from localStorage", e);
      }
    }
    return new Map();
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('weatherTiles', JSON.stringify(Array.from(locationMap.entries())));
  }, [locationMap]);

  const addCity = (city: string, weatherData: WeatherData) => {
    setLocationMap((prev) => new Map(prev).set(city, weatherData));
  };

  const removeCity = (city: string) => {
    setLocationMap((prev) => {
      const next = new Map(prev);
      next.delete(city);
      return next;
    });
  };

  const filteredCities = useMemo(() => {
    const searchKeyword = searchTerm.toLowerCase();
    return Array.from(locationMap.entries()).filter(([city]) => 
      city.toLowerCase().includes(searchKeyword)
    );
  }, [locationMap, searchTerm]);

  return {
    locationMap,
    searchTerm,
    setSearchTerm,
    addCity,
    removeCity,
    filteredCities,
  };
};
