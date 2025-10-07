import { NextRequest, NextResponse } from "next/server";

const proxies = {
    '/api/lpk-cpmi/:path*': `${process.env.NEXT_PUBLIC_BASE_URL}/api/cpmi/:path*`,
    '/api/lpk-admin/:path*': `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/:path*`,
    '/api/lpk-pengajar/:path*': `${process.env.NEXT_PUBLIC_BASE_URL}/api/pengajar/:path*`,
}

export async function middleware(request: NextRequest) {
    const tokenCpmi = request.cookies.get('tokenCpmi')?.value || '';
    const tokenAdmin = request.cookies.get('tokenAdmin')?.value || '';
    const tokenPengajar = request.cookies.get('tokenPengajar')?.value || '';
    
    const requestHeaders = new Headers(request.headers);
    
    if (request.nextUrl.pathname.startsWith('/api/lpk-cpmi')) {
        requestHeaders.set('Authorization', `Bearer ${tokenCpmi}`);
    } else if (request.nextUrl.pathname.startsWith('/api/lpk-admin')) {
        requestHeaders.set('Authorization', `Bearer ${tokenAdmin}`);
    } else if (request.nextUrl.pathname.startsWith('/api/lpk-pengajar')) {
        requestHeaders.set('Authorization', `Bearer ${tokenPengajar}`);
    }

    for (const [pattern, targetTemplate] of Object.entries(proxies)) {
        const regexPattern = pattern.replace(/:\w+\*/, '(.*)');
        const regex = new RegExp(`^${regexPattern}$`);
        const match = request.nextUrl.pathname.match(regex);
        
        if (match) {
            const pathParam = match[1] || '';
            
            const targetPathname = targetTemplate.replace(':path*', pathParam);
            
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
            if (!baseUrl) {
                throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not set");
            }
            
            const targetUrl = new URL(targetPathname, baseUrl);
            
            return NextResponse.rewrite(targetUrl, {
                request: {
                    headers: requestHeaders
                }
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/lpk-cpmi/:path*', '/api/lpk-admin/:path*', '/api/lpk-pengajar/:path*'],
};