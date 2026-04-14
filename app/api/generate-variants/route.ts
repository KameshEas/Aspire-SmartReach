import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: 'This route has moved to the backend services. Use /api/services/generate-variants which proxies to the backend.' }, { status: 410 });
}
