import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import NumberHelper from "../../Utils/NumberHelpers";
import styles from "./SalaryRow.module.css";

interface DataRowProps {
  rowName: string;
  rowValue: number;
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
      <TableCell className={styles.titleCell} align="left">
        {props.rowName}
      </TableCell>
      <TableCell align="left">
        {NumberHelper.ToCurrencyString(yearlyValue)}
      </TableCell>
      <TableCell align="left">
        {NumberHelper.ToCurrencyString(props.rowValue)}
      </TableCell>
      <TableCell align="left">
        {NumberHelper.ToCurrencyString(weeklyValue)}
      </TableCell>
      <TableCell align="left">
        {NumberHelper.ToCurrencyString(dailyValue)}
      </TableCell>
      <TableCell align="left">
        {NumberHelper.ToCurrencyString(hourlyValue)}
      </TableCell>
    </TableRow>
  );
};
