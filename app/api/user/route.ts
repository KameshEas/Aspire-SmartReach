import { NextResponse } from "next/server";

// Temporary API route that returns a single "Summy" user.
// The frontend will fetch from this route; you'll connect the real backend later.
export async function GET() {
  const user = {
    id: "dummy",
    name: "Dummy User",
    email: "dummy@nomail.com",
    plan: "Pro Plan",
    avatar: "https://i.pravatar.cc/150?u=dummy",
  };

  return NextResponse.json(user);
}
