import { useRouteError } from "react-router-dom";
import styles from "./ErrorPage.module.scss";
import MainNavigation from "../../Content/Components/MainNavigation/MainNavigation";

function ErrorPage() {
  const error: any = useRouteError();

  let title = "An Error Occured";
  let message = "An error has occured, please contact your administrator.";

  if (error.status === 404) {
    title = "Page Not Found";
    message =
      "The page you are looking for is not found, please contact your administrator.";
  } else {
    console.log(error);
  }

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
