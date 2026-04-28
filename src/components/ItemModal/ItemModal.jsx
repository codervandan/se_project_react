import "./ItemModal.css";
import modalCloseButton from "../../assets/modal-close-btn.svg";

function ItemModal({ card, isOpen, onClose }) { 
    return(
        <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`} onClick={onClose}>
            <div className="modal__container">
                <button type="button" className="modal__close-btn" onClick={onClose}>
                    <img src={modalCloseButton} alt="Close icon" />
                </button>
                <img className="modal__image" src={card.link} alt={card.name} />
                <div className="modal__footer">
                    <h2 className="modal__text">{card.name}</h2>
                    <p className="modal__text">Weather: {card.weather}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;