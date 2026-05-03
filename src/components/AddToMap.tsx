import { useState } from 'react';
import { WeatherData } from '../types';
import { callOpenWeatherMapApiHandler } from '../api/OpenWeatherMapAPIHandler';

interface AddToMapProps {
  onAdd: (city: string, data: WeatherData) => void;
}

const AddToMap = ({ onAdd }: AddToMapProps) => {
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
    <div className="mb-3">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={loading}
      />
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        disabled={loading}
      />
      <button
        className="btn btn-primary w-100"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? 'Adding City...' : 'Add City'}
      </button>
      {error && (
        <div className="alert alert-danger mt-2 mb-0" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default AddToMap;
