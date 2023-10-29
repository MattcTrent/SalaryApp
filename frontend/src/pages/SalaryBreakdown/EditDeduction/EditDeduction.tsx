import {
  ActionFunctionArgs,
  Await,
  defer,
  json,
  useLoaderData,
} from "react-router-dom";
import { Suspense } from "react";
import DeductionForm from "@/components/Deductions/DeductionForm/DeductionForm";
import { SalaryService } from "@/api/services/SalaryService";
import { Deduction } from "@/types/SalaryModels";

export default function EditDeductionPage() {
  const data: Deduction = useLoaderData() as Deduction;
  return (
    <Suspense fallback={<p>Loading Deductions...</p>}>
      <Await resolve={data}>
        {(deduction) => (
          <DeductionForm loadedDeduction={deduction} method="put" />
        )}
      </Await>
    </Suspense>
  );
}

export async function loader({ params }: ActionFunctionArgs) {
  const deductionId = params.deductionId;

  if (!deductionId) {
    throw json({ message: "No Id found" }, { status: 500 });
  }

  return defer({
    deduction: await loaderDeduction(+deductionId),
  });
}

export async function loaderDeduction(deductionId: number) {
  try {
    const response = await SalaryService.getDeduction(+deductionId);
    if (response.data) {
      return response.data;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw json({ message: error.message }, { status: 404 });
    }
  }
}
