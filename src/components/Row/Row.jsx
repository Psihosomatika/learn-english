import Context from "../../Context/DataContext";
import EditButton from "../Buttons/EditButton";
import EditForm from "../EditForm/EditForm";
import styles from "./Row.module.css";
import { useContext, useState } from "react";

export default function Row(props) {
  const { word, transcription, translation, onClickEditButton, wordId } = props;
  const { hideButton, addRow, deleteWord } = useContext(Context);
  const [rowSelect, setRowSelect] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSetEdit = () => {
    setIsEdit(!isEdit);
    setRowSelect(!rowSelect);
    onClickEditButton();
  };
  const handleDelete = (deleteId) => {
    deleteWord(deleteId);
  };
  let tableRow;
  let tableCell;
  if (isEdit)
    tableRow = (
      <EditForm
        wordId={wordId}
        onClickEditButton={handleSetEdit}
        rowSelect={rowSelect}
        editableWord={word}
        editableTranscription={transcription}
        editableTranslation={translation}
      />
    );
  else {
    if (!addRow && !hideButton)
      tableCell = (
        <div className={styles.td}>
          <EditButton
            color="warning"
            icon="edit"
            onClickEditButton={handleSetEdit}
          />
          <EditButton
            color="danger"
            icon="delete"
            onClickEditButton={() => handleDelete(wordId)}
          />
        </div>
      );
    else tableCell = <div className={styles.td}></div>;
    return (
      <div className={styles.tr}>
        <div className={styles.td}>{word}</div>
        <div className={styles.td}>{transcription}</div>
        <div className={styles.td}>{translation}</div>
        {tableCell}
      </div>
    );
  }
  return <>{tableRow}</>;
}
