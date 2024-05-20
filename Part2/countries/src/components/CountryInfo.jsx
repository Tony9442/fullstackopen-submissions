import React, { useState, useEffect } from "react";
import axios from "axios";

function CountryInfo({ country }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(country.capital)}&appid=YOUR_API_KEY&units=metric`);
        setWeather(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [countries.capital]);


  return (
    <div>
      
      {weather && (
        <div>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Description:</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidity:</strong> {weather.main.humidity}%
          </p>
        </div>
      )}
      {loading && <p>Loading weather data...</p>}
      {error && <p>{error}</p>}
      <img src={country.flags.png} alt={country.name.common} width="100" />
    </div>
  );
}

export default CountryInfo;
