import { useState } from "react";

import InvestmentResults from "@/components/Investments/InvestmentResults/InvestmentResults";
import { InvestmentResult } from "@/types/InvestmentModels";
import InvestmentForm from "@/components/Investments/InvestmentForm/InvestmentForm";

import styles from "./InvestmentCalc.module.scss";

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
