import { Router } from 'express';
import { CompaniesController } from '../controllers';


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


  private setupRoutes() {
    this.companies();
  }


  public getRouter() {
    return this.router;
  }
}