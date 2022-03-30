import { useState } from "react";

export default function useBasic(validateFunc) {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredInputIsTouched, setEnteredInputIsTouched] = useState(false);

  //validation
  const enteredValueIsValid = validateFunc(enteredValue);
  const hasError = !enteredValueIsValid && enteredInputIsTouched;

  //onChange
  const valueInputChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };

  //onBlur
  const valueInputBlurHandler = (event) => {
    setEnteredInputIsTouched(true);
  };

  //reset
  const reset = () => {
    setEnteredValue("");
    setEnteredInputIsTouched(false);
  };

  return {
    value: enteredValue,
    valueIsValid: enteredValueIsValid,
    reset,
    valueInputBlurHandler,
    valueInputChangeHandler,
    hasError,
  };
}
