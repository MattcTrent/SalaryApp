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
import { useState } from "react";
import SelectInput from "../UI/Input/SelectInput/SelectInput";
import { ShowColumns } from "../../Enums/ShowColum";

interface SalaryTableProps {
  salaryBreakdown: ISalaryBreakdown | null;
}

export const SalaryBreakdown = (props: SalaryTableProps) => {
  const [showColumn, setShowColumn] = useState<string>("Monthly");

  function showColumnChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    setShowColumn(event.target.value);
  }

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
                <TableCell align="left">
                  <SelectInput
                    id="inpShowColumn"
                    name="showColumn"
                    onChange={showColumnChangeHandler}
                    value={showColumn}
                    values={ShowColumns}
                  ></SelectInput>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SalaryRow
                rowName="Salary"
                rowValue={props.salaryBreakdown.monthlySalary}
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="Salary Post Salary Sacrifice"
                rowValue={
                  props.salaryBreakdown.monthlySalary -
                  props.salaryBreakdown.salarySacrifice
                }
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="Salary Sacrifice Scheme"
                rowValue={props.salaryBreakdown.salarySacrifice}
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="Pension"
                rowValue={props.salaryBreakdown.pension}
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="Tax Free"
                rowValue={props.salaryBreakdown.taxFree}
                showColumn={showColumn}
              />
              <SalaryRow rowName="Tax" rowValue={props.salaryBreakdown.tax}
                showColumn={showColumn} />
              <SalaryRow rowName="NI" rowValue={props.salaryBreakdown.nI}
                showColumn={showColumn} />
              <SalaryRow
                rowName="Student Loan"
                rowValue={props.salaryBreakdown.studentFinance}
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="Take Home"
                rowValue={props.salaryBreakdown.takehome}
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="Bills"
                rowValue={props.salaryBreakdown.bills}
                showColumn={showColumn}
              />
              <SalaryRow
                rowName="After Bills"
                rowValue={props.salaryBreakdown.takehomeAfterBills}
                showColumn={showColumn}
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
