import { useState } from "react";

const useInput = (validateValue) => {
  const [value,setValue] = useState('');

  const valueChangeHandler = (event) =>{
    setValue(event.target.value);
  }

  const reset = () =>{
    setValue('');
  }

  const valueIsValid = validateValue(value);

  return {
    value,
    valueIsValid,
    valueChangeHandler,
    reset
  }
}

export default useInput;