import fs from 'fs/promises';
import path from 'path';
import type { User, CreateUserDTO } from './types';

const dataPath = path.join(process.cwd(), 'data/users.json');

async function readUsersFile(): Promise<User[]> {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data).users;
}

async function writeUsersFile(users: User[]): Promise<void> {
    await fs.writeFile(dataPath, JSON.stringify({ users }, null, 2), 'utf-8');
}

export async function getUsers(): Promise<User[]> {
    return await readUsersFile();
}

export async function getUserByEmail(email: string): Promise<User | null> {
    const users = await readUsersFile();
    return users.find(u => u.email === email) || null;
}

export async function createUser(userData: CreateUserDTO): Promise<User> {
    const users = await readUsersFile();
    const newUser = {
        id: Date.now(),
        points: 1000,
        ...userData,
        created_at: new Date(),
        updated_at: new Date()
    };
    users.push(newUser);
    await writeUsersFile(users);
    return newUser;
}
