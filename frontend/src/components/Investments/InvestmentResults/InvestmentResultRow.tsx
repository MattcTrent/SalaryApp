import NumberHelper from "@/utils/NumberHelpers";
import { InvestmentResult } from "@/types/InvestmentModels";

interface IInvestmentResultsRowProps {
  result: InvestmentResult;
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
