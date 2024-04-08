import styles from "./Button.module.css";
import cn from "classnames";

export default function NavButton(props) {
  const { textButton, color, onClickButton, icon } = props;
  const buttonStyle = cn(styles.button, styles[color]);

  return (
    <button onClick={onClickButton} className={buttonStyle}><span className="material-symbols-outlined">{icon}</span>
      {textButton}
    </button>
  );
}
