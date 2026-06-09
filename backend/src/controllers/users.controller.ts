import { Request, Response } from "express";
import userService from "../services/user.service";
import { DeleteResult } from "typeorm";
import { User } from "../entity/User.class";

function getParamAsInt(value: string | string[] | undefined): number {
  const normalized = Array.isArray(value) ? value[0] : value;
  return Number.parseInt(normalized ?? "", 10);
}

function getParamAsString(value: string | string[] | undefined): string {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

// getting all users
const getUsers = async (req: Request, res: Response) => {
  // get some users
  let users: User[] = await userService.getUsers();
  res.status(200).json({
    data: users,
    message: "Users Retrieved",
  });
};

// getting a single user
const getUser = async (req: Request, res: Response) => {
  // get the user id from the req
  const id = getParamAsInt(req.params.id);
  // get the user
  let user: User | null = await userService.getUser(id);
  if (user === null) {
    res.status(404).json({
      message: "User not Retrieved",
    });
  } else {
    res.status(200).json({
      data: user,
      message: "User Retrieved",
    });
  }
};

// getting a single user
const getUserByUsername = async (req: Request, res: Response) => {
  // get the user id from the req
  const username = getParamAsString(req.params.username);
  // get the user
  let user: User | null = await userService.getUserByUsername(username);
  if (user === null) {
    res.status(404).json({
      message: "User not Retrieved",
    });
  } else {
    res.status(200).json({
      data: user,
      message: "User Retrieved",
    });
  }
};

// updating a user
const updateUser = async (req: Request, res: Response) => {
  // get the data from req.body
  let body: User = req.body ?? null;
  // update the user
  let user: User = await userService.updateUser(body);

  // return response
  res.status(200).json({
    daat: user.id,
    message: "User updated successfully",
  });
};

// deleting a user
const deleteUser = async (req: Request, res: Response) => {
  // get the user id from req.params
  const id = getParamAsInt(req.params.id);
  // delete the user
  let success: DeleteResult = await userService.deleteUser(id);

  // return response
  res.status(200).json({
    data: success.affected && success.affected > 0,
    message: "User deleted successfully",
  });
};

export default {
  getUsers,
  getUser,
  getUserByUsername,
  updateUser,
  deleteUser,
};
