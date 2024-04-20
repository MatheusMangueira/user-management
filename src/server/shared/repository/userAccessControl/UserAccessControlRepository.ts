import { Pool } from 'pg';

export class UserAccessControlRepository {
  constructor(private db: Pool) { }

  async addRolesToUser(userId: string, roleIds: string[]): Promise<void> {
    const queries = roleIds.map(roleId => {
      return {
        text: 'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;',
        values: [userId, roleId],
      };
    });
    await this.db.query('BEGIN');
    for (const query of queries) {
      await this.db.query(query);
    }
    await this.db.query('COMMIT');
  }

  async addPermissionsToUser(userId: string, permissionIds: string[]): Promise<void> {
    const queries = permissionIds.map(permissionId => {
      return {
        text: 'INSERT INTO users_permissions (user_id, permission_id) VALUES ($1, $2) ON CONFLICT DO NOTHING;',
        values: [userId, permissionId],
      };
    });
    await this.db.query('BEGIN');
    for (const query of queries) {
      await this.db.query(query);
    }
    await this.db.query('COMMIT');
  }
}
