import styles from "./SalaryBreakdown.module.css";
import { SalaryRow } from "./SalaryRow";
import { ISalaryBreakdown } from "../../Models/SalaryModels";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Paper from "@mui/material/Paper";

interface SalaryTableProps {
  salaryBreakdown: ISalaryBreakdown | null;
}

export const SalaryBreakdown = (props: SalaryTableProps) => {
  return (
    <TableContainer className={styles.container} component={Paper}>
      {props.salaryBreakdown ? (
        <>
          <Table className={styles.nameTable} aria-label="simple table">
            <TableHead>
              <TableRow className={`${styles.headerRow} ${styles.nameRow}`}>
                <TableCell align="center">
                  {props.salaryBreakdown.name}
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
          <Table className={styles.table} aria-label="simple table">
            <TableHead>
              <TableRow className={styles.headerRow}>
                <TableCell align="center"></TableCell>
                <TableCell align="left">Yearly</TableCell>
                <TableCell align="left">Monthly</TableCell>
                <TableCell align="left">Weekly</TableCell>
                <TableCell align="left">Daily</TableCell>
                <TableCell align="left">Hourly</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SalaryRow
                rowName="Salary"
                rowValue={props.salaryBreakdown.monthlySalary}
              />
              <SalaryRow
                rowName="Salary Post Salary Sacrifice"
                rowValue={
                  props.salaryBreakdown.monthlySalary -
                  props.salaryBreakdown.salarySacrifice
                }
              />
              <SalaryRow
                rowName="Salary Sacrifice Scheme"
                rowValue={props.salaryBreakdown.salarySacrifice}
              />
              <SalaryRow
                rowName="Pension"
                rowValue={props.salaryBreakdown.pension}
              />
              <SalaryRow
                rowName="Tax Free"
                rowValue={props.salaryBreakdown.taxFree}
              />
              <SalaryRow rowName="Tax" rowValue={props.salaryBreakdown.tax} />
              <SalaryRow rowName="NI" rowValue={props.salaryBreakdown.nI} />
              <SalaryRow
                rowName="Student Loan"
                rowValue={props.salaryBreakdown.studentFinance}
              />
              <SalaryRow
                rowName="Take Home"
                rowValue={props.salaryBreakdown.takehome}
              />
              <SalaryRow
                rowName="Bills"
                rowValue={props.salaryBreakdown.bills}
              />
              <SalaryRow
                rowName="After Bills"
                rowValue={props.salaryBreakdown.takehomeAfterBills}
              />
            </TableBody>
          </Table>
        </>
      ) : (
        <h3>No Salary Breakdown Found</h3>
      )}
    </TableContainer>
  );
};
