import { pool } from '../../config/database/database';
import { RolesRepository } from '../repository';
import { CompaniesRepository } from '../repository/companies/CompaniesRepository';
import { PermissionsRepository } from '../repository/permissions/PermissionsRepository';
import { UserRepository } from '../repository/user/UserRepository';
import { UserAccessControlRepository } from '../repository/userAccessControl/UserAccessControlRepository';
import { CompaniesService } from '../services/companies/CompaniesService';
import { PermissionsService } from '../services/permissions/PermissionsService';
import { RolePermissionService } from '../services/rolePermission/RolePermissionService';
import { RolesService } from '../services/roles/RolesService';
import { SessionService } from '../services/session/SessionService';
import { UserService } from '../services/user/UserService';
import { UserAccessControlService } from '../services/userAccessControl/UserAccessControlService';


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

export const permissionsServiceInstance = new PermissionsService(
  new PermissionsRepository(pool)
);

export const userAccessControlServiceInstance = new UserAccessControlService(
  new UserRepository(pool),
  new UserAccessControlRepository(pool)
);

export const rolePermissionServiceInstance = new RolePermissionService(
  new RolesRepository(pool),
  new PermissionsRepository(pool)
);

export const SessionServiceInstance = new SessionService(
  new UserRepository(pool)
);
