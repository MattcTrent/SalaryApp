import { IInvestmentResult } from "../../../Models/InvestmentModels";
import InvestmentResultsRow from "./InvestmentResultRow";
import styles from "./InvestmentResults.module.css";

interface IInvestmentResultsProps {
  results: IInvestmentResult[];
}

function InvestmentResults(props: IInvestmentResultsProps) {
  return (
    <table className={styles.result}>
      <thead>
        <tr>
          <th>Year</th>
          <th>Total Savings</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {props.results.map((result) => (
          <InvestmentResultsRow
            key={result.year}
            result={result}
          ></InvestmentResultsRow>
        ))}
      </tbody>
    </table>
  );
}

export default InvestmentResults;
