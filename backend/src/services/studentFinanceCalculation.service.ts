import { SystemParameter } from "../entity/SystemParameter.class";
import { StudentFinancePlan } from "../enums/StudentFinancePlan";
import SystemParameterGroup from "../enums/SystemParameterGroup";
import systemParameterService from "./systemParameter.service";

const calculateYearlyStudentFinance = async (
  yearlySalary: number,
  niBenefit: number,
  taxBenefit: number,
  planUsed: StudentFinancePlan,
): Promise<number> => {
  yearlySalary = yearlySalary - niBenefit * 12;
  yearlySalary = yearlySalary - taxBenefit * 12;
  return calculateStudentFinanceForPeriod(yearlySalary, planUsed, 1);
};

const calculateMonthlyStudentFinance = async (
  monthlySalary: number,
  niBenefit: number,
  taxBenefit: number,
  planUsed: StudentFinancePlan,
): Promise<number> => {
  monthlySalary = monthlySalary - niBenefit;
  monthlySalary = monthlySalary - taxBenefit;
  return calculateStudentFinanceForPeriod(monthlySalary, planUsed, 12);
};

const calculateWeeklyStudentFinance = async (
  weeklySalary: number,
  planUsed: StudentFinancePlan,
): Promise<number> => {
  return calculateStudentFinanceForPeriod(weeklySalary, planUsed, 52);
};

const calculateStudentFinanceForPeriod = async (
  salary: number,
  planUsed: StudentFinancePlan,
  periodsInYear: number,
): Promise<number> => {
  let studentFinance = 0;

  const niParameters: SystemParameter[] =
    await systemParameterService.getSystemParametersByGroup(
      SystemParameterGroup.STUDENT_FINANCE,
    );

  const planParam: SystemParameter | undefined = niParameters.find(
    (p) => p.name === planUsed.toString(),
  );

  if (planParam) {
    const planThreshold = planParam.lowerThreshold || 0;
    const sfRate = planParam.rate;

    studentFinance = await calculateStudentFinance(
      salary,
      planThreshold / periodsInYear,
      sfRate,
    );
  }

  return Math.floor(studentFinance);
};

const calculateStudentFinance = async (
  salary: number,
  planThreshold: number,
  sfRate: number,
): Promise<number> => {
  let salaryOverBy = 0;

  if (salary > planThreshold) {
    salaryOverBy = salary - planThreshold;
  }

  let studentFinance = salaryOverBy * (sfRate / 100);

  return Math.floor(studentFinance);
};

export default {
  calculateWeeklyStudentFinance,
  calculateMonthlyStudentFinance,
  calculateYearlyStudentFinance,
};
