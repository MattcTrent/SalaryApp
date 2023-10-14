import { User } from "./User.class";

export class SalaryBreakdown {
  pension: number;
  monthlySalary: number;
  salarySacrifice: number;
  tax: number;
  taxFree: number;
  nI: number;
  studentFinance: number;
  takehome: number;
  bills: number;
  savingsAndInvestments: number;
  takehomeAfterBillsAndSavings: number;
  user: User;

  getSalaryPostSalarySacrifice() {
    return this.monthlySalary - this.salarySacrifice;
  }

  constructor(user: User) {
    this.user = user;
    this.pension = 0;
    this.monthlySalary = 0;
    this.salarySacrifice = 0;
    this.tax = 0;
    this.taxFree = 0;
    this.nI = 0;
    this.studentFinance = 0;
    this.takehome = 0;
    this.bills = 0;
    this.savingsAndInvestments = 0;
    this.takehomeAfterBillsAndSavings = 0;
  }
}
