// lib/db.js
import oracledb from 'oracledb';
import dotenv from 'dotenv';
import { decrypt } from './crypto.js';

// Load variables from your local .env file
dotenv.config();

oracledb.autoCommit = true;

// Reconstruct configuration securely without plain-text leaks
const dbConfig = {
  user: process.env.DB_USER,
  password: decrypt(process.env.DB_ENCRYPTED_PASSWORD), // Decrypts instantly in-memory
  connectString: process.env.DB_CONNECT_STRING
};

export async function executeQuery(sql, binds = []) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(sql, binds);
    return result;
  } catch (err) {
    console.error(`🔴 Database Execution Error: ${err.message}`);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}
