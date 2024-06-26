import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginPage, {
  logoutAction,
  action as authAction,
} from "./pages/Login/Login";
import SalaryBreakdownPage, {
  loader as salaryLoader,
} from "./pages/SalaryBreakdown/Salary";
import ExpensesPage from "./pages/Expenses/Expenses";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import GoalsPage from "./pages/Goals/Goals";
import LoadingModal from "./components/UI/LoadingModal/LoadingModal";
import AdminPage from "./pages/Admin/Admin";
import {
  SystemParametersPage,
  loader as systemParamsLoader,
} from "./pages/Admin/SystemParameters/SystemParameters";
import AccountPage from "./pages/Admin/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/Home/Home";
import MainLayout from "./components/MainLayout/MainLayout";
import styles from "./App.module.scss";
import { tokenLoader } from "./utils/AuthUtils";
import {
  loader as userLoader,
  action as manageUserAction,
} from "./pages/Admin/Account/Account";
import EditDeductionPage, {
  loader as deductionLoader,
} from "./pages/SalaryBreakdown/EditDeduction/EditDeduction";
import NewDeductionPage from "./pages/SalaryBreakdown/NewDeduction/NewDeduction";
import { action as manageDeduction } from "./components/Deductions/DeductionForm/DeductionForm";
import { deleteAction as deleteDeduction } from "./components/Deductions/DeductionForm/DeductionForm";
import { RootState } from "./redux/reducers/RootReducer";
import RouteProtection from "./components/RouteProtection/RouteProtection";

export default function App() {
  const isLoading = useSelector((state: RootState) => state.loading.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {}, [isLoading, dispatch]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        id="root"
        element={<MainLayout />}
        errorElement={<ErrorPage />}
        loader={tokenLoader}
      >
        <Route
          index
          element={
            <RouteProtection>
              <HomePage />
            </RouteProtection>
          }
        />
        <Route path="login" element={<LoginPage />} action={authAction} />
        <Route path="logout" action={logoutAction} />
        <Route
          path="SalaryBreakdown"
          element={
            <RouteProtection>
              <SalaryBreakdownPage />
            </RouteProtection>
          }
          loader={salaryLoader}
        />
        <Route
          path="SalaryBreakdown/EditDeduction/:deductionId"
          element={
            <RouteProtection>
              <EditDeductionPage />
            </RouteProtection>
          }
          action={manageDeduction}
          loader={deductionLoader}
        />
        <Route
          path="SalaryBreakdown/DeleteDeduction/:deductionId"
          action={deleteDeduction}
        />
        <Route
          path="SalaryBreakdown/NewDeduction"
          element={
            <RouteProtection>
              <NewDeductionPage />
            </RouteProtection>
          }
          action={manageDeduction}
        />
        <Route
          path="Expenses"
          element={
            <RouteProtection>
              <ExpensesPage />
            </RouteProtection>
          }
        />
        <Route
          path="Goals"
          element={
            <RouteProtection>
              <GoalsPage />
            </RouteProtection>
          }
        />
        <Route
          path="Admin"
          element={
            <RouteProtection>
              <AdminPage />
            </RouteProtection>
          }
        >
          <Route path="" element={<Navigate to="Account" />} />
          <Route
            path="Account"
            element={<AccountPage />}
            loader={userLoader}
            action={manageUserAction}
          />
          <Route
            path="SystemParameters"
            element={<SystemParametersPage />}
            loader={systemParamsLoader}
          />
        </Route>
      </Route>,
    ),
  );

  return (
    <div className={styles.wrapper}>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
      {isLoading && <LoadingModal />}
    </div>
  );
}
