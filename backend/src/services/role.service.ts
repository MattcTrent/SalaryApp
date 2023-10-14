import { Role } from "../entity/Role.class";
import roleRepository from "../repositories/role.repository";

const createRole = (role: Role) => {
  return roleRepository.createRole(role);
};

const getRole = (id: number) => {
  return roleRepository.getRole(id);
};

const getRoles = () => {
  return roleRepository.getRoles();
};

const updateRole = (role: Role) => {
  return roleRepository.updateRole(role);
};
const deleteRole = (id: number) => {
  return roleRepository.deleteRole(id);
};

export default {
  createRole,
  getRole,
  getRoles,
  updateRole,
  deleteRole,
};
