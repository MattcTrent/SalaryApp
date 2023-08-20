import { ChartDataPoint } from "../../../Models/ExpenseModels";
import styles from "./ChartBar.module.scss";

interface IChartBarProps {
  dataPoint: ChartDataPoint;
  maxValue: number;
}

export default function ChartBar(props: IChartBarProps) {
  let fillPercent = "0%";

  if (props.maxValue > 0) {
    fillPercent =
      Math.round((props.dataPoint.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className={styles.chartBar}>
      <div className={styles.chartBarInner}>
        <div
          className={styles.chartBarFill}
          style={{ height: fillPercent }}
        ></div>
      </div>
      <div className={styles.chartBarLabel}>{props.dataPoint.label}</div>
    </div>
  );
}
