import { ChartDataPoint } from "@/types/ExpenseModels";
import ChartBar from "./ChartBar";

import styles from "./Chart.module.scss";

interface ChartProps {
  dataPoints: ChartDataPoint[];
}

export default function Chart(props: ChartProps) {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);

  const maximum = Math.max(...dataPointValues);

  return (
    <div className={styles.chart}>
      {props.dataPoints.map((dataPoint: ChartDataPoint) => (
        <ChartBar
          key={dataPoint.label}
          dataPoint={dataPoint}
          maxValue={maximum}
        />
      ))}
    </div>
  );
}
