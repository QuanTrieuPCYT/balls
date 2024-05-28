"use client";

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

export const AuthProvider =({ children }: { children: ReactNode }) =>{
    return <SessionProvider 
        basePath="/app/api/auth"
    >
        {children}
    </SessionProvider>
}