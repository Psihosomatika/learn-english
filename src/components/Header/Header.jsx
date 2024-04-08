import EditButton from "../Buttons/EditButton";
import MenuItem from "../ListItem/MenuItem";
import styles from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onClickEditButton, disabled }) {
  const location = useLocation();

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <p className={styles.logoText}>Learn English</p>
      </div>
      <nav className={styles.navigation}>
        <div className={styles.ulItem}>
          {location.pathname === "/cards" ? (
            <Link to="/" className={styles.link}>
              <EditButton textButton="К списку слов" color="primary" />
            </Link>
          ) : (
            <>
              <EditButton
                onClickEditButton={onClickEditButton}
                textButton="Добавить слово"
                color="primary"
                disabled={disabled}
              />
              <Link to="/cards" className={styles.link}>
                <EditButton textButton="Тренироваться" color="secondary" />
              </Link>
            </>
          )}
        </div>
        <ul className={styles.ul}>
          <div className={styles.ulItem}>
            <MenuItem textMenu="Зарегистрироваться" />
            <MenuItem textMenu="Войти" />
          </div>
        </ul>
      </nav>
    </header>
  );
}
