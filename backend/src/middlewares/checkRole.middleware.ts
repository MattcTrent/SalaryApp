import { Request, Response, NextFunction } from "express";
import userRepository from "../repositories/user.repository";

import { User } from "../entity/User.class";
import { error } from "console";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    let user: User | null;
    try {
      user = await userRepository.getUser(id);
      if (user === null) {
        throw error;
      }

      //Check if array of authorized roles includes the user's role
      if (roles.indexOf(user.roles[0].name) > -1) next();
      else res.status(401).send();
    } catch (id) {
      res.status(401).send();
    }
  };
};
