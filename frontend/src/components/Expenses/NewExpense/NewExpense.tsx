import { useState } from "react";
import { Expense } from "@/types/ExpenseModels";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

interface INewExpenseProps {
  getNextId: () => number;
  onSaveExpense: (expense: Expense) => void;
}

export default function NewExpense(props: INewExpenseProps) {
  const [showForm, setShowForm] = useState(false);

  function handleToggleForm() {
    setShowForm(!showForm);
  }

  function saveExpense(newExpense: Expense) {
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
