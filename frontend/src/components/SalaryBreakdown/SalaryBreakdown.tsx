import styles from "./SalaryBreakdown.module.scss";
import { SalaryBreakdown } from "@/types/SalaryModels";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import SelectInput from "@/components/UI/Input/SelectInput/SelectInput";
import { ShowColumns } from "@/enums/ShowColum";
import { SalaryTBody } from "./SalaryTBody/SalaryTBody";
import SalaryBreakdownTableFilterModal from "./SBTableFilterModal/SBTableFilterModal";
import Button from "@/components/UI/Button/Button";

interface SalaryTableProps {
  salaryBreakdown: SalaryBreakdown | null;
}

export const SalaryBreakdownTable = (props: SalaryTableProps) => {
  const [showColumn, setShowColumn] = useState<string>("Monthly");
  const [showModal, setShowModal] = useState(false);

  function showColumnChangeHandler(
    event: React.ChangeEvent<HTMLSelectElement>,
  ) {
    setShowColumn(event.target.value);
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <TableContainer className={styles.container} component={Paper}>
      {props.salaryBreakdown ? (
        <>
          <Table className={styles.nameTable} aria-label="simple table">
            <TableHead>
              <TableRow className={`${styles.headerRow} ${styles.nameRow}`}>
                <TableCell align="center">
                  <div className={styles.nameRowDiv}>
                    {props.salaryBreakdown.name}
                    <Button
                      onClick={openModal}
                      classNameAddition={styles.button}
                    >
                      Filter Columns
                    </Button>
                  </div>
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
      {showModal && (
        <SalaryBreakdownTableFilterModal onCloseClick={closeModal} />
      )}
    </TableContainer>
  );
};
