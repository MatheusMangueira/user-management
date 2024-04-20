import { pool } from '../../config/database/database';
import { RolesRepository } from '../repository';
import { CompaniesRepository } from '../repository/companies/CompaniesRepository';
import { UserRepository } from '../repository/user/UserRepository';
import { CompaniesService } from '../services/companies/CompaniesService';
import { RolesService } from '../services/roles/RolesService';
import { SessionService } from '../services/session/SessionService';
import { UserService } from '../services/user/UserService';



export const companiesServiceInstance = new CompaniesService(
  new CompaniesRepository(pool)
);

export const userServiceInstance = new UserService(
  new UserRepository(pool),
  new CompaniesRepository(pool),
  new RolesRepository(pool)
);

export const rolesServiceInstance = new RolesService(
  new RolesRepository(pool)
);


export const SessionServiceInstance = new SessionService(
  new UserRepository(pool),
  new CompaniesRepository(pool)
);
