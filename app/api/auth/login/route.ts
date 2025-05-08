import { NextResponse } from 'next/server';
import * as userService from '@/app/lib/db/users';
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

        // Get user by email
        const user = await userService.getUserByEmail(email);
        
        if (!user) {
            return NextResponse.json({ 
                error: 'Invalid credentials' 
            }, { status: 401 });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return NextResponse.json({ 
                error: 'Invalid credentials' 
            }, { status: 401 });
        }

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json(userWithoutPassword);
    } catch (error) {
        console.error('Error in POST /api/auth/login:', error);
        return NextResponse.json({ 
            error: 'Error during login',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
} 