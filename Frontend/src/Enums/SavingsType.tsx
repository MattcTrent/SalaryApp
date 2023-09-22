import { NameValueObj } from "@/types/UtilModels";

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
