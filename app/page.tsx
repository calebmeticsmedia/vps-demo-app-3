import { incrementPageView, serverActionWrite, getMetrics } from './actions';
import GetClient from '@/components/GetClient';
import WriteClient from '@/components/WriteClient';

export default async function Page() {
  // server-side work only
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

        {/* Server Action (server-only) */}
        <form action={serverActionWrite}>
          <button style={btn}>Write via Server Action</button>
        </form>

        {/* Route Handler (client fetch) */}
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
