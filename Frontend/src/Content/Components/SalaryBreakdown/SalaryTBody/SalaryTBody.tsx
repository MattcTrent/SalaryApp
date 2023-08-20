import { TableBody } from "@mui/material";
import { ISalaryBreakdown } from "../../../Models/SalaryModels";
import { SalaryRow } from "../SalaryRow";

interface SalaryTBodyProps {
  salaryBreakdown: ISalaryBreakdown;
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
        rowName="After Bills"
        rowValue={props.salaryBreakdown.takehomeAfterBills}
        showColumn={props.showColumn}
      />
    </TableBody>
  );
};