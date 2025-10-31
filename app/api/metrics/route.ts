import { getMetrics } from '@/app/actions';

export async function GET() {
  const m = await getMetrics();
  return Response.json(m);
}
