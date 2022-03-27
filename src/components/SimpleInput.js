import { useRef, useState } from "react";

const SimpleInput = (props) => {
  //--We can do the same thing with refs
  const nameInputRef = useRef();

  //--Defining the state
  const [enteredName, setEnteredName] = useState("");

  //--Senting the state when the use enters the data
  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  //-- The actions that shpuld be taken when the form is submitted
  const fromSubmissionHandler = (event) => {
    //--Preventing the form sending an http request to the server which the default behaviour of any form with a button
    event.preventDefault();

    //--Eleminting any whitespaces or any empty strings
    if (enteredName.trim() === "") {
      return;
    }

    console.log(enteredName); //>> from useState()

    const enteredValue = nameInputRef.current.value; //>> alternate way
    console.log(enteredValue);

    setEnteredName("");
  };
  return (
    <form onSubmit={fromSubmissionHandler}>
      <div className="form-control">
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName}
        />
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
