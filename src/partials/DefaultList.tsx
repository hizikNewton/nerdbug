/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Card from "src/components/Card";
import Section from "src/components/Section";
import dataType from "src/types/type";
import makeRequest from "src/utils/api";
import useLocalStorage from "src/utils/useLocalStorage";

const DefaultList = () => {
  const { write } = useLocalStorage("default", { default: [] } as { [x: string]: Array<dataType> });
  const [cityData, setCityData] = useState<Array<dataType>>();
  const { VITE_API_CORS_KEY } = import.meta.env;
  const fetchCitiesByPopulation = async () => {
    try {
      const res: { data: Array<dataType> } = await makeRequest({
        type: "country",
        method: "post",
        url: "population/cities/filter",
        data: JSON.stringify({
          limit: 1,
          order: "dsc",
          orderBy: "value",
        }),
        headers: { "Content-Type": "application/json" },
      });
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const fetchWeatherForCity = async (city: string) => {
    try {
      const res: any = await makeRequest({
        type: "weather",
        method: "get",
        url: "current",
        data: {
          query: city,
        },
        headers: {
          "Retry-After": 3600,
          'x-cors-api-key': VITE_API_CORS_KEY
        }
      });
      return res;
    } catch (error) {
      throw new Error(error as string);
    }
  };

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
        write({ default: citiesWithWeather });
        setCityData(citiesWithWeather);
      } catch (error) {
        console.error("Error fetching cities by population:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <Section>
      {cityData?.map((city) => {
        console.log(city)
        return <Card data={city} />;
      })}
    </Section>
  );
};

export default DefaultList;
