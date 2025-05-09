import pool from './db-config';
import { User, CreateUserDTO, UpdateUserDTO } from './types';
import bcrypt from 'bcryptjs';

export const createUser = async (userData: CreateUserDTO): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const query = `
      INSERT INTO users (first_name, last_name, email, password, points)
      VALUES ($1, $2, $3, $4, 1000)
      RETURNING *
    `;
    
    const values = [userData.first_name, userData.last_name, userData.email, hashedPassword];
    console.log('Executing query:', query, 'with values:', values);
    
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error in createUser:', error);
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const query = 'SELECT * FROM users';
    console.log('Executing query:', query);
    
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error in getUsers:', error);
    throw error;
  }
};

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const query = 'SELECT * FROM users WHERE id = $1';
    console.log('Executing query:', query, 'with id:', id);
    
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error in getUserById:', error);
    throw error;
  }
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    console.log('Executing query:', query, 'with email:', email);
    
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error in getUserByEmail:', error);
    throw error;
  }
};

export const updateUser = async (id: number, userData: UpdateUserDTO): Promise<User | null> => {
  try {
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

    if (updates.length === 0) {
      return getUserById(id);
    }

    values.push(id);
    const query = `
      UPDATE users 
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;

    console.log('Executing query:', query, 'with values:', values);
    const result = await pool.query(query, values);
    return result.rows[0] || null;
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};

export const deleteUser = async (id: number): Promise<boolean> => {
  try {
    const query = 'DELETE FROM users WHERE id = $1';
    console.log('Executing query:', query, 'with id:', id);
    const result = await pool.query(query, [id]);
    
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    throw error;
  }
};