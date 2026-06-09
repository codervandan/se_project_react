import { useEffect } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const defaultFormValues = {
  email: "",
  password: "",
};

function LoginModal({ isOpen, onClose, handleLogin, onSwitchToRegister, isLoading }) {
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

    handleLogin({
      email: values.email,
      password: values.password,
    });

    resetForm();
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Log In"
      buttonText={isLoading ? "Logging in..." : "Log In"}
      secondaryButtonText="or Sign Up"
      onSecondaryClick={onSwitchToRegister}
      name="login-form"
      handleSubmit={handleSubmit}
    >
      <fieldset className="modal__fieldset">
        <label htmlFor="login-email-input" className="modal__label">
          Email
          <input
            id="login-email-input"
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

        <label htmlFor="login-password-input" className="modal__label">
          Password
          <input
            id="login-password-input"
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

export default LoginModal;
