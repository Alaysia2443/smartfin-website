import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/app/lib/db/users';
import bcrypt from 'bcryptjs';

export const POST = async (request: Request) => {
    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        const user = await getUserByEmail(email);
        if (!user) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

        const { password: _, ...safeUser } = user;
        return NextResponse.json(safeUser);

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            error: 'Login failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
};
