import { Suspense } from "react";
import AccountForm from "./AccountForm/AccountForm";
import { Await, useLoaderData, useNavigation } from "react-router-dom";
import LoadingModal from "@/components/UI/LoadingModal/LoadingModal";
import { User } from "@/types/UserModels";

export default function ManageAccountForm() {
  const data = useLoaderData() as { user: Promise<User | null | undefined> };
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Suspense fallback={<LoadingModal />}>
        <Await resolve={data.user}>
          {(user) => (
            <AccountForm
              user={user ?? null}
              method="put"
              isSubmitting={isSubmitting}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}
