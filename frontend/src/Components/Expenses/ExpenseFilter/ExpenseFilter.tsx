import React, { Dispatch, SetStateAction } from "react";

import "./ExpenseFilter.css";

interface IExpenseFilterProps {
  filterYear: string;
  setFilterYear: Dispatch<SetStateAction<string>>;
  validYears: string[];
}

const ExpensesFilter = (props: IExpenseFilterProps) => {
  function handleFilterChange(event: React.ChangeEvent<HTMLSelectElement>) {
    props.setFilterYear(event.target.value);
  }

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select onChange={handleFilterChange} value={props.filterYear}>
          <option key="All" value="All">
            All
          </option>
          {props.validYears.map((year: string) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
