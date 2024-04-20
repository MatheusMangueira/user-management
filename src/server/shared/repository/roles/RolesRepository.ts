import { Pool } from 'pg';
import { IRolesRepository } from '../types/IRolesRepository';
import { RolesModel } from '../../../model/roles/RolesModel';
import { RolesDTO } from '../../../DTOs/roles/RolesDTO';


export class RolesRepository implements IRolesRepository {
  constructor(private db: Pool) { }

  async create(role: RolesModel): Promise<RolesModel> {
    const { createdAt, description, id, name } = role;
    const query = 'INSERT INTO roles (id, name, description, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, name, description, createdAt];

    const { rows } = await this.db.query(query, values);

    return rows[0];
  }

  async getAll(): Promise<RolesModel[]> {
    const query = 'SELECT * FROM roles';
    const { rows } = await this.db.query(query);

    return rows;
  }

  async findByName(name: string): Promise<RolesModel | null> {
    const query = 'SELECT * FROM roles WHERE name = $1';
    const values = [name];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async findByIds(ids: RolesDTO[]): Promise<RolesModel[]> {
    const query = 'SELECT * FROM roles WHERE id = ANY($1)';
    const values = [ids];

    const { rows } = await this.db.query(query, values);

    return rows;
  }

  async findById(id: string): Promise<RolesModel | null> {
    const query = 'SELECT * FROM roles WHERE id = $1';
    const values = [id];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }


} 