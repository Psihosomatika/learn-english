import styles from "./Card.module.css";
import EditButton from "../Buttons/EditButton";
import React, { useState, useEffect, useRef, useContext} from "react";
import Context from "../../Context/DataContext";

export default function Card({ cardIndex, onClickEditButton }) {
  const buttonRef = useRef();
  const [checkTranslation, setCheckTranslation] = useState(false);
  const {words}=useContext(Context);
  const handleCheckTranslation = () => {
    setCheckTranslation(true);
    onClickEditButton(words[cardIndex].id);
  };
  useEffect(() => {
    setCheckTranslation(false);
  }, [cardIndex]);
  useEffect(() => {
    buttonRef.current.focus();
  }, []);
  return (
    <div className={styles.card} key={words[cardIndex].id}>
      <p className={styles.title}>{words[cardIndex].english}</p>
      <p className={styles.transcription}>{words[cardIndex].transcription}</p>
      <div>
        {checkTranslation ? (
          <p className={styles.title}>{words[cardIndex].russian}</p>
        ) : (
          <EditButton
            onClickEditButton={handleCheckTranslation}
            textButton="Проверить"
            color="success"
            ref={buttonRef}
          />
        )}
      </div>
    </div>
  );
}
