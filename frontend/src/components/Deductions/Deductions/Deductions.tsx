import { BillType } from "@/enums/BillType";
import { DeductionType } from "@/enums/DeductionType";
import { SavingType } from "@/enums/SavingsType";
import { Deduction } from "@/types/SalaryModels";
import Navigation from "@/components/UI/NavigationLinks/Navigation";
import SectionHeading from "@/components/UI/SectionHeading/SectionHeading";
import DeductionTable from "./DeductionTable/DeductionTable";
import styles from "./Deductions.module.scss";
interface GroupedDeductions {
  [key: string]: Deduction[];
}

interface DeductionsProps {
  deductions: Deduction[] | null;
}

const Deductions = (props: DeductionsProps) => {
  // Group the deductions that are not a bill
  const groupedDeductions: GroupedDeductions = {};
  props.deductions?.forEach((item: Deduction) => {
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
  props.deductions?.forEach((item: Deduction) => {
    if (item.type === DeductionType.BILL) {
      if (!groupedBillDeductions[item.billType!]) {
        groupedBillDeductions[item.billType!] = [];
      }
      groupedBillDeductions[item.billType!].push(item);
    }
  });

  // Group the deductions are saving
  const groupedSavingAndInvestmentDeductions: GroupedDeductions = {};
  props.deductions?.forEach((item: Deduction) => {
    if (item.type === DeductionType.SAVING_AND_INVESTMENT) {
      if (!groupedSavingAndInvestmentDeductions[item.savingType!]) {
        groupedSavingAndInvestmentDeductions[item.savingType!] = [];
      }
      groupedSavingAndInvestmentDeductions[item.savingType!].push(item);
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
      <div className={styles.deductions}>
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
      <div className={styles.deductions}>
        {Object.keys(groupedSavingAndInvestmentDeductions).map((savingType) => (
          <DeductionTable
            key={savingType}
            title={savingType as SavingType}
            type={DeductionType.SAVING_AND_INVESTMENT}
            savingType={savingType as SavingType}
            deductions={groupedSavingAndInvestmentDeductions[savingType]}
          />
        ))}
        ;
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

      if (type === DeductionType.SAVING_AND_INVESTMENT) {
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
        </Navigation>,
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
        </Navigation>,
      );
    }
  }

  return codeBlocks;
};

const generateNewSavingsNavButtons = () => {
  const codeBlocks: JSX.Element[] = [];

  for (const savingType in SavingType) {
    if (Object.prototype.hasOwnProperty.call(SavingType, savingType)) {
      const type = SavingType[savingType as keyof typeof SavingType];
      const path = `NewDeduction?mode=create&type=${DeductionType.SAVING_AND_INVESTMENT}&savingType=${type}`;

      codeBlocks.push(
        <Navigation
          key={savingType}
          classNameAddition={styles.navButton}
          isButton={true}
          path={path}
        >
          {type.replace(/([A-Z])/g, " $1").trim()}
        </Navigation>,
      );
    }
  }

  return codeBlocks;
};
