import { next } from "@vercel/edge";

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export default function middleware(request) {
  const expectedUser = process.env.ADMIN_USER;
  const expectedPass = process.env.ADMIN_PASSWORD;

  // Fail closed: if credentials aren't configured in Vercel, never allow access.
  if (!expectedUser || !expectedPass) {
    return new Response("Admin access is not configured.", { status: 401 });
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader && authHeader.startsWith("Basic ")) {
    const decoded = atob(authHeader.slice(6));
    const separatorIndex = decoded.indexOf(":");
    const user = decoded.slice(0, separatorIndex);
    const pass = decoded.slice(separatorIndex + 1);

    if (user === expectedUser && pass === expectedPass) {
      return next();
    }
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="ProMac Admin"' },
  });
}
