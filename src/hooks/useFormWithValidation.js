import { useCallback, useState } from "react";

export function useFormWithValidation(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState(Object.keys(defaultValues).reduce((acc, key) => ({ ...acc, [key]: "" }), {}));
  const [isValid, setIsValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() === "" ? "Name is required" : "";
      case "imageUrl":
        if (value.trim() === "") return "Image URL is required";
        try {
          new URL(value);
          return "";
        } catch {
          return "Please enter a valid URL";
        }
      case "weather":
        return value === "" ? "Please select a weather type" : "";
      default:
        return "";
    }
  };

  const validateAll = useCallback(
    (currentValues = values) => {
      const newErrors = {};

      Object.keys(defaultValues).forEach((key) => {
        newErrors[key] = validateField(key, currentValues[key] ?? "");
      });

      const valid = Object.values(newErrors).every((err) => err === "");
      setErrors(newErrors);
      setIsValid(valid);
      return valid;
    },
    [defaultValues, values],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((prevValues) => {
      const nextValues = {
        ...prevValues,
        [name]: value,
      };

      if (isSubmitted) {
        validateAll(nextValues);
      }

      return nextValues;
    });
  };

  const resetForm = useCallback(
    (newValues = defaultValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setIsSubmitted(false);
    },
    [defaultValues],
  );

  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    isSubmitted,
    setIsSubmitted,
    resetForm,
    validateAll,
  };
}
