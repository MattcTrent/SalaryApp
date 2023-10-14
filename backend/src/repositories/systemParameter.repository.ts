import { SystemParameter } from "../entity/SystemParameter.class";
import SystemParameterGroup from "../enums/SystemParameterGroup";
import { AppDataSource } from "../server";

const systemParameterRepository = () =>
  AppDataSource.getRepository(SystemParameter);

const createSystemParameter = async (systemParameter: SystemParameter) => {
  return await systemParameterRepository().save(systemParameter);
};

const getSystemParameter = async (id: number) => {
  return await systemParameterRepository().findOneBy({
    id: id,
  });
};

const getSystemParameters = async () => {
  return await systemParameterRepository().find();
};

const getSystemParametersByGroup = async (group: SystemParameterGroup) => {
  return await systemParameterRepository().findBy({
    parameterGroup: group,
  });
};

const updateSystemParameter = async (systemParameter: SystemParameter) => {
  return await systemParameterRepository().save(systemParameter);
};
const deleteSystemParameter = async (id: number) => {
  return await systemParameterRepository().delete({ id: id });
};

export default {
  createSystemParameter,
  getSystemParameter,
  getSystemParameters,
  getSystemParametersByGroup,
  updateSystemParameter,
  deleteSystemParameter,
};
