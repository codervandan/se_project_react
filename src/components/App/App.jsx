import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentTemperatureUnitContext from "../../context/CurrentTemperatureUnitContext.js";
import Profile from "../Profile/Profile";

import { getWeatherData } from "../../utils/weatherApi";
import { coordinates, apiKey, baseUrl } from "../../utils/constants";
import { defaultClothingItems } from "../../utils/defaultClothingItems";

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

  useEffect(() => {
    getWeatherData()
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTempUnit, handleTempUnitChange }}>
      <div className="app">
        <Header weatherData={weatherData} handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
        <Routes>
          <Route
            path="/"
            element={<Main weatherData={weatherData} clothingItems={clothingItems} handleOpenItemModal={handleOpenItemModal} />}
          ></Route>
          <Route path="/profile" element={<Profile clothingItems={clothingItems} />}></Route>
        </Routes>
        <Footer />
        <ItemModal card={selectedCard} isOpen={activeModal === "item-modal"} onClose={handleCloseModal} />
        <ModalWithForm
          isOpen={activeModal === "add-garment-modal"}
          onClose={handleCloseModal}
          title="New garment"
          buttonText="Add garment"
          name="add-garment-form"
        >
          <fieldset className="modal__fieldset">
            <label htmlFor="add-garment-name-input" className="modal__label">
              Name
              <input id="add-garment-name-input" className="modal__input" type="text" name="name" placeholder="Name" required />
            </label>
            <label htmlFor="add-garment-link-input" className="modal__label">
              Image
              <input id="add-garment-link-input" className="modal__input" type="url" name="link" placeholder="Image URL" required />
            </label>
          </fieldset>

          <fieldset className="modal__fieldset">
            <legend className="modal__legend-title">Select the weather type:</legend>
            <div>
              <input className="modal__radio-btn" type="radio" id="hot" name="weather" value="Hot" />
              <label className="modal__label" htmlFor="hot">
                Hot
              </label>
            </div>
            <div>
              <input className="modal__radio-btn" type="radio" id="warm" name="weather" value="Warm" />
              <label className="modal__label" htmlFor="warm">
                Warm
              </label>
            </div>
            <div>
              <input className="modal__radio-btn" type="radio" id="cold" name="weather" value="Cold" />
              <label className="modal__label" htmlFor="cold">
                Cold
              </label>
            </div>
          </fieldset>
        </ModalWithForm>
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
