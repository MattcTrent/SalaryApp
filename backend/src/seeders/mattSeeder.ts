import { Deduction } from "../entity/Deduction.class";
import { User } from "../entity/User.class";
import { StudentFinancePlan } from "../enums/StudentFinancePlan";
import { AppDataSource } from "../server";
import { Role } from "../entity/Role.class";
import { DeductionType } from "../enums/DeductionType";
import { BillType } from "../enums/BillType";
import { SavingType } from "../enums/SavingsType";

export const seedMattData = async () => {
  const userToSeed = getUser();
  const users = await AppDataSource.manager.find(User);
  let existingUser = users.find(
    (user) => user.username === userToSeed.username,
  );

  if (existingUser) {
    console.log(`user: ${userToSeed.username} already exists, skipping seed`);
  } else {
    existingUser = await AppDataSource.manager.save(userToSeed);
    console.log(`user: ${userToSeed.username} seeded`);
  }

  const userDeductionsToSeed = getUserDeductions(existingUser);
  const existingDeductions = await AppDataSource.manager.find(Deduction);
  if (existingDeductions.length != 0) {
    console.log(
      `${existingDeductions.length} Deductions already exist, skipping seed`,
    );
  } else {
    let seededDeductions =
      await AppDataSource.manager.save(userDeductionsToSeed);
    console.log(
      `${seededDeductions.length} Deductions seeded for user ${userToSeed.username}`,
    );
  }
};

const getUser = (): User => {
  const user: User = new User(
    "mattctrent",
    "Claude20",
    "Matthew",
    "Trent",
    "matt_trent@hotmail.com",
    0,
    6,
    true,
    StudentFinancePlan.PLAN_2,
    [],
    [],
  );

  const defaultRole = new Role("user", user);
  user.roles.push(defaultRole);

  user.hashPassword();

  return user;
};

const getUserDeductions = (user: User): Deduction[] => {
  const deductions: Deduction[] = [];

  deductions.push(
    new Deduction(
      user,
      DeductionType.SALARY_SACRIFICE,
      null,
      null,
      "Travel Ins",
      6.56,
    ),
    new Deduction(
      user,
      DeductionType.SALARY_SACRIFICE,
      null,
      null,
      "Holidays Bought",
      41.6,
    ),
    new Deduction(
      user,
      DeductionType.SALARY_SACRIFICE,
      null,
      null,
      "Gym Flex",
      44,
    ),
    new Deduction(
      user,
      DeductionType.SAVING_AND_INVESTMENT,
      null,
      SavingType.INVESTMENT,
      "Vanguard",
      100,
    ),
    new Deduction(
      user,
      DeductionType.SAVING_AND_INVESTMENT,
      null,
      SavingType.INVESTMENT,
      "NS&I",
      75,
    ),
    new Deduction(
      user,
      DeductionType.SAVING_AND_INVESTMENT,
      null,
      SavingType.INVESTMENT,
      "LISA",
      100,
    ),
    new Deduction(
      user,
      DeductionType.SAVING_AND_INVESTMENT,
      null,
      SavingType.SAVING,
      "Car Ins",
      60,
    ),
    new Deduction(
      user,
      DeductionType.SAVING_AND_INVESTMENT,
      null,
      SavingType.SAVING,
      "Savings Acc",
      75,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.DEBT_REPAYMENT,
      null,
      "Credit Card DD",
      150,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.DEBT_REPAYMENT,
      null,
      "Car Loan",
      276.21,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "Rent",
      225,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "Water",
      12.5,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "Food",
      175,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "Council Tax",
      88.61,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "Broadband",
      12.75,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "Energy",
      75,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.HOUSEHOLD,
      null,
      "TV Licence",
      6.63,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.SUBSCRIPTION,
      null,
      "Spotify",
      7.99,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.SUBSCRIPTION,
      null,
      "Netflix",
      5.59,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.SUBSCRIPTION,
      null,
      "Crunchyroll",
      5.99,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.SUBSCRIPTION,
      null,
      "Audible",
      3.99,
    ),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.SUBSCRIPTION,
      null,
      "Phone Contract",
      3.18,
    ),
    new Deduction(user, DeductionType.BILL, BillType.BUDGET, null, "Fuel", 120),
    new Deduction(
      user,
      DeductionType.BILL,
      BillType.BUDGET,
      null,
      "Revolut",
      500,
    ),
  );

  return deductions;
};
