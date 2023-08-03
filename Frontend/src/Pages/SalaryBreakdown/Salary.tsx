import React, { Suspense } from "react";
import { SalaryService } from "../../Content/API/Services/SalaryService";
import { SalaryBreakdown } from "../../Content/Components/SalaryBreakdown/SalaryBreakdown";
import Deductions from "../../Content/Components/Deductions/Deductions/Deductions";
import styles from "./Salary.module.css";
import {
  ActionFunctionArgs,
  Await,
  defer,
  json,
  useLoaderData,
} from "react-router-dom";
import { getAuthUser, getAuthUserId } from "../../Content/Utils/AuthUtils";

interface ISalaryPageProps {}

const SalaryPage = (props: ISalaryPageProps) => {
  const data: any = useLoaderData();

  return (
    <div className={styles.container}>
      <Suspense fallback={<p>Loading Salary Breakdown...</p>}>
        <Await resolve={data.salary}>
          {(salary) => (
            <SalaryBreakdown key={salary.name} salaryBreakdown={salary} />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Loading Deductions...</p>}>
        <Await resolve={data.deductions}>
          {(deductions) => <Deductions deductions={deductions} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default SalaryPage;

export async function loader({ request, params }: ActionFunctionArgs) {
  const username = getAuthUser();
  const userId = getAuthUserId();

  if (!username) {
    throw json({ message: "Could not retrieve username" }, { status: 500 });
  }
  if (!userId) {
    throw json({ message: "Could not retrieve username" }, { status: 500 });
  }

  return defer({
    salary: loadSalary(username),
    deductions: loadDeductions(userId),
  });
}

async function loadSalary(username: string) {
  try {
    const response = await SalaryService.getSalaryBreakdown(username!);
    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    const message = error.message ? error.message : "An error occured";
    throw json({ message: message }, { status: 500 });
  }
}

async function loadDeductions(userId: number) {
  try {
    const response = await SalaryService.getDeductions(userId);
    if (response.data) {
      return response.data;
    }
  } catch (error: any) {
    const message = error.message ? error.message : "An error occured";
    throw json({ message: message }, { status: 500 });
  }
}
