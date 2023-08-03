import { IExpenseItem } from "../../Content/Models/ExpenseModels";
import "./Expenses.css";
import NewExpense from "../../Content/Components/Expenses/NewExpense/NewExpense";
import { useState } from "react";
import ExpenseFilter from "../../Content/Components/Expenses/ExpenseFilter/ExpenseFilter";
import ExpenseList from "../../Content/Components/Expenses/ExpenseList/ExpenseList";
import ExpenseChart from "../../Content/Components/Expenses/ExpenseChart/ExpenseChart";
import Card from "../../Content/Components/UI/Card/Card";

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<IExpenseItem[]>(
    require("./mock-Expenses.json"),
  );
  const [filterYear, setFilterYear] = useState(
    new Date().getFullYear().toString(),
  );

  function getNextId(): number {
    let latestExpense: IExpenseItem = {
      id: 0,
      title: "",
      value: 0.0,
      date: new Date(),
    };
    if (expenses.length > 0) {
      latestExpense = expenses.reduce(
        (prevExpense: IExpenseItem, nextExpense: IExpenseItem) =>
          (prevExpense?.id?.valueOf() || 0) > (nextExpense?.id?.valueOf() || 0)
            ? prevExpense
            : nextExpense,
      );
    }

    return (latestExpense?.id || 0) + 1;
  }

  function addExpense(newExpense: IExpenseItem) {
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
          (expense: IExpenseItem) =>
            new Date(expense.date).getFullYear().toString() === filterYear,
        );
  filteredExpenses = filteredExpenses.sort(
    (prevExpense: IExpenseItem, nextExpense: IExpenseItem) =>
      new Date(prevExpense.date) < new Date(nextExpense.date) ? 1 : 0,
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
