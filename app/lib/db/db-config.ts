// imported in server components or API routes
import { Pool } from 'pg';
import fs from 'fs';
import 'server-only'; // prevent client-side usage

// const ca = fs.readFileSync('prod-ca-2021.crt').toString();

// // configure database
// export const dbPool = new Pool({
//   connectionString: process.env.POSTGRES_URL_NON_POOLING,
//   ssl: {
//     ca,
//     rejectUnauthorized: true
//   }
// });

console.log(process.env.POSTGRES_URL_NON_POOLING);

export const dbPool = new Pool({
  connectionString: process.env.POSTGRES_URL_NON_POOLING,
  ssl: {
    rejectUnauthorized: false
  }
});


// test database connection
dbPool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default dbPool;
