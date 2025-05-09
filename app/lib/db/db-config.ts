// // imported in server components or API routes
// import { Pool } from 'pg';
// import 'server-only'; // prevent client-side usage

// // configure database
// export const dbPool = new Pool({
//   connectionString: process.env.POSTGRES_URL_NON_POOLING,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

// // test database connection
// dbPool.on('error', (err) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// export default dbPool;
