import { Pool } from 'pg';
import { IUserRepository } from '../types/IUserRepository';
import { UserModel } from '../../../model';
import { PermissionsModel } from '../../../model/permissions/PermissionsModel';
import { RolesModel } from '../../../model/roles/RolesModel';


export class UserRepository implements IUserRepository {
  constructor(private db: Pool) { }


  async create(user: UserModel): Promise<UserModel> {
    const { createdAt, email, id, name, password, company_id } = user;

    const query = 'INSERT INTO users (id, name, email, password, company_id, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [id, name, email, password, company_id, createdAt];
    const { rows } = await this.db.query(query, values);

    return rows[0];

  }


  async getAll(): Promise<UserModel[]> {
    const query = 'SELECT * FROM users';
    const { rows } = await this.db.query(query);

    return rows;
  }

  async loadUserPermissions(userId: string): Promise<PermissionsModel[]> {
    const query = 'SELECT * FROM users_permissions WHERE user_id = $1';
    const values = [userId];

    try {
      const { rows } = await this.db.query(query, values);
      return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        createdAt: row.created_at
      }));
    } catch (error) {
      console.error('Error fetching user permissions:', error);
      throw error;
    }
  }

  async loadUserRoles(userId: string): Promise<RolesModel[]> {
    const query = 'SELECT * FROM user_roles WHERE user_id = $1';
    const values = [userId];

    try {
      const { rows } = await this.db.query(query, values);
      return rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        description: row.description,
        createdAt: row.created_at,
        permissions: row.permissions
      }));
    } catch (error) {
      console.error('Error fetching user roles:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<UserModel | null> {
    const query = `
      SELECT 
        u.*, 
        array_agg(distinct ur.role_id) as role_ids, 
        array_agg(distinct up.permission_id) as permission_ids
      FROM 
        users u
      LEFT JOIN 
        user_roles ur ON u.id = ur.user_id
      LEFT JOIN 
        users_permissions up ON u.id = up.user_id
      WHERE 
        u.id = $1
      GROUP BY 
        u.id;
    `;
    const values = [id];

    const { rows } = await this.db.query(query, values);

    if (rows.length === 0) {
      return null;
    }

    const user = rows[0];
    user.permissions = await this.getPermissionsByIds(user.permission_ids);
    user.roles = await this.getRolesByIds(user.role_ids);

    return user;
  }

  async getPermissionsByIds(permissionIds: string[]): Promise<PermissionsModel[]> {
    if (permissionIds.length === 0) {
      return [];
    }

    const query = `
      SELECT 
        id, 
        name,
        description,
        created_at as createdAt
      FROM 
        permissions
      WHERE 
        id = ANY($1::uuid[]);
    `;
    const values = [permissionIds];

    const { rows } = await this.db.query(query, values);
    return rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      createdAt: row.createdAt
    }));
  }

  async getRolesByIds(roleIds: string[]): Promise<RolesModel[]> {
    if (roleIds.length === 0) {
      return [];
    }

    const query = `
      SELECT 
        id, 
        name,
        description,
        created_at as createdAt
      FROM 
        roles
      WHERE 
        id = ANY($1::uuid[]);
    `;
    const values = [roleIds];

    const { rows } = await this.db.query(query, values);
    return rows.map((row: any) => ({
      id: row.id,
      name: row.name,
      description: row.description,
      createdAt: row.createdAt,
      permissions: row.permissions || []
    }));
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