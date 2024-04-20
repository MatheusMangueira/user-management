import { pool } from './database';
import { v4 as uuidv4 } from 'uuid';


const createCompaniesTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS companies (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
};

const createUsersTable = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    company_id UUID REFERENCES companies(id)
  );
 `;
  await pool.query(queryText);
};


const createPermissionsTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS permissions (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(100) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
};

const createRolesTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS roles (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(100) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(queryText);
};



const createUserRolesTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS user_roles (
      user_id UUID NOT NULL,
      role_id UUID NOT NULL,
      PRIMARY KEY (user_id, role_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
    );
  `;
  await pool.query(queryText);
};

const createUserPermissionsTable = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users_permissions (
      user_id UUID NOT NULL,
      permission_id UUID NOT NULL,
      PRIMARY KEY (user_id, permission_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
    );
  `;
  await pool.query(queryText);
};


const createRolePermissionsTable = async () => {
  const queryText = `
  CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
  );
`;
  await pool.query(queryText);
};





export const createTables = async () => {
  try {
    await createCompaniesTables();
    await createUsersTable();
    await createPermissionsTables();
    await createRolesTables();
    await createUserRolesTable();
    await createUserPermissionsTable();
    await createRolePermissionsTable();

  } catch (error) {
    console.log('Error creating tables', error);
  }
};
