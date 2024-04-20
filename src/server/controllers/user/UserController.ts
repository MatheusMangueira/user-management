import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserDTO } from '../../DTOs/user/UserDTO';
import { userServiceInstance } from '../../shared/factory';


export class UserController {

  static async create(req: Request<{}, {}, UserDTO>, res: Response) {
    try {

      const user = await userServiceInstance.create(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(user);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in create user' });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const users = await userServiceInstance.getAll();

      return res
        .status(StatusCodes.OK)
        .json(users);

    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in get all users' });
    }
  }

}