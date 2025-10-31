import { pool, ensureTables } from '@/lib/db';

let mem = { writes: 0 };

export async function POST() {
  try {
    if (pool) {
      await ensureTables();
      await pool.query('INSERT INTO writes DEFAULT VALUES;');
      const total = (await pool.query('SELECT COUNT(*)::int AS n FROM writes')).rows[0].n;
      return Response.json({ ok: true, total, db: true });
    } else {
      mem.writes++;
      return Response.json({ ok: true, total: mem.writes, db: false });
    }
  } catch (e: any) {
    return Response.json({ ok: false, error: e.message }, { status: 500 });
  }
}
