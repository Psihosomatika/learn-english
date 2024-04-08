import { Link } from "react-router-dom";
import styles from "./Missing.module.css";

export default function Missing() {
  return (
    <>
      <img className={styles.img} alt="ошибка 404" src="../../../404.png"></img>
      <Link className={styles.link} to="/"><h2>На главную</h2></Link>
    </>
  );
}
