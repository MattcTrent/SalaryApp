import { IChartDataPoint } from "../../../Models/ExpenseModels";
import "./Chart.css";
import ChartBar from "./ChartBar";

interface IChartProps {
  dataPoints: IChartDataPoint[];
}

export default function Chart(props: IChartProps) {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value);

  const maximum = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint: IChartDataPoint) => (
        <ChartBar
          key={dataPoint.label}
          dataPoint={dataPoint}
          maxValue={maximum}
        />
      ))}
    </div>
  );
}
