import { Expense } from "../../../Models/ExpenseModels";
import ExpenseDate from "./ExpenseDate";
import NumberHelper from "../../../Utils/NumberHelpers";
import Card from "../../UI/Card/Card";

import styles from "./ExpenseItem.module.scss";

interface ExpenseItemProps {
  expense: Expense;
}

export default function ExpenseItem(props: ExpenseItemProps) {
  return (
    <li>
      <Card className={styles.expenseItem}>
        <ExpenseDate date={props.expense.date} />
        <div className={styles.description}>
          <h2>{props.expense.title}</h2>
          <div className={styles.price}>
            {NumberHelper.ToCurrencyString(props.expense.value)}
          </div>
        </div>
      </Card>
    </li>
  );
}
