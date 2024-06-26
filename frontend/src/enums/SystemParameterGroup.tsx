import { NameValueObj } from "@/types/UtilModels";

export enum SystemParameterGroup {
  TAX = "Tax",
  NI = "NI",
  STUDENT_FINANCE = "StudentFinance",
}

export const SystemParameterGroups: NameValueObj[] = Object.values(
  SystemParameterGroup,
).map((value) => ({
  displayName: value.replace(/([A-Z])/g, " $1").trim(),
  value,
}));
