import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    console.log('Middleware executing for path:', request.nextUrl.pathname);

    const response = NextResponse.next();

    // CORS headers
    // response.headers.append('Access-Control-Allow-Credentials', "true")
    response.headers.append('Access-Control-Allow-Origin', '*');
    response.headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
}

export const config = {
    matcher: '/api/:path*',
};
