import styles from "./LoginForm.module.scss";
import StringInput from "@/Components/UI/Input/StringInput/StringInput";
import PasswordInput from "@/Components/UI/Input/PasswordInput/PasswordInput";
import Button from "@/Components/UI/Button/Button";
import Navigation from "@/Components/UI/NavigationLinks/Navigation";
import { Form, useActionData, useNavigation } from "react-router-dom";

export default function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data: any = useActionData();

  return (
    <Form className={styles.form} method="post">
      <h1>Log In</h1>
      <div className={styles.input}>
        <div className={styles.inputRow}>
          <StringInput
            id="inpUsername"
            name="username"
            type="text"
            readOnly={isSubmitting}
            validationMessage={data?.username ?? undefined}
          >
            Username
          </StringInput>
          <PasswordInput
            id="inpPassword"
            name="password"
            readOnly={isSubmitting}
            validationMessage={data?.password ?? undefined}
          >
            Password
          </PasswordInput>
        </div>
      </div>
      <div>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </div>
      <div>
        <Navigation
          isButton={true}
          disabled={isSubmitting}
          path="/login?mode=register"
        >
          Register User
        </Navigation>
      </div>
    </Form>
  );
}
