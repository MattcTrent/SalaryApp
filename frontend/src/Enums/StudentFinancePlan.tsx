import { NameValueObj } from "@/types/UtilModels";

export enum StudentFinancePlan {
  PLAN_1 = "Plan1",
  PLAN_2 = "Plan2",
}

export const StudentFinancePlans: NameValueObj[] = Object.values(
  StudentFinancePlan,
).map((value) => ({
  displayName: value.replace(/([A-Z])/g, " $1").trim(),
  value,
}));
