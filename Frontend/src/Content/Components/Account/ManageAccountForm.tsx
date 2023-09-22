import { Suspense } from "react";
import AccountForm from "./AccountForm/AccountForm";
import { Await, useLoaderData, useNavigation } from "react-router-dom";
import LoadingModal from "../UI/LoadingModal/LoadingModal";

export default function ManageAccountForm() {
  const data: any = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Suspense fallback={<LoadingModal />}>
        <Await resolve={data.user}>
          {(user) => (
            <AccountForm user={user} method="put" isSubmitting={isSubmitting} />
          )}
        </Await>
      </Suspense>
    </>
  );
}
