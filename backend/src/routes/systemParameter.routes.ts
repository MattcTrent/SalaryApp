/** source/routes/systemParameters.ts */
import express from "express";
import controller from "../controllers/systemParameters.controller";
import { checkJwt } from "../middlewares/checkJwt.middleware";
import { checkRole } from "../middlewares/checkRole.middleware";
const systemParameterRoutes = express.Router();

systemParameterRoutes.get("/systemParameters", controller.getSystemParameters);
systemParameterRoutes.get(
  "/systemParameters/:id",
  controller.getSystemParameter,
);
systemParameterRoutes.put(
  "/systemParameters/:id",
  [checkJwt, checkRole(["Admin"])],
  controller.updateSystemParameter,
);
systemParameterRoutes.delete(
  "/systemParameters/:id",
  controller.deleteSystemParameter,
);
systemParameterRoutes.post(
  "/systemParameters",
  [checkJwt, checkRole(["Admin"])],
  controller.addSystemParameter,
);

export = systemParameterRoutes;
