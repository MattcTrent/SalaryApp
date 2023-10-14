import { User } from "../entity/User.class";
import userRepository from "../repositories/user.repository";

const createUser = (user: User) => {
  return userRepository.createUser(user);
};

const getUser = (id: number) => {
  return userRepository.getUser(id);
};

const getUserByUsername = (username: string) => {
  return userRepository.getUserByUsername(username);
};

const getUsers = () => {
  return userRepository.getUsers();
};

const updateUser = (user: User) => {
  return userRepository.updateUser(user);
};
const deleteUser = (id: number) => {
  return userRepository.deleteUser(id);
};

export default {
  createUser,
  getUser,
  getUserByUsername,
  getUsers,
  updateUser,
  deleteUser,
};
