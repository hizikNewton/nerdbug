import { FC, useEffect, useState } from "react";
//import { useNavigation } from "react-router-dom";
import DefaultList from "src/partials/DefaultList";
//import { fetchWeatherForCity } from "src/utils/api";
import { getUserLocation } from "src/utils/helper";

const Home: FC = () => {
  const [location, setlocation] = useState<{ latitude: number, longitude: number }>()
  //const navigate = useNavigation()
  useEffect(() => {
    async function askForLocationPermission() {
      try {
        // Ask for permission
        const position = await getUserLocation();

        // Access the coordinates
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        /*  
         const cityInfo = await fetchCityInfo()
         const weatherInfo = await fetchWeatherForCity(`${latitude},${longitude}`);
          */

        setlocation({ latitude, longitude });
      } catch (error) {
        console.error(`Error getting location`);
      }
    }
    if (!location) {
      askForLocationPermission()
    }

  }, [])

  return (
    <div className="w-full flex flex-col min-h-screen overflow-hidden">
      <DefaultList />
    </div>
  );
};

export default Home;
