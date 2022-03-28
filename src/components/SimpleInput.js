import { useEffect, useState } from "react";

const SimpleInput = (props) => {
  //--Defining the state
  const [enteredName, setEnteredName] = useState("");
  //--Validation State
  const [enterNameTouched, setEnterNameTouched] = useState(false);

  //--S1 Overall form validation
  const [fromIsValid, setFromIsValid] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== "";

  //Combined State that the input was touched and the name is invalid
  const nameInputIsValid = !enteredNameIsValid && enterNameTouched;

  //--S2 Overall form validation
  useEffect(() => {
    if (enteredNameIsValid) {
      setFromIsValid(true);
    } else {
      setFromIsValid(false);
    }
  }, [enteredNameIsValid]);

  //--Senting the state when the use enters the data
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  //--Making sure that an error is given if the user erase all the input data
  const nameInputBlurHandler = (event) => {
    setEnterNameTouched(true);

    //validation
  };

  //-- The actions that shpuld be taken when the form is submitted
  const fromSubmissionHandler = (event) => {
    //--Preventing the form sending an http request to the server which the default behaviour of any form with a button
    event.preventDefault();

    //Checking whether the input was touched
    setEnterNameTouched(true);

    //--S1 >> Eleminting any whitespaces or any empty strings
    if (!enteredNameIsValid) {
      //--Setting the input as invalid
      return;
    }

    console.log(enteredName); //>> from useState()

    setEnteredName("");

    //--Setting the touched state to false once the user inputs the data to avoid uneccessary error msg
    setEnterNameTouched(false);
  };

  //Deciding the styling if the input is invalid
  const classes = nameInputIsValid ? "form-control invalid" : "form-control ";

  return (
    <form onSubmit={fromSubmissionHandler}>
      <div className={classes}>
        <label htmlFor="name">Your Name</label>
        <input
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
        <button disabled={!fromIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
