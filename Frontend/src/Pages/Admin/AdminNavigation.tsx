import VertNavigation from "@/Components/UI/NavigationLinks/VertNavigation";
import styles from "./AdminNavigation.module.scss";

function AdminNavigation() {
  return (
    <nav className={styles.navBar}>
      <ul className={styles.navList}>
        <VertNavigation path="Account">Account</VertNavigation>
        <VertNavigation path="SystemParameters">
          {" "}
          System Parameters
        </VertNavigation>
      </ul>
    </nav>
  );
}

export default AdminNavigation;
