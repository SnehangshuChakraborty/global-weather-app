import '../App.css'; 
import { WeatherData } from './WeatherData';

interface WeatherCardProps {
  city: string;
  data: WeatherData;
  onDelete: () => void;
}

const getBackgroundClass = (condition: string): string => {
  const weatherMap: Record<string, string> = {
    Clear: "bg-sunny",
    Clouds: "bg-cloudy",
    Rain: "bg-rainy",
    Drizzle: "bg-rainy",
    Thunderstorm: "bg-stormy",
    Snow: "bg-snowy",
    Mist: "bg-haze",
    Haze: "bg-haze",
  };
  return weatherMap[condition] || "bg-default";
};

const WeatherCard = ({ city, data, onDelete }: WeatherCardProps) => {
  const bgClass = getBackgroundClass(data.condition);
  const isDarkBg = ["Rain", "Thunderstorm", "Mist", "Haze"].includes(data.condition);
  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className={`card h-100 border-0 shadow-lg position-relative text-center p-3 transition-hover ${bgClass} ${isDarkBg ? 'text-white' : 'text-dark'}`}>
        <button
          onClick={onDelete}
          className={`btn-close position-absolute top-0 end-0 m-3 ${isDarkBg ? 'btn-close-white' : ''}`}
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
            <p className="fw-bold small text-uppercase mb-1" style={{ letterSpacing: '1px' }}>
              {data.condition}
            </p>
          </div>

          <div className="display-4 fw-bold mt-2">{Math.round(data.temp)}°C</div>
          
          <div className="mt-3 small" style={{ opacity: 0.6 }}>
            Local Time: {data.localTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;