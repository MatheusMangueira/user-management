import { App } from './server/Server';
import { pool } from './server/config/database/database';
import { createTables } from './server/config/database/createTables';


pool.connect()
  .then(() => {
    createTables(); 
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });



App.listen(3000);

