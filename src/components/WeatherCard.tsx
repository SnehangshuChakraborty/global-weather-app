import { WeatherData } from "./WeatherData";

const WeatherCard = ({ city, data, onDelete }: { city: string; data: WeatherData; onDelete: () => void }) => (
  <div className="col-12 col-md-6 col-lg-4 mb-4 position-relative">
    <button 
      onClick={onDelete}
      className="btn-close position-absolute top-0 end-0 m-3" 
      aria-label="Close"
      style={{ zIndex: 10 }}
    ></button>
    <div className="card h-100 shadow-sm border-0 text-center p-3">
      <div className="card-body">
        <h5 className="fw-bold">{city}</h5>
        <p className="text-muted small mb-1">{data.country}</p>
        {/* Placeholder for weather icons from the mockup */}
        <div className="py-2 text-primary display-6">
           {data.condition === 'Sunny' ? '☀️' : '☁️'}
        </div>
        <div className="h3 fw-bold">{data.temp}°C</div>
        <div className="text-muted x-small">{data.localTime}</div>
      </div>
    </div>
  </div>
);

export default WeatherCard;