/** source/routes/users.ts */
import express from "express";
import controller from "../controllers/users.controller";
const userRoutes = express.Router();

userRoutes.get("/users", controller.getUsers);
userRoutes.get("/users/:id", controller.getUser);
userRoutes.get("/users/byUsername/:username", controller.getUserByUsername);
userRoutes.put("/users/:id", controller.updateUser);
userRoutes.delete("/users/:id", controller.deleteUser);

export = userRoutes;
