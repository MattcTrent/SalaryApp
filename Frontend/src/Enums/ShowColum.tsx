import { NameValueObj } from "@/types/UtilModels";

export enum Showcolumn {
  YEARLY = "Yearly",
  MONTHLY = "Monthly",
  WEEKLY = "Weekly",
  DAILY = "Daily",
  Hourly = "Hourly",
}

export const ShowColumns: NameValueObj[] = Object.values(Showcolumn).map(
  (value) => ({
    displayName: value.replace(/([A-Z])/g, " $1").trim(),
    value,
  }),
);
