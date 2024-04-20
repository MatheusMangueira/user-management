import { CompaniesModel } from '../../../model/companies/CompaniesModel';


export interface ICompaniesRepository {
  create(company: CompaniesModel): Promise<CompaniesModel>;
  getAll(): Promise<CompaniesModel[]>;
  // findAll(): Promise<CompaniesModel[]>;
  findById(id: string): Promise<CompaniesModel | null>;
  findByEmail(email: string): Promise<CompaniesModel | null>;
  // update(companies: CompaniesModel): Promise<CompaniesModel | null>;
  // delete(id: string): Promise<boolean>;
}