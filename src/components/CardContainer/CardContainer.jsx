import Button from "../Buttons/Button";
import Card from "../Card/Card";
import styles from "./CardContainer.module.css";
import { useContext, useState } from "react";
import Context from "../../Context/DataContext";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
export default function CardContainer() {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);
  const [wordsLearned, setWorldsLearned] = useState([]);
  const {words,loading, err}=useContext(Context);
  const handleIndexIncrease = () => {
    index < words.length - 1 ? setIndex(index + 1) : setIndex(0);
  };
  const handleIndexReduce = () => {
    index > 0 ? setIndex(index - 1) : setIndex(words.length - 1);
  };
  const handleSetCount = (id) => {
    if (!wordsLearned.includes(id)) {
      setWorldsLearned([...wordsLearned, id]);
      setCount(count + 1);
    }
  };
  if (loading) {
    return <Loading />;
  } else if (err) {
    return <Error errorMessage={err.message}/>;
  } else
  return (
    <>
      <h1 className={styles.h1}>Изучено карточек: {count} </h1>
      <div className={styles.cardContainer}>
        <Button
          onClickButton={handleIndexReduce}
          icon="Arrow_Back"
          color="secondary"
        />
        <Card
          cardIndex={index}
          onClickEditButton={handleSetCount}
        />
        <Button
          onClickButton={handleIndexIncrease}
          icon="Arrow_Forward"
          color="secondary"
        />
      </div>
    </>
  );
}
