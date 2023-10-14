/** source/routes/roles.ts */
import express from "express";
import controller from "../controllers/roles.controller";
const roleRoutes = express.Router();

roleRoutes.get("/roles", controller.getRoles);
roleRoutes.get("/roles/:id", controller.getRole);
roleRoutes.put("/roles/:id", controller.updateRole);
roleRoutes.delete("/roles/:id", controller.deleteRole);
roleRoutes.post("/roles", controller.addRole);

export = roleRoutes;
