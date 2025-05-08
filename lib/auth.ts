import NextAuth from 'next-auth';
import { authOptions } from './app/auth/[...nextauth]/route.ts';
export const { auth, signIn, signOut } = NextAuth(authOptions);