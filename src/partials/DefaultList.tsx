/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Card from "src/components/Card";
import Section from "src/components/Section";
import dataType from "src/types/type";
import makeRequest from "src/utils/api";
import useLocalStorage from "src/utils/useLocalStorage";

const DefaultList = () => {
  const [cityData, setCityData] = useState<Array<dataType>>();
  const { write } = useLocalStorage("default", { default: cityData });
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
            console.error("Error fetching weather:", error);
            cityData["weatherInfo"] = { sample: "test" };
          }
          return cityData;
        });
        const citiesWithWeather = await Promise.all(promises!);

        // Now you can sort the cities by name
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
        return <Card data={city} />;
      })}
    </Section>
  );
};

export default DefaultList;
