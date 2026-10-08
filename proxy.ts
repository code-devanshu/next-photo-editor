import { NextResponse, type NextRequest } from "next/server";

// One URL per page: paths are lowercase, so "/PAN-Card-Photo" 301s to "/pan-card-photo".
// The matcher keeps this off Next.js's own assets; the check below stops lowercase paths.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const lower = pathname.toLowerCase();
  if (lower === pathname) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = lower;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: ["/((?!_next/).*[A-Z].*)"],
};
