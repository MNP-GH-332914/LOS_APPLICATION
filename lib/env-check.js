// lib/env-check.js
import dotenv from 'dotenv';
import { decrypt } from './crypto.js';

export function isDatabaseConfigured() {
  dotenv.config();

  const requiredVariables = ['DB_USER', 'DB_CONNECT_STRING', 'DB_ENCRYPTED_PASSWORD', 'ENCRYPTION_KEY'];
  const missing = requiredVariables.filter(key => !process.env[key]);

  // If variables are missing, quietly return false without logging warnings
  if (missing.length > 0) {
    return false;
  }

  // Safely check if decryption works without printing errors to the terminal
  try {
    const decryptedPassword = decrypt(process.env.DB_ENCRYPTED_PASSWORD);
    return !!decryptedPassword; 
  } catch (error) {
    return false; 
  }
}
