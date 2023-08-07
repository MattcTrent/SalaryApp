import React from "react";
import styles from "./Login.module.css";
import LoginForm from "../../Content/Components/Account/LoginForm";
import RegisterForm from "../../Content/Components/Account/RegisterForm";
import {
  useSearchParams,
  type ActionFunction,
  json,
  redirect,
} from "react-router-dom";
import { IAuthUser, ILoginResponse } from "../../Content/Models/UserModels";
import { AccountService } from "../../Content/API/Services/AccountService";
import { clearAuth, setAuth } from "../../Content/Utils/AuthUtils";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

interface LoginPageProps {}

export default function LoginPage(props: LoginPageProps) {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className={styles.container}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export const action: ActionFunction = async ({ request, params }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "register") {
    throw json({ message: "unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  data.get("ispensionsalarysacrifice")
    ? data.set("ispensionsalarysacrifice", "true")
    : data.set("ispensionsalarysacrifice", "false");
  let authData: IAuthUser;
  authData = {
    username: data.get("username"),
    password: data.get("password"),
    email: data.get("email"),
    firstName: data.get("firstname"),
    lastName: data.get("lastname"),
    salary: data.get("salary"),
    pensionPercentage: data.get("pensionpercent"),
    pensionSalarySacrifice: data.get("ispensionsalarysacrifice"),
    studentFinancePlan: data.get("studentfinanceplan"),
  };

  const { validated, validation } = validateAuthUser(mode, authData);
  if (!validated) {
    return validation;
  }

  try {
    const response: AxiosResponse<ILoginResponse, any> =
      await AccountService.authorizeUser(authData, mode);
    if (response.status !== 200) {
      throw json(
        { message: "could not authenticate user" },
        { status: response.status },
      );
    }

    if (mode === "login") {
      setAuth(
        response.data.message.token,
        response.data.user.username,
        response.data.user.id,
      );
    }

    return redirect(`${mode === "login" ? "/" : "/login?mode=login"}`);
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") {
      toast.error(
        "Network Error: There has been an error communicating with the server.",
      );
      return null;
    }

    if (error.response.status === 401) {
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.response.data.message);
      } else {
        throw json(
          { message: "could not authenticate user" },
          { status: error.response.status },
        );
      }
    }
    return null;
  }
};

interface ValidationErrors {
  username: string | null;
  password: string | null;
  email: string | null;
  salary: string | null;
  pensionPercentage: string | null;
  pensionSalarySacrifice: string | null;
}

function validateAuthUser(
  mode: string,
  user: IAuthUser,
): { validated: boolean; validation: ValidationErrors } {
  let validation: ValidationErrors = {
    username: null,
    password: null,
    email: null,
    salary: null,
    pensionPercentage: null,
    pensionSalarySacrifice: null,
  };
  let validated: boolean = true;

  if (mode === "login") {
    if (!user.username || user.username.length === 0) {
      validation.username = "Username is required.";
      validated = false;
    }
    if (!user.password || user.password.length === 0) {
      validation.password = "Password is required.";
      validated = false;
    }
  } else {
    if (!user.username || user.username.length === 0) {
      validation.username = "Username is required.";
      validated = false;
    } else if (user.username && user.username.length < 6) {
      validation.username = "Username must be atleast 6 characters long.";
      validated = false;
    }

    if (!user.password || user.password.length === 0) {
      validation.password = "Password is required.";
      validated = false;
    } else if (user.password && user.password.length < 6) {
      validation.password = "Password must be atleast 6 characters long.";
      validated = false;
    }

    if (!user.email || user.email.length === 0) {
      validation.email = "E-mail is required.";
      validated = false;
    } else if (!user.email.toString().includes("@")) {
      validation.email = "Please enter a valid email.";
      validated = false;
    }

    if (!user.salary) {
      validation.salary = "A Salary is required.";
      validated = false;
    }

    if (!user.pensionPercentage) {
      validation.pensionPercentage = "A Pension percentage is required.";
      validated = false;
    }
  }

  return { validated, validation };
}

export const logoutAction: ActionFunction = ({ request, params }) => {
  clearAuth();
  return redirect("/");
};
