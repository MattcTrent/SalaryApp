import { Request, Response, NextFunction } from "express";
import deductionService from "../services/deduction.service";
import { DeleteResult } from "typeorm";
import { Deduction } from "../entity/Deduction.class";

// getting all deductions
const getDeductions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get some deductions
  let deductions: Deduction[] = await deductionService.getDeductions();
  return res.status(200).json({
    message: "Deductions Retrieved",
    data: deductions,
  });
};

// getting all deductions
const getDeductionsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the deduction id from req.params
  let userId = parseInt(req.params.userId);
  // get some deductions
  let deductions: Deduction[] =
    await deductionService.getDeductionsByUser(userId);
  return res.status(200).json({
    data: deductions,
    message: "Deductions Retrieved",
  });
};

// getting a single deduction
const getDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the deduction id from the req
  let idString: string = req.params.id;
  let id = parseInt(idString);
  // get the deduction
  let deduction: Deduction | null = await deductionService.getDeduction(id);
  return res.status(200).json({
    data: deduction,
    message: "Deduction Retrieved",
  });
};

// updating a deduction
const updateDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the data from req.body
  let body: Deduction = req.body.body ?? null;
  // update the deduction
  let deduction: Deduction = await deductionService.updateDeduction(body);

  // return response
  return res.status(200).json({
    id: deduction.id,
    message: "Deduction updated successfully",
  });
};

// deleting a deduction
const deleteDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the deduction id from req.params
  let id = parseInt(req.params.id);
  // delete the deduction
  let success: DeleteResult = await deductionService.deleteDeduction(id);

  // return response
  return res.status(200).json({
    data: success.affected && success.affected > 0,
    message: "Deduction deleted successfully",
  });
};

// adding a deduction
const addDeduction = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the data from req.body
  let body: Deduction = req.body;
  // add the deduction
  let deduction: Deduction = await deductionService.createDeduction(body);

  // return response
  return res.status(200).json({
    id: deduction.id,
    message: "Deduction created successfully",
  });
};

export default {
  getDeductions,
  getDeductionsByUser,
  getDeduction,
  updateDeduction,
  deleteDeduction,
  addDeduction,
};
