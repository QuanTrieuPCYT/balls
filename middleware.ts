import type { NextRequest } from 'next/server';
 
export function middleware(req: NextRequest) {
    console.log(req.headers.get("host"));
}