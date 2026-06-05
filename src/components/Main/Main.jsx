import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, handleOpenItemModal, weatherData, currentTempUnit }) {
  const temperature = weatherData?.temp?.[currentTempUnit] ?? "N/A";

  console.log("WEATHER TYPE:", weatherData.type);
  console.log(
    "CLOTHING ITEMS:",
    clothingItems.map((item) => ({
      name: item.name,
      weather: item.weather,
      imageUrl: item.imageUrl,
    })),
  );

  // const filteredItems = clothingItems.filter((item) => item.weather === weatherData.type);
  const filteredItems = clothingItems;
  console.log("FILTERED ITEMS:", filteredItems);

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
