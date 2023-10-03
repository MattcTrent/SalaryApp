import { NameValueObj } from "@/types/UtilModels";

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
