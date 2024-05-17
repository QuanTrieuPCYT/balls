// import bcrypt from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, _req) => {
        
        const { email, password } = credentials!;
        try {
          // const user = await User.findOne({ email });
          const user = null;
          if (!user) {
            return null;
          }

          // const passwordsMatch = await bcrypt.compare(password, user.password);

          // if (!passwordsMatch) {
          //   return null;
          // }

          return {
            email: "test@email.com",
            id: "1",
          };
        } catch (error) {
          console.error('Error:', error);
          throw error; // Rethrow the error for more information
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/signin',
  },
};