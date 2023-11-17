import { FC } from "react";
import Humidity from "assets/humidity.svg?react";
import Precip from "assets/precip.svg?react";
import Temp from "assets/temperature.svg?react";
import Visibilty from "assets/visibilty.svg?react";
import Wind from "assets/wind.svg?react";
import WindDirection from "assets/winddirection.svg?react";
import dataType from "src/types/type";
import { Link } from "react-router-dom";

interface Props {
  data: dataType;
}
const weatherData = {
  humidity: Humidity,
  precip: Precip,
  temperature: Temp,
  visibility: Visibilty,
  wind_dir: WindDirection,
  wind_speed: Wind,
};
const Card: FC<Props> = ({ data }) => {
  const { city } = data;

  return (
    <Link to="/detail" state={data}>
      <div className="bg-day bg-auto bg-center w-80 h-96 text-white p-4">
        <div className="flex justify-between">
          <div>Monday, Aug 9, 20</div>
          <div>Settings</div>
        </div>
        <div className="city my-3">
          <div>{city}</div>
          <div>Nevada, USA</div>
        </div>

        <div className="flex justify-between">
          <div>
            <h3 className=" font-bold text-5xl">96F</h3>
            <span>Night partly cloud</span>
          </div>
          <div className="">
            <img src="https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png" />
          </div>
        </div>
        <div className="flex flex-col">
          {Object.entries(weatherData).map(([key, Value]) => {
            return (
              <div className="flex">
                <div>{key}</div>
                <div>val</div>
                <div>
                  <Value />
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
