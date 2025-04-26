import e, { Request, Response, NextFunction } from "express";
import roleService from "../services/role.service";
import { DeleteResult } from "typeorm";
import { Role } from "../entity/Role.class";

// getting all roles
const getRoles = async (req: Request, res: Response) => {
  // get some roles
  let roles: Role[] = await roleService.getRoles();
  res.status(200).json({
    message: "Roles Retrieved",
    data: roles,
  });
};

// getting a single role
const getRole = async (req: Request, res: Response) => {
  // get the role id from the req
  let idString: string = req.params.id;
  let id = parseInt(idString);
  // get the role
  let role: Role | null = await roleService.getRole(id);
  if (role === null) {
    res.status(404).json({
      message: "Role not Retrieved",
    });
  } else {
    res.status(200).json({
      message: "Role Retrieved",
      data: role,
    });
  }
};

// updating a role
const updateRole = async (req: Request, res: Response) => {
  // get the data from req.body
  let body: Role = req.body.body ?? null;
  // update the role
  let role: Role = await roleService.updateRole(body);

  // return response
  res.status(200).json({
    id: role.id,
    message: "Role updated successfully",
  });
};

// deleting a role
const deleteRole = async (req: Request, res: Response) => {
  // get the role id from req.params
  let id = parseInt(req.params.id);
  // delete the role
  let success: DeleteResult = await roleService.deleteRole(id);

  // return response
  res.status(200).json({
    data: success.affected && success.affected > 0,
    message: "Role deleted successfully",
  });
};

// adding a role
const addRole = async (req: Request, res: Response) => {
  // get the data from req.body
  let body: Role = req.body.body;
  // add the role
  let role: Role = await roleService.createRole(body);

  // return response
  res.status(200).json({
    id: role.id,
    message: "Role created successfully",
  });
};

export default {
  getRoles,
  getRole,
  updateRole,
  deleteRole,
  addRole,
};
