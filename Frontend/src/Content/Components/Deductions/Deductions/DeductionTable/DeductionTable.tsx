import styles from "./DeductionTable.module.css";
import DeductionRow from "./DeductionRow/DeductionRow";
import { IoMdCreate } from "react-icons/io";
import { Deduction } from "../../../../Models/SalaryModels";
import NumberHelper from "../../../../Utils/NumberHelpers";
import Navigation from "../../../UI/NavigationLinks/Navigation";
import TD from "../../../UI/Table/TableCell/TD";
import TH from "../../../UI/Table/TableHeadCell/TH";

interface DeductionsTableProps {
  title: string;
  type: string;
  billType?: string;
  savingType?: string;
  deductions: Deduction[];
}

const DeductionTable = (props: DeductionsTableProps) => {
  const billTypePath = props.billType && `&billType=${props.billType}`;
  const savingTypePath = props.savingType && `&savingType=${props.savingType}`;

  return (
    <div className={styles.tableCont}>
      <table className={styles.tableName}>
        <thead className={styles.tableTitle}>
          <tr>
            <TH className={styles.title}>{props.title}</TH>
          </tr>
        </thead>
      </table>
      <Navigation
        classNameAddition={styles.newButton}
        isButton={true}
        path={`NewDeduction?mode=create&type=${props.type}${
          billTypePath ?? ""
        }${savingTypePath ?? ""}`}
      >
        <IoMdCreate size={20} /> New
      </Navigation>
      <table className={styles.table}>
        <thead className={styles.head}>
          <tr>
            <TH></TH>
            <TH>Name</TH>
            <TH>Cost</TH>
          </tr>
        </thead>
        <tbody className={styles.body}>
          {props.deductions.map((item: Deduction) => (
            <DeductionRow key={item.id} deduction={item} />
          ))}
        </tbody>
        <tfoot className={styles.foot}>
          <tr>
            <TD></TD>
            <TD>Total</TD>
            <TD>
              {NumberHelper.ToCurrencyString(
                props.deductions.reduce((prev: number, current: Deduction) => {
                  return prev + current.cost;
                }, 0)
              )}
            </TD>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default DeductionTable;
