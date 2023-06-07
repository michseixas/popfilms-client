import React, { useContext, useEffect } from "react";
import { filterContext } from "../contexts/filter.context";

function FilterForm() {
  const { handleInputChange, handleInputBlur, text } = useContext(filterContext);
  useEffect(() => {
  }, [text]);

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

export default FilterForm;