import { NextResponse } from 'next/server';
import * as userService from '@/app/lib/db/users';

export const GET = async () => {
    try {
        const users = await userService.getUsers();
        return NextResponse.json(users);
    } catch (error) {
        return handleError(error, 'Error fetching users');
    }
};

export const POST = async (request: Request) => {
    try {
        const body = await request.json();
        const user = await userService.createUser(body);
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return handleError(error, 'Error creating user');
    }
};

export const PUT = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

        const body = await request.json();
        const user = await userService.updateUser(parseInt(id), body);

        return user
            ? NextResponse.json(user)
            : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } catch (error) {
        return handleError(error, 'Error updating user');
    }
};

export const DELETE = async (request: Request) => {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'User ID required' }, { status: 400 });

        const success = await userService.deleteUser(parseInt(id));

        return success
            ? NextResponse.json({ message: 'User deleted' })
            : NextResponse.json({ error: 'User not found' }, { status: 404 });
    } catch (error) {
        return handleError(error, 'Error deleting user');
    }
};

const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    return NextResponse.json({
        error: message,
        details: error instanceof Error ? error.message : 'Unknown error',
        fallbackUsed: error instanceof Error && error.message.includes('JSON fallback')
    }, { status: 500 });
};
