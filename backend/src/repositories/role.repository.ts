import { Role } from "../entity/Role.class";
import { AppDataSource } from "../server";

const roleRepository = () => AppDataSource.getRepository(Role);

const createRole = async (role: Role) => {
  return await roleRepository().save(role);
};

const getRole = async (id: number) => {
  return await roleRepository().findOneBy({
    id: id,
  });
};

const getRoles = async () => {
  return await roleRepository().find();
};

const updateRole = async (role: Role) => {
  return await roleRepository().save(role);
};
const deleteRole = async (id: number) => {
  return await roleRepository().delete({ id: id });
};

export default {
  createRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};
