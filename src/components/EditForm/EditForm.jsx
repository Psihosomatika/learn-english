import styles from "./EditForm.module.css";
import EditButton from "../Buttons/EditButton";
import Input from "../Input/Input";
import cn from "classnames";
import useInputChecking from "../../hooks/useInputChecking";
import { useContext } from "react";
import Context from "../../Context/DataContext";
export default function EditForm(props) {
  const { updateWord, addWord } = useContext(Context);
  const {
    onClickEditButton,
    rowSelect,
    editableWord,
    editableTranscription,
    editableTranslation,
    wordId,
  } = props;
  const {
    value: english,
    isDanger: isDangerWord,
    wasInputTouch: wasInputWordTouch,
    emptyInput: emptyInputWord,
    handleEdit: handleEditWord,
    handleLostFocusInput: handleLostFocusWord,
  } = useInputChecking((value) => {
    value === "" && console.log("Укажите слово");
    return value === "";
  }, editableWord);
  const {
    value: transcription,
    isDanger: isDangerTranscription,
    wasInputTouch: wasInputTranscriptionTouch,
    emptyInput: emptyInputTranscription,
    handleEdit: handleEditTranscription,
    handleLostFocusInput: handleLostFocusTranscription,
  } = useInputChecking((value) => {
    (value === "" || !value.match(/^\[[^)]+\]$/)) &&
      console.log(
        "Укажите транскрипцию, она должна содержать квадратные скобки в начале и в конце строки"
      );
    return value === "" || !value.match(/^\[[^)]+\]$/);
  }, editableTranscription);
  const {
    value: russian,
    isDanger: isDangerTranslation,
    wasInputTouch: wasInputTranslationTouch,
    emptyInput: emptyInputTranslation,
    handleEdit: handleEditTranslation,
    handleLostFocusInput: handleLostFocusTranslation,
  } = useInputChecking((value) => {
    value === "" && console.log("Укажите перевод");
    return value === "";
  }, editableTranslation);
  const editStyle = cn(styles.editForm, rowSelect && styles.editFormExisting);
  let disabled = false;
  english === "" ||
  transcription === "" ||
  russian === "" ||
  !transcription.match(/^\[[^)]+\]$/)
    ? (disabled = true)
    : (disabled = false);
  const handleSave = () => {
    const updatedWord = { english, transcription, russian, id:wordId,tags:"" };
        emptyInputWord && emptyInputTranscription && emptyInputTranslation
      ? addWord(updatedWord)
      : updateWord(updatedWord, wordId);
      onClickEditButton();
  };
  return (
    <div className={editStyle}>
      <div className={styles.inputGroup}>
        <Input
          onChange={handleEditWord}
          value={english}
          danger={wasInputWordTouch && isDangerWord}
          placeholderText="Слово"
          onBlur={handleLostFocusWord}
        />
        <Input
          onChange={handleEditTranscription}
          value={transcription}
          danger={wasInputTranscriptionTouch && isDangerTranscription}
          placeholderText="Транскрипция"
          onBlur={handleLostFocusTranscription}
        />
        <Input
          onChange={handleEditTranslation}
          value={russian}
          danger={wasInputTranslationTouch && isDangerTranslation}
          placeholderText="Перевод"
          onBlur={handleLostFocusTranslation}
        />
      </div>
      <>
        <EditButton
          onClickEditButton={handleSave}
          color="success"
          icon="done"
          disabled={disabled}
        />
        <EditButton
          onClickEditButton={onClickEditButton}
          color="danger"
          icon="close"
        />
      </>
    </div>
  );
}
