import { useState } from "react";

export default function useInputChecking(ckeckDanger, initValue) {
  const [value, setValue] = useState(initValue !== undefined ? initValue : "");
  const [wasInputTouch, setWasInputTouch] = useState(false);
  const [emptyInput, setEmptyInput]=useState(false);
  const isDanger = ckeckDanger(value);
  const handleEdit = (e) => {
    (initValue===undefined)?setEmptyInput(true):setEmptyInput(false);
    setValue(e.target.value);
  };
  const handleLostFocusInput = () => {
    setWasInputTouch(true);
  };
  return {
    value: value,
    isDanger: isDanger,
    wasInputTouch: wasInputTouch,
    emptyInput:emptyInput,
    handleEdit: handleEdit,
    handleLostFocusInput,
  };
}
