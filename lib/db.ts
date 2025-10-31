import pkg from 'pg';
const { Pool } = pkg;

const cs = process.env.DATABASE_URL || '';

function sslOption(url: string) {
  return /amazonaws|render|railway|supabase|azure|gcp|neon|timescale|heroku/i.test(url)
    ? { rejectUnauthorized: false }
    : undefined;
}

// Reuse pool in dev
const globalForPool = global as unknown as { _pool?: InstanceType<typeof Pool> };

export const pool = cs
  ? (globalForPool._pool ||= new Pool({ connectionString: cs, ssl: sslOption(cs) }))
  : null;

export async function ensureTables() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS pageviews(id SERIAL PRIMARY KEY, at TIMESTAMP DEFAULT NOW());
    CREATE TABLE IF NOT EXISTS writes(id SERIAL PRIMARY KEY, at TIMESTAMP DEFAULT NOW());
  `);
}
