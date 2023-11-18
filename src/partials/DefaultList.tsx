/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";
import Card from "src/components/Card";
import Section from "src/components/Section";
import dataType from "src/types/type";
import { fetchCitiesByPopulation, fetchWeatherForCity } from "src/utils/api";
import dataReducer from "src/utils/dataReducer";
import useLocalStorage from "src/utils/useLocalStorage";

const DefaultList = () => {
  const { write, read } = useLocalStorage("citiesAndWeather", { items: [] } as { items: Array<dataType> });
  const [citiesAndWeather, setCityData] = useState<{ items: Array<dataType> } | null>(read());
  const [state, dispatch] = useReducer(dataReducer, citiesAndWeather);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCitiesByPopulation();
        const promises = data?.map(async (cityData) => {
          try {
            const weatherInfo = await fetchWeatherForCity(cityData.city);
            cityData.weatherInfo = weatherInfo;
          } catch (error) {
            cityData.weatherInfo = { failed: "Failed to fetch weather data" };
            console.error("Error fetching weather:", error);
          }
          return cityData;
        });
        const citiesWithWeather = await Promise.all(promises!);
        citiesWithWeather.sort((a, b) => a.city.toLowerCase().localeCompare(b.city.toLowerCase()));
        write({ items: citiesWithWeather });
        setCityData({ items: citiesWithWeather });
      } catch (error) {
        console.error("Error fetching cities by population:", error);
        // Provide user-friendly error message or UI feedback here
      }
    };

    if (!citiesAndWeather) {
      fetchData();
    }
    // Add dependencies if needed
  }, [citiesAndWeather, write]);

  return (
    <Section>
      <div className="flex">
        {citiesAndWeather?.items?.map((city) => (
          <Link to={`/detail/${city.city.toLowerCase()}`} key={city.city}>
            <Card city={city.city} weatherInfo={city.weatherInfo} dispatch={dispatch} details={false} citiesAndWeather={state} />
          </Link>
        ))}
      </div>
    </Section>
  );
};








export default DefaultList;
