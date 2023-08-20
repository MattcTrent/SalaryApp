import { NameValueObj } from "./UtilModels";

interface ISystemParameter {
  id: number | null;
  parameterGroup: string;
  name: string;
  rate: number | null;
  lowerThreshold: number | null;
  upperThreshold: number | null;
}

export type { ISystemParameter };

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
