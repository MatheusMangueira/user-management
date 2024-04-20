import { Pool } from 'pg';
import { IRolesRepository } from '../types/IRolesRepository';
import { RolesModel } from '../../../model/roles/RolesModel';


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

  async findByIds(ids: string[]): Promise<RolesModel[]> {
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

  async addPermissionsToRole(roleId: string, permissionIds: string[]): Promise<void> {
    const client = await this.db.connect();
    try {
      await client.query('BEGIN'); 
      const query = `
        INSERT INTO role_permissions (role_id, permission_id)
        VALUES ($1, $2) ON CONFLICT DO NOTHING;
      `;

      for (const permissionId of permissionIds) {
        await client.query(query, [roleId, permissionId]);
      }

      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  }


} 