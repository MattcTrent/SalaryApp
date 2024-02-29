import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.class";

@Entity()
export class Deduction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: "nvarchar", nullable: true })
  billType: string | null;

  @Column({ type: "nvarchar", nullable: true })
  savingType: string | null;

  @Column()
  name: string;

  @Column({ type: "double precision", nullable: true })
  cost: number;

  @ManyToOne(() => User, (user) => user.deductions)
  user: User;

  constructor(
    user: User,
    type: string,
    billType: string | null,
    savingType: string | null,
    name: string,
    cost: number,
  ) {
    this.id = 0;
    this.user = user;
    this.type = type;
    this.billType = billType;
    this.savingType = savingType;
    this.name = name;
    this.cost = cost;
  }
}
