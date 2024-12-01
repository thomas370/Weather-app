import { useState, useEffect } from "react";
import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";
import styles from "../styles/Home.module.css";
import Data from "../Data/Data.json";

export const App = () => {
  const [latitudeInput, setLatitudeInput] = useState(Data.Latitude);
  const [longitudeInput, setLongitudeInput] = useState(Data.Longitude);
  const [unitSystem, setUnitSystem] = useState("metric");
  const [triggerFetch, setTriggerFetch] = useState("")
  const [weatherData, setWeatherData] = useState(null);

  // Fonction pour récupérer les données de l'API
    const getData = async () => {
        if (!latitudeInput || !longitudeInput) {
            console.error("Latitude or longitude is missing");
            return;
        }

        try {
            console.log("Sending latitude:", latitudeInput);
            console.log("Sending longitude:", longitudeInput);

            const res = await fetch("/api/data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    latitudeInput: parseFloat(latitudeInput), // Convertir en nombre
                    longitudeInput: parseFloat(longitudeInput), // Convertir en nombre
                }),
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(`API request failed: ${error.error}`);
            }

      const data = await res.json();
      setWeatherData(data);
      console.log(data)

      // Réinitialise les champs de latitude et longitude après récupération
      setLatitudeInput("");
      setLongitudeInput("");
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData({ error: true, message: 'Failed to fetch weather data' });
      console.log(weatherData)
    }
  };

  useEffect(() => {

      getData();

  }, [triggerFetch, latitudeInput, longitudeInput]);

  // Fonction pour changer le système d'unité
  const changeSystem = () =>
      unitSystem === "metric"
          ? setUnitSystem("imperial")
          : setUnitSystem("metric");

  return weatherData && !weatherData.error ? (
      <div className={styles.wrapper}>
        <MainCard
            city={Data.City}
            country={Data.Country}
            description={weatherData?.current_weather?.weathercode || "N/A"}
            iconName={weatherData?.current_weather?.weathercode || "N/A"}
            unitSystem={unitSystem}
            weatherData={weatherData}
        />
        <ContentBox>
          <Header>
            <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
          </Header>
          <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
          <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
        </ContentBox>
      </div>
  ) : weatherData && weatherData.message ? (
      <ErrorScreen errorMessage="Data not found, try again!">
      </ErrorScreen>
  ) : (
      <LoadingScreen loadingMessage="Loading data..." />
  );
};

export default App;