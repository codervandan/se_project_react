import weatherCard from '../../assets/cloudy-card.svg';
import './WeatherCard.css';

function WeatherCard() {
    return(
         <>
         <section className="weather-card">
            <img src={weatherCard} alt="CloudyWeather" className="weather-card__image" />
            <p className="weather-card__temp">75&deg; F</p>
        </section>
        {/* <p>Today is 75°F / You may want to wear: </p> */}
        </> 
    );
}

export default WeatherCard;