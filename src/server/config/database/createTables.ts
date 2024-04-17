import { pool } from './database';


export const createUserTables = async () => {
  const queryText = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await pool.query(queryText);
};


export const createTables = async () => {
  try {
    await createUserTables();
  } catch (error) {
    console.log('Error creating tables', error);
  }
};
