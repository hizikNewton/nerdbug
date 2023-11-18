/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from "react";
import Humidity from "assets/humidity.svg?react";
import Precip from "assets/precip.svg?react";
import Temp from "assets/temperature.svg?react";
import Visibilty from "assets/visibilty.svg?react";
import Wind from "assets/wind.svg?react";
import WindDirection from "assets/winddirection.svg?react";
import dataType from "src/types/type";
import { Link } from "react-router-dom";
import IconButton from "./IconButton";

interface Props {
  data: dataType;
  dispatch: React.Dispatch<any>;
}
const weatherData = {
  humidity: Humidity,
  precip: Precip,
  temperature: Temp,
  visibility: Visibilty,
  wind_dir: WindDirection,
  wind_speed: Wind,
};
const Card: FC<Props> = ({ data, dispatch }) => {
  const {
    city,
    weatherInfo: { current },
  } = data || {};
  const handleButtonClick = (e) => {
    e.preventDefault();
    dispatch({ type: "REMOVE_ENTRY", payload: { city } });
  };
  return (
    <Link to="/detail" state={data}>
      <div className="p-4 text-white bg-center bg-auto bg-day w-80 h-96">
        <div className="flex justify-between">
          <div>Monday, Aug 9, 20</div>
          <div className="">
            <IconButton onClick={handleButtonClick} />
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
      </div>
    </Link>
  );
};

export default Card;
