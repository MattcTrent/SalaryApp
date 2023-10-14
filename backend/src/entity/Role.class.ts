import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.class";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  constructor(name: string, user: User) {
    this.id = 0;
    this.name = name;
    this.user = user;
  }
}
