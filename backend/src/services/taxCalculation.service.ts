import { Deduction } from "../entity/Deduction.class";
import { SystemParameter } from "../entity/SystemParameter.class";
import { DeductionType } from "../enums/DeductionType";
import SystemParameterGroup from "../enums/SystemParameterGroup";
import { TaxBracket } from "../enums/TaxBracket";
import systemParameterService from "./systemParameter.service";
import deductionService from "./deduction.service";

const calculateYearlyTax = async (yearlySalary: number): Promise<number> =>
  calculateTaxPeriod(yearlySalary, 1);

const calculateMonthlyTax = async (monthlySalary: number): Promise<number> =>
  calculateTaxPeriod(monthlySalary, 12);

const calculateWeeklyTax = async (weeklySalary: number): Promise<number> =>
  calculateTaxPeriod(weeklySalary, 52);

const calculateTaxPeriod = async (
  salary: number,
  periodsInYear: number
): Promise<number> => {
  const taxParameters: SystemParameter[] =
    await systemParameterService.getSystemParametersByGroup(
      SystemParameterGroup.TAX
    );
  const personalAllowanceParam: SystemParameter | undefined =
    taxParameters.find(
      (p) => p.name === TaxBracket.PERSONALALLOWANCE.toString()
    );
  const basicTaxParam: SystemParameter | undefined = taxParameters.find(
    (p) => p.name === TaxBracket.BASIC.toString()
  );
  const higherTaxParam: SystemParameter | undefined = taxParameters.find(
    (p) => p.name === TaxBracket.HIGHER.toString()
  );
  const additionalTaxParam: SystemParameter | undefined = taxParameters.find(
    (p) => p.name === TaxBracket.ADDITIONAL.toString()
  );

  if (
    !personalAllowanceParam ||
    !basicTaxParam ||
    !higherTaxParam ||
    !additionalTaxParam
  ) {
    throw new Error(
      "One of the required parameters for Tax calculations is missing."
    );
  }

  let personalAllowanceThreshold = personalAllowanceParam.upperThreshold || 0;
  let basicThreshold = basicTaxParam.upperThreshold || 0;
  let higherThreshold = higherTaxParam.upperThreshold || 0;

  const basicRate = basicTaxParam.rate || 0;
  const higherRate = higherTaxParam.rate || 0;
  const additionalRate = additionalTaxParam.rate || 0;

  const taxBenefitScheme = await getTaxBenefitValue();

  personalAllowanceThreshold = personalAllowanceThreshold / periodsInYear;
  basicThreshold = basicThreshold / periodsInYear;
  higherThreshold = higherThreshold / periodsInYear;

  return calculateTax(
    salary,
    personalAllowanceThreshold,
    basicThreshold,
    higherThreshold,
    basicRate,
    higherRate,
    additionalRate,
    taxBenefitScheme
  );
};

const getTaxBenefitValue = async (): Promise<number> => {
  const deductions: Deduction[] = []; //deductionService.getByType(DeductionType.TAX_BENEFIT);
  const deductionsTotal = deductions.reduce(
    (runningTotal: number, currentDeduction: Deduction) =>
      runningTotal + currentDeduction.cost,
    0
  );

  return deductionsTotal;
};

const calculateTax = async (
  salary: number,
  personalAllowanceThreshold: number,
  basicThreshold: number,
  higherThreshold: number,
  basicRate: number,
  higherRate: number,
  additionalRate: number,
  taxBenefitScheme: number
): Promise<number> => {
  let basicValue;
  let higherValue = 0;
  let additionalValue = 0;
  let taxableSalary = salary - taxBenefitScheme;
  let tax;

  if (taxableSalary > personalAllowanceThreshold) {
    if (taxableSalary > higherThreshold) {
      additionalValue = taxableSalary - higherThreshold;
    }

    if (taxableSalary > basicThreshold) {
      if (taxableSalary > higherThreshold) {
        taxableSalary = higherThreshold;
      }
      higherValue = taxableSalary - basicThreshold;
    }

    if (taxableSalary > basicThreshold) {
      taxableSalary = basicThreshold;
    }
    basicValue = taxableSalary - personalAllowanceThreshold;

    tax = basicValue * (basicRate / 100);
    tax += higherValue * (higherRate / 100);
    tax += additionalValue * (additionalRate / 100);
  } else {
    tax = 0;
  }

  return parseFloat(tax.toFixed(2));
};

const getYearlyTaxFree = async (): Promise<number> => {
  const taxParameters = await systemParameterService.getSystemParametersByGroup(
    SystemParameterGroup.TAX
  );
  const personalAllowanceParam = taxParameters.find(
    (parameter: SystemParameter) =>
      parameter.name === TaxBracket.PERSONALALLOWANCE
  );

  return personalAllowanceParam
    ? personalAllowanceParam.upperThreshold || 0
    : 0;
};

const getMonthlyTaxFree = async (): Promise<number> =>
  (await getYearlyTaxFree()) / 12;

export default {
  getMonthlyTaxFree,
  getYearlyTaxFree,
  calculateWeeklyTax,
  calculateMonthlyTax,
  calculateYearlyTax,
  getTaxBenefitValue,
};
