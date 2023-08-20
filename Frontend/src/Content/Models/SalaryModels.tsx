import { IUser } from "./UserModels";
import { NameValueObj } from "./UtilModels";

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

interface IDeduction {
  id: number;
  user: IUser | null;
  createdById: number;
  type: string;
  billType: string | null;
  savingType: string | null;
  name: string;
  cost: number;
}

export type { ISalaryBreakdown, IDeduction };
