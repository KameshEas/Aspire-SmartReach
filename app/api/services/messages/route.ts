import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const backendBase = process.env.BACKEND_URL;
    if (!backendBase) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

    const target = backendBase.replace(/\/+$/,'') + '/api/v1/messages';
    const headers: Record<string,string> = {};
    if (process.env.BACKEND_API_KEY) headers['Authorization'] = `Bearer ${process.env.BACKEND_API_KEY}`;

    const res = await fetch(target, { method: 'GET', headers });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await res.json();
      return NextResponse.json(json, { status: res.status });
    }
    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: { 'content-type': contentType } });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const backendBase = process.env.BACKEND_URL;
    if (!backendBase) return NextResponse.json({ error: 'BACKEND_URL not configured' }, { status: 500 });

    const target = backendBase.replace(/\/+$/,'') + '/api/v1/messages';
    const headers: Record<string,string> = { 'Content-Type': 'application/json' };
    if (process.env.BACKEND_API_KEY) headers['Authorization'] = `Bearer ${process.env.BACKEND_API_KEY}`;

    const res = await fetch(target, { method: 'POST', headers, body: JSON.stringify(body) });

    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const json = await res.json();
      return NextResponse.json(json, { status: res.status });
    }
    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: { 'content-type': contentType } });
  } catch (err: any) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
