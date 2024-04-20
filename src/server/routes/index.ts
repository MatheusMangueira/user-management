import { Router } from 'express';
import { CompaniesController } from '../controllers';
import { UserController } from '../controllers/user/UserController';
import { RolesController } from '../controllers/roles/RolesController';
import { PermissionsController } from '../controllers/permissions/PermissionsController';
import { UserAccessControlCrontoller } from '../controllers/userAccessControl/UserAccessControlCrontoller';
import { RolePermissionController } from '../controllers/rolePermission/RolePermissionController';
import { PermissionsMiddleware } from '../shared/middleware/permissions/PermissionsMiddleware';
import { SessionController } from '../controllers/session/SessionController';
import { authenticated } from '../shared/middleware/authenticated/authenticated';


export class AllRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }


  private companies() {
    this.router.get('/companies', CompaniesController.getAll);
    this.router.post('/companies', CompaniesController.create);
  }

  private users() {
    this.router.get('/users', authenticated(), PermissionsMiddleware.is(['rh']), UserController.getAll);
    this.router.post('/users', UserController.create);
  }

  private session() {
    this.router.post('/login', SessionController.handle);
  }


  private roles() {
    this.router.post('/roles', RolesController.create);
    this.router.get('/roles', RolesController.getAll);
  }

  private permissions() {
    this.router.post('/permissions', PermissionsController.create);
    this.router.get('/permissions', PermissionsController.getAll);
  }

  private accessControl() {
    this.router.post('/access-control/:userId', UserAccessControlCrontoller.create);
  }

  private rolesPermissions() {
    this.router.post('/roles-permissions/:roleId', RolePermissionController.create);
  }


  private setupRoutes() {
    this.companies();
    this.users();
    this.roles();
    this.permissions();
    this.accessControl();
    this.rolesPermissions();
    this.session();
  }


  public getRouter() {
    return this.router;
  }
}