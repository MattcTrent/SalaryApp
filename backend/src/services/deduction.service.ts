import { Deduction } from "../entity/Deduction.class";
import deductionRepository from "../repositories/deduction.repository";

const createDeduction = (deduction: Deduction) => {
  return deductionRepository.createDeduction(deduction);
};

const getDeduction = (id: number) => {
  return deductionRepository.getDeduction(id);
};

const getDeductionsByUser = (userId: number) => {
  return deductionRepository.getDeductionsByUser(userId);
};

const getDeductions = () => {
  return deductionRepository.getDeductions();
};

const updateDeduction = (deduction: Deduction) => {
  return deductionRepository.updateDeduction(deduction);
};
const deleteDeduction = (id: number) => {
  return deductionRepository.deleteDeduction(id);
};

export default {
  createDeduction,
  getDeduction,
  getDeductions,
  getDeductionsByUser,
  updateDeduction,
  deleteDeduction,
};
