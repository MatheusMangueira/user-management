import { Pool } from 'pg';
import { IPermissionsRepository } from '../types/IPermissionsRepository';
import { PermissionsModel } from '../../../model/permissions/PermissionsModel';


export class PermissionsRepository implements IPermissionsRepository {
  constructor(private db: Pool) { }

  async create(permission: PermissionsModel): Promise<PermissionsModel> {
    const { createdAt, description, id, name } = permission;
    const query = 'INSERT INTO permissions (id, name, description, created_at) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [id, name, description, createdAt];

    const { rows } = await this.db.query(query, values);

    return rows[0];
  }

  async getAll(): Promise<PermissionsModel[]> {
    const query = 'SELECT * FROM permissions';
    const { rows } = await this.db.query(query);

    return rows;
  }


  async findByName(name: string): Promise<PermissionsModel | null> {
    const query = 'SELECT * FROM permissions WHERE name = $1';
    const values = [name];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }

  async findByIds(ids: string[]): Promise<PermissionsModel[]> {
    const query = 'SELECT * FROM permissions WHERE id = ANY($1)';
    const values = [ids];

    const { rows } = await this.db.query(query, values);

    return rows;
  }
}

