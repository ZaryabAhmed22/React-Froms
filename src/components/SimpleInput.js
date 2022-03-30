import { useEffect, useState } from "react";
import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  //name validation
  const {
    value: enteredName,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    isValid: enteredNameIsValid,
    valueBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  //Email Validation
  const {
    value: enteredEmail,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    isValid: enteredEmailIsValid,
    valueBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));
  //--S1 Overall form validation
  const [fromIsValid, setFromIsValid] = useState(false);

  //--S2 Overall form validation
  useEffect(() => {
    if (enteredNameIsValid && enteredEmailIsValid) {
      setFromIsValid(true);
    } else {
      setFromIsValid(false);
    }
  }, [enteredNameIsValid, enteredEmailIsValid]);

  //-- The actions that shpuld be taken when the form is submitted
  const fromSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid && !enteredEmailIsValid) {
      //--Setting the input as invalid
      return;
    }
    resetNameInput();
    resetEmailInput();
  };

  //Deciding the styling if the input is invalid
  const nameClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control ";

  const emailClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control ";

  //console.log(nameInputHasError, enteredName, enteredNameIsValid);
  return (
    <form onSubmit={fromSubmissionHandler}>
      {/* Name Input */}
      <div className={nameClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>

      {/* Name Input */}
      <div className={emailClasses}>
        <label htmlFor="email">Your Email</label>
        <input
          type="text"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">Email must not be empty and containe @</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!fromIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
