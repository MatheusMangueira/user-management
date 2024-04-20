import { Request, Response } from 'express';
import { RolesDTO } from '../../DTOs/roles/RolesDTO';
import { rolesServiceInstance } from '../../shared/factory';
import { StatusCodes } from 'http-status-codes';


export class RolesController {


  static async create(req: Request<{}, {}, RolesDTO>, res: Response) {
    try {
      const role = await rolesServiceInstance.create(req.body);

      return res
        .status(StatusCodes.CREATED)
        .json(role);

    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in create role' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const roles = await rolesServiceInstance.getAll();

      return res
        .status(StatusCodes.OK)
        .json(roles);

    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in get all roles' });
    }
  }


}