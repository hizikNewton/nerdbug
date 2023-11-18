/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useReducer, useState } from "react";
import Card from "src/components/Card";
import Section from "src/components/Section";
import dataType from "src/types/type";
import { fetchCitiesByPopulation, fetchWeatherForCity } from "src/utils/api";
import dataReducer from "src/utils/dataReducer";
import useLocalStorage from "src/utils/useLocalStorage";

const DefaultList = () => {
  const { write, read } = useLocalStorage("citiesAndWeather", { items: [] } as {
    items: Array<dataType>;
  });

  const [citiesAndWeather, setCityData] = useState<{
    items: Array<dataType>;
  } | null>(read());

  const [state, dispatch] = useReducer(dataReducer, citiesAndWeather);

  console.log(state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCitiesByPopulation();
        const promises = data?.map(async (cityData) => {
          try {
            const weatherInfo = await fetchWeatherForCity(cityData.city);
            cityData["weatherInfo"] = weatherInfo;
          } catch (error) {
            cityData["weatherInfo"] = { failed: "you are a failure" };
            console.error("Error fetching weather:", error);
          }
          return cityData;
        });
        const citiesWithWeather = await Promise.all(promises!);
        citiesWithWeather.sort((a, b) =>
          a.city.toLowerCase().localeCompare(b.city.toLowerCase())
        );
        write({ items: citiesWithWeather });
        setCityData({ items: citiesWithWeather });
      } catch (error) {
        console.error("Error fetching cities by population:", error);
      }
    };
    if (!citiesAndWeather) {
      fetchData();
    }
  }, []);
  return (
    <Section>
      <div className="flex">
        {state?.items?.map((city) => {
          return <Card data={city} dispatch={dispatch} />;
        })}
      </div>
    </Section>
  );
};

export default DefaultList;
