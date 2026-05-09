import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

// onAddItem refers to the submit handler declared in App.jsx
function AddItemModal({ isOpen, onClose, handleAddItemSubmit }) {
  // const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {}
  const { values, handleChange } = useForm({ name: "", weather: "", imageUrl: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddItemSubmit(values);
  };

  // TODO - implement reset form

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="New garment"
      buttonText="Add garment"
      name="add-garment-form"
      handleSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="add-garment-name-input" className="modal__label">
          Name
          <input
            id="add-garment-name-input"
            className="modal__input"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
        </label>
        <label htmlFor="add-garment-link-input" className="modal__label">
          Link
          <input
            id="add-garment-link-input"
            className="modal__input"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
            required
          />
        </label>
      </fieldset>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend-title">Select the weather type:</legend>
        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="hot"
            name="weather"
            value="Hot"
            checked={values.weather === "Hot"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="warm"
            name="weather"
            value="Warm"
            checked={values.weather === "Warm"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div>
          <input
            className="modal__radio-btn"
            type="radio"
            id="cold"
            name="weather"
            value="Cold"
            checked={values.weather === "Cold"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
