import { incrementPageView, serverActionWrite, getMetrics } from './actions';

// Server component: count a pageview and pull initial metrics
export default async function Page() {
  await incrementPageView();
  const metrics = await getMetrics();

  return (
    <>
      <h1>VPS Fetch/Write Demo (Next.js)</h1>
      <p>This page is served by Next.js on your VPS. Try both approaches below.</p>

      <section style={card}>
        <h3>Read: Fetch Data (GET via Route Handler)</h3>
        <GetClient />
      </section>

      <section style={card}>
        <h3>Write: Save an Event</h3>

        {/* Server Action */}
        <form action={serverActionWrite}>
          <button style={btn}>Write via Server Action</button>
        </form>

        {/* Route Handler */}
        <div style={{marginTop:'.5rem'}}>
          <WriteClient />
        </div>
      </section>

      <section style={card}>
        <h3>Metrics (Live)</h3>
        <pre style={pre}>{JSON.stringify(metrics, null, 2)}</pre>
      </section>
    </>
  );
}

const card = { padding:'1rem', border:'1px solid #ddd', borderRadius:'12px', margin:'1rem 0' };
const btn  = { padding:'.6rem 1rem', cursor:'pointer' } as const;
const pre  = { background:'#fafafa', border:'1px solid #eee', padding:'1rem', borderRadius:'8px', overflow:'auto' };

// ---------- Client side buttons ----------
'use client';
import { useState } from 'react';

function GetClient() {
  const [msg, setMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean | null>(null);

  return (
    <div>
      <button style={btn} onClick={async () => {
        try {
          const r = await fetch('/api/time'); 
          if (!r.ok) throw new Error();
          const d = await r.json();
          setMsg('Server time: ' + d.time);
          setOk(true);
          (window as any).umami?.track('fetch_data');
        } catch {
          setMsg('Error');
          setOk(false);
        }
      }}>Fetch Data</button>
      <span style={{marginLeft:8, color: ok===null ? 'inherit' : ok ? 'green' : '#b00020'}}>{msg}</span>
    </div>
  );
}

function WriteClient() {
  const [msg, setMsg] = useState<string>('');
  const [ok, setOk] = useState<boolean | null>(null);

  return (
    <div>
      <button style={btn} onClick={async () => {
        try {
          const r = await fetch('/api/write', { method:'POST' });
          if (!r.ok) throw new Error();
          const d = await r.json();
          setMsg('Writes so far: ' + d.total + (d.db ? ' (db)' : ' (memory)'));
          setOk(true);
          (window as any).umami?.track('write_data');
        } catch {
          setMsg('Error');
          setOk(false);
        }
      }}>Write via Route Handler</button>
      <span style={{marginLeft:8, color: ok===null ? 'inherit' : ok ? 'green' : '#b00020'}}>{msg}</span>
    </div>
  );
}
