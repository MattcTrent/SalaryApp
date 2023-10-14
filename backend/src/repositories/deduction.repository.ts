import { Deduction } from "../entity/Deduction.class";
import { AppDataSource } from "../server";

const deductionRepository = () => AppDataSource.getRepository(Deduction);

const createDeduction = async (deduction: Deduction) => {
  return await deductionRepository().save(deduction);
};

const getDeduction = async (id: number) => {
  return await deductionRepository().findOneBy({
    id: id,
  });
};

const getDeductionsByUser = async (userId: number) => {
  return await deductionRepository()
    .createQueryBuilder("deduction")
    .leftJoinAndSelect("deduction.user", "user")
    .where("user.Id = :userId")
    .orderBy("deduction.name", "DESC")
    .setParameter("userId", userId)
    .getMany();
};

const getDeductions = async () => {
  return await deductionRepository().find();
};

const updateDeduction = async (deduction: Deduction) => {
  return await deductionRepository().save(deduction);
};
const deleteDeduction = async (id: number) => {
  return await deductionRepository().delete({ id: id });
};

export default {
  createDeduction,
  getDeduction,
  getDeductions,
  getDeductionsByUser,
  updateDeduction,
  deleteDeduction,
};
