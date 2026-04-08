// Uses Web Crypto API (globalThis.crypto.subtle)
// Available in: Edge Runtime (Next.js middleware) + Node.js 18+

const COOKIE_NAME = 'admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function getSecret(): string {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) throw new Error('ADMIN_SECRET is not set');
  return secret;
}

async function hmacSign(payload: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await globalThis.crypto.subtle.importKey(
    'raw',
    enc.encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await globalThis.crypto.subtle.sign('HMAC', key, enc.encode(payload));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_DURATION_MS;
  const sig = await hmacSign(String(expires));
  return `${expires}.${sig}`;
}

export async function verifySessionToken(token: string): Promise<boolean> {
  try {
    const dotIdx = token.indexOf('.');
    if (dotIdx === -1) return false;
    const expiresStr = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);

    const expires = parseInt(expiresStr, 10);
    if (isNaN(expires) || Date.now() > expires) return false;

    const expected = await hmacSign(expiresStr);
    return sig === expected;
  } catch {
    return false;
  }
}

// Simple server-side comparison — runs only in API routes (Node.js runtime)
export function verifyAdminPassword(password: string): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  return password === secret;
}

export { COOKIE_NAME };
