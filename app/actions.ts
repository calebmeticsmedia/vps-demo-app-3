'use server';

import { pool, ensureTables } from '@/lib/db';

let mem = { pageViews: 0, writes: 0 };

export async function incrementPageView() {
  if (pool) {
    await ensureTables();
    await pool.query('INSERT INTO pageviews DEFAULT VALUES;');
  } else {
    mem.pageViews++;
  }
}

export async function serverActionWrite() {
  if (pool) {
    await ensureTables();
    await pool.query('INSERT INTO writes DEFAULT VALUES;');
    const total = (await pool.query('SELECT COUNT(*)::int AS n FROM writes')).rows[0].n;
    return { ok: true, total, db: true };
  } else {
    mem.writes++;
    return { ok: true, total: mem.writes, db: false };
  }
}

export async function getMetrics() {
  if (pool) {
    await ensureTables();
    const pv = (await pool.query('SELECT COUNT(*)::int AS n FROM pageviews')).rows[0].n;
    const wr = (await pool.query('SELECT COUNT(*)::int AS n FROM writes')).rows[0].n;
    return { pageViews: pv, writes: wr, db: true };
  } else {
    return { pageViews: mem.pageViews, writes: mem.writes, db: false };
  }
}
