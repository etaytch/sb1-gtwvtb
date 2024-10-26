import mysql from 'mysql2/promise';
import { config } from './config.js';
import logger from '../utils/logger.js';

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.name,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
try {
  await pool.getConnection();
  logger.info('Database connected successfully');
} catch (error) {
  logger.error('Database connection failed:', error);
  process.exit(1);
}

export default pool;