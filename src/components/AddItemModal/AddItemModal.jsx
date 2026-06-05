import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultFormValues = { name: "", weather: "", imageUrl: "" };

// onAddItem refers to the submit handler declared in App.jsx
function AddItemModal({ isOpen, onClose, handleAddItemSubmit }) {
  const { values, handleChange, errors, isSubmitted, setIsSubmitted, resetForm, validateAll } = useFormWithValidation(defaultFormValues);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const valid = validateAll();
    setIsSubmitted(true);

    if (!valid) {
      return;
    }

    handleAddItemSubmit(values);
    resetForm();
  };

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
            className={`modal__input ${isSubmitted && errors.name ? "modal__input_invalid" : ""}`}
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name"
          />
          {isSubmitted && errors.name && <span className="modal__input-error">{errors.name}</span>}
        </label>
        <label htmlFor="add-garment-link-input" className="modal__label">
          Link
          <input
            id="add-garment-link-input"
            className={`modal__input ${isSubmitted && errors.imageUrl ? "modal__input_invalid" : ""}`}
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            value={values.imageUrl}
            onChange={handleChange}
          />
          {isSubmitted && errors.imageUrl && <span className="modal__input-error">{errors.imageUrl}</span>}
        </label>
      </fieldset>

      <fieldset className="modal__fieldset">
        <legend className="modal__legend-title">Select the weather type:</legend>
        <div>
          <input
            className={`modal__radio-btn ${isSubmitted && errors.weather ? "modal__input_invalid" : ""}`}
            type="radio"
            id="hot"
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="hot">
            Hot
          </label>
        </div>
        <div>
          <input
            className={`modal__radio-btn ${isSubmitted && errors.weather ? "modal__input_invalid" : ""}`}
            type="radio"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div>
          <input
            className={`modal__radio-btn ${isSubmitted && errors.weather ? "modal__input_invalid" : ""}`}
            type="radio"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <label className="modal__label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
      {isSubmitted && errors.weather && <span className="modal__input-error">{errors.weather}</span>}
    </ModalWithForm>
  );
}

export default AddItemModal;
