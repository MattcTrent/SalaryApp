import { ActionFunction } from "react-router-dom";
import ManageAccountForm from "@/components/Account/ManageAccountForm";
import { ManageAuthUser } from "@/types/UserModels";
import { AccountService } from "@/api/services/AccountService";
import { toast } from "react-toastify";
import { getAuthUser } from "@/utils/AuthUtils";
import styles from "./Account.module.scss";

export default function AccountPage() {
  return (
    <div className={styles.container}>
      <ManageAccountForm />
    </div>
  );
}

export async function loadUser(username: string) {
  try {
    const response = await AccountService.getUserByUsername(username);
    if (response.data) {
      return response.data.data;
    } else {
      alert("Error Occured getting user.");
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
}

export async function loader() {
  const username = getAuthUser();
  if (!username) {
    throw { message: "Could not retrieve username", status: 500 };
  }

  return { user: loadUser(username) };
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  data.get("ispensionsalarysacrifice")
    ? data.set("ispensionsalarysacrifice", "1")
    : data.set("ispensionsalarysacrifice", "0");

  const authData: ManageAuthUser = {
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

  const response = await AccountService.updateUser(authData);

  if (response.status !== 200) {
    throw { message: "could not authenticate user", status: response.status };
  }

  return toast.success("User Saved");
};
