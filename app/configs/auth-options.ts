// import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { PrismaClient } from '@prisma/client';
import { compare } from "bcrypt";
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, _req) => {
        if (!credentials?.username || !credentials.password) return null;
        const user = await prisma.user.findUnique({
          where: {
            username: credentials.username,
          },
        })

        if (!user) return null;

        const validPassword = await compare(credentials.password, user.password);
        if (!validPassword) return null;
        return {
          id: user.id,
          name: user.username,
          email: user.email,
        } as any;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          name: u.name,
        };
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auth/signin',
  },
};