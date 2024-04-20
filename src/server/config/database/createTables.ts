import { pool } from './database';
import { v4 as uuidv4 } from 'uuid';


const createCompaniesTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS companies (
      id UUID PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(100) NOT NULL,
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
    roles TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    company_id UUID REFERENCES companies(id)
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



export const createTables = async () => {
  try {
    await createCompaniesTables();
    await createUsersTable();
    await createRolesTables();
  } catch (error) {
    console.log('Error creating tables', error);
  }
};
