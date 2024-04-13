import { createContext} from "react";
const Context = createContext({
  words:[],
  addRow:false,
  hideButton:false,
  loading:true,
  err:null,
  fetchWords:()=>{},
  updateWord:()=>{},
  deleteWord:()=>{},
  addWord:()=>{},
});
export default Context;