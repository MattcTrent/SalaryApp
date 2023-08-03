interface IInvestment {
  currentSavings: number;
  yearlyContribution: number;
  expectedReturn: number;
  duration: number;
}

interface IInvestmentResult {
  year: number;
  totalSavings: number;
  interestGained: number;
  totalInterest: number;
  totalInvestedCapital: number;
}

export type { IInvestment, IInvestmentResult };
