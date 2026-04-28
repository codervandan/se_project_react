import { useState } from 'react';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ItemModal from '../ItemModal/ItemModal.jsx';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

import { defaultClothingItems } from '../../utils/defaultClothingItems';
import './App.css';

  function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  function handleOpenItemModal(card) {
    setActiveModal("item-modal");
    setSelectedCard(card);
  }

  function handleOpenAddGarmentModal() {
    console.log("click");
    setActiveModal("add-garment-modal");
  }

  function handleCloseModal() {
    setActiveModal("");
  }

  // TODO - make the modal close
  // 1. create a handler function that sets activeModal to "" (or null)
  // 2. pass the handler to the modals and set up click listners on the close button and the overlay
  
  return (
    <div className="app">
      <Header handleOpenAddGarmentModal={handleOpenAddGarmentModal} />
      <Main clothingItems={clothingItems} handleOpenItemModal={handleOpenItemModal} />
      <Footer />
      <ItemModal 
      card={selectedCard} 
      isOpen={activeModal === "item-modal"} 
      onClose={handleCloseModal}
      />
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
            <label className="modal__label" htmlFor="hot">Hot</label>
          </div>
          <div>
            <input className="modal__radio-btn" type="radio" id="warm" name="weather" value="Warm" />
            <label className="modal__label" htmlFor="warm">Warm</label>
          </div>
          <div>
            <input className="modal__radio-btn" type="radio" id="cold" name="weather" value="Cold" />
            <label className="modal__label" htmlFor="cold">Cold</label>
          </div>
        </fieldset>

      </ModalWithForm> 
    </div>
  )
}

export default App;
