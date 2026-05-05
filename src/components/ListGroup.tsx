import React, { useState, useEffect } from 'react';
import AddToMap from './AddToMap';
import SearchBar from './SearchBar';
import { WeatherData } from '../types';
import WeatherCard from './WeatherCard';

function ListGroup() {
  const [locationMap, setCities] = useState<Map<string, WeatherData>>(() => {
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

  useEffect(() => {
    localStorage.setItem('weatherTiles', JSON.stringify(Array.from(locationMap.entries())));
  }, [locationMap]);

  const removeCity = (cityName: string) => {
    setCities((prevMap) => {
      const newMap = new Map(prevMap);
      newMap.delete(cityName);
      return newMap;
    });
  };

  const searchResults = [...locationMap.entries()].filter(([city]) => {
    const searchKeyword = searchTerm.toLowerCase();
    return city.toLowerCase().includes(searchKeyword);
  });

  function addCity(city: string, weatherData: WeatherData): void {
    setCities((prevMap) => new Map(prevMap).set(city, weatherData));
  }

  return (
    <div className="container-fluid min-vh-100 p-4 p-md-5">
      {/* Top Navigation / Header */}
      <div className="glass-panel p-4 mb-5 rounded-4 border-0">
        <div className="row align-items-center">
          <div className="col-12 col-lg-4 mb-3 mb-lg-0">
            <h2 className="mb-0 fw-bold text-dark d-flex align-items-center">
              <span className="me-2 text-shadow">🌍</span> Global Weather
            </h2>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-3 mb-md-0">
            <SearchBar value={searchTerm} onSearch={setSearchTerm} />
          </div>
          <div className="col-12 col-md-6 col-lg-4">
            <AddToMap onAdd={addCity} />
          </div>
        </div>
      </div>

      {/* Grid Layout for Weather Cards */}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        {searchResults.length > 0 ? (
          searchResults.map(([city, weatherData]) => (
            <WeatherCard
              key={city}
              city={city}
              data={weatherData}
              onDelete={() => removeCity(city)}
            />
          ))
        ) : (
          <div className="col-12 text-center py-5 w-100">
            <div className="glass-panel p-5 rounded-4 d-inline-block text-muted">
              <h4 className="mb-0 fw-bold">No cities found</h4>
              <p className="mb-0 mt-2">Try adding a new city or adjust your search.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListGroup;
