import { isoToLocalTime, degToCompass } from "../services/converters";
import { getTime, getAMPM, getWindSpeed, getVisibility } from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
    const sunriseTime = isoToLocalTime(weatherData.daily.sunrise[0], weatherData.utc_offset_seconds);
    const sunsetTime = isoToLocalTime(weatherData.daily.sunset[0], weatherData.utc_offset_seconds);

    return (
        <div className={styles.wrapper}>
            <MetricsCard
                title={"Humidity"}
                iconSrc={"/icons/humidity.png"}
                metric={weatherData.current_weather.humidity}
                unit={"%"}
            />
            <MetricsCard
                title={"Wind speed"}
                iconSrc={"/icons/wind.png"}
                metric={getWindSpeed(unitSystem, weatherData.current_weather.windspeed)}
                unit={unitSystem === "metric" ? "m/s" : "m/h"}
            />
            <MetricsCard
                title={"Wind direction"}
                iconSrc={"/icons/compass.png"}
                metric={degToCompass(weatherData.current_weather.winddirection)}
            />
            <MetricsCard
                title={"Visibility"}
                iconSrc={"/icons/binocular.png"}
                metric={getVisibility(unitSystem,  weatherData.current_weather.visibility)}
                unit={unitSystem == "metric" ? "km" : "miles"} //affiche NaN car je n'ai pas la data dans cette nouvelle api
            />
            <MetricsCard
                title={"Sunrise"}
                iconSrc={"/icons/sunrise.png"}
                metric={sunriseTime}
            />
            <MetricsCard
                title={"Sunset"}
                iconSrc={"/icons/sunset.png"}
                metric={sunsetTime}
            />
        </div>
    );
};
