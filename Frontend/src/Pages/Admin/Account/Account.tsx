import { ActionFunction, defer, json } from "react-router-dom";
import ManageAccountForm from "../../../Content/Components/Account/ManageAccountForm";
import {
  ManageAuthUser,
  MessageResponse,
  UserDetails,
} from "../../../Content/Models/UserModels";
import { AccountService } from "../../../Content/API/Services/AccountService";
import { toast } from "react-toastify";
import { getAuthUser } from "../../../Content/Utils/AuthUtils";
import { AxiosResponse } from "axios";
import styles from "./Account.module.scss";

export default function AccountPage() {
  return (
    <div className={styles.container}>
      <ManageAccountForm />
    </div>
  );
}

export async function loadUser(username: string) {
  let result: UserDetails | null = null;
  try {
    const response: AxiosResponse<UserDetails, any> =
      await AccountService.getUserByUsername(username);

    if (response.data) {
      result = response.data;
    } else {
      alert("Error Occured getting user.");
    }
  } catch (error: any) {
    if (error.message !== undefined) {
      toast.error(error.message);
    }
  } finally {
    return result;
  }
}

export async function loader() {
  const username = getAuthUser();
  if (!username) {
    throw json({ message: "Could not retrieve username" }, { status: 500 });
  }

  return defer({
    user: loadUser(username),
  });
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  data.get("ispensionsalarysacrifice")
    ? data.set("ispensionsalarysacrifice", "true")
    : data.set("ispensionsalarysacrifice", "false");

  let authData: ManageAuthUser;
  authData = {
    id: data.get("id"),
    username: data.get("username"),
    password: data.get("password"),
    email: data.get("email"),
    firstName: data.get("firstname"),
    lastName: data.get("lastname"),
    salary: data.get("salary"),
    pensionPercentage: data.get("pensionpercent"),
    pensionSalarySacrifice: data.get("ispensionsalarysacrifice"),
    studentFinancePlan: data.get("studentfinanceplan"),
    roles: null,
  };

  const response: AxiosResponse<MessageResponse, any> =
    await AccountService.updateUser(authData);

  if (response.status !== 200) {
    throw json(
      { message: "could not authenticate user" },
      { status: response.status }
    );
  }

  return toast.success("User Saved");
};
