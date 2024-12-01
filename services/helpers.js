import {
  isoToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
    unitSystem == "metric" ? windInMps : mpsToMph(windInMps);

//Je n'ai pas la data dans cette nouvelle api
export const getVisibility = (unitSystem, visibilityInMeters) =>
    unitSystem == "metric"
        ? (visibilityInMeters / 1000).toFixed(1)
        : kmToMiles(visibilityInMeters / 1000);

export const getTime = (unitSystem, currentTime, timezoneOffset) =>
    unitSystem === "metric"
        ? isoToLocalTime(currentTime, timezoneOffset)
        : timeTo12HourFormat(isoToLocalTime(currentTime, timezoneOffset));

export const getAMPM = (unitSystem, currentTime, timezone) =>
    unitSystem === "imperial"
        ? isoToLocalTime(currentTime, timezone).split(":")[0] >= 12
            ? "PM"
            : "AM"
        : "";

export const getWeekDay = (weatherData) => {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  //recupération de la date dans l'api
  const date = new Date(weatherData.current_weather.time);

  //affichage de la date aprés l'ajout de l'utc
  console.log(`Date locale après ajustement : ${date.toString()}`);

  const localDay = date.getDay(); //recupération de la date avec la function getDay

  return weekday[localDay];
};
