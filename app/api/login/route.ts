import { NextResponse } from "next/server";

// Dev-only login endpoint for local testing.
// POST { "email": "...", "password": "..." }
// Returns 200 with { token, user } when credentials match the dev user.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body?.email;
    const password = body?.password;

    if (!email || !password) {
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
    }

    // Dev credentials (change later when connecting real backend)
    const DEV_EMAIL = "dummy@nomail.com";
    const DEV_PASSWORD = "dummy";

    if (email === DEV_EMAIL && password === DEV_PASSWORD) {
      const user = {
        id: "dummy",
        name: "Dummy User",
        email: DEV_EMAIL,
        plan: "Pro Plan",
        avatar: "https://i.pravatar.cc/150?u=dummy",
      };

      return NextResponse.json({ token: "dev-token-123", user });
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
