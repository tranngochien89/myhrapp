
import mysql from 'mysql2/promise';

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: '194.59.164.11',
  user: 'u336789756_myapp',
  database: 'u336789756_myapp',
  password: 'W=p4hg63|', // Please replace with your actual password
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query(sql: string, values?: (string | number | boolean | null)[]) {
  const [rows] = await pool.execute(sql, values);
  return rows;
}
