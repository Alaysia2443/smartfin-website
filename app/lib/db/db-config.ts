import { Pool } from 'pg';
import 'server-only';

const connectionString = process.env.POSTGRES_URL_NON_POOLING || '';

const poolConfig = {
  connectionString,
  ssl: process.env.NODE_ENV === 'production' 
    ? true  // enable SSL for Vercel
    : false // disable SSL for local machine
};

console.log('DB Environment:', process.env.NODE_ENV);
console.log('SSL Enabled:', !!poolConfig.ssl);

export const dbPool = new Pool(poolConfig);

// test database connection
dbPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default dbPool;
