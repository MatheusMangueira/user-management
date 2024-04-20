import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { rolePermissionServiceInstance } from '../../shared/factory';


export class RolePermissionController {



  static async create(req: Request, res: Response) {

    try {
      const { permissions } = req.body;
      const { roleId } = req.params;

      console.log(permissions, roleId, 'permission, roleId');

      if (!roleId) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Role ID is missing from the request' });
      }

      const rolePermission = await rolePermissionServiceInstance.create({
        roleId,
        permissions: permissions,
      });

      return res
        .status(StatusCodes.CREATED)
        .json(rolePermission);

    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in create role permission' });
    }

  }
}