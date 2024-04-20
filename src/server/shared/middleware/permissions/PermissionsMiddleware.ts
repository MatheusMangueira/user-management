import { NextFunction, Request, Response } from 'express';
import { CompaniesRepository, RolesRepository, UserRepository } from '../../repository';
import { pool } from '../../../config/database/database';


export class PermissionsMiddleware {
  static userRepository = new UserRepository(pool);
  static rolesRepository = new RolesRepository(pool);
  static companiesRepository = new CompaniesRepository(pool);

  static is(rolesRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
      const { userId } = request;

      if (!userId) {
        return response.status(400).json('User ID is missing');
      }

      const user = await this.userRepository.findById(userId);
      const company = await this.companiesRepository.findById(userId);

      if (user) {
        const userIds = user.roles.map(item => item);

        const roles = await this.rolesRepository.findByIds(userIds);

        if (roles.map(item => item.name).includes('adm')) {
          return next();
        }

        const roleExists = roles.map(item => item.name).
          some((role) => rolesRoutes.includes(role));


        if (!roleExists) {
          return response.status(401).json('Access denied: User does not have required roles');
        }

        return next();
      }


      if (company) {
        if (company.role === 'company') {
          return next();
        } else {
          return response.status(401).json('Access denied: User does not have required roles');
        }
      }

      return response.status(401).json('User or company not found');

    };
  }
}
