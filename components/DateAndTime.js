import { getWeekDay, getTime, getAMPM } from "../services/helpers";
import styles from "./DateAndTime.module.css";

export const DateAndTime = ({ weatherData, unitSystem }) => {
    return (
        <div className={styles.wrapper}>
            <h2>
                {`${getWeekDay(weatherData)}, ${getTime(
                    unitSystem,
                    weatherData.current_weather.time,
                    weatherData.utc_offset_seconds
                )} ${getAMPM(unitSystem, weatherData.current_weather.time, weatherData.utc_offset_seconds)}`}
            </h2>
        </div>
    );
};
