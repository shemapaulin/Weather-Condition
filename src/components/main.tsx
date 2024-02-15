import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  interface WeatherData {
    main: {
      temp: number;
      temp_min: number;
    };
    name: string;
    dt: number;
    weather: {
      main: string;
      icon: string;
    }[];
  }

  const [cityWeather, setCityWeather] = useState<WeatherData | null>(null);

  // Function to fetch weather data for a given city
  const fetchData = async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=888f4b59cec02abee9cab85077c2feab&units=metric`
      );
      setCityWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    // Default city to fetch weather for when component mounts
    fetchData("Kigali");
  }, []);

  const handleCityClick = (cityName: string) => {
    // Handle click event for each city
    fetchData(cityName);
  };

  return (
    <div className="pt-2 px-2 flex items-start h-full items-center gap-4">
      {cityWeather && (
        <>
          <div className="flex-1 p-20 ">
            <div className="m-auto animated-slideInLeft w-[90%]  flex flex-col bg-gray-900/50 items-center rounded-md justify-center p-3 rounded-md w-30 sm:px-12">
              <div className="text-center">
                <h2 className="text-xl font-semibold">{cityWeather.name}</h2>
                <p className="text-sm dark:text-gray-400">
                  {new Date(cityWeather.dt * 1000).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="">
                <img
                  src={`https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}.png`}
                  alt="Weather Icon"
                  style={{ width: "220px", height: "100px" }}
                />
              </div>
              <div className="mb-2 text-3xl font-semibold">
                {cityWeather.main.temp}°
                <span className="mx-1 font-normal">/</span>
                {cityWeather.main.temp_min}°
              </div>

              <p className="dark:text-gray-400">
                {cityWeather.weather[0].main}
              </p>
            </div>
          </div>
          {/* Cards */}
          <div className="flex flex-auto gap-6 flex-wrap p-3   w-full sm:px-12">
            {[
              { city: "Kigali", country: "Rwanda" },
              { city: "Nairobi", country: "Kenya" },
              { city: "Miami", country: "USA" },
              { city: "London", country: "UK" },
              { city: "Johannesburg", country: "South Africa" },
              { city: "Bujumbura", country: "Burundi" },
            ].map((cityData, index) => (
              <div key={index} className="w-[25%] rounded-md bg-gray-700 animated-slideInRight">
                <div
                  onClick={() => handleCityClick(cityData.city)}
                  className="cursor-pointer overflow-hidden rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100"
                >
                  <div
                    className="flex items-end justify-end h-32 p-4 dark:bg-gray-500 bg-center bg-cover"
                    style={{
                      backgroundImage: `url(https://source.unsplash.com/300x150/?${cityData.city})`,
                    }}
                  >
                    <p className="px-2 py-1 text-sm tracki dark:text-gray-100 uppercase dark:bg-gray-800 bg-opacity-75 rounded shadow-lg">
                      {cityData.city}, {cityData.country}
                    </p>
                  </div>
                  <div className="flex justify-between p-4">
                    <div className="flex flex-col flex-1 gap-4">
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <span className=" font-semibold">
                            {cityData.country}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
