import React, { useState } from "react";

export default function useInput(validateValueFunc) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = enteredValue.trim() !== ""; //>>not hard coding it
  const valueIsValid = validateValueFunc(enteredValue);
  const hasError = !valueIsValid && isTouched;

  //onChange Event handler
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  //onBlur Event handler
  const valueBlurHandler = (event) => {
    setIsTouched(true);
  };

  //reset function
  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
}
