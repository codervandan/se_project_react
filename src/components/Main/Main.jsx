import WeatherCard from '../WeatherCard/WeatherCard';
import ItemCard from '../ItemCard/ItemCard';
import './Main.css';

function Main({clothingItems}) {
  return (
    <main className='main'>
      <WeatherCard />
      {clothingItems.map((item) => {
        return <ItemCard />
      })}
    </main>
  );
}

export default Main;