import styles from "./Error.module.css";
export default function Error({ errorMessage }) {
  return <p className={styles.error}>{errorMessage}</p>;
}
