import { pool } from '../../config/database/database';
import { CompaniesRepository } from '../repository/companies/CompaniesRepository';
import { CompaniesService } from '../services/companies/CompaniesService';


export const companiesServiceInstance = new CompaniesService(
  new CompaniesRepository(pool)
);