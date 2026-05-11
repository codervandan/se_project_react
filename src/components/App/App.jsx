import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal.jsx";
// import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";

import { getWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey, baseUrl } from "../../utils/constants";
import { getItems, addItem, deleteItem } from "../../utils/api";
// import { defaultClothingItems } from "../../utils/defaultClothingItems";

import "./App.css";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [weatherData, setWeatherData] = useState({ name: "", temp: "0" });
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    console.log("click");
    setActiveModal("add-garment-modal");
  }

  function handleTempUnitChange() {
    if (currentTempUnit === "F") {
      setCurrentTempUnit("C");
    } else {
      setCurrentTempUnit("F");
    }
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  function handleAddItemSubmit(inputValues) {
    console.log(inputValues);
    addItem(inputValues)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch(console.error);
  }

  // TODO - pass as a prop
  function handleDeleteItem(item) {
    deleteItem(item._id)
      .then(() => {
        setClothingItems((items) => items.filter((i) => i._id !== item._id));
        handleCloseModal();
      })
      .catch(console.error);
  }

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTempUnit, handleTempUnitChange }}>
      <div className="app">
        <div className="app__content">
          <Header weatherData={weatherData} handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  handleOpenItemModal={handleOpenItemModal}
                  currentTempUnit={currentTempUnit}
                />
              }
            ></Route>
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                  handleOpenItemModal={handleOpenItemModal}
                />
              }
            ></Route>
          </Routes>
          <Footer />
          <ItemModal card={selectedCard} isOpen={activeModal === "item-modal"} onClose={handleCloseModal} onDeleteItem={handleDeleteItem} />
          <AddItemModal isOpen={activeModal === "add-garment-modal"} onClose={handleCloseModal} handleAddItemSubmit={handleAddItemSubmit} />
        </div>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
