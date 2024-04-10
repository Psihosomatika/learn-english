import styles from "./Loading.module.css";
import cn from "classnames";
export default function Loading() {
    const lStyle=cn(styles.fountainTextG, styles.fountainTextG_1);
    const oStyle=cn(styles.fountainTextG, styles.fountainTextG_2);
    const aStyle=cn(styles.fountainTextG, styles.fountainTextG_3);
    const dStyle=cn(styles.fountainTextG, styles.fountainTextG_4);
    const iStyle=cn(styles.fountainTextG, styles.fountainTextG_5);
    const nStyle=cn(styles.fountainTextG, styles.fountainTextG_6);
    const gStyle=cn(styles.fountainTextG, styles.fountainTextG_7);
  return (
    <div className={styles.loading}>
      <div className={lStyle}>
        L
      </div>
      <div className={oStyle}>
        o
      </div>
      <div className={aStyle}>
        a
      </div>
      <div className={dStyle}>
        d
      </div>
      <div className={iStyle}>
        i
      </div>
      <div className={nStyle}>
        n
      </div>
      <div className={gStyle}>
        g
      </div>
    </div>
  );
}
