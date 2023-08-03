import { IExpenseItem } from "../../../Models/ExpenseModels";
import ExpenseDate from "./ExpenseDate";
import "./ExpenseItem.css";
import NumberHelper from "../../../Utils/NumberHelpers";
import Card from "../../UI/Card/Card";

interface IExpenseItemProps {
  expense: IExpenseItem;
}

export default function ExpenseItem(props: IExpenseItemProps) {
  return (
    <li>
      <Card className="expense-item">
        <ExpenseDate date={props.expense.date} />
        <div className="expense-item__description">
          <h2>{props.expense.title}</h2>
          <div className="expense-item__price">
            {NumberHelper.ToCurrencyString(props.expense.value)}
          </div>
        </div>
      </Card>
    </li>
  );
}
