import DeductionForm from "@/components/Deductions/DeductionForm/DeductionForm";

export default function NewDeductionPage() {
  return <DeductionForm loadedDeduction={null} method="put" />;
}
