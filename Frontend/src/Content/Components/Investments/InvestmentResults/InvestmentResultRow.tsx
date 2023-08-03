import NumberHelper from "../../../Utils/NumberHelpers";
import { IInvestmentResult } from "../../../Models/InvestmentModels";

interface IInvestmentResultsRowProps {
  result: IInvestmentResult;
}

function InvestmentResultsRow(props: IInvestmentResultsRowProps) {
  return (
    <tr>
      <td>{props.result.year}</td>
      <td>{NumberHelper.ToCurrencyString(props.result.totalSavings)}</td>
      <td>{NumberHelper.ToCurrencyString(props.result.interestGained)}</td>
      <td>{NumberHelper.ToCurrencyString(props.result.totalInterest)}</td>
      <td>
        {NumberHelper.ToCurrencyString(props.result.totalInvestedCapital)}
      </td>
    </tr>
  );
}

export default InvestmentResultsRow;
