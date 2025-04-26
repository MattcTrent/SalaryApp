import styles from "./Login.module.scss";
import LoginForm from "@/components/Account/LoginForm";
import RegisterForm from "@/components/Account/RegisterForm";
import {
  useSearchParams,
  type ActionFunction,
  redirect,
} from "react-router-dom";
import { AuthUser } from "@/types/UserModels";
import { AccountService } from "@/api/services/AccountService";
import { clearAuth, setAuth } from "@/utils/AuthUtils";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";

  return (
    <div className={styles.container}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}

export const action: ActionFunction = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "register") {
    throw { message: "unsupported mode", status: 422 };
  }

  const data = await request.formData();
  data.get("ispensionsalarysacrifice")
    ? data.set("ispensionsalarysacrifice", "true")
    : data.set("ispensionsalarysacrifice", "false");
  const authData: AuthUser = {
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
    const response = await AccountService.authorizeUser(authData, mode);
    if (response.status !== 200 && response.status !== 201) {
      throw { message: "could not authenticate user", status: response.status };
    }

    if (mode === "login") {
      setAuth(
        response.data.message,
        response.data.data.username,
        response.data.data.id,
      );
    }

    return redirect(`${mode === "login" ? "/" : "/login?mode=login"}`);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
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
  user: AuthUser,
): { validated: boolean; validation: ValidationErrors } {
  const validation: ValidationErrors = {
    username: null,
    password: null,
    email: null,
    salary: null,
    pensionPercentage: null,
    pensionSalarySacrifice: null,
  };
  let validated = true;

  if (mode === "login") {
    if (!user.username || user.username.toString().length === 0) {
      validation.username = "Username is required.";
      validated = false;
    }
    if (!user.password || user.password.toString().length === 0) {
      validation.password = "Password is required.";
      validated = false;
    }
  } else {
    if (!user.username || user.username.toString().length === 0) {
      validation.username = "Username is required.";
      validated = false;
    } else if (user.username && user.username.toString().length < 6) {
      validation.username = "Username must be atleast 6 characters long.";
      validated = false;
    }

    if (!user.password || user.password.toString().length === 0) {
      validation.password = "Password is required.";
      validated = false;
    } else if (user.password && user.password.toString().length < 6) {
      validation.password = "Password must be atleast 6 characters long.";
      validated = false;
    }

    if (!user.email || user.email.toString().length === 0) {
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

export const logoutAction: ActionFunction = () => {
  clearAuth();
  return redirect("/");
};
