import { useState } from "react";
import { Investment, InvestmentResult } from "../../../Models/InvestmentModels";
import styles from "./InvestmentForm.module.css";
import { toast } from "react-toastify";

interface IInvestmentFormProps {
  onSubmit: (investmentResults: InvestmentResult[]) => void;
  onReset: () => void;
}

function InvestmentForm(props: IInvestmentFormProps) {
  const [currentSavings, setCurrentSavings] = useState<string>("");
  const [yearlySavings, setYearlySavings] = useState<string>("");
  const [expectedInterest, setExpectedInterest] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  function handleFormSubmit(event: React.FormEvent<Element>) {
    event.preventDefault();

    if (
      currentSavings.trim().length === 0 ||
      yearlySavings.trim().length === 0 ||
      expectedInterest.trim().length === 0 ||
      duration.trim().length === 0
    ) {
      return toast.error("All fields required for new expense.");
    }

    const investment: Investment = {
      currentSavings: parseFloat(currentSavings),
      yearlyContribution: parseFloat(yearlySavings),
      expectedReturn: parseFloat(expectedInterest),
      duration: parseFloat(duration),
    };

    calculateInvestment(investment);
  }

  const calculateInvestment = (userInput: Investment) => {
    const yearlyData: InvestmentResult[] = [];

    let currentSavings = +userInput.currentSavings;
    const yearlyContribution = +userInput.yearlyContribution;
    const expectedReturn = +userInput.expectedReturn / 100;
    const duration = +userInput.duration;

    const originalSavings = userInput.currentSavings;
    let totalInvestedCapital = originalSavings;
    let totalInterest = 0;

    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;

      totalInterest += yearlyInterest;
      totalInvestedCapital = originalSavings + yearlyContribution * (i + 1);

      yearlyData.push({
        year: i + 1,
        interestGained: yearlyInterest,
        totalSavings: currentSavings,
        totalInterest: totalInterest,
        totalInvestedCapital: totalInvestedCapital,
      });
    }

    props.onSubmit(yearlyData);
    clearPrompts();
  };

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    switch (event.target.id) {
      case "current-savings":
        setCurrentSavings(event.target.value);
        break;
      case "yearly-contribution":
        setYearlySavings(event.target.value);
        break;
      case "expected-return":
        setExpectedInterest(event.target.value);
        break;
      case "duration":
        setDuration(event.target.value);
        break;
      default:
    }
  }

  function handleReset() {
    clearPrompts();
    props.onReset();
  }

  function clearPrompts() {
    setCurrentSavings("");
    setYearlySavings("");
    setExpectedInterest("");
    setDuration("");
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleFormSubmit}
      onReset={handleReset}
    >
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="current-savings">Current Savings ($)</label>
          <input
            type="number"
            id="current-savings"
            onChange={handleChange}
            value={currentSavings}
          />
        </p>
        <p>
          <label htmlFor="yearly-contribution">Yearly Savings ($)</label>
          <input
            type="number"
            id="yearly-contribution"
            onChange={handleChange}
            value={yearlySavings}
          />
        </p>
      </div>
      <div className={styles["input-group"]}>
        <p>
          <label htmlFor="expected-return">
            Expected Interest (%, per year)
          </label>
          <input
            type="number"
            id="expected-return"
            onChange={handleChange}
            value={expectedInterest}
          />
        </p>
        <p>
          <label htmlFor="duration">Investment Duration (years)</label>
          <input
            type="number"
            id="duration"
            onChange={handleChange}
            value={duration}
          />
        </p>
      </div>
      <p className={styles.actions}>
        <button type="reset" className={styles.buttonAlt}>
          Reset
        </button>
        <button type="submit" className={styles.button}>
          Calculate
        </button>
      </p>
    </form>
  );
}

export default InvestmentForm;
