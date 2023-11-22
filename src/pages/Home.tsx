/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { useNavigation } from "react-router-dom";
import DefaultList from "src/partials/DefaultList";
import dataType, { populationCountType } from "src/types/type";
import { fetchWeatherForCity } from "src/utils/api";
//import { fetchWeatherForCity } from "src/utils/api";
import { CustomPosition, getUserLocation, isEmpty } from "src/utils/helper";
import useLocalStorage from "src/utils/useLocalStorage";

const Home: FC = () => {
  const { write, read } = useLocalStorage("citiesAndWeather", { items: [] } as {
    items: Array<dataType>;
  });
  const { write: writeLocation, read: readLocation } = useLocalStorage(
    "currentLocation",
    { location: {} as CustomPosition["coords"] }
  );

  const navigate = useNavigate();

  useEffect(() => {
    const location = readLocation();
    async function askForLocationPermission() {
      try {
        // Ask for permission
        const position = await getUserLocation();

        // Access the coordinates
        const { latitude, longitude } = position.coords;
        const weatherInfo = (await fetchWeatherForCity(
          `${latitude},${longitude}`
        )) as any;
        const {
          location: { name, country },
          current,
        } = weatherInfo;
        const ls = read()?.items;
        if (!isEmpty(ls) && weatherInfo) {
          ls?.push({
            city: name,
            country,
            populationCounts: [{} as populationCountType],
            weatherInfo,
          });
          write({ items: ls! });
        } else if (weatherInfo) {
          write({
            items: [
              {
                weatherInfo,
                city: name,
                country,
                populationCounts: [{} as populationCountType],
              },
            ],
          });
        }
        writeLocation({ location: { latitude, longitude } });
        navigate(`/detail/${name}`, {
          state: { city: name, weatherInfo: { current } },
        });
      } catch (error) {
        console.error(`Error getting location`);
      }
    }
    if (isEmpty(location)) {
      askForLocationPermission();
    }
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden">
      <DefaultList />
    </div>
  );
};

export default Home;
