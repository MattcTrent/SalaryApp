import {
  Route,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import LoginPage, {
  logoutAction,
  action as authAction,
} from "./Pages/Login/Login";
import SalaryBreakdownPage, {
  loader as salaryLoader,
} from "./Pages/SalaryBreakdown/Salary";
import ExpensesPage from "./Pages/Expenses/Expenses";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoalsPage from "./Pages/Goals/Goals";
import InvestmentCalculatorPage from "./Pages/InvestmentCalculator/InvestmentCalc";
import LoadingModal from "./Content/Components/UI/LoadingModal/LoadingModal";
import AdminPage from "./Pages/Admin/Admin";
import { SystemParametersPage } from "./Pages/Admin/SystemParameters/SystemParameters";
import AccountPage from "./Pages/Admin/Account/Account";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./Pages/Home/Home";
import MainLayout from "./Content/Components/MainLayout/MainLayout";
import styles from "./App.module.scss";
import { tokenLoader } from "./Content/Utils/AuthUtils";
import {
  loader as userLoader,
  action as manageUserAction,
} from "./Pages/Admin/Account/Account";
import EditDeductionPage, {
  loader as deductionLoader,
} from "./Pages/SalaryBreakdown/EditDeduction/EditDeduction";
import NewDeductionPage from "./Pages/SalaryBreakdown/NewDeduction/NewDeduction";
import { action as manageDeduction } from "./Content/Components/Deductions/DeductionForm/DeductionForm";
import { deleteAction as deleteDeduction } from "./Content/Components/Deductions/DeductionForm/DeductionForm";
import { RootState } from "./Redux/Reducers/RootReducer";

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
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} action={authAction} />
        <Route path="logout" action={logoutAction} />
        <Route
          path="SalaryBreakdown"
          element={<SalaryBreakdownPage />}
          loader={salaryLoader}
        />
        <Route
          path="SalaryBreakdown/EditDeduction/:deductionId"
          element={<EditDeductionPage />}
          action={manageDeduction}
          loader={deductionLoader}
        />
        <Route
          path="SalaryBreakdown/DeleteDeduction/:deductionId"
          action={deleteDeduction}
        />
        <Route
          path="SalaryBreakdown/NewDeduction"
          element={<NewDeductionPage />}
          action={manageDeduction}
        />
        <Route path="Expenses" element={<ExpensesPage />} />
        <Route path="Goals" element={<GoalsPage />} />
        <Route
          path="InvestmentCalculator"
          element={<InvestmentCalculatorPage />}
        />
        <Route path="Admin" element={<AdminPage />}>
          <Route path="" element={<Navigate to="Account" />} />
          <Route
            path="Account"
            element={<AccountPage />}
            loader={userLoader}
            action={manageUserAction}
          />
          <Route path="SystemParameters" element={<SystemParametersPage />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className={styles.wrapper}>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
      {isLoading && <LoadingModal />}
    </div>
  );
}
