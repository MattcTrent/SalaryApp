import { useState } from "react";
import { IExpenseItem } from "../../../Models/ExpenseModels";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

interface INewExpenseProps {
  getNextId: () => number;
  onSaveExpense: (expense: IExpenseItem) => void;
}

export default function NewExpense(props: INewExpenseProps) {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  function saveExpense(newExpense: IExpenseItem) {
    const id = props.getNextId();
    const expenseData = {
      ...newExpense,
      id: id,
    };

    props.onSaveExpense(expenseData);
  }
  return (
    <div className="new-expense">
      {showForm ? (
        <ExpenseForm onSubmitForm={saveExpense} onCancel={handleToggleForm} />
      ) : (
        <div className="new-expense__action">
          <button onClick={handleToggleForm}>Add New Expense</button>
        </div>
      )}
    </div>
  );
}
