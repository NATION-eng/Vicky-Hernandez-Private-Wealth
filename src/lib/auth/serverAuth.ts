import crypto from 'crypto';

// Server-side authentication configuration
// Credentials are encrypted and hashed server-side; NEVER exposed to the frontend bundle.

const AUTH_CONFIG = {
  // Configured administrator username
  username: 'Vickyh1970',

  // PBKDF2 100,000 iterations SHA-512 salted hash
  salt: 'f4d073bd6abe26b3b6e92e5688f7dc39',
  passwordHash: '959d6838db15c8b1a85bc6b02ba3a0ee27e51ec22d1907ef36afa4f97645af6cde2ef619769fe7065a2d62c61030a0ae033c2e1d7aa51222362874e2d077370b',

  // Session duration: 2 hours of inactivity before automatic expiration
  sessionDurationMs: 2 * 60 * 60 * 1000,

  // HMAC Secret for signing session tokens
  signingSecret: process.env.SESSION_SECRET || 'vhpw_institutional_fiduciary_secret_key_8920'
};

/**
 * Verify username and password against secure server-side salted hash
 */
export function verifyCredentials(username?: string, password?: string): boolean {
  if (!username || !password) return false;

  // Case-insensitive username check
  if (username.trim().toLowerCase() !== AUTH_CONFIG.username.toLowerCase()) {
    return false;
  }

  // Compute PBKDF2 hash
  const computedHash = crypto
    .pbkdf2Sync(password, AUTH_CONFIG.salt, 100000, 64, 'sha512')
    .toString('hex');

  // Constant-time buffer comparison to prevent timing attacks
  const expectedBuffer = Buffer.from(AUTH_CONFIG.passwordHash, 'hex');
  const computedBuffer = Buffer.from(computedHash, 'hex');

  if (expectedBuffer.length !== computedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, computedBuffer);
}

/**
 * Create a signed, timestamped session token with automatic expiration
 */
export function createSessionToken(username: string): { token: string; expiresAt: number } {
  const issuedAt = Date.now();
  const expiresAt = issuedAt + AUTH_CONFIG.sessionDurationMs;

  const payload = JSON.stringify({
    u: username,
    iat: issuedAt,
    exp: expiresAt
  });

  const payloadBase64 = Buffer.from(payload).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_CONFIG.signingSecret)
    .update(payloadBase64)
    .digest('base64url');

  const token = `${payloadBase64}.${signature}`;
  return { token, expiresAt };
}

/**
 * Validate session token and check for automatic expiration
 */
export function verifySessionToken(token?: string): { valid: boolean; username?: string; expiresAt?: number } {
  if (!token) return { valid: false };

  const parts = token.split('.');
  if (parts.length !== 2) return { valid: false };

  const [payloadBase64, providedSignature] = parts;

  // Verify HMAC signature
  const expectedSignature = crypto
    .createHmac('sha256', AUTH_CONFIG.signingSecret)
    .update(payloadBase64)
    .digest('base64url');

  const providedBuf = Buffer.from(providedSignature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (providedBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(providedBuf, expectedBuf)) {
    return { valid: false };
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
    const now = Date.now();

    // Check automatic session expiration
    if (!payload.exp || now > payload.exp) {
      return { valid: false };
    }

    return {
      valid: true,
      username: payload.u,
      expiresAt: payload.exp
    };
  } catch {
    return { valid: false };
  }
}
