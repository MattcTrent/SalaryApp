import { NameValueObj } from "@/types/UtilModels";

export enum StudentFinancePlan {
  PLAN_1 = "Plan1",
  PLAN_2 = "Plan2",
  PLAN_4 = "Plan4",
  PLAN_5 = "Plan5",
  POSTGRADUATE = "Postgraduate",
}

export const StudentFinancePlans: NameValueObj[] = Object.values(
  StudentFinancePlan,
).map((value) => ({
  displayName: value.replace(/([A-Z])/g, " $1").trim(),
  value,
}));
