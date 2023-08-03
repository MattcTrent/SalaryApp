import ExpenseItem from "../Expense/ExpenseItem";
import { IExpenseItem } from "../../../Models/ExpenseModels";
import "./ExpenseList.css";

interface IExpenseListProps {
  expenses: IExpenseItem[];
}

export default function ExpenseList(props: IExpenseListProps) {
  if (props.expenses.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {props.expenses.map((expense: IExpenseItem) => (
        <ExpenseItem key={expense.id} expense={expense}></ExpenseItem>
      ))}
    </ul>
  );
}
