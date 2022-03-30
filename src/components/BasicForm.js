import { useState } from "react";
import useBasic from "../hooks/use-basic";

const BasicForm = (props) => {
  const {
    value: enteredName,
    valueIsValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueInputChangeHandler: nameInputChangeHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useBasic((enteredValue) => enteredValue.trim() !== "");

  //overall form validity (to be here)
  let formIsValid = false;

  if (enteredNameIsValid) {
    formIsValid = true;
  }

  //Actions on submit (to be here)
  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid) return;

    nameReset();
  };

  //Conditional Classes
  const nameClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  console.log(enteredName);
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={nameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={enteredName}
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
          />
          {nameInputHasError && (
            <p className="error-text">Name field should not be empty</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="name">Last Name</label>
          <input type="text" id="name" />
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">E-Mail Address</label>
        <input type="text" id="name" />
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
