import { Pool } from 'pg';
import { CompaniesModel } from '../../../model/companies/CompaniesModel';
import { ICompaniesRepository } from './types/IComponiesRepository';


export class CompaniesRepository implements ICompaniesRepository {
  constructor(private db: Pool) { }


  async create(company: CompaniesModel): Promise<CompaniesModel> {
    const { createdAt, email, id, name } = company;
    const query = 'INSERT INTO companies (id, name, email, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, name, email, createdAt];

    const { rows } = await this.db.query(query, values);

    return rows[0];
  }

  async getAll(): Promise<CompaniesModel[]> {
    const query = 'SELECT * FROM companies';
    const { rows } = await this.db.query(query);

    return rows;

  }

}