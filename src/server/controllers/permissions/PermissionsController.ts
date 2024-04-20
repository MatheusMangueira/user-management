import { Request, Response } from 'express';
import { PermissionsDTO } from '../../DTOs/permissions/PermissionsDTO';
import { StatusCodes } from 'http-status-codes';
import { permissionsServiceInstance } from '../../shared/factory';


export class PermissionsController {

  static async create(req: Request<{}, {}, PermissionsDTO>, res: Response) {
    try {
      const permission = await permissionsServiceInstance.create(req.body);

      return res
        .status(StatusCodes.CREATED)
        .json(permission);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in create permission' });
    }
  }


  static async getAll(req: Request, res: Response) {
    try {
      const permissions = await permissionsServiceInstance.getAll();

      return res
        .status(StatusCodes.OK)
        .json(permissions);

    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in get all permissions' });
    }
  }
}