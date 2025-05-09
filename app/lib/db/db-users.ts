// app/lib/db/db-users.ts
import { dbPool } from './db-config';
import bcrypt from 'bcryptjs';
import type { User, CreateUserDTO, UpdateUserDTO } from './types';

export const getUsers = async (): Promise<User[]> => {
    const result = await dbPool.query('SELECT * FROM users');
    return result.rows;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
    const result = await dbPool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0] || null;
};

export const getUserById = async (id: number): Promise<User | null> => {
    const result = await dbPool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
    );
    return result.rows[0] || null;
};

export const createUser = async (userData: CreateUserDTO): Promise<User> => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await dbPool.query(`
        INSERT INTO users (first_name, last_name, email, password, points)
        VALUES ($1, $2, $3, $4, 1000)
        RETURNING *`,
        [userData.first_name, userData.last_name, userData.email, hashedPassword]
    );
    return result.rows[0];
};

export const updateUser = async (id: number, userData: UpdateUserDTO): Promise<User | null> => {
    const updates: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (userData.first_name) {
        updates.push(`first_name = $${paramCount}`);
        values.push(userData.first_name);
        paramCount++;
    }
    if (userData.last_name) {
        updates.push(`last_name = $${paramCount}`);
        values.push(userData.last_name);
        paramCount++;
    }
    if (userData.email) {
        updates.push(`email = $${paramCount}`);
        values.push(userData.email);
        paramCount++;
    }
    if (userData.password) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        updates.push(`password = $${paramCount}`);
        values.push(hashedPassword);
        paramCount++;
    }
    if (userData.points !== undefined) {
        updates.push(`points = $${paramCount}`);
        values.push(userData.points);
        paramCount++;
    }

    if (updates.length === 0) return null;

    values.push(id);
    const result = await dbPool.query(
        `UPDATE users
        SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
        WHERE id = $${paramCount}
        RETURNING *`,
        values
    );
    return result.rows[0] || null;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    try {
        const query = 'DELETE FROM users WHERE id = $1';
        console.log('Executing query:', query, 'with id:', id);
        const result = await dbPool.query(query, [id]);

        return (result.rowCount ?? 0) > 0;
    } catch (error) {
        console.error('Error in deleteUser:', error);
        throw error;
    }
};
