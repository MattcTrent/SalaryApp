interface Expense {
  id: number | null;
  date: Date;
  title: string;
  value: number;
}

interface ChartDataPoint {
  value: number;
  label: string;
}

export type { Expense, ChartDataPoint };
