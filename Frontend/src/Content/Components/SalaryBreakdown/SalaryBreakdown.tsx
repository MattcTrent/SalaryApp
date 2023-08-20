import styles from "./SalaryBreakdown.module.scss";
import { SalaryBreakdown } from "../../Models/SalaryModels";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import SelectInput from "../UI/Input/SelectInput/SelectInput";
import { ShowColumns } from "../../Enums/ShowColum";
import { SalaryTBody } from "./SalaryTBody/SalaryTBody";
import SalaryBreakdownTableFilterModal from "./SBTableFilterModal/SBTableFilterModal";

interface SalaryTableProps {
  salaryBreakdown: SalaryBreakdown | null;
}

export const SalaryBreakdownTable = (props: SalaryTableProps) => {
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
            <SalaryTBody
              salaryBreakdown={props.salaryBreakdown}
              showColumn={showColumn}
            />
          </Table>
        </>
      ) : (
        <h3>No Salary Breakdown Found</h3>
      )}
      <SalaryBreakdownTableFilterModal />
    </TableContainer>
  );
};
