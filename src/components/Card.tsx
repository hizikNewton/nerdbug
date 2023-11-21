/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, RefObject } from "react";
import IconButton from "./IconButton";
import { FaHeart, FaNotesMedical, FaTrash } from "react-icons/fa";
import dataType from "src/types/type";
import { useDispatch } from "react-redux";
import { removeEntry, addFavourite } from "src/redux/slice";
import {
  Humidity,
  Precip,
  Temperature,
  Visibilty,
  Wind,
  Winddirection,
} from "src/assets/icons";

interface Props {
  city: string;
  dispatch?: React.Dispatch<any>;
  details: boolean;
  cityWeather?: dataType;
  handleShowNote?: (e) => void;
  noteRef?: RefObject<HTMLDivElement>;
  classx?: string
}
const weatherData = {
  humidity: Humidity,
  precip: Precip,
  temperature: Temperature,
  visibility: Visibilty,
  wind_dir: Winddirection,
  wind_speed: Wind,
};
const Card: FC<Props> = ({ city, details, cityWeather, handleShowNote, classx }) => {
  const { current, location } = cityWeather?.weatherInfo || {};
  const dispatch = useDispatch();

  const handleRemoveClick = (e) => {
    e.preventDefault();
    dispatch(removeEntry(cityWeather!));
  };

  const handleLikeClick = (e) => {
    e.preventDefault();
    dispatch(addFavourite({ city }));
  };

  return (
    <div
      className={` ${classx ?? ""} p-4 text-white bg-center bg-auto rounded shadow-2xl  ${current?.is_day === "yes" ? "bg-day" : "bg-night"
        } w-80`}
    >
      <div className="flex justify-between">
        <div>{new Date(location?.localtime).toDateString()}</div>

        <div className="flex gap-2">
          {details ? (
            <IconButton onClick={handleShowNote!}>
              <FaNotesMedical />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={handleLikeClick}>
                <FaHeart />
              </IconButton>

              <IconButton onClick={handleRemoveClick}>
                <FaTrash />
              </IconButton>
            </>
          )}
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
                <div className="basis-1/3">
                  {key[0].toUpperCase() + key.slice(1)}
                </div>
                <div className="flex justify-center basis-1/3">
                  <Value className="w-6 h-6" fill="white" />
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
