import { IUser } from "./UserModels";

interface ISalaryBreakdown {
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
  user: IUser;
}

type Deduction = {
  id: number;
  user: IUser | null;
  createdById: number;
  type: string;
  billType: string | null;
  savingType: string | null;
  name: string;
  cost: number;
};

export type { ISalaryBreakdown, Deduction };
