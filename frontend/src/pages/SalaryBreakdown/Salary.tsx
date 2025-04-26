import { Suspense } from "react";
import { SalaryService } from "@/api/services/SalaryService";
import { SalaryBreakdownTable } from "@/components/SalaryBreakdown/SalaryBreakdown";
import Deductions from "@/components/Deductions/Deductions/Deductions";
import styles from "./Salary.module.scss";
import { Await, useLoaderData } from "react-router-dom";
import { getAuthUser, getAuthUserId } from "@/utils/AuthUtils";
import { Deduction, SalaryBreakdown } from "@/types/SalaryModels";

const SalaryBreakdownPage = () => {
  const data = useLoaderData() as {
    salary: SalaryBreakdown;
    deductions: Deduction[];
  };

  return (
    <div className={styles.container}>
      <Suspense fallback={<p>Loading Salary Breakdown...</p>}>
        <Await resolve={data.salary}>
          {(salary) => (
            <SalaryBreakdownTable key={salary.name} salaryBreakdown={salary} />
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

export default SalaryBreakdownPage;

export async function loader() {
  const username = getAuthUser();
  const userId = getAuthUserId();

  if (!username) {
    throw { message: "Could not retrieve username", status: 500 };
  }
  if (!userId) {
    throw { message: "Could not retrieve username", status: 500 };
  }

  return { salary: loadSalary(username), deductions: loadDeductions(userId) };
}

async function loadSalary(username: string) {
  try {
    const response = await SalaryService.getSalaryBreakdown(username!);
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw { message: error.message, status: 404 };
    }
  }
}

async function loadDeductions(userId: number) {
  try {
    const response = await SalaryService.getDeductions(userId);
    if (response.data) {
      return response.data.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof Error) {
        throw { message: error.message, status: 404 };
      }
    }
  }
}
