import { Pool } from 'pg';
import { CompaniesModel } from '../../../model/companies/CompaniesModel';
import { ICompaniesRepository } from '../types/IComponiesRepository';


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

  async findById(id: string): Promise<CompaniesModel | null> {
    const query = 'SELECT * FROM companies WHERE id = $1';
    const values = [id];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];

  }

  async findByEmail(email: string): Promise<CompaniesModel | null> {
    const query = 'SELECT * FROM companies WHERE email = $1';
    const values = [email];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

}