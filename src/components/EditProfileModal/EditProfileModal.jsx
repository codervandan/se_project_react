import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ isOpen, onClose, onUpdateProfile, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(currentUser?.name || "");
    setAvatar(currentUser?.avatar || "");
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateProfile({
      name,
      avatar,
    });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Change profile data"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      name="edit-profile"
      handleSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name
        <input className="modal__input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>

      <label className="modal__label">
        Avatar URL
        <input className="modal__input" type="url" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
