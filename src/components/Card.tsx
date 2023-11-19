/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Humidity from "assets/humidity.svg?react";
import Precip from "assets/precip.svg?react";
import Temp from "assets/temperature.svg?react";
import Visibilty from "assets/visibilty.svg?react";
import Wind from "assets/wind.svg?react";
import WindDirection from "assets/winddirection.svg?react";
import IconButton from "./IconButton";
import { FaCoffee } from "react-icons/fa";
import dataType from "src/types/type";
import { useDispatch } from "react-redux";
import { removeEntry, setData } from "src/redux/slice";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";

interface Props {
  city: string;
  weatherInfo: { [x: string]: any }
  dispatch?: React.Dispatch<any>;
  details: boolean
  citiesAndWeather?: dataType

}
const weatherData = {
  humidity: Humidity,
  precip: Precip,
  temperature: Temp,
  visibility: Visibilty,
  wind_dir: WindDirection,
  wind_speed: Wind,
};
const Card: FC<Props> = ({ city, weatherInfo, details, citiesAndWeather }) => {
  const { current, } = weatherInfo
  const dispatch = useDispatch()
  /*   const { write } = useLocalStorage("citiesAndWeather", { items: [] } as {
      items: Array<dataType>;
    }); */
  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log("click")
    dispatch(removeEntry(citiesAndWeather!));
  };
  /* 
    console.log(citiesAndWeather, "ctw");
    useEffect(() => {
      write(citiesAndWeather!)
    }, [citiesAndWeather?.items.length]) */

  return (
    <div className="p-4 text-white bg-center bg-auto bg-day w-80">
      <div className="flex justify-between">
        <div>Monday, Aug 9, 20</div>
        <div className="">
          <IconButton onClick={handleButtonClick}> <FaCoffee className="" /></IconButton>
        </div>
      </div>
      <div className="my-3 city">
        <div>{city}</div>
        <div>Nevada, USA</div>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="text-5xl font-bold ">96F</h3>
          <span>Night partly cloud</span>
        </div>
        <div className="">
          <img src="https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png" />
        </div>
      </div>
      {details && <div className="flex flex-col">
        {Object.entries(weatherData).map(([key, Value]) => {
          return (
            <div className="flex justify-between">
              <div className="basis-1/3">{key}</div>
              <div className="flex justify-center basis-1/3">
                <Value />
              </div>
              <div className="flex justify-center basis-1/3">
                {current[key] ?? ""}
              </div>
            </div>
          );
        })}
      </div>}
    </div>
  );
};

export default Card;
