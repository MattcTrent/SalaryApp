import { Expense } from "@/types/ExpenseModels";
import "./Expenses.css";
import NewExpense from "@/components/Expenses/NewExpense/NewExpense";
import { useState } from "react";
import ExpenseFilter from "@/components/Expenses/ExpenseFilter/ExpenseFilter";
import ExpenseList from "@/components/Expenses/ExpenseList/ExpenseList";
import ExpenseChart from "@/components/Expenses/ExpenseChart/ExpenseChart";
import Card from "@/components/UI/Card/Card";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterYear, setFilterYear] = useState(
    new Date().getFullYear().toString()
  );

  function getNextId(): number {
    let latestExpense: Expense = {
      id: 0,
      title: "",
      value: 0.0,
      date: new Date(),
    };
    if (expenses.length > 0) {
      latestExpense = expenses.reduce(
        (prevExpense: Expense, nextExpense: Expense) =>
          (prevExpense?.id?.valueOf() || 0) > (nextExpense?.id?.valueOf() || 0)
            ? prevExpense
            : nextExpense
      );
    }

    return (latestExpense?.id || 0) + 1;
  }

  function addExpense(newExpense: Expense) {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, newExpense];
    });
  }

  function getValidYears(): string[] {
    const uniqueYears = new Set<string>();

    expenses.forEach((expense) => {
      const expenseYear = new Date(expense.date).getFullYear().toString();
      uniqueYears.add(expenseYear);
    });

    return Array.from(uniqueYears);
  }

  let filteredExpenses =
    filterYear === "All"
      ? expenses
      : expenses.filter(
          (expense: Expense) =>
            new Date(expense.date).getFullYear().toString() === filterYear
        );
  filteredExpenses = filteredExpenses.sort(
    (prevExpense: Expense, nextExpense: Expense) =>
      new Date(prevExpense.date) < new Date(nextExpense.date) ? 1 : 0
  );

  return (
    <div className="expenses-Container">
      <NewExpense onSaveExpense={addExpense} getNextId={getNextId} />
      <Card className="expenses">
        <ExpenseFilter
          filterYear={filterYear}
          setFilterYear={setFilterYear}
          validYears={getValidYears()}
        ></ExpenseFilter>
        <ExpenseChart expenses={filteredExpenses} />
        <ExpenseList expenses={filteredExpenses}></ExpenseList>
      </Card>
    </div>
  );
}
