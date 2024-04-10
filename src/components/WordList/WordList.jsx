import styles from "./WordList.module.css";
import Row from "../Row/Row";
import { useContext } from "react";
import { Context } from "../../App";

export default function WordList(props) {
  const { onEdit, onClickEditButton } = props;
  const { words } = useContext(Context);

  return (
    <div className={styles.table}>
      {words.map((item) => {
        return (
          <Row
            key={item.id}
            word={item.english}
            transcription={item.transcription}
            translation={item.russian}
            onEdit={onEdit}
            onClickEditButton={onClickEditButton}
          />
        );
      })}
    </div>
  );
}
