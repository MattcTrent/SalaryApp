type Investment = {
  currentSavings: number;
  yearlyContribution: number;
  expectedReturn: number;
  duration: number;
};

type InvestmentResult = {
  year: number;
  totalSavings: number;
  interestGained: number;
  totalInterest: number;
  totalInvestedCapital: number;
};

export type { Investment, InvestmentResult };
