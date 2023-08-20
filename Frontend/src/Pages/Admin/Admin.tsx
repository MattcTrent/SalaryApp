import { Outlet } from "react-router-dom";
import styles from "./Admin.module.scss";
import AdminNavigation from "./AdminNavigation";

interface AdminPageProps {}

function AdminPage(props: AdminPageProps) {
  return (
    <div className={styles.adminContainer}>
      <AdminNavigation></AdminNavigation>
      <Outlet />
    </div>
  );
}

export default AdminPage;
