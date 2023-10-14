import { Request, Response } from "express";
import { User } from "../entity/User.class";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { validate } from "class-validator";
import { Role } from "../entity/Role.class";
import userService from "../services/user.service";

const login = async (req: Request, res: Response): Promise<void> => {
  // Check if username and password are set
  let { username, password } = req.body;
  if (!(username && password)) {
    res.status(400).send();
  }

  // Get user from the database
  let user: User;
  try {
    user = await userService.getUserByUsername(username);

    // Check if the encrypted password matches
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sign JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    // Send the JWT in the response
    res.send({
      user: user,
      message: { token: token, message: "Login Successful" },
    });
  } catch (error) {
    res.status(401).send();
  }
};

const register = async (req: Request, res: Response): Promise<void> => {
  //Get parameters from the body
  if (req === null) throw Error;

  let {
    username,
    password,
    firstName,
    lastName,
    email,
    salary,
    pensionPercentage,
    isPensionSalarySacrifice,
    studentFinancePlan,
  } = req.body;

  let user = new User(
    username,
    password,
    firstName,
    lastName,
    email,
    salary,
    pensionPercentage,
    isPensionSalarySacrifice,
    studentFinancePlan,
    [],
    []
  );

  const defaultRole = new Role("user", user);
  user.roles.push(defaultRole);

  //Validade if the parameters are ok
  const errors = await validate(user);
  if (errors.length > 0) {
    res.status(400).send(errors);
    return;
  }

  //Hash the password, to securely store on DB
  user.hashPassword();

  //Try to save. If fails, the username is already in use
  try {
    await userService.createUser(user);
  } catch (e) {
    res.status(409).send("username already in use");
    return;
  }

  //If all ok, send 201 response
  res.status(201).send("User created");
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  // Get ID from JWT
  const id = res.locals.jwtPayload.userId;

  // Get parameters from the body
  const { oldPassword, newPassword } = req.body;
  if (!(oldPassword && newPassword)) {
    res.status(400).send();
  }

  // Get user from the database
  let user: User | null;
  try {
    user = await userService.getUser(id);
    if (user !== null) {
      // Check if the old password matches
      if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
      }

      // Validate the model (password length)
      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      // Hash the new password and save
      user.hashPassword();
      userService.updateUser(user);

      res.status(204).send();
    }
  } catch (error) {
    res.status(401).send();
  }
};

// Export the arrow functions
export default { login, register, changePassword };
