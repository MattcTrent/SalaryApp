type Expense = {
  id: number | null;
  date: Date;
  title: string;
  value: number;
};

type ChartDataPoint = {
  value: number;
  label: string;
};

export type { Expense, ChartDataPoint };
