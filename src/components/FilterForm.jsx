import React, { useContext, useEffect, useState } from "react";
import { filterContext } from "../contexts/filter.context";

function FilterForm({ filterFunction }) {
  const { handleInputChange, loading, text } =
  useContext(filterContext);
  useEffect(() => {
    // console.log("que trae el text", text)
  }, [text]);


//We first create a text state variable and a setText function to update its value.
  // const [text, setText] = useState("");

  // //handleInputChange is called when the users starts typing
  // const handleInputChange = (event) => {
  // //event.target.value extracts the new text from the input field at the precise point where the user is typing (current value typed by the user)  
  //   const newText = event.target.value;
  //   setText(newText); //updates the text state with the new text by calling setText(newText) and renders with the cuerrent updated value 
  //   filterFunction(newText); //function received from the parent component. 
  // };

  return (
    <div>
      <input
        type="text" //reflects the current value stored in text
        value={text}
        onChange={handleInputChange} //the user types into the input field and triggers OnChange, it then calls the handleInputChange to update the text state and perform the filtering
        placeholder="Filter movies..."
      />
    </div>
  );
}

export default FilterForm;