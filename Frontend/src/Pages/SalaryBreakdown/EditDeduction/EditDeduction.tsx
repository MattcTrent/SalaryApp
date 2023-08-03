import {
  ActionFunctionArgs,
  Await,
  defer,
  json,
  useLoaderData,
} from "react-router-dom";
import { Suspense } from "react";
import DeductionForm from "../../../Content/Components/Deductions/DeductionForm/DeductionForm";
import { SalaryService } from "../../../Content/API/Services/SalaryService";

export default function EditDeductionPage() {
  const data: any = useLoaderData();
  return (
    <Suspense fallback={<p>Loading Deductions...</p>}>
      <Await resolve={data.deduction}>
        {(deduction) => (
          <DeductionForm loadedDeduction={deduction} method="put" />
        )}
      </Await>
    </Suspense>
  );
}

export async function loader({ request, params }: ActionFunctionArgs) {
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
  } catch (error: any) {
    const message = error.message ? error.message : "An error occured";
    throw json({ message: message }, { status: 500 });
  }
}
