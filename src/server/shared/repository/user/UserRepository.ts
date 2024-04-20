import { Pool } from 'pg';
import { IUserRepository } from '../types/IUserRepository';
import { UserModel } from '../../../model';


export class UserRepository implements IUserRepository {
  constructor(private db: Pool) { }


  async create(user: UserModel): Promise<UserModel> {
    const { created_at, email, id, name, password, company_id, roles } = user;

    const query = 'INSERT INTO users (id, name, email, password, company_id, created_at, roles) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const values = [id, name, email, password, company_id, created_at, roles];
    const { rows } = await this.db.query(query, values);

    return rows[0];
  }


  async getAll(): Promise<UserModel[]> {
    const query = 'SELECT * FROM users';
    const { rows } = await this.db.query(query);

    return rows;
  }


  async findById(id: string): Promise<UserModel | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }


  async findByEmail(email: string): Promise<UserModel | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }



}