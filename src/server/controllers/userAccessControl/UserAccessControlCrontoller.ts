import { Request, Response } from 'express';
import { userAccessControlServiceInstance } from '../../shared/factory';


export class UserAccessControlCrontoller {


  static async create(req: Request, res: Response) {
    try {
      const { roles, permissions } = req.body;
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing from the request' });
      }

      const user = await userAccessControlServiceInstance.create({
        userId,
        permissions,
        roles,
      });
      return res
        .status(201)
        .json(user);

    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error in create user access control' });
    }
  }
}