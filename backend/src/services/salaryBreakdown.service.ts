import { Deduction } from "../entity/Deduction.class";
import { SalaryBreakdown } from "../entity/SalaryBreakdown.class";
import { DeductionType } from "../enums/DeductionType";
import userService from "../services/user.service";
import taxService from "../services/taxCalculation.service";
import niService from "../services/niCalculation.service";
import studentFinanceService from "../services/studentFinanceCalculation.service";
import { User } from "../entity/User.class";

const getSalaryBreakdownById = async (
  userId: number,
): Promise<SalaryBreakdown> => {
  const user = await userService.getUser(userId);
  return getSalaryBreakdown(user);
};

const getSalaryBreakdownByUsername = async (
  userName: string,
): Promise<SalaryBreakdown> => {
  const user = await userService.getUserByUsername(userName);
  return getSalaryBreakdown(user);
};

const getSalaryBreakdown = async (user: User): Promise<SalaryBreakdown> => {
  const breakdown = new SalaryBreakdown(user);

  breakdown.user = user;
  breakdown.monthlySalary = user.salary / 12;
  breakdown.pension = breakdown.monthlySalary * (user.pensionPercentage / 100);

  if (user.pensionSalarySacrifice) {
    breakdown.salarySacrifice = breakdown.pension;
  }

  await deductSalarySacrificeDeductions(breakdown);

  breakdown.tax = await taxService.calculateMonthlyTax(
    breakdown.getSalaryPostSalarySacrifice(),
  );
  breakdown.taxFree = await taxService.getMonthlyTaxFree();
  breakdown.nI = await niService.calculateMonthlyNI(
    breakdown.getSalaryPostSalarySacrifice(),
  );
  if (user.studentFinancePlan !== null) {
    breakdown.studentFinance =
      await studentFinanceService.calculateMonthlyStudentFinance(
        breakdown.getSalaryPostSalarySacrifice(),
        await niService.getNIBenefitValue(),
        await taxService.getTaxBenefitValue(),
        user.studentFinancePlan,
      );
  }

  await calculateTakehome(breakdown);

  return breakdown;
};

const deductSalarySacrificeDeductions = async (
  breakdown: SalaryBreakdown,
): Promise<void> => {
  const deductionsTotal = await getSalarySacrificeDeductionValue(
    breakdown.user,
  );
  breakdown.salarySacrifice = breakdown.salarySacrifice + deductionsTotal;
};

const calculateTakehome = async (breakdown: SalaryBreakdown): Promise<void> => {
  const salary = breakdown.getSalaryPostSalarySacrifice();
  let takehome =
    salary - breakdown.tax - breakdown.nI - breakdown.studentFinance;

  if (!breakdown.user.pensionSalarySacrifice) {
    takehome = takehome - breakdown.pension;
  }

  takehome =
    takehome -
    (await niService.getNIBenefitValue()) -
    (await taxService.getTaxBenefitValue());

  const payrollDeductions = await getPayrollDeductionValue(breakdown.user);
  breakdown.takehome = takehome - payrollDeductions;
  breakdown.bills = await getBillsDeductionValue(breakdown.user);
  breakdown.savingsAndInvestments =
    await getSavingsAndInvestmentsDeductionValue(breakdown.user);
  breakdown.takehomeAfterBillsAndSavings =
    breakdown.takehome - (breakdown.bills + breakdown.savingsAndInvestments);
};

const getSalarySacrificeDeductionValue = async (
  user: User,
): Promise<number> => {
  const deductions = user.deductions.filter(
    (deduction) => deduction.type === DeductionType.SALARY_SACRIFICE,
  );
  const deductionsTotal = deductions.reduce(
    (runningTotal: number, currentDeduction: Deduction) =>
      runningTotal + currentDeduction.cost,
    0,
  );
  return deductionsTotal;
};

const getPayrollDeductionValue = async (user: User): Promise<number> => {
  const deductions = user.deductions.filter(
    (deduction) => deduction.type === DeductionType.TAX_BENEFIT,
  );
  const deductionsTotal = deductions.reduce(
    (runningTotal: number, currentDeduction: Deduction) =>
      runningTotal + currentDeduction.cost,
    0,
  );
  return deductionsTotal;
};

const getBillsDeductionValue = async (user: User): Promise<number> => {
  const deductions = user.deductions.filter(
    (deduction) => deduction.type === DeductionType.BILL,
  );
  const deductionsTotal = deductions.reduce(
    (runningTotal: number, currentDeduction: Deduction) =>
      runningTotal + currentDeduction.cost,
    0,
  );
  return deductionsTotal;
};

const getSavingsAndInvestmentsDeductionValue = async (
  user: User,
): Promise<number> => {
  const deductions = user.deductions.filter(
    (deduction) => deduction.type === DeductionType.SAVING_AND_INVESTMENT,
  );
  const deductionsTotal = deductions.reduce(
    (runningTotal: number, currentDeduction: Deduction) =>
      runningTotal + currentDeduction.cost,
    0,
  );
  return deductionsTotal;
};

export default { getSalaryBreakdownById, getSalaryBreakdownByUsername };
