import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/console/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnConsole =
        nextUrl.pathname.startsWith('/console') &&
        !nextUrl.pathname.startsWith('/console/login');

      // Block unauthenticated visitors from accessing /console
      if (isOnConsole) {
        if (isLoggedIn) return true;
        return false; // Automatically redirects to /console/login
      }

      // If already logged in and visiting login page, redirect to console dashboard
      if (isLoggedIn && nextUrl.pathname === '/console/login') {
        return Response.redirect(new URL('/console', nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
