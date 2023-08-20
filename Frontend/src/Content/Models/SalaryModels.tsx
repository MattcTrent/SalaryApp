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

export enum DeductionType {
  SALARY_SACRIFICE = "SalarySacrifice",
  TAX_BENEFIT = "TaxBenefit",
  NI_BENEFIT = "NIBenefit",
  PAYROLL_DEDUCTION = "PayrollDeduction",
  BILL = "Bill",
  SAVING_AND_INVESTMENT = "SavingsAndInvestment",
}

export const DeductionTypes: NameValueObj[] = Object.values(DeductionType).map(
  (value) => ({
    displayName: value.replace(/([A-Z])/g, " $1").trim(),
    value,
  }),
);

export enum BillType {
  HOUSEHOLD = "Household",
  SUBSCRIPTION = "Subscription",
  DEBT_REPAYMENT = "DebtRepayment",
}

export const BillTypes: NameValueObj[] = Object.values(BillType).map(
  (value) => ({
    displayName: value.replace(/([A-Z])/g, " $1").trim(),
    value,
  }),
);

export enum SavingType {
  SAVING = "Saving",
  INVESTMENT = "Investment",
}

export const SavingTypes: NameValueObj[] = Object.values(SavingType).map(
  (value) => ({
    displayName: value.replace(/([A-Z])/g, " $1").trim(),
    value,
  }),
);
