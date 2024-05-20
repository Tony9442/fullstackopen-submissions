import React, { useState, useEffect } from "react";
import axios from "axios";
import CountryInfo from "./components/CountryInfo";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  // const [errorMessage, setErrorMessage] = useState("");
   const [selectedCountry, setSelectedCountry] = useState(null)
    const [weather, setWeather] = useState(null);
    // const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!query) {
  //       return; // Skip if query is empty
  //     }

  //     try {
  //       const response = await axios.get(
  //         `https://restcountries.com/v3.1/name/${query}`
  //       );
  //       const data = response.data;

  //       /*Array.isArray(data): This part of the expression checks
  //        if the data variable is an array. Array.isArray() is a 
  //        built-in JavaScript function that returns true if the 
  //        given value is an array, otherwise it returns false. */

  //       if (Array.isArray(data) && data.length > 10) {
  //         setErrorMessage(
  //           "Too many countries found. Please make your query more specific."
  //         );
  //         setCountries([]);
  //       } else {
  //         setCountries(data);
  //         setErrorMessage("");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching country data:", error);
  //       setErrorMessage("An error occurred. Please try again later.");
  //     }
  //   };

  //   fetchData();
  // }, [query]);

  useEffect(() => {
    if (query.trim() === '') {
      setCountries([]);
      return;
    }


    const fetchCountry = async () => {
      try {
        const api = `https://restcountries.com/v3.1/name/${query}`;
        const response = await axios.get(api);
         console.log(response.data)
        setCountries(response.data)
        setSelectedCountry(null)
        setWeather(null)

        if (response.data.length === 1){
          const capital = response.data[0].capital
          fetchWeatherNews(capital)
        }
      } catch (error) {
      console.error("Error fetching country data:", error);
      }
    };
    fetchCountry();
  }, [query]);

  const fetchWeatherNews= async (capital) => {
    try {
      const apiKey = import.meta.env.VITE_SOME_KEY;
      const v2_5 = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units-metric`;
      // const v3 = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${apiKey}`;

      const weatherResponse = await axios.get(v2_5);
      setWeather(weatherResponse.data)
      setError(null)
    } catch (error) {
      console.error("Error fetching country data:", error.data)
      setWeather(null)
      setError('Failed to fetch weather data')
    }
  }
  

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // setQuery(query.trim()); // Remove leading and trailing whitespace
  // };

  function handleSelectedCountry (country) {
    setSelectedCountry(country)
    const capital = country.capital
    fetchWeatherNews(capital)
  }

  function renderLanguages (languages) {
    if(Array.isArray(languages)){
      return languages.join(", ")
    } else if (typeof languages === 'object'){
      return Object.values(languages).join(', ')
    } else {
      return 'Unknown'
    }
  }

   return (
     <div>
       <h1>Country Information</h1>
       {/* <form onSubmit={handleSubmit}>
         Find countries: <input type="text" value={query} onChange={onChange} />
       </form> */}
       {/* {errorMessage && <p>{errorMessage}</p>}
       <div className="country-info">
         {countries.map((country) => (
           <div key={country.name.common} className="country-card">
             <h2>{country.name.common}</h2>
             <button onClick={() => handleSelectedCountry(country)}>
               View
             </button>
             {selectedCountry === country && (
               <CountryInfo country={selectedCountry} />
             )}
           </div>
         ))}
       </div> */}
       <label>
         Search for country
         <input type="text" value={query} onChange={onChange} />
       </label>

       {countries.length > 10 && (
         <p>Too many countries found. Please make your query more specific.</p>
       )}

       {countries.length <= 10 && countries.length > 1 && (
         <div>
           <h2>Matching Countries</h2>
           <ul>
             {countries.map((country) => (
               <li key={country.name.common}>
                 {country.name.common}{" "}
                 <button onClick={() => handleSelectedCountry(country)}>View Country Info</button>
               </li>
             ))}
           </ul>
         </div>
       )}

       {selectedCountry && (
         <div>
           <h2>{selectedCountry.name.common}</h2>
           <p>
             <strong>Capital:</strong>
             {selectedCountry.capital}
           </p>
           <p>
             <strong>Area:</strong>
             {selectedCountry.area}
           </p>
           <p>
             Language(s): {""}
             {selectedCountry.languages &&
               renderLanguages(selectedCountry.languages)}
           </p>
           <p>Flag:</p>
           {
           <img
             src={selectedCountry.flags?.png}
             alt={`${selectedCountry.name.common}'s flag`}
           />
}
           <p>Coat Of Arms:</p>
           {
           <img
             src={selectedCountry.coatOfArms.svg}
             alt={`${selectedCountry.name.common}'s Coat of Arms`}
             width='300px'
             height='250px'
           />}

           <p>Weather Map Data</p>
           {
            weather && (
              <div>
                <h3>Weather in {selectedCountry.capital[0]}</h3>
                <p>Temperature: {weather.main.temp}*C</p>
                <p>Humidity:{weather.main.humidity}</p>
                <p>Wind Speed:{weather.wind.speed}</p>
                <p>Weather Description:{weather.weather[0].description}</p>
                <p>Weather Icon:</p>
                {
                  weather.weather[0].icon && (
                    <img 
                    src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} 
                    alt='Weather Icon'
                    width='200px'
                    height='150px'
                    />
                  )
                }
              </div>
            )
           }

         </div>
       )}
     </div>
   );
};

export default App;
