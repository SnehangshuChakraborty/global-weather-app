import { useEffect, useState } from "react";
import { WeatherData } from "./WeatherData";
import { callOpenWeatherMapApiHandler} from "../api/OpenWeatherMapAPIHandler";

interface AddToMapProps {
    onAdd: (city: string, data: WeatherData) => void;
}

const AddToMap = ({ onAdd }: AddToMapProps) => {
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");

    const handleSubmit = async () => {
        if (!city.trim() || !country.trim()) {
            console.log("Both city and country fields are required.");
            return;
        }

        try {
          const cityWeatherData = await callOpenWeatherMapApiHandler(
            city,
            country,
          );
          
          onAdd(city, cityWeatherData);

          setCity("");
          setCountry("");
        } catch (error) {
          console.error("Error adding city:", error);
        }
    };


    useEffect(() => {
        callOpenWeatherMapApiHandler(city, country);
    }, [city, country]);

    return (
        <div className="mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <input
                type="text"
                className="form-control"
                placeholder="Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
            />
            <button className="btn btn-primary" onClick={handleSubmit}>
                Add City
            </button>
        </div>
    );
};

export default AddToMap;