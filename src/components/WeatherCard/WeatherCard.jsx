import { useContext } from 'react';
import CurrentTemperatureUnitContext from '../../context/CurrentTemperatureUnitContext.js';
import weatherCard from '../../assets/Day/cloudy-card.svg';
import { weatherConditionImages } from '../../utils/constants.js';
import './WeatherCard.css';

function WeatherCard({ weatherData}) {
    const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);  

    if (!weatherData) return null;

    const condition = weatherData.weatherCondition?.toLowerCase();
    const image = weatherConditionImages["day"][condition]?.image || weatherCard;

    console.log(currentTempUnit);
    return(
         <section className="weather-card">
            <img src={image || weatherCard} alt="CloudyWeather" className="weather-card__image" />
            <p className="weather-card__temp">{weatherData.temp[currentTempUnit]} {currentTempUnit}</p>
        </section> 
    );
}

export default WeatherCard;