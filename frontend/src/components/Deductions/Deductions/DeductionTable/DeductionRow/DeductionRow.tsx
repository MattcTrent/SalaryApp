import NumberHelper from "@/utils/NumberHelpers";
import { Deduction } from "@/types/SalaryModels";
import TD from "@/components/UI/Table/TableCell/TD";
import styles from "./DeductionRow.module.scss";
import { BiEdit } from "react-icons/bi";
import Navigation from "@/components/UI/NavigationLinks/Navigation";

interface TableRowProps {
  deduction: Deduction;
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
