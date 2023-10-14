import { SystemParameter } from "../entity/SystemParameter.class";
import SystemParameterGroup from "../enums/SystemParameterGroup";
import systemParameterRepository from "../repositories/systemParameter.repository";

const createSystemParameter = (systemParameter: SystemParameter) => {
  return systemParameterRepository.createSystemParameter(systemParameter);
};

const getSystemParameter = (id: number) => {
  return systemParameterRepository.getSystemParameter(id);
};

const getSystemParameters = () => {
  return systemParameterRepository.getSystemParameters();
};

const getSystemParametersByGroup = (group: SystemParameterGroup) => {
  return systemParameterRepository.getSystemParametersByGroup(group);
};

const updateSystemParameter = (systemParameter: SystemParameter) => {
  return systemParameterRepository.updateSystemParameter(systemParameter);
};
const deleteSystemParameter = (id: number) => {
  return systemParameterRepository.deleteSystemParameter(id);
};

export default {
  createSystemParameter,
  getSystemParameter,
  getSystemParameters,
  getSystemParametersByGroup,
  updateSystemParameter,
  deleteSystemParameter,
};
