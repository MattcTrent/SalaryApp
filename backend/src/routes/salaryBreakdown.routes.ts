/** source/routes/salaryBreakdowns.ts */
import express from "express";
import controller from "../controllers/salaryBreakdowns.controller";
const salaryBreakdownRoutes = express.Router();

salaryBreakdownRoutes.get(
  "/salaryBreakdowns/:username",
  controller.getSalaryBreakdown,
);

export = salaryBreakdownRoutes;
