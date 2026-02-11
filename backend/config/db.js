import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({path: './.env'})

const pool = new pg.Pool({
    user: process.env.SESSION_DB_USER,
    host: process.env.SESSION_DB_HOST,
    database: 'postgres',
    password: process.env.PSWD, 
    port: 5432,
    pool_mode: 'session',
 
  ssl:{
    rejectUnauthorized:false},
    // 🛡️ ADD THESE LINES TO PREVENT TIMEOUTS
    max: 10, // Max number of connections
    idleTimeoutMillis:20000, // Close idle clients after 30 seconds
    allowExitOnIdle: false // Return an error if connection takes > 2 seconds
});




pool.on('error', (err, client) => {
    console.error('⚠️ Database Error (caught by pool listener):', err.message);
    // Do nothing else. The pool automatically discards this bad client 
    // and creates a new one next time you need it.
});
export default pool;

