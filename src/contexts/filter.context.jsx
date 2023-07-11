import axios from "axios";
import { createContext, useEffect, useState } from "react";

const filterContext = createContext();

function FilterProviderWrapper({children}){
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    const handleInputChange = (event) => {
        //event.target.value extracts the new text from the input field at the precise point where the user is typing (current value typed by the user)  
          const newText = event.target.value;
          setText(newText); //updates the text state with the new text by calling setText(newText) and renders with the cuerrent updated value 
        //   filterFunction(newText); //function received from the parent component. 
        };

    const clearInput = () => {
        setText('');
        };    



    let exposedValues = {
        loading,
        text,
        handleInputChange,
        clearInput
    }
    return(<filterContext.Provider value={exposedValues}>
        {children}
    </filterContext.Provider>);
}

export {filterContext, FilterProviderWrapper};