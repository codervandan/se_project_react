import modalCloseButton from "../../assets/modal-close-btn.svg";

function ModalWithForm({ isOpen, children, handleSubmit, title, buttonText, name }) {
    return <div className={`modal ${isOpen ? 'modal_is-opened' : ''}`}>
			<div className="modal__container modal__container_type_form">
					<h2 className="modal__title">{title}</h2>
					<button 
					type="button" 
					className="modal__close-btn modal__close-btn_type_form"
					>
					<img src={modalCloseButton} alt="Close icon" />
					</button>
					<form onSubmit={handleSubmit} className="modal__form" name={name} >
						{children}
					</form>
					<button type="submit" className="modal__submit-btn">{buttonText}</button>
			</div>
		</div>
}

export default ModalWithForm;




