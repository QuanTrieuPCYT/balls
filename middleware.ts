import type { NextRequest } from 'next/server';
 
export function middleware(req: NextRequest) {
    const host = req.headers.get("host");
    console.log(host);
    // if (process.env.NODE_ENV == "development")
}