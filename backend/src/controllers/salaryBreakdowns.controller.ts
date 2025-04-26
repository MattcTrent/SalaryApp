import { Request, Response, NextFunction } from "express";
import salaryBreakdownService from "../services/salaryBreakdown.service";
import { SalaryBreakdown } from "../entity/SalaryBreakdown.class";

// getting a single users salary breakdown
const getSalaryBreakdown = async (req: Request, res: Response) => {
  // get the user id from the req
  let username: string = req.params.username;
  // get the brekadown
  let breakdown: SalaryBreakdown =
    await salaryBreakdownService.getSalaryBreakdownByUsername(username);
  if (breakdown === null) {
    res.status(404).json({
      message: "Salary Breakdown not Retrieved",
    });
  } else {
    res.status(200).set("Cache-Control", "no-store").json({
      data: breakdown,
      message: "Salary Breakdown Retrieved",
    });
  }
};

export default {
  getSalaryBreakdown,
};
