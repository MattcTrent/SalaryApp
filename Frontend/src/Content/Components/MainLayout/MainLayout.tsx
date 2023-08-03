import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import styles from "./MainLayout.module.css";
import { useEffect } from "react";
import { getTokenDuration } from "../../Utils/AuthUtils";
import MainNavigation from "../MainNavigation/MainNavigation";

interface MainLayoutProps {}

const MainLayout = (props: MainLayoutProps) => {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main className={styles.content}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
