/** source/routes/users.ts */
import express from "express";
import controller from "../controllers/auth.controller";
const authRoutes = express.Router();

authRoutes.post("/login", controller.login);
authRoutes.post("/register", controller.register);
authRoutes.post("/changePassword", controller.changePassword);

export = authRoutes;
