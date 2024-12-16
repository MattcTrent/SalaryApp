import e, { Request, Response, NextFunction } from "express";
import systemParameterService from "../services/systemParameter.service";
import { DeleteResult } from "typeorm";
import { SystemParameter } from "../entity/SystemParameter.class";

// getting all systemParameters
const getSystemParameters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get some systemParameters
  let systemParameters: SystemParameter[] =
    await systemParameterService.getSystemParameters();
  return res.status(200).json({
    message: "System Parameters Retrieved",
    data: systemParameters,
  });
};

// getting a single system parameter
const getSystemParameter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the system parameter id from the req
  let idString: string = req.params.id;
  let id = parseInt(idString);
  // get the system parameter
  let systemParameter: SystemParameter | null =
    await systemParameterService.getSystemParameter(id);
  if (systemParameter === null) {
    return res.status(404).json({
      message: "System Parameter not Retrieved",
    });
  } else {
    return res.status(200).json({
      message: "System Parameter Retrieved",
      data: systemParameter,
    });
  }
};

// updating a system parameter
const updateSystemParameter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the data from req.body
  let body: SystemParameter = req.body ?? null;
  // update the system parameter
  let systemParameter: SystemParameter =
    await systemParameterService.updateSystemParameter(body);

  // return response
  return res.status(200).json({
    id: systemParameter.id,
    message: "System Parameter updated successfully",
  });
};

// deleting a system parameter
const deleteSystemParameter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the system parameter id from req.params
  let id = parseInt(req.params.id);
  // delete the system parameter
  let success: DeleteResult =
    await systemParameterService.deleteSystemParameter(id);

  // return response
  return res.status(200).json({
    data: success.affected && success.affected > 0,
    message: "System Parameter deleted successfully",
  });
};

// adding a system parameter
const addSystemParameter = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // get the data from req.body
  let body: SystemParameter = req.body;
  // add the system parameter
  let systemParameter: SystemParameter =
    await systemParameterService.createSystemParameter(body);

  // return response
  return res.status(200).json({
    id: systemParameter.id,
    message: "System Parameter created successfully",
  });
};

export default {
  getSystemParameters,
  getSystemParameter,
  updateSystemParameter,
  deleteSystemParameter,
  addSystemParameter,
};
