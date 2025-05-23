import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import PostgresAdapter from '@auth/pg-adapter';
import { Pool } from '@neondatabase/serverless';
import type { NextAuthConfig } from 'next-auth';
import { log } from '@/lib/logging-service';

const authOptions: NextAuthConfig = {
  adapter: PostgresAdapter(new Pool({ connectionString: process.env.DATABASE_URL })),
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  })],
  secret: process.env.NEXTAUTH_SECRET,
  basePath: '/api/auth',
  logger: {
    error(code, ...message) {
      log.error(code, ...message);
    },
    warn(code, ...message) {
      log.warn(code, ...message);
    },
    debug(code, ...message) {
      log.debug(code, ...message);
    }
  },
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);