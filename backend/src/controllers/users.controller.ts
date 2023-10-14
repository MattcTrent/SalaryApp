import e, { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";
import { DeleteResult } from "typeorm";
import { User } from "../entity/User.class";

// getting all users
const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  // get some users
  let users: User[] = await userService.getUsers();
  return res.status(200).json({
    data: users,
    message: "Users Retrieved",
  });
};

// getting a single user
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the user id from the req
  let idString: string = req.params.id;
  let id = parseInt(idString);
  // get the user
  let user: User | null = await userService.getUser(id);
  if (user === null) {
    return res.status(404).json({
      message: "User not Retrieved",
    });
  } else {
    return res.status(200).json({
      data: user,
      message: "User Retrieved",
    });
  }
};

// getting a single user
const getUserByUsername = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get the user id from the req
  let username: string = req.params.username;
  // get the user
  let user: User | null = await userService.getUserByUsername(username);
  if (user === null) {
    return res.status(404).json({
      message: "User not Retrieved",
    });
  } else {
    return res.status(200).json({
      data: user,
      message: "User Retrieved",
    });
  }
};

// updating a user
const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the data from req.body
  let body: User = req.body.body ?? null;
  // update the user
  let user: User = await userService.updateUser(body);

  // return response
  return res.status(200).json({
    daat: user.id,
    message: "User updated successfully",
  });
};

// deleting a user
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  // get the user id from req.params
  let id = parseInt(req.params.id);
  // delete the user
  let success: DeleteResult = await userService.deleteUser(id);

  // return response
  return res.status(200).json({
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
