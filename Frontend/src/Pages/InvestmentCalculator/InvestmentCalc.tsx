import { useState } from "react";
import InvestmentResults from "../../Content/Components/Investments/InvestmentResults/InvestmentResults";
import { InvestmentResult } from "../../Content/Models/InvestmentModels";
import logo from "../../Content/Resources/Images/investment-logo.png";
import styles from "./InvestmentCalc.module.css";
import InvestmentForm from "../../Content/Components/Investments/InvestmentForm/InvestmentForm";

function InvestmentCalculatorPage() {
  const [investmentResults, setInvestmentResults] = useState<
    InvestmentResult[]
  >([]);

  const calculateHandler = (investmentResults: InvestmentResult[]) => {
    setInvestmentResults(investmentResults);
  };

  function resetHandler() {
    setInvestmentResults([]);
  }

  return (
    <div className={styles.investmentContainer}>
      <header className={styles.header}>
        <img src={logo} alt="logo" />
        <h1>Investment Calculator</h1>
      </header>

      <InvestmentForm onSubmit={calculateHandler} onReset={resetHandler} />

      {investmentResults.length > 0 ? (
        <InvestmentResults results={investmentResults} />
      ) : (
        <p>No Results to show.</p>
      )}
    </div>
  );
}

export default InvestmentCalculatorPage;
