import styles from "./WordList.module.css";
import Row from "../Row/Row";
import { useContext } from "react";
import Context from "../../Context/DataContext";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
export default function WordList(props) {
  const { onEdit, onClickEditButton } = props;
  const { words, loading, err } = useContext(Context);

  if (loading) {
    return <Loading />;
  } else if (err) {
    return <Error errorMessage={err.message}/>;
  } else
    return (
      <div className={styles.table}>
        {words.map((item) => {
          return (
            <Row
              wordId={item.id}
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
