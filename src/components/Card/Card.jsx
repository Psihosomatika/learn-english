import styles from "./Card.module.css";
import EditButton from "../Buttons/EditButton";
import React, { useState, useEffect, useRef } from "react";
import data from "../../words.json";

export default function Card({ cardIndex, onClickEditButton }) {
  const buttonRef = useRef();
  const [checkTranslation, setCheckTranslation] = useState(false);

  const handleCheckTranslation = () => {
    setCheckTranslation(true);
    onClickEditButton(data[cardIndex].id);
  };
  useEffect(() => {
    setCheckTranslation(false);
  }, [cardIndex]);
  useEffect(() => {
    buttonRef.current.focus();
  }, []);
  return (
    <div className={styles.card} key={data[cardIndex].id}>
      <p className={styles.title}>{data[cardIndex].english}</p>
      <p className={styles.transcription}>{data[cardIndex].transcription}</p>
      <div>
        {checkTranslation ? (
          <p className={styles.title}>{data[cardIndex].russian}</p>
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
