import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../../repository';
import { pool } from '../../../config/database/database';


export class PermissionsMiddleware {
  static userRepository = new UserRepository(pool);

  static can(permissionsRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
      const { userId } = request;

      if (!userId) {
        return response.status(400).json('User ID is missing');
      }

      try {
        const user = await this.userRepository.findById(userId);

        if (!user) {
          return response.status(400).json('User does not exist');
        }

        console.log(user, 'permissionsaaaa', permissionsRoutes, ' =====',
          user
        );

        const permissionExists = user.permissions.map((permission) => permission.name)
          .some((permissionId) => permissionsRoutes.includes(permissionId));

        if (!permissionExists) {
          return response.status(401).json('Access denied: No sufficient permissions');
        }

        return next();
      } catch (error) {
        console.error('Error fetching user permissions:', error);
        return response.status(500).json('Internal Server Error');
      }
    };
  }


  static is(rolesRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
      const { userId } = request;

      if (!userId) {
        return response.status(400).json('User ID is missing');
      }

      const user = await this.userRepository.findById(userId);

      if (!user) {
        return response.status(400).json('User does not exist');
      }

      const roleExists = user.roles
        .map((role) => role.name)
        .some((role) => rolesRoutes.includes(role));

      if (!roleExists) {
        return response.status(401).json('Access denied: User does not have required roles');
      }

      return next();
    };
  }
}
