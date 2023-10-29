import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import MainNavigation from "@/components/MainNavigation/MainNavigation";

function ErrorPage() {
  const error: unknown = useRouteError();

  const title = "An Error Occured";
  const message = "An error has occured, please contact your administrator.";

  console.error(error);

  return (
    <>
      <MainNavigation />
      <main className={styles.content}>
        <h1>{title}</h1>
        <p>{message}</p>
      </main>
    </>
  );
}

export default ErrorPage;
