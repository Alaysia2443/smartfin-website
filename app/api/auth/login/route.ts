import { NextResponse } from 'next/server';
import { dbPool } from '@/app/lib/db/db-config'; 
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json({
                error: 'Email and password are required'
            }, { status: 400 });
        }

        // Query the database directly with the pool
        const result = await dbPool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        const user = result.rows[0];

        if (!user) {
            return NextResponse.json({
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Verify password - make sure to use the correct field name for the password hash
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json({
                error: 'Invalid credentials'
            }, { status: 401 });
        }

        // Transform the data to match frontend structure
        const userResponse = {
            id: user.id.toString(),
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            points: user.points || 0
        };

        return NextResponse.json(userResponse);
    } catch (error) {
        console.error('Error in POST /api/auth/login:', error);
        return NextResponse.json({
            error: 'Error during login',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
