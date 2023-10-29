import { Deduction } from "../entity/Deduction.class";
import { SystemParameter } from "../entity/SystemParameter.class";
import { DeductionType } from "../enums/DeductionType";
import { NIBracket } from "../enums/NIBracket";
import SystemParameterGroup from "../enums/SystemParameterGroup";
import systemParameterService from "./systemParameter.service";
import deductionService from "./deduction.service";

const calculateYearlyNI = async (yearlySalary: number): Promise<number> => {
  return calculateNIForPeriod(yearlySalary, 1);
};

const calculateMonthlyNI = async (monthlySalary: number): Promise<number> => {
  return calculateNIForPeriod(monthlySalary, 12);
};

const calculateNIForPeriod = async (
  salary: number,
  periodsInYear: number,
): Promise<number> => {
  const niBenefit = await getNIBenefitValue();

  const niParameters: SystemParameter[] =
    await systemParameterService.getSystemParametersByGroup(
      SystemParameterGroup.NI,
    );
  const basicParam: SystemParameter | undefined = niParameters.find(
    (p) => p.name === NIBracket.BASIC.toString(),
  );
  const additionalParam: SystemParameter | undefined = niParameters.find(
    (p) => p.name === NIBracket.ADDITIONAL.toString(),
  );

  const basicThreshold = basicParam?.lowerThreshold || 0;
  const additionalThreshold = additionalParam?.lowerThreshold || 0;

  const basicRate = basicParam?.rate || 0;
  const additionalRate = additionalParam?.rate || 0;

  const basicThresholdPerPeriod = basicThreshold / periodsInYear;
  const additionalThresholdPerPeriod = additionalThreshold / periodsInYear;

  return calculateNI(
    salary,
    basicThresholdPerPeriod,
    additionalThresholdPerPeriod,
    basicRate,
    additionalRate,
    niBenefit,
  );
};

const calculateNI = async (
  salary: number,
  basicThreshold: number,
  additionalThreshold: number,
  basicRate: number,
  additionalRate: number,
  niBenefitScheme: number,
): Promise<number> => {
  let nationalInsurance: number;
  const niAbleSalary = salary - niBenefitScheme;

  if (niAbleSalary > basicThreshold) {
    if (niAbleSalary < additionalThreshold) {
      nationalInsurance = (niAbleSalary - basicThreshold) * (basicRate / 100);
    } else {
      nationalInsurance =
        (additionalThreshold - basicThreshold) * (basicRate / 100);
      nationalInsurance +=
        (niAbleSalary - additionalThreshold) * (additionalRate / 100);
    }
  } else {
    nationalInsurance = 0;
  }

  return parseFloat(nationalInsurance.toFixed(2));
};

const getNIBenefitValue = async (): Promise<number> => {
  // TODO fix GET DEDUCTIONS
  const deductions: Deduction[] = [];
  //     DeductionType.NI_BENEFIT
  //   );
  const deductionsTotal = deductions.reduce(
    (runningTotal: number, currentDeduction: Deduction) =>
      runningTotal + currentDeduction.cost,
    0,
  );

  return deductionsTotal;
};

export default {
  calculateMonthlyNI,
  calculateYearlyNI,
  getNIBenefitValue,
};
