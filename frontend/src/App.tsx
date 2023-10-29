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
} from "./pages/Login/Login";
import SalaryBreakdownPage, {
  loader as salaryLoader,
} from "./pages/SalaryBreakdown/Salary";
import ExpensesPage from "./pages/Expenses/Expenses";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoalsPage from "./pages/Goals/Goals";
import InvestmentCalculatorPage from "./pages/InvestmentCalculator/InvestmentCalc";
import LoadingModal from "./components/UI/LoadingModal/LoadingModal";
import AdminPage from "./pages/Admin/Admin";
import { SystemParametersPage } from "./pages/Admin/SystemParameters/SystemParameters";
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
