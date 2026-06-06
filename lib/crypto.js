// lib/crypto.js
import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16; // For AES, this is always 16

// Helper to derive a stable 32-byte key from your ENCRYPTION_KEY string
function getSecretKey() {
    const secret = process.env.ENCRYPTION_KEY || 'default_fallback_key_32_bytes_long!!';
    return crypto.createHash('sha256').update(String(secret)).digest();
}

/**
 * Encrypts a plain text string (Use this once to get your password string)
 */
export function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Combine IV and encrypted text so it can be safely decrypted later
    return iv.toString('hex') + ':' + encrypted;
}

/**
 * Decrypts an encrypted hex string back into plain text
 */
export function decrypt(text) {
    if (!text || !text.includes(':')) return '';
    try {
        const parts = text.split(':');
        const iv = Buffer.from(parts.shift(), 'hex');
        const encryptedText = Buffer.from(parts.join(':'), 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        return '';
    }
}
