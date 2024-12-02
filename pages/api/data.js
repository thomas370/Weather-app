export default async function handler(req, res) {
  try {
    console.log("Request Body:", req.body); 

    const { latitudeInput, longitudeInput } = req.body;
    const latitude = (latitudeInput);
    const longitude = (longitudeInput);

    if (isNaN(latitude) || isNaN(longitude)) { //verification si la longitude et la lantitude et un nombre 
      return res.status(400).json({ error: 'Invalid input: latitude and longitude must be numbers' });
    }
    //modification de la request api et essai de l'ajout de l'humidité et de la visibilité sans succé
    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?timezone=auto&current_weather=true&daily=sunrise,sunset&latitude=${latitude}&longitude=${longitude}`;
    console.log("Generated URL:", weatherApiUrl);

    const getWeatherData = await fetch(weatherApiUrl); //appelle pour recupérer les données api
    if (!getWeatherData.ok) { 
      throw new Error(`Weather API request failed with status ${getWeatherData.status}`);
    }

    const data = await getWeatherData.json(); // Convertit la réponse de l'API en JSON
    console.log("Weather API Response:", data); //affichage de l'api dans la console

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    res.status(500).json({ error: 'An error occurred while fetching weather data' });
  }
}
