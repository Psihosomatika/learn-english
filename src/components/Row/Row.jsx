import EditButton from "../Buttons/EditButton";
import EditForm from "../EditForm/EditForm";
import styles from "./Row.module.css";
import { useState } from "react";

export default function Row(props) {
  const { word, transcription, translation, addTableRow, onClickEditButton, hideButton } = props;
  const [rowSelect, setRowSelect] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleSetEdit = () => {
    setIsEdit(!isEdit);
    setRowSelect(!rowSelect);
    onClickEditButton();
  };

  let tableRow;
  let tableCell;
  if (isEdit)
    tableRow = (
      <EditForm
        onClickEditButton={handleSetEdit}
        rowSelect={rowSelect}
        editableWord={word}
        editableTranscription={transcription}
        editableTranslation={translation}
      />
    );
  else {
    if (!addTableRow&&!hideButton)
      tableCell = (
        <div className={styles.td}>
          <EditButton
            color="warning"
            icon="edit"
            onClickEditButton={handleSetEdit}
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
