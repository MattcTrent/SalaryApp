type LoginResponse = {
  user: User;
  message: MessageResponse;
};

type MessageResponse = {
  message: string;
  token: string;
};

type AuthUser = {
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
  firstName: FormDataEntryValue | null;
  lastName: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  salary: FormDataEntryValue | null;
  pensionPercentage: FormDataEntryValue | null;
  pensionSalarySacrifice: FormDataEntryValue | null;
  studentFinancePlan: FormDataEntryValue | null;
};
type ManageAuthUser = AuthUser & {
  id: FormDataEntryValue | null;
  roles: FormDataEntryValue | null;
};

type UserDetails = {
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
  roles: Roles[];
};

type User = {
  id: number;
  username: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  salary: number;
  pensionPercentage: number | null;
  pensionSalarySacrifice: boolean | undefined;
  studentFinancePlan: string | null;
  roles: Roles[];
};

type Roles = {
  id: number;
  name: string;
};

export type {
  LoginResponse,
  MessageResponse,
  AuthUser,
  ManageAuthUser,
  User,
  Roles,
  UserDetails,
};
