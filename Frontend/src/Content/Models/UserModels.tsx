import { NameValueObj } from "./UtilModels";

interface ILoginResponse {
  user: IUser;
  message: IMessageResponse;
}

interface IMessageResponse {
  message: string;
  token: string;
}

interface IAuthUser {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  salary: FormDataEntryValue | null;
  pensionPercentage: FormDataEntryValue | null;
  pensionSalarySacrifice: FormDataEntryValue | null;
  studentFinancePlan: FormDataEntryValue | null;
}
interface IManageAuthUser extends IAuthUser {
  id: FormDataEntryValue | null;
  roles: FormDataEntryValue | null;
}

interface IUserDetails {
  id: number | undefined;
  username: string;
  password: string;
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
  salary: number;
  pensionPercentage: number | null;
  pensionSalarySacrifice: boolean | undefined;
  studentFinancePlan: string | undefined;
  roles: IRoles[];
}

interface IUser {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  salary: number;
  pensionPercentage: number | null;
  pensionSalarySacrifice: boolean | undefined;
  studentFinancePlan: string | null;
  roles: IRoles[];
}

interface IRoles {
  id: number;
  name: string;
}

export type {
  ILoginResponse,
  IMessageResponse,
  IAuthUser,
  IManageAuthUser,
  IUser,
  IRoles,
  IUserDetails,
};

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
