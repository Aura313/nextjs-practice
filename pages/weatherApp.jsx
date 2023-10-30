import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    const apiKey = 'e2f8ade20a0e3577dcb7498b8f237b3a';
    let lat = '42.9832406';
    let lon = '-81.243372';

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );

    console.log(response, "datata");
  };

//   useEffect(() => {
//     if(city.length > 3) fetchData()
//   }, [city])
  return (
    <div className='min-h-screen bg-gray-100'>
      <h1>Weather App</h1>
      <input
        type='text'
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className='border border-gray-600 rounded w-2/6'
        placeholder='Enter City'
      />
      <button onClick={fetchData}>Go</button>
    </div>
  );
}
