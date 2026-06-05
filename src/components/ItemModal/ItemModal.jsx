import "./ItemModal.css";
import modalCloseButton from "../../assets/modal-close-btn.svg";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ card, isOpen, onClose, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  // function handleDelete() {
  //   handleDeleteItem(card);
  // }
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`} onClick={onClose}>
      <div className="modal__container">
        <button type="button" className="modal__close-btn" onClick={onClose}>
          <img src={modalCloseButton} alt="Close icon" />
        </button>
        <img className="modal__image" src={card.imageUrl} alt={card.name} />
        <div className="modal__footer">
          <div className="modal__header">
            <h2 className="modal__text">{card.name}</h2>
            {isOwn && (
              <button onClick={() => onDeleteItem(card)} className="modal__delete-btn">
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
