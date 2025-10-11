import { NextRequest, NextResponse } from 'next/server';

const proxies = {
  '/api/lpk/:path*': '/api/admin/:path*',
};

const publicRoutes = ['/login'];
const authRoutes = ['/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value || '';

  if (pathname.startsWith('/api/lpk')) {
    const requestHeaders = new Headers(request.headers);

    if (token) {
      requestHeaders.set('Authorization', `Bearer ${token}`);
    }

    for (const [pattern, targetTemplate] of Object.entries(proxies)) {
      const regexPattern = pattern.replace(/:\w+\*/g, '(.*)');
      const regex = new RegExp(`^${regexPattern}$`);
      const match = pathname.match(regex);

      if (match) {
        const pathParam = match[1] || '';
        const targetPathname = targetTemplate.replace(':path*', pathParam);

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

        if (!baseUrl) {
          console.error('BASE_URL is not configured');
          return new Response(JSON.stringify({ error: 'Server configuration error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          });
        }

        const targetUrl = new URL(targetPathname, baseUrl);

        request.nextUrl.searchParams.forEach((value, key) => {
          targetUrl.searchParams.set(key, value);
        });

        return NextResponse.rewrite(targetUrl, {
          request: {
            headers: requestHeaders,
          },
        });
      }
    }
  }

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/lpk/:path*',
    '/((?!_next/static|_next/image|favicon.ico|logo.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
