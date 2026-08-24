import { SystemParameter } from "../entity/SystemParameter.class";
import { NIBracket } from "../enums/NIBracket";
import { StudentFinancePlan } from "../enums/StudentFinancePlan";
import SystemParameterGroup from "../enums/SystemParameterGroup";
import { TaxBracket } from "../enums/TaxBracket";
import { AppDataSource } from "../server";

export const seedSystemParameters = async () => {
  const seedParams = getParameters();
  const systemParams = await AppDataSource.manager.find(SystemParameter);
  if (systemParams.length === 0) {
    await AppDataSource.manager.save(seedParams);
    console.log(`${seedParams.length} System Parameters have been seeded.`);
  } else {
    console.log(
      `${systemParams.length} System Parameters exist, checking data.`,
    );

    let updateStored = false;
    seedParams.forEach((seedParam) => {
      const storedParam = systemParams.find((storedParamVal) => {
        return (
          storedParamVal.name === seedParam.name &&
          storedParamVal.parameterGroup === seedParam.parameterGroup
        );
      });

      if (storedParam) {
        if (
          storedParam.rate !== seedParam.rate ||
          storedParam.lowerThreshold !== seedParam.lowerThreshold ||
          storedParam.upperThreshold !== seedParam.upperThreshold
        ) {
          console.log(
            `System Parameter ${storedParam.name} ${storedParam.parameterGroup}, data does not match seed data, updating to match.`,
          );
          storedParam.rate = seedParam.rate;
          storedParam.lowerThreshold = seedParam.lowerThreshold;
          storedParam.upperThreshold = seedParam.upperThreshold;
          updateStored = true;
        }
      } else {
        console.log(
          `System Parameter ${seedParam.name} ${seedParam.parameterGroup}, not found, adding to table.`,
        );
        systemParams.push(seedParam);
        updateStored = true;
      }
    });

    if (updateStored) {
      await AppDataSource.manager.save(systemParams);
    }

    console.log(
      `System Parameters checked, System Parameter Seeding complete.`,
    );
  }
};

const getParameters = (): SystemParameter[] => {
  // England, Wales and Northern Ireland — tax year 6 April 2026 to 5 April 2027
  // Sources: https://www.gov.uk/income-tax-rates
  // https://www.gov.uk/guidance/rates-and-thresholds-for-employers-2026-to-2027
  const systemParams: SystemParameter[] = [];

  systemParams.push(
    new SystemParameter(
      SystemParameterGroup.TAX,
      TaxBracket.PERSONALALLOWANCE,
      0,
      null,
      12570,
    ),
    new SystemParameter(
      SystemParameterGroup.TAX,
      TaxBracket.BASIC,
      20,
      12570,
      50270,
    ),
    new SystemParameter(
      SystemParameterGroup.TAX,
      TaxBracket.HIGHER,
      40,
      50271,
      125140,
    ),
    new SystemParameter(
      SystemParameterGroup.TAX,
      TaxBracket.ADDITIONAL,
      45,
      125140,
      null,
    ),
    new SystemParameter(
      SystemParameterGroup.NI,
      NIBracket.BASIC,
      8,
      12570,
      50270,
    ),
    new SystemParameter(
      SystemParameterGroup.NI,
      NIBracket.ADDITIONAL,
      2,
      50270,
      null,
    ),
    new SystemParameter(
      SystemParameterGroup.STUDENT_FINANCE,
      StudentFinancePlan.PLAN_1,
      9,
      26900,
      null,
    ),
    new SystemParameter(
      SystemParameterGroup.STUDENT_FINANCE,
      StudentFinancePlan.PLAN_2,
      9,
      29385,
      null,
    ),
    new SystemParameter(
      SystemParameterGroup.STUDENT_FINANCE,
      StudentFinancePlan.PLAN_4,
      9,
      33795,
      null,
    ),
    new SystemParameter(
      SystemParameterGroup.STUDENT_FINANCE,
      StudentFinancePlan.PLAN_5,
      9,
      25000,
      null,
    ),
    new SystemParameter(
      SystemParameterGroup.STUDENT_FINANCE,
      StudentFinancePlan.POSTGRADUATE,
      6,
      21000,
      null,
    ),
  );

  return systemParams;
};
