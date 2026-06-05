import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultFormValues = {
  name: "",
  avatar: "",
  email: "",
  password: "",
};

function RegisterModal({ isOpen, onClose, handleRegister }) {
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

    handleRegister({
      name: values.name,
      avatar: values.avatar,
      email: values.email,
      password: values.password,
    });

    resetForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Register"
      buttonText="Register"
      name="register-form"
      handleSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="register-name-input" className="modal__label">
          Name
          <input
            id="register-name-input"
            className={`modal__input ${isSubmitted && errors.name ? "modal__input_invalid" : ""}`}
            type="text"
            name="name"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            required
          />
          {isSubmitted && errors.name && <span className="modal__input-error">{errors.name}</span>}
        </label>

        <label htmlFor="register-avatar-input" className="modal__label">
          Avatar URL
          <input
            id="register-avatar-input"
            className={`modal__input ${isSubmitted && errors.avatar ? "modal__input_invalid" : ""}`}
            type="url"
            name="avatar"
            placeholder="Avatar URL"
            value={values.avatar}
            onChange={handleChange}
            required
          />
          {isSubmitted && errors.avatar && <span className="modal__input-error">{errors.avatar}</span>}
        </label>

        <label htmlFor="register-email-input" className="modal__label">
          Email
          <input
            id="register-email-input"
            className={`modal__input ${isSubmitted && errors.email ? "modal__input_invalid" : ""}`}
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
          {isSubmitted && errors.email && <span className="modal__input-error">{errors.email}</span>}
        </label>

        <label htmlFor="register-password-input" className="modal__label">
          Password
          <input
            id="register-password-input"
            className={`modal__input ${isSubmitted && errors.password ? "modal__input_invalid" : ""}`}
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
          {isSubmitted && errors.password && <span className="modal__input-error">{errors.password}</span>}
        </label>
      </fieldset>
    </ModalWithForm>
  );
}

export default RegisterModal;
