import AccountForm from "./AccountForm/AccountForm";
import Navigation from "@/Components/UI/NavigationLinks/Navigation";
import { useNavigation } from "react-router-dom";

export default function RegisterForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <AccountForm
        user={null}
        method="post"
        isSubmitting={isSubmitting}
      ></AccountForm>
      <Navigation
        isButton={true}
        disabled={isSubmitting}
        path="/login?mode=login"
      >
        Back to Login
      </Navigation>
    </>
  );
}
