import React from "react";
import "../../write/write.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faSun,
  faCloudSun,
  faCloudRain,
  faCloudBolt,
  faWind,
  faCloudMeatball,
} from "@fortawesome/free-solid-svg-icons";

const weathers = [
  { value: "sunny", icon: faSun },
  { value: "partlysunny", icon: faCloudSun },
  { value: "rainny", icon: faCloudRain },
  { value: "stormy", icon: faCloudBolt },
  { value: "cloudy", icon: faCloud },
  { value: "windy", icon: faWind },
  { value: "snowy", icon: faCloudMeatball },
];

const SelectWeather = () => {
  return (
    <div>
      <select>
        {weathers.map((weather) => (
          <option key={weather.value} value={weather.value}>
            {/* <FontAwesomeIcon icon={weather.icon} size="2x" /> */}
            {weather.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWeather;
