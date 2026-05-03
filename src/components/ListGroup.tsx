import React, { useState } from 'react';
import AddToMap from './AddToMap';
import SearchBar from './SearchBar';
import { WeatherData } from '../types';
import WeatherCard from './WeatherCard';

function ListGroup() {
  const [locationMap, setCities] = useState<Map<string, WeatherData>>(new Map());
  const [searchTerm, setSearchTerm] = useState('');

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
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <div className="card shadow-sm">
        {/* Card Header */}
        <div className="card-header bg-primary text-white py-3">
          <h3 className="mb-0 h5">Global Weather Dashboard</h3>
        </div>
        {/* Card Body */}
        <div className="card-body">
          <div className="mb-4">
            <label className="form-label fw-bold text-muted small uppercase">Search</label>
            <SearchBar value={searchTerm} onSearch={setSearchTerm} />
          </div>
          {/* Replace the list-group with this grid structure */}
          <div className="row g-3">
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
              <div className="col-12 text-center text-muted py-5">No cities found matching your search.</div>
            )}
          </div>
          {/* Divider */}
          <hr className="my-4" />
          <div className="bg-light p-3 rounded">
            <h6 className="mb-3 fw-bold text-muted small uppercase">Add a New City</h6>
            <AddToMap onAdd={addCity} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListGroup;
