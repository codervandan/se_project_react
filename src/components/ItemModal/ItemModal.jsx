import "./ItemModal.css";
// import "../ModalWithForm/ModalWithForm.css";

function ItemModal({ card, isOpen }) { 
    return(
        <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`}>
            <div className="modal__container">
                <button type="button" className="modal__close-btn">X</button>
                <img className="modal__image" src={card.link} alt={card.name} />
                <div className="modal__footer">
                    <h2 className="modal__text">{card.name}</h2>
                    <p className="modal__text">{card.weather}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;