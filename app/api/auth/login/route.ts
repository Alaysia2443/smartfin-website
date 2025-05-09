import { NextResponse } from 'next/server';
import { getUserByEmail } from '@/app/lib/db/users';
import bcrypt from 'bcryptjs';

export const POST = async (request: Request) => {
    console.log('Login API route called');

    try {
        const requestUrl = request.url;
        console.log('Request URL:', requestUrl);

        const body = await request.json();
        console.log('Request body:', { email: body.email, passwordProvided: !!body.password });

        const { email, password } = body;

        if (!email || !password) {
            console.log('Missing email or password');
            return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
        }

        console.log('Attempting to find user by email:', email);
        const user = await getUserByEmail(email);

        if (!user) {
            console.log('User not found');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        console.log('User found, comparing passwords');
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            console.log('Password comparison failed');
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        console.log('Authentication successful');
        const { password: _, ...safeUser } = user;

        // add CORS headers
        return NextResponse.json(safeUser, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        console.error('Login error details:', error);
        return NextResponse.json({
            error: 'Login failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    }
};

export const OPTIONS = async () => {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
    });
};
