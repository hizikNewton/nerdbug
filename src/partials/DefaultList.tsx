/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Card from "src/components/Card";
import Section from "src/components/Section";
import { setData } from "src/redux/slice";
import { RootState } from "src/redux/store";
import dataType from "src/types/type";
import { fetchCitiesByPopulation, fetchWeatherForCity } from "src/utils/api";
import { isEmpty } from "src/utils/helper";
import useLocalStorage from "src/utils/useLocalStorage";

const DefaultList = () => {
  const { write, read } = useLocalStorage("citiesAndWeather", { items: [] } as {
    items: Array<dataType>;
  });
  const dispatch = useDispatch();
  const citiesAndWeather = useSelector(
    (state: RootState) => state.citiesAndWeather
  );

  const favouriteList = citiesAndWeather.items?.filter(
    (item) => item.favourite === true
  );

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
        citiesWithWeather.sort((a, b) =>
          a.city.toLowerCase().localeCompare(b.city.toLowerCase())
        );
        write({ items: citiesWithWeather });
        dispatch(setData({ items: citiesWithWeather }));
      } catch (error) {
        console.error("Error fetching cities by population:", error);
      }
    };
    if (!read()) {
      fetchData();
    } else {
      console.log(read(), "read");
      write(citiesAndWeather);
      //dispatch(setData(citiesAndWeather))
    }
  }, [citiesAndWeather.items]);

  return (
    <>
      {!isEmpty(favouriteList) && (
        <Section className="items-start">
          <h3 className="mb-2 text-2xl font-bold text-left ">Favourites</h3>
          <div className="flex flex-wrap gap-6 justify-evenly">
            {favouriteList.map((item) => (
              <Link
                to={`/detail/${item.city.toLowerCase()}`}
                key={item.city}
                state={{ city: item.city }}
              >
                <Card city={item.city} details={false} cityWeather={item} />
              </Link>
            ))}
          </div>
        </Section>
      )}
      <Section>
        <div className="flex flex-wrap gap-6 justify-evenly">
          {citiesAndWeather.items?.map((item) => (
            <Link
              to={`/detail/${item.city.toLowerCase()}`}
              key={item.city}
              state={{ city: item.city }}
            >
              <Card city={item.city} details={false} cityWeather={item} />
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
};

export default DefaultList;
