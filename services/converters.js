export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const isoToLocalTime = (isoString) => {
  const localTime = new Date(isoString);

  const hours = String(localTime.getHours()).padStart(2, '0'); // Récupère l'heure et l'affiche avec 2 chiffres
  const minutes = String(localTime.getMinutes()).padStart(2, '0');// Récupère les minutes et l'affiche avec 2 chiffres

  return `${hours}:${minutes}`; //revoie l'heure en format heures minutes
};