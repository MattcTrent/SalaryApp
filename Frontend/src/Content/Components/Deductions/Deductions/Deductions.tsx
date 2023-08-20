import {
  BillType,
  DeductionType,
  IDeduction,
  SavingType,
} from "../../../Models/SalaryModels";
import Navigation from "../../UI/NavigationLinks/Navigation";
import SectionHeading from "../../UI/SectionHeading/SectionHeading";
import DeductionTable from "./DeductionTable/DeductionTable";
import styles from "./Deductions.module.css";
interface GroupedDeductions {
  [key: string]: IDeduction[];
}

interface DeductionsProps {
  deductions: IDeduction[] | null;
}

const Deductions = (props: DeductionsProps) => {
  // Group the deductions that are not a bill
  const groupedDeductions: GroupedDeductions = {};
  props.deductions?.forEach((item: IDeduction) => {
    if (
      item.type !== DeductionType.BILL &&
      item.type !== DeductionType.SAVING_AND_INVESTMENT
    ) {
      if (!groupedDeductions[item.type]) {
        groupedDeductions[item.type] = [];
      }
      groupedDeductions[item.type].push(item);
    }
  });

  // Group the deductions are bill type
  const groupedBillDeductions: GroupedDeductions = {};
  props.deductions?.forEach((item: IDeduction) => {
    if (item.type === DeductionType.BILL) {
      if (!groupedBillDeductions[item.billType!]) {
        groupedBillDeductions[item.billType!] = [];
      }
      groupedBillDeductions[item.billType!].push(item);
    }
  });

  // Group the deductions are saving
  const groupedSavingAndInvestmentDeductions: GroupedDeductions = {};
  props.deductions?.forEach((item: IDeduction) => {
    if (item.type === DeductionType.SAVING_AND_INVESTMENT) {
      if (!groupedSavingAndInvestmentDeductions[item.billType!]) {
        groupedSavingAndInvestmentDeductions[item.billType!] = [];
      }
      groupedSavingAndInvestmentDeductions[item.billType!].push(item);
    }
  });

  return (
    <div className={styles.container}>
      <SectionHeading generateButtons={generateNewDeductionsNavButtons}>
        Payslip Deductions
      </SectionHeading>
      <div className={styles.deductions}>
        {Object.keys(groupedDeductions).map((deductionType) => (
          <DeductionTable
            key={deductionType}
            title={deductionType as DeductionType}
            type={deductionType as DeductionType}
            deductions={groupedDeductions[deductionType]}
          />
        ))}
      </div>
      <SectionHeading generateButtons={generateNewBillsNavButtons}>
        Bills
      </SectionHeading>
      <div className={styles.bills}>
        {Object.keys(groupedBillDeductions).map((billType) => (
          <DeductionTable
            key={billType}
            title={billType as BillType}
            type={DeductionType.BILL}
            billType={billType as BillType}
            deductions={groupedBillDeductions[billType]}
          />
        ))}
      </div>
      <SectionHeading generateButtons={generateNewSavingsNavButtons}>
        Savings and Investments
      </SectionHeading>
      <div className={styles.bills}>
        {Object.keys(groupedSavingAndInvestmentDeductions).map((billType) => (
          <DeductionTable
            key={billType}
            title={billType as BillType}
            type={DeductionType.BILL}
            billType={billType as BillType}
            deductions={groupedSavingAndInvestmentDeductions[billType]}
          />
        ))}
      </div>
    </div>
  );
};

export default Deductions;

const generateNewDeductionsNavButtons = () => {
  const codeBlocks: JSX.Element[] = [];

  for (const deductionType in DeductionType) {
    if (Object.prototype.hasOwnProperty.call(DeductionType, deductionType)) {
      const type = DeductionType[deductionType as keyof typeof DeductionType];
      const path = `NewDeduction?mode=create&type=${type}`;

      if (type === DeductionType.BILL) {
        continue;
      }

      codeBlocks.push(
        <Navigation
          key={deductionType}
          classNameAddition={styles.navButton}
          isButton={true}
          path={path}
        >
          {type.replace(/([A-Z])/g, " $1").trim()}
        </Navigation>
      );
    }
  }

  return codeBlocks;
};

const generateNewBillsNavButtons = () => {
  const codeBlocks: JSX.Element[] = [];

  for (const billType in BillType) {
    if (Object.prototype.hasOwnProperty.call(BillType, billType)) {
      const type = BillType[billType as keyof typeof BillType];
      const path = `NewDeduction?mode=create&type=${DeductionType.BILL}&billType=${type}`;

      codeBlocks.push(
        <Navigation
          key={billType}
          classNameAddition={styles.navButton}
          isButton={true}
          path={path}
        >
          {type.replace(/([A-Z])/g, " $1").trim()}
        </Navigation>
      );
    }
  }

  return codeBlocks;
};

const generateNewSavingsNavButtons = () => {
  const codeBlocks: JSX.Element[] = [];

  for (const billType in SavingType) {
    if (Object.prototype.hasOwnProperty.call(SavingType, billType)) {
      const type = SavingType[billType as keyof typeof SavingType];
      const path = `NewDeduction?mode=create&type=${DeductionType.BILL}&savingType=${type}`;

      codeBlocks.push(
        <Navigation
          key={billType}
          classNameAddition={styles.navButton}
          isButton={true}
          path={path}
        >
          {type.replace(/([A-Z])/g, " $1").trim()}
        </Navigation>
      );
    }
  }

  return codeBlocks;
};
