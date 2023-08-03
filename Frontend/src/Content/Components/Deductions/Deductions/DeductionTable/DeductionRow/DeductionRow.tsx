import NumberHelper from "../../../../../Utils/NumberHelpers";
import { IDeduction } from "../../../../../Models/SalaryModels";
import TD from "../../../../UI/Table/TableCell/TD";
import styles from "./DeductionRow.module.css";
import { BiEdit } from "react-icons/bi";
import Navigation from "../../../../UI/NavigationLinks/Navigation";

interface TableRowProps {
  deduction: IDeduction;
}

const DeductionRow = (props: TableRowProps) => {
  return (
    <tr className={styles.row}>
      <TD>
        <Navigation
          classNameAddition={styles.button}
          isButton={true}
          path={`EditDeduction/${props.deduction.id}?mode=edit`}
        >
          <BiEdit size={20} />
        </Navigation>
      </TD>
      <TD>{props.deduction.name}</TD>
      <TD>{NumberHelper.ToCurrencyString(props.deduction.cost)}</TD>
    </tr>
  );
};

export default DeductionRow;
