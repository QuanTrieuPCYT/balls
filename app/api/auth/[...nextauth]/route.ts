import NextAuth from 'next-auth/next';

import { authOptions } from '@/app/configs/auth-options';

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;