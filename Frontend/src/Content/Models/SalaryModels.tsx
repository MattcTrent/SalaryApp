import { User } from "./UserModels";

type SalaryBreakdown = {
  name: string;
  pension: number;
  monthlySalary: number;
  salarySacrifice: number;
  tax: number;
  taxFree: number;
  nI: number;
  studentFinance: number;
  takehome: number;
  bills: number;
  savingsAndInvestments: number;
  takehomeAfterBillsAndSavings: number;
  user: User;
};

type Deduction = {
  id: number;
  user: User | null;
  createdById: number;
  type: string;
  billType: string | null;
  savingType: string | null;
  name: string;
  cost: number;
};

export type { SalaryBreakdown, Deduction };
