import { Request, Response, NextFunction } from "express";
import salaryBreakdownService from "../services/salaryBreakdown.service";
import { SalaryBreakdown } from "../entity/SalaryBreakdown.class";

// getting a single users salary breakdown
const getSalaryBreakdown = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the user id from the req
  let username: string = req.params.username;
  // get the brekadown
  let breakdown: SalaryBreakdown =
    await salaryBreakdownService.getSalaryBreakdownByUsername(username);
  if (breakdown === null) {
    return res.status(404).json({
      message: "Salary Breakdown not Retrieved",
    });
  } else {
    return res.status(200).json({
      data: breakdown,
      message: "Salary Breakdown Retrieved",
    });
  }
};

export default {
  getSalaryBreakdown,
};
