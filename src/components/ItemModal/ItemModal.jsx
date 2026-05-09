import "./ItemModal.css";
import modalCloseButton from "../../assets/modal-close-btn.svg";

function ItemModal({ card, isOpen, onClose, onDeleteItem }) {
  function handleDelete() {
    handleDeleteItem(card);
  }
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`} onClick={onClose}>
      <div className="modal__container">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={modalCloseButton} alt="Close icon" />
        </button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <h2 className="modal__text">{card.name}</h2>
          <p className="modal__text">Weather: {card.weather}</p>
          <button onClick={handleDelete} onClick={() => onDeleteItem(card)} className="modal__delete-btn">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
