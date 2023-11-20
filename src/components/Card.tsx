/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Humidity from "assets/humidity.svg?react";
import Precip from "assets/precip.svg?react";
import Temp from "assets/temperature.svg?react";
import Visibilty from "assets/visibilty.svg?react";
import Wind from "assets/wind.svg?react";
import WindDirection from "assets/winddirection.svg?react";
import IconButton from "./IconButton";
import { FaHeart, FaTrash } from "react-icons/fa";
import dataType from "src/types/type";
import { useDispatch } from "react-redux";
import { removeEntry, addFavourite } from "src/redux/slice";

interface Props {
  city: string;
  dispatch?: React.Dispatch<any>;
  details: boolean;
  cityWeather?: dataType;
}
const weatherData = {
  humidity: Humidity,
  precip: Precip,
  temperature: Temp,
  visibility: Visibilty,
  wind_dir: WindDirection,
  wind_speed: Wind,
};
const Card: FC<Props> = ({ city, details, cityWeather }) => {
  const { current, location } = cityWeather?.weatherInfo || {};
  console.log(location, "state");
  const dispatch = useDispatch();
  /*   const { write } = useLocalStorage("citiesAndWeather", { items: [] } as {
      items: Array<dataType>;
    }); */
  const handleRemoveClick = (e) => {
    e.preventDefault();
    dispatch(removeEntry(cityWeather!));
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    dispatch(addFavourite({ city }));
  };

  return (
    <div className={`p-4 text-white bg-center bg-auto ${current?.is_day === "yes" ? "bg-day" : "bg-night"} w-80`}>
      <div className="flex justify-between">
        <div>{new Date(location?.localtime).toDateString()}</div>

        <div className="flex gap-2">
          {!details && (
            <IconButton onClick={handleLikeClick}>
              <FaHeart className="" />
            </IconButton>
          )}
          <IconButton onClick={handleRemoveClick}>
            <FaTrash className="" />
          </IconButton>
        </div>
      </div>
      <div className="my-3 city">
        <div>{city}</div>
        <div>{location?.country}</div>
      </div>

      <div className="flex justify-between">
        <div>
          <h3 className="text-5xl font-bold ">{current?.temperature}&deg;C</h3>
          <span>{current?.weather_descriptions[0]}</span>
        </div>
        <div className="">
          <img src={current?.weather_icons} />
        </div>
      </div>
      {details && current && (
        <div className="flex flex-col">
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
        </div>
      )}
    </div>
  );
};

export default Card;
