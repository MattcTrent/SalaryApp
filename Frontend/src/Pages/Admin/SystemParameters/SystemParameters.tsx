import { SystemParameterTable } from "@/Components/SystemParameters/SystemParameterTable";
import styles from "./SystemParameters.module.scss";

export function SystemParametersPage() {
  return (
    <div className={styles.container}>
      <SystemParameterTable />
    </div>
  );
}
