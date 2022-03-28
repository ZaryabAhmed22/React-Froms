import { useRef, useState } from "react";

const SimpleInput = (props) => {
  //--We can do the same thing with refs
  const nameInputRef = useRef();

  //--Defining the state
  const [enteredName, setEnteredName] = useState("");
  //--Validation State
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enterNameTouched, setEnterNameTouched] = useState(false);

  //--Senting the state when the use enters the data
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    //validation
    if (event.target.value.trim() !== "") {
      //--Setting the input as invalid
      setEnteredNameIsValid(true);
    }
  };

  //--Making sure that an error is given if the user erase all the input data
  const nameInputBlurHandler = (event) => {
    setEnterNameTouched(true);

    //validation
    if (enteredName.trim() === "") {
      //--Setting the input as invalid
      setEnteredNameIsValid(false);
    }
  };

  //-- The actions that shpuld be taken when the form is submitted
  const fromSubmissionHandler = (event) => {
    //--Preventing the form sending an http request to the server which the default behaviour of any form with a button
    event.preventDefault();

    //Checking whether the input was touched
    setEnterNameTouched(true);

    //--S1 >> Eleminting any whitespaces or any empty strings
    if (enteredName.trim() === "") {
      //--Setting the input as invalid
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);

    console.log(enteredName); //>> from useState()

    const enteredValue = nameInputRef.current.value; //>> alternate way
    console.log(enteredValue);

    setEnteredName("");
  };

  //Combined State that the input was touched and the name is invalid
  const nameInputIsValid = !enteredNameIsValid && enterNameTouched;

  //Deciding the styling if the input is invalid
  const classes = nameInputIsValid ? "form-control invalid" : "form-control ";

  return (
    <form onSubmit={fromSubmissionHandler}>
      <div className={classes}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsValid && (
          <p className="error-text">Name must not be empty</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
