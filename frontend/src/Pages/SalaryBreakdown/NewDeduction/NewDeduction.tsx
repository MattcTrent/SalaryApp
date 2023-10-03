import DeductionForm from "@/Components/Deductions/DeductionForm/DeductionForm";

export default function NewDeductionPage() {
  return <DeductionForm loadedDeduction={null} method="put" />;
}
