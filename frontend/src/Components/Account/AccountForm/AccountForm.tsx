import styles from "./AccountForm.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerActions } from "@/Redux/Slices/RegisterSlice";
import { UserDetails } from "@/types/UserModels";
import CheckboxInput from "@/Components/UI/Input/CheckboxInput/CheckboxInput";
import CurrencyInput from "@/Components/UI/Input/CurrencyInput/CurrencyInput";
import PasswordInput from "@/Components/UI/Input/PasswordInput/PasswordInput";
import PercentageInput from "@/Components/UI/Input/PercentageInput/PercentageInput";
import StringInput from "@/Components/UI/Input/StringInput/StringInput";
import SelectInput from "@/Components/UI/Input/SelectInput/SelectInput";
import Button from "@/Components/UI/Button/Button";
import { Form, useActionData } from "react-router-dom";
import { RootState } from "@/Redux/Reducers/RootReducer";
import { StudentFinancePlans } from "@/Enums/StudentFinancePlan";

interface IAccountFormProps {
  user: UserDetails | null;
  method: any;
  isSubmitting: boolean;
}

export default function AccountForm(props: IAccountFormProps) {
  const dispatch = useDispatch();
  const registerState = useSelector((state: RootState) => state.register);
  const data: any = useActionData();

  const usernameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(registerActions.setUsername(event.target.value));
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(registerActions.setPassword(event.target.value));
  };

  const firstNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(registerActions.setFirstName(event.target.value));
  };

  const lastNameChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(registerActions.setLastName(event.target.value));
  };

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setEmail(event.target.value));
  };

  const salaryChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerActions.setSalary(+event.target.value));
  };

  const pensionPecentChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(registerActions.setPensionPercentage(+event.target.value));
  };

  const isPensionSSChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(registerActions.setIsPensionSalarySacrifice(event.target.checked));
  };

  function studentFinancePlanChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    dispatch(registerActions.setStudentFinancePlan(event.target.value));
  }

  useEffect(() => {
    if (props.user) {
      dispatch(registerActions.setPassword(""));
      dispatch(registerActions.setExistingUser(props.user));
    } else {
      dispatch(registerActions.reset());
    }
  }, [props.user, dispatch]);

  return (
    <div className={styles.accountWrapper}>
      <Form className={styles.form} method={props.method}>
        <h1>{props.user ? "Manage Account" : "Register Account"}</h1>
        <div className={styles.input}>
          <div className={styles.hidden}>
            <StringInput
              id="inpId"
              name="id"
              type="text"
              defaultValue={registerState.id?.toString()}
            >
              ID
            </StringInput>
          </div>
          <div className={styles.inputRow}>
            <StringInput
              id="inpUsername"
              name="username"
              type="text"
              onChange={usernameChangeHandler}
              value={registerState.username}
              readOnly={
                (props.user === null ? false : true) || props.isSubmitting
              }
              validationMessage={data?.username ?? undefined}
            >
              Username
            </StringInput>
            {!props.user && (
              <PasswordInput
                id="inpPassword"
                name="password"
                onChange={passwordChangeHandler}
                value={registerState.password}
                readOnly={
                  (props.user === null ? false : true) || props.isSubmitting
                }
                validationMessage={data?.password ?? undefined}
              >
                Password
              </PasswordInput>
            )}
          </div>

          <div className={styles.inputRow}>
            <StringInput
              id="inpFirstName"
              name="firstname"
              type="text"
              onChange={firstNameChangeHandler}
              value={registerState.firstName}
              readOnly={props.isSubmitting}
            >
              First Name
            </StringInput>
            <StringInput
              id="inpLastName"
              name="lastname"
              type="text"
              onChange={lastNameChangeHandler}
              value={registerState.lastName}
              readOnly={props.isSubmitting}
            >
              Last Name
            </StringInput>
          </div>

          <div className={styles.inputRow}>
            <StringInput
              id="inpEmail"
              name="email"
              type="text"
              onChange={emailChangeHandler}
              value={registerState.email}
              readOnly={
                (props.user === null ? false : true) || props.isSubmitting
              }
              validationMessage={data?.email ?? undefined}
            >
              E-Mail
            </StringInput>
          </div>

          <div className={styles.inputRow}>
            <CurrencyInput
              id="inpSalary"
              name="salary"
              type="number"
              onChange={salaryChangeHandler}
              value={registerState.salary}
              readOnly={props.isSubmitting}
              validationMessage={data?.salary ?? undefined}
            >
              Salary
            </CurrencyInput>
          </div>

          <div className={styles.inputRow}>
            <PercentageInput
              id="inpPensionPercent"
              name="pensionpercent"
              type="number"
              onChange={pensionPecentChangeHandler}
              value={registerState.pensionPercentage}
              readOnly={props.isSubmitting}
              validationMessage={data?.pensionpercent ?? undefined}
            >
              Pension Percentage
            </PercentageInput>
            <CheckboxInput
              id="inpPensionSS"
              name="ispensionsalarysacrifice"
              onChange={isPensionSSChangeHandler}
              value={registerState.pensionSalarySacrifice}
              readOnly={props.isSubmitting}
            >
              Is Pension Salary Sacrifice?
            </CheckboxInput>
          </div>

          <div className={styles.inputRow}>
            <SelectInput
              id="inpStudentFinancePlan"
              name="studentfinanceplan"
              onChange={studentFinancePlanChangeHandler}
              value={registerState.studentFinancePlan}
              values={StudentFinancePlans}
              readOnly={props.isSubmitting}
            >
              Student Finance Plan
            </SelectInput>
          </div>
          <div>
            <Button type="submit" disabled={props.isSubmitting}>
              {props.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
