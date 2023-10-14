import { StudentFinancePlan } from "../enums/StudentFinancePlan";
import { Deduction } from "./Deduction.class";
import { Role } from "./Role.class";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({ type: "nvarchar", nullable: true })
  firstName: string | undefined;
  @Column({ type: "nvarchar", nullable: true })
  lastName: string | undefined;
  @Column({ unique: true })
  email: string;
  @Column({ type: "double precision" })
  salary: number;
  @Column({ type: "double precision" })
  pensionPercentage: number;
  @Column({ type: "boolean", default: false })
  pensionSalarySacrifice: boolean;
  @Column({ type: "enum", enum: StudentFinancePlan, nullable: true })
  studentFinancePlan: StudentFinancePlan | null;

  @OneToMany(() => Role, (role) => role.user, { eager: true })
  roles: Role[];

  @OneToMany(() => Deduction, (deduction) => deduction.user, { eager: true })
  deductions: Deduction[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  constructor(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    salary: number,
    pensionPercentage: number,
    isPensionSalarySacrifice: boolean,
    studentFinancePlan: StudentFinancePlan | null,
    roles: Role[],
    deductions: Deduction[]
  ) {
    this.id = 0;
    this.username = username;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.salary = salary;
    this.pensionPercentage = pensionPercentage;
    this.pensionSalarySacrifice = isPensionSalarySacrifice;
    this.studentFinancePlan = studentFinancePlan;
    this.roles = roles;
    this.deductions = deductions;
  }
}
