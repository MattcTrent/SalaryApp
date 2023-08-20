import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import NumberHelper from "../../../../Utils/NumberHelpers";
import { Showcolumn } from "../../../../Enums/ShowColum";

import styles from "./SalaryRow.module.css";

interface DataRowProps {
  rowName: string;
  rowValue: number;
  showColumn: string;
}

export const SalaryRow = (props: DataRowProps) => {
  const monthsinAYear = 12;
  const weeksInAYear = 52;
  const workingDaysInWeek = 5;
  const hoursWorkInWeek = 37;

  const yearlyValue = props.rowValue * monthsinAYear;
  const weeklyValue = yearlyValue / weeksInAYear;
  const dailyValue = weeklyValue / workingDaysInWeek;
  const hourlyValue = weeklyValue / hoursWorkInWeek;

  return (
    <TableRow className={styles.row}>
      <TableCell align="left" className={styles.titleCell}>
        {props.rowName}
      </TableCell>
      {props.showColumn === Showcolumn.YEARLY ? (
        <TableCell align="left">
          {NumberHelper.ToCurrencyString(yearlyValue)}
        </TableCell>
      ) : null}
      {props.showColumn === Showcolumn.MONTHLY ? (
        <TableCell align="left">
          {NumberHelper.ToCurrencyString(props.rowValue)}
        </TableCell>
      ) : null}
      {props.showColumn === Showcolumn.WEEKLY ? (
        <TableCell align="left">
          {NumberHelper.ToCurrencyString(weeklyValue)}
        </TableCell>
      ) : null}
      {props.showColumn === Showcolumn.DAILY ? (
        <TableCell align="left">
          {NumberHelper.ToCurrencyString(dailyValue)}
        </TableCell>
      ) : null}
      {props.showColumn === Showcolumn.Hourly ? (
        <TableCell align="left">
          {NumberHelper.ToCurrencyString(hourlyValue)}
        </TableCell>
      ) : null}
    </TableRow>
  );
};
