import React from "react";
import styles from "./MainNavigation.module.css";
import { Form, useRouteLoaderData } from "react-router-dom";
import Navigation from "../UI/NavigationLinks/Navigation";
import HomeIcon from '@mui/icons-material/Home';

interface MainNavigationProps {}

function MainNavigation(props: MainNavigationProps) {
  const token = useRouteLoaderData("root") as string | null;

  return (
    <header>
      <nav className={styles.navBar}>
        <ul className={styles.navList}>
          <Navigation path="/"><HomeIcon/></Navigation>
          {token && (
            <>
              <Navigation path="/SalaryBreakdown">Salary Breakdown</Navigation>
              <Navigation path="/Expenses">Expenses</Navigation>
              <Navigation path="/Goals">Goals</Navigation>
              <Navigation path="/InvestmentCalculator">
                Investment Calculator
              </Navigation>
            </>
          )}
        </ul>
        <ul className={styles.navListRight}>
          {!token ? (
            <Navigation
              className={styles.accountButton}
              path="/login?mode=login"
            >
              Login
            </Navigation>
          ) : (
            <>
              <Navigation
                className={styles.accountButton}
                path="/Admin/Account"
              >
                Account
              </Navigation>
              <li className={styles.navItem}>
                <Form action="/logout" method="post">
                  <button className={styles.logoutButton}>Logout</button>
                </Form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
