import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import SystemParameterGroup from "../enums/SystemParameterGroup";

@Entity()
export class SystemParameter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: SystemParameterGroup })
  parameterGroup: SystemParameterGroup;

  @Column()
  name: string;

  @Column("double precision")
  rate: number;

  @Column({ type: "double precision", nullable: true })
  lowerThreshold: number | null;

  @Column({ type: "double precision", nullable: true })
  upperThreshold: number | null;

  constructor(
    parameterGroup: SystemParameterGroup,
    name: string,
    rate: number,
    lowerThreshold: number | null,
    upperThreshold: number | null,
  ) {
    this.id = 0;
    this.parameterGroup = parameterGroup;
    this.name = name;
    this.rate = rate;
    this.lowerThreshold = lowerThreshold;
    this.upperThreshold = upperThreshold;
  }
}
