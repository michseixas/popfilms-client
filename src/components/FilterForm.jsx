import React, { useContext, useEffect } from "react";
import { filterContext } from "../contexts/filter.context";
import { useLocation } from 'react-router-dom';

function FilterForm() {
  const { handleInputChange, handleInputBlur, clearInput, text } = useContext(filterContext);
  useEffect(() => {
    clearInput
  }, []);

  const location = useLocation();
  const route = location.pathname;

  if (route === "/top250" ||route === "/mostpopular" ||route === "/theater" ||route === "/comingsoon") {
    return (
      <div>
        <input
          type="text" //reflects the current value stored in text
          value={text}
          onChange={handleInputChange} //the user types into the input field and triggers OnChange, it then calls the handleInputChange to update the text state and perform the filtering
          onBlur={handleInputBlur}
          placeholder="Filter movies..."
        />
      </div>
    );
  }

  return null;

}

export default FilterForm;