import styles from "./MenuItem.module.css"

export default function MenuItem({textMenu}) {
    
      return (
        <li className={styles.navItem}>{textMenu}</li>
    );
  }