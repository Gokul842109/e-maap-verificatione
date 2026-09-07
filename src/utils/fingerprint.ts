// ============================================================
// Digital Fingerprint Generator
// Uses Web Crypto API for SHA-256 hashing in the browser
// ============================================================

export async function generateFingerprint(data: Record<string, string | number | undefined>): Promise<string> {
  const input = Object.entries(data)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');

  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(input);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  // Fallback: simple hash for environments without Web Crypto
  return simpleHash(input);
}

export function generateFingerprintSync(data: Record<string, string | number | undefined>): string {
  const input = Object.entries(data)
    .filter(([, v]) => v !== undefined)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}:${v}`)
    .join('|');
  return simpleHash(input);
}

function simpleHash(str: string): string {
  let hash1 = 0x811c9dc5;
  let hash2 = 0xcbf29ce4;
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    hash1 ^= c;
    hash1 = Math.imul(hash1, 0x01000193);
    hash2 ^= c;
    hash2 = Math.imul(hash2, 0x100193af);
  }
  const h1 = (hash1 >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h2 = (hash2 >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h3 = ((hash1 ^ hash2) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h4 = ((hash1 + hash2) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h5 = (Math.abs(hash1 * 31 + hash2) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h6 = (Math.abs(hash2 * 37 + hash1) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h7 = ((hash1 >>> 16 ^ hash2) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  const h8 = ((hash2 >>> 16 ^ hash1) >>> 0).toString(16).padStart(8, '0').toUpperCase();
  return `${h1}${h2}${h3}${h4}${h5}${h6}${h7}${h8}`;
}

export function truncateFingerprint(fp: string, len: number = 16): string {
  if (fp.length <= len) return fp;
  return `${fp.slice(0, len / 2)}...${fp.slice(-(len / 2))}`;
}
