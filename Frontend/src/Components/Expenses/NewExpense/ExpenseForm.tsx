import { useState } from "react";
import "./ExpenseForm.css";
import { Expense } from "@/types/ExpenseModels";

import { toast } from "react-toastify";

interface IExpenseFormProps {
  onSubmitForm: (expense: Expense) => void;
  onCancel: () => void;
}

export default function ExpenseForm(props: IExpenseFormProps) {
  const [newTitle, setNewTitle] = useState<string>("");
  const [newAmount, setNewAmount] = useState<string>("");
  const [newDate, setNewDate] = useState<string>("");

  function handleChange(identifier: string, value: string) {
    switch (identifier) {
      case "title":
        setNewTitle(value);
        break;
      case "amount":
        setNewAmount(value);
        break;
      case "date":
        setNewDate(value);
        break;
      default:
    }
  }

  function handleSubmit(event: React.FormEvent<Element>) {
    event.preventDefault();

    if (
      newTitle.trim().length === 0 ||
      newAmount.trim().length === 0 ||
      newDate.trim().length === 0
    ) {
      return toast.error("All fields required for new expense.");
    }

    const expense: Expense = {
      id: null,
      title: newTitle,
      value: parseFloat(newAmount),
      date: new Date(newDate),
    };

    props.onSubmitForm(expense);

    clearPrompts();
    props.onCancel();
  }

  function clearPrompts() {
    setNewTitle("");
    setNewAmount("");
    setNewDate("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-expense__control">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={(event) => handleChange("title", event.target.value)}
            value={newTitle}
          ></input>
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={(event) => handleChange("amount", event.target.value)}
            value={newAmount}
          ></input>
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2015-01-01"
            max="2024-01-01"
            onChange={(event) => handleChange("date", event.target.value)}
            value={newDate}
          ></input>
        </div>
      </div>
      <div className="new-expense__action">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
}
