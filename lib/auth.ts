import NextAuth from 'next-auth';
import { authOptions } from '@/app/auth/[...nextauth]/route.js';
export const { auth, signIn, signOut } = NextAuth(authOptions);