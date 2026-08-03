import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin') && !nextUrl.pathname.startsWith('/admin/login');

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect to /admin/login
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
