import { SystemParameterTable } from "../../../Content/Components/SystemParameters/SystemParameterTable";
import styles from './SystemParameters.module.css'

export function SystemParametersPage() {
  return (
    <div className={styles.container}>
      <SystemParameterTable />
    </div>
  );
}
