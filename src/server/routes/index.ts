import { Router } from 'express';
import { CompaniesController } from '../controllers';
import { UserController } from '../controllers/user/UserController';
import { RolesController } from '../controllers/roles/RolesController';
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
    this.router.get('/users', authenticated(), PermissionsMiddleware.is(['rh', 'security']), UserController.getAll);
    this.router.post('/users', authenticated(), PermissionsMiddleware.is(['company']), UserController.create);
  }

  private session() {
    this.router.post('/login', SessionController.handle);
  }

  private roles() {
    this.router.post('/roles', authenticated(), PermissionsMiddleware.is(['adm', 'company']), RolesController.create);
    this.router.get('/roles', authenticated(), PermissionsMiddleware.is(['rh', 'security']), RolesController.getAll);
  }

  private setupRoutes() {
    this.companies();
    this.users();
    this.roles();
    this.session();
  }

  public getRouter() {
    return this.router;
  }
}