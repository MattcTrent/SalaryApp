import express from "express";
import controller from "../controllers/deductions.controller";
const deductionsroutes = express.Router();

deductionsroutes.get("/deductions", controller.getDeductions);
deductionsroutes.get("/deductions/:id", controller.getDeduction);
// deductionsroutes.get(
//   "/deductions/ByUser/:userId",
//   controller.getDeductionsByUser
// );
deductionsroutes.put("/deductions/:id", controller.updateDeduction);
deductionsroutes.delete("/deductions/:id", controller.deleteDeduction);
deductionsroutes.post("/deductions", controller.addDeduction);

export = deductionsroutes;
