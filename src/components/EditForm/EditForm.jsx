import styles from "./EditForm.module.css";
import EditButton from "../Buttons/EditButton";
import Input from "../Input/Input";
import cn from "classnames";
import useInputChecking from "../../hooks/useInputChecking";

export default function EditForm(props) {
  const {
    onClickEditButton,
    rowSelect,
    editableWord,
    editableTranscription,
    editableTranslation,
  } = props;

  const {
    value: valueWord,
    isDanger: isDangerWord,
    wasInputTouch: wasInputWordTouch,
    handleEdit: handleEditWord,
    handleLostFocusInput:handleLostFocusWord,
  } = useInputChecking((value) => {
    value === "" && console.log("Укажите слово");
    return value === "";
  }, editableWord);
  const {
    value: valueTranscription,
    isDanger: isDangerTranscription,
    wasInputTouch: wasInputTranscriptionTouch,
    handleEdit: handleEditTranscription,
    handleLostFocusInput:handleLostFocusTranscription
  } = useInputChecking((value) => {
    (value === "" || !value.match(/^\[[^)]+\]$/)) &&
      console.log(
        "Укажите транскрипцию, она должна содержать квадратные скобки в начале и в конце строки"
      );
    return value === "" || !value.match(/^\[[^)]+\]$/);
  }, editableTranscription);
  const {
    value: valueTranslation,
    isDanger: isDangerTranslation,
    wasInputTouch: wasInputTranslationTouch,
    handleEdit: handleEditTranslation,
    handleLostFocusInput:handleLostFocusTranslation
  } = useInputChecking((value) => {
    value === "" && console.log("Укажите перевод");
    return value === "";
  }, editableTranslation);
  const editStyle = cn(styles.editForm, rowSelect && styles.editFormExisting);
  let disabled = false;
  valueWord === "" ||
  valueTranscription === "" ||
  valueTranslation === "" ||
  !valueTranscription.match(/^\[[^)]+\]$/)
    ? (disabled = true)
    : (disabled = false);
  const handleSave = () => {
    console.log(
      `Слово: ${valueWord}, Транскрипция: ${valueTranscription}, Перевод: ${valueTranslation}`
    );
    onClickEditButton();
  };
  return (
    <div className={editStyle}>
      <div className={styles.inputGroup}>
        <Input
          onChange={handleEditWord}
          value={valueWord}
          danger={wasInputWordTouch&&isDangerWord}
          placeholderText="Слово"
          onBlur={handleLostFocusWord}
        />
        <Input
          onChange={handleEditTranscription}
          value={valueTranscription}
          danger={wasInputTranscriptionTouch&&isDangerTranscription}
          placeholderText="Транскрипция"
          onBlur={handleLostFocusTranscription}
        />
        <Input
          onChange={handleEditTranslation}
          value={valueTranslation}
          danger={wasInputTranslationTouch&&isDangerTranslation}
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
          icon="delete"
        />
      </>
    </div>
  );
}
