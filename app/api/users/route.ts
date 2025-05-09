
import { NextResponse } from 'next/server';
import * as userService from '@/app/lib/db/users';

// GET /api/users - Get all users
export async function GET() {
    try {
        const users = await userService.getUsers();
        return NextResponse.json(users);
    } catch (error) {
        console.error('Error in GET /api/users:', error);
        return NextResponse.json({ 
            error: 'Error fetching users',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// POST /api/users - Create a new user
export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log('Received request body:', body);
        
        const user = await userService.createUser(body);
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/users:', error);
        return NextResponse.json({ 
            error: 'Error creating user',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// PUT /api/users/:id - Update a user
export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const body = await request.json();
        console.log('Update request for user', id, 'with body:', body);
        
        const user = await userService.updateUser(parseInt(id), body);
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error in PUT /api/users:', error);
        return NextResponse.json({ 
            error: 'Error updating user',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

// DELETE /api/users/:id - Delete a user
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (!id) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        const success = await userService.deleteUser(parseInt(id));
        
        if (!success) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error in DELETE /api/users:', error);
        return NextResponse.json({ 
            error: 'Error deleting user',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
