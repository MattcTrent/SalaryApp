import { NameValueObj } from "../entity/NameValueObj.type";

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
