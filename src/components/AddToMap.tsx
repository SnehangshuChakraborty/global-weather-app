import React, { useState } from 'react';
import { WeatherData } from '../types';
import { callOpenWeatherMapApiHandler } from '../api/OpenWeatherMapAPIHandler';

interface AddToMapProps {
  onAdd: (city: string, data: WeatherData) => void;
}

const AddToMap: React.FC<AddToMapProps> = ({ onAdd }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    const trimmedCity = city.trim();
    const trimmedCountry = country.trim();

    if (!trimmedCity || !trimmedCountry) {
      setError('Both city and country fields are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const cityWeatherData = await callOpenWeatherMapApiHandler(trimmedCity, trimmedCountry);

      // Use API response city name as key to maintain consistency
      onAdd(cityWeatherData.city, cityWeatherData);

      setCity('');
      setCountry('');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data';
      setError(`Error: ${errorMessage}. Please check the city and country names.`);
      console.error('Error adding city:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="position-relative w-100">
      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          style={{ borderRadius: '50px', paddingLeft: '20px' }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Country Code (e.g. US)"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={loading}
          style={{ borderRadius: '50px', maxWidth: '180px', paddingLeft: '20px' }}
        />
        <button
          className="btn btn-dark text-nowrap px-4"
          onClick={handleSubmit}
          disabled={loading}
          style={{ borderRadius: '50px' }}
        >
          {loading ? 'Adding...' : 'Add City'}
        </button>
      </div>
      {error && (
        <div className="position-absolute mt-2 w-100 text-center text-danger small bg-white bg-opacity-75 rounded p-1" style={{ zIndex: 100 }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default AddToMap;
