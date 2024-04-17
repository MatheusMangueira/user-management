import { Request, Response } from 'express';
import { CompaniesDTO } from '../../DTOs/companies/CompaniesDTO';
import { companiesServiceInstance } from '../../shared/factory';
import { StatusCodes } from 'http-status-codes';



export class CompaniesController {


  static async create(req: Request<{}, {}, CompaniesDTO>, res: Response) {
  
    try {
      const company = await companiesServiceInstance.create(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json(company);
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in create company' });
    }
  }


  static async getAll(req: Request, res: Response) {
    try {
      const companies = await companiesServiceInstance.getAll();

      return res
        .status(StatusCodes.OK)
        .json(companies);

    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in get all companies' });
    }
  }
}  