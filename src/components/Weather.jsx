import { useEffect, useRef, useState } from "react";
import Clear from "../assets/clear.png";
import Cloud from "../assets/cloud.png";
import Drizzel from "../assets/drizzle.png";
import Humidity from "../assets/humidity.png";
import Rain from "../assets/rain.png";
import Search from "../assets/search.png";
import Wind from "../assets/wind.png";
import Snow from "../assets/snow.png";

export default function Weather() {
  const allIcons = {
    "01d": Clear,
    "02d": Cloud,
    "04d": Cloud,
    "09d": Rain,
    "10d": Rain,
    "13d": Snow,
    "01n": Clear,
    "02n": Cloud,
    "04n": Cloud,
    "09n": Rain,
    "10n": Rain,
    "13n": Snow,
  };

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    if (city === "") {
      alert("Enter city name");
    } else {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_APP_ID
        }`;

        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || Clear;
        setWeatherData({
          humidity: data.main.humidity,
          temp: Math.floor(data.main.temp),
          windSpeed: data.wind.speed,
          location: data.name,
          icon: icon,
        });
      } catch (error) {
        setWeatherData(false);
        console.error("Enter correct city name");
      }
    }
  };

  useEffect(() => {
    search("London");
  }, []);
  return (
    <div className=" w-80 py-10  flex flex-col items-center rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 space-y-5">
      <div className="flex justify-center items-center space-x-3">
        <input
          type="search"
          placeholder="Search City"
          className=" bg-white p-2 rounded-full capitalize"
          ref={inputRef}
        />
        <img
          src={Search}
          alt="search"
          className="bg-white p-2 rounded-full"
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <div className="weather-icon">
            <img src={weatherData.icon} alt="weather icon" className="h-30" />
          </div>
          <div className="temperature flex flex-col justify-center items-center   ">
            <span className="text-7xl text-white">{weatherData.temp}°c</span>
            <p className="city-name text-white text-3xl">
              {weatherData.location}
            </p>
          </div>
          <div className="wind-speed flex justify-between items-center space-x-6">
            <div className="flex space-x-3 justify-center items-center">
              <img src={Humidity} alt="wind" className="h-6" />
              <div className="text-white font-medium">
                <span className="text-xl">{weatherData.humidity} %</span>
                <p className="">Humidity</p>
              </div>
            </div>
            <div className="flex space-x-3 justify-center items-center">
              <img src={Wind} alt="wind" className="h-6" />
              <div className="text-white font-medium">
                <span className="text-xl">{weatherData.windSpeed} Km/h</span>
                <p className="">Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <span className="text-white font-bold">City Not Found :(</span>
          </div>
        </>
      )}
    </div>
  );
}
