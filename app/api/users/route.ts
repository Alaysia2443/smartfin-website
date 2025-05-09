import { NextResponse } from 'next/server';
import * as userService from '@/app/lib/db/users';

export const GET = async () => {
    console.log('GET /api/users called');

    try {
        const users = await userService.getUsers();
        return NextResponse.json(users, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        return handleError(error, 'Error fetching users');
    }
};

export const POST = async (request: Request) => {
    console.log('POST /api/users called');

    try {
        const body = await request.json();
        console.log('Creating user with data:', {
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            password_provided: !!body.password
        });

        const user = await userService.createUser(body);
        console.log('User created successfully with ID:', user.id);

        return NextResponse.json(user, {
            status: 201,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return handleError(error, 'Error creating user');
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

const handleError = (error: unknown, message: string) => {
    console.error(message, error);

    const isDbError = error instanceof Error &&
        (error.message.includes('database') ||
            error.message.includes('sql') ||
            error.message.includes('connection'));

    return NextResponse.json({
        error: message,
        details: error instanceof Error ? error.message : 'Unknown error',
        type: isDbError ? 'database' : 'application',
        fallbackUsed: error instanceof Error && error.message.includes('JSON fallback')
    }, {
        status: 500,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
    });
};
