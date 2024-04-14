import "./App.css";
import Header from "./components/Header/Header";
import { useState, useEffect } from "react";
import EditForm from "./components/EditForm/EditForm";
import WordList from "./components/WordList/WordList";
import CardContainer from "./components/CardContainer/CardContainer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Missing from "./components/Missing/Missing";
import Context from "./Context/DataContext";

export default function App() {
  const [addRow, setAddRow] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [err, setErr] = useState(null);
  const fetchWords = async () => {
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
    fetchWords();
  }, []);
  const updateWord = async (updatedWord, updatedId) => {
    const response = await fetch(`/api/words/${updatedId}/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    });
    const data = await response.json();
    setWords(words.map((word) => (word.id === updatedId ? data : word)));
  };
  const deleteWord = async (deleteId) => {
    await fetch(`/api/words/${deleteId}/delete`, {
      method: "POST",
    });
    setWords(words.filter((word) => word.id !== deleteId));
  };
  const addWord = async (addedWord) => {
    const response = await fetch(`/api/words/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addedWord),
    });
    const data = await response.json();
    setWords((words) => [...words, data]);
  };
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
      <Context.Provider
        value={{
          words: words,
          addRow: addRow,
          hideButton: hideButton,
          loading: loading,
          err: err,
          fetchWords: fetchWords,
          updateWord,
          deleteWord,
          addWord,
        }}
      >
        <Router>
          <Header onClickEditButton={handleAddRowStart} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {addRow && <EditForm onClickEditButton={handleAddRowEnd} />}
                    <WordList onClickEditButton={handleSetEdit} />
                  </>
                }
              />
              <Route path="/cards" element={<CardContainer />} />
              <Route path="*" element={<Missing />} />
            </Routes>
          </main>
        </Router>
      </Context.Provider>
    </div>
  );
}
