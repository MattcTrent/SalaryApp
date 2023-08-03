interface IExpenseItem {
  id: number | null;
  date: Date;
  title: string;
  value: number;
}

interface IChartDataPoint {
  value: number;
  label: string;
}

export type { IExpenseItem, IChartDataPoint };
