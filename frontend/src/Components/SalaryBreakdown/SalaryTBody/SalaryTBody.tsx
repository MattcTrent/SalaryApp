import { TableBody } from "@mui/material";
import { SalaryBreakdown } from "@/types/SalaryModels";
import { SalaryRow } from "./SalaryRow/SalaryRow";

interface SalaryTBodyProps {
  salaryBreakdown: SalaryBreakdown;
  showColumn: string;
}

export const SalaryTBody = (props: SalaryTBodyProps) => {
  return (
    <TableBody>
      <SalaryRow
        rowName="Salary"
        rowValue={props.salaryBreakdown.monthlySalary}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Salary Post Salary Sacrifice"
        rowValue={
          props.salaryBreakdown.monthlySalary -
          props.salaryBreakdown.salarySacrifice
        }
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Salary Sacrifice Scheme"
        rowValue={props.salaryBreakdown.salarySacrifice}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Pension"
        rowValue={props.salaryBreakdown.pension}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Tax Free"
        rowValue={props.salaryBreakdown.taxFree}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Tax"
        rowValue={props.salaryBreakdown.tax}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="NI"
        rowValue={props.salaryBreakdown.nI}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Student Loan"
        rowValue={props.salaryBreakdown.studentFinance}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Take Home"
        rowValue={props.salaryBreakdown.takehome}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Bills"
        rowValue={props.salaryBreakdown.bills}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="Savings and Investments"
        rowValue={props.salaryBreakdown.savingsAndInvestments}
        showColumn={props.showColumn}
      />
      <SalaryRow
        rowName="After Bills"
        rowValue={props.salaryBreakdown.takehomeAfterBillsAndSavings}
        showColumn={props.showColumn}
      />
    </TableBody>
  );
};
