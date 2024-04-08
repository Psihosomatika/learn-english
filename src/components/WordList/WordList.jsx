import styles from "./WordList.module.css";
import data from "../../words.json";
import Row from "../Row/Row";

export default function WordList(props) {
  const { addTableRow, onEdit, hideButton, onClickEditButton } = props;

  return (
    <div className={styles.table}>
        {data.map((item) => {
          return (
            <Row
              addTableRow={addTableRow}
              key={item.id}
              word={item.english}
              transcription={item.transcription}
              translation={item.russian}
              onEdit={onEdit}
              hideButton={hideButton}
              onClickEditButton={onClickEditButton}
            />
          );
        })}
    </div>
  );
}
