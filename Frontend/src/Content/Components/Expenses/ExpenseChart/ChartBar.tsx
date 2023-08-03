import { IChartDataPoint } from "../../../Models/ExpenseModels";
import "./ChartBar.css";

interface IChartBarProps {
  dataPoint: IChartDataPoint;
  maxValue: number;
}

export default function ChartBar(props: IChartBarProps) {
  let fillPercent = "0%";

  if (props.maxValue > 0) {
    fillPercent =
      Math.round((props.dataPoint.value / props.maxValue) * 100) + "%";
  }

  return (
    <div className="chart-bar">
      <div className="chart-bar__inner">
        <div className="chart-bar__fill" style={{ height: fillPercent }}></div>
      </div>
      <div className="chart-bar__label">{props.dataPoint.label}</div>
    </div>
  );
}
