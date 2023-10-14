import { User } from "../entity/User.class";
import { AppDataSource } from "../server";

const userRepository = () => AppDataSource.getRepository(User);

const createUser = async (user: User) => {
  return await userRepository().save(user);
};

const getUser = async (id: number) => {
  return await userRepository().findOneByOrFail({
    id: id,
  });
};

const getUsers = async () => {
  return await userRepository().find();
};

const getUserByUsername = async (username: string) => {
  return await userRepository().findOneByOrFail({
    username: username,
  });
};

const updateUser = async (user: User) => {
  return await userRepository().save(user);
};
const deleteUser = async (id: number) => {
  return await userRepository().delete({ id: id });
};

export default {
  createUser,
  getUser,
  getUserByUsername,
  getUsers,
  updateUser,
  deleteUser,
};
