import React from 'react';
import '../App.css'; 
import { WeatherData } from '../types';
import { getDynamicGradient } from '../utils/weatherStyles';

interface WeatherCardProps {
  city: string;
  data: WeatherData;
  onDelete: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, data, onDelete }) => {
  const { gradient, isDark } = getDynamicGradient(data.condition, data.temp, data.icon);
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <div className="col">
      <div
        className={`card h-100 border-0 shadow-lg glass-card rounded-4 position-relative text-center p-3 transition-hover ${isDark ? 'text-white text-shadow' : 'text-dark'}`}
        style={{ background: gradient }}
      >
        <button
          onClick={onDelete}
          className={`btn-close position-absolute top-0 end-0 m-3 ${isDark ? 'btn-close-white' : ''}`}
          aria-label="Close"
          style={{ zIndex: 10 }}
        ></button>

        <div className="card-body d-flex flex-column align-items-center justify-content-center">
          <h4 className="fw-bold mb-0">{city}</h4>
          <p className="small mb-2 d-flex align-items-center justify-content-center gap-2" style={{ opacity: 0.8 }}>
            <img 
              src={`https://flagcdn.com/w20/${data.country.toLowerCase()}.png`} 
              alt={`${data.country} flag`} 
              style={{ width: '20px', borderRadius: '2px' }} 
            />
            <span>{data.country}</span>
          </p>
          
          <div className="py-2">
            <img 
              src={iconUrl} 
              alt={data.condition} 
              style={{ width: '100px', height: '100px', filter: 'drop-shadow(0px 4px 8px rgba(0,0,0,0.2))' }} 
            />
            <p className="mb-1" style={{ opacity: 0.7, fontSize: '0.9rem' }}>
              {data.condition}
            </p>
          </div>

          <div className="display-4 fw-bold mt-2">{Math.round(data.temp)}°C</div>
          
          <div className="mt-3 small d-flex align-items-center justify-content-center gap-1" style={{ opacity: 0.7, fontFamily: 'monospace', fontSize: '1rem' }}>
            <span>🕒</span> {data.localTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;