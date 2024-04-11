import "./App.css";
import Header from "./components/Header/Header";
import { useState, createContext, useEffect } from "react";
import EditForm from "./components/EditForm/EditForm";
import WordList from "./components/WordList/WordList";
import CardContainer from "./components/CardContainer/CardContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Missing from "./components/Missing/Missing";
import Loading from "./components/Loading/Loading";
export const Context = createContext();

export default function App() {
  const [addRow, setAddRow] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [err, setErr] = useState(null);
  const getApiData = async () => {
    try {
      const response = await fetch("/api/words").then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Что-то пошло не так...");
        }
      });
      setWords(response);
      setLoading(false);
    } catch (err) {
      setErr(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getApiData();
  },[]);
  const handleAddRowStart = () => {
    setAddRow(true);
  };
  const handleAddRowEnd = () => {
    setAddRow(false);
  };
  const handleSetEdit = () => {
    setHideButton(!hideButton);
  };
  return (
    <div className="App">
      <Context.Provider value={{ words, addRow, hideButton }}>
        <Router>
          <Header onClickEditButton={handleAddRowStart} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {addRow && <EditForm onClickEditButton={handleAddRowEnd} />}
                    {loading && <Loading />}
                    {err && <p>{err.message}</p>}
                    {!loading && !err && (
                      <WordList onClickEditButton={handleSetEdit} />
                    )}
                  </>
                }
              />
              <Route path="/cards" element={<CardContainer/>} />
              <Route path="*" element={<Missing />} />
            </Routes>
          </main>
        </Router>
      </Context.Provider>
    </div>
  );
}
