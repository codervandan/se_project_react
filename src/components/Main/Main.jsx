import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData, currentTempUnit }) {
  const temperature = weatherData?.temp?.[currentTempUnit] ?? "N/A";
  const filteredItems = clothingItems.filter((item) => item.weather === weatherData.type);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <p className="weather-description">Today is {temperature} / You may want to wear: </p>
      <ul className="main__card-list">
        {filteredItems.map((item) => {
          return <ItemCard key={item._id} data={item} onCardClick={handleOpenItemModal} />;
        })}
      </ul>
    </main>
  );
}

export default Main;
