import { NextRequest, NextResponse } from 'next/server';

const proxies = {
  '/api/lpk/:path*': `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/:path*`,
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value || '';

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('Authorization', `Bearer ${token}`);

  for (const [pattern, targetTemplate] of Object.entries(proxies)) {
    const regexPattern = pattern.replace(/:\w+\*/, '(.*)');
    const regex = new RegExp(`^${regexPattern}$`);
    const match = request.nextUrl.pathname.match(regex);

    if (match) {
      const pathParam = match[1] || '';

      const targetPathname = targetTemplate.replace(':path*', pathParam);

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      if (!baseUrl) {
        throw new Error('NEXT_PUBLIC_BASE_URL environment variable is not set');
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/lpk/:path*'],
};
