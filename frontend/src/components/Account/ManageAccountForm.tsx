import { Suspense } from "react";
import AccountForm from "./AccountForm/AccountForm";
import { Await, useLoaderData, useNavigation } from "react-router-dom";
import LoadingModal from "@/components/UI/LoadingModal/LoadingModal";
import { User } from "@/types/UserModels";

export default function ManageAccountForm() {
  const data = useLoaderData() as User;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Suspense fallback={<LoadingModal />}>
        <Await resolve={data}>
          {(user) => (
            <AccountForm user={user} method="put" isSubmitting={isSubmitting} />
          )}
        </Await>
      </Suspense>
    </>
  );
}
