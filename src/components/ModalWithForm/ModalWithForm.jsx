import "./ModalWithForm.css";
import modalCloseButton from "../../assets/modal-close-btn-black.svg";

function ModalWithForm({ isOpen, children, handleSubmit, title, buttonText, name, onClose }) {
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`} onClick={onClose}>
      <div className="modal__container modal__container_type_form" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close-btn modal__close-btn_type_form" onClick={onClose}>
          <img src={modalCloseButton} alt="Close icon" />
        </button>
        <form onSubmit={handleSubmit} className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
