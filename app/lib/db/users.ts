import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data/users.json');

async function readUsersFile() {
  const data = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(data).users;
}

async function writeUsersFile(users: any[]) {
  await fs.writeFile(dataPath, JSON.stringify({ users }, null, 2), 'utf-8');
}

export async function getUsers() {
  return await readUsersFile();
}

export async function getUserByEmail(email: string) {
  const users = await readUsersFile();
  return users.find((u: any) => u.email === email) || null;
}

export async function getUserById(id: number) {
  const users = await readUsersFile();
  return users.find((u: any) => u.id === id) || null;
}

export async function createUser(userData: any) {
  const users = await readUsersFile();
  const newUser = {
    id: Date.now(),
    points: 1000,
    ...userData
  };
  users.push(newUser);
  await writeUsersFile(users);
  return newUser;
}

export async function updateUser(id: number, userData: any) {
  const users = await readUsersFile();
  const idx = users.findIndex((u: any) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...userData };
  await writeUsersFile(users);
  return users[idx];
}

export async function deleteUser(id: number) {
  let users = await readUsersFile();
  const prevLen = users.length;
  users = users.filter((u: any) => u.id !== id);
  await writeUsersFile(users);
  return users.length < prevLen;
}


// import pool from './db-config';
// import { User, CreateUserDTO, UpdateUserDTO } from './types';
// import bcrypt from 'bcryptjs';

// export const createUser = async (userData: CreateUserDTO): Promise<User> => {
//   try {
//     const hashedPassword = await bcrypt.hash(userData.password, 10);
    
//     const query = `
//       INSERT INTO users (first_name, last_name, email, password, points)
//       VALUES ($1, $2, $3, $4, 1000)
//       RETURNING *
//     `;
    
//     const values = [userData.first_name, userData.last_name, userData.email, hashedPassword];
//     console.log('Executing query:', query, 'with values:', values);
    
//     const result = await pool.query(query, values);
//     return result.rows[0];
//   } catch (error) {
//     console.error('Error in createUser:', error);
//     throw error;
//   }
// };

// export const getUsers = async (): Promise<User[]> => {
//   try {
//     const query = 'SELECT * FROM users';
//     console.log('Executing query:', query);
    
//     const result = await pool.query(query);
//     return result.rows;
//   } catch (error) {
//     console.error('Error in getUsers:', error);
//     throw error;
//   }
// };

// export const getUserById = async (id: number): Promise<User | null> => {
//   try {
//     const query = 'SELECT * FROM users WHERE id = $1';
//     console.log('Executing query:', query, 'with id:', id);
    
//     const result = await pool.query(query, [id]);
//     return result.rows[0] || null;
//   } catch (error) {
//     console.error('Error in getUserById:', error);
//     throw error;
//   }
// };

// export const getUserByEmail = async (email: string): Promise<User | null> => {
//   try {
//     const query = 'SELECT * FROM users WHERE email = $1';
//     console.log('Executing query:', query, 'with email:', email);
    
//     const result = await pool.query(query, [email]);
//     return result.rows[0] || null;
//   } catch (error) {
//     console.error('Error in getUserByEmail:', error);
//     throw error;
//   }
// };

// export const updateUser = async (id: number, userData: UpdateUserDTO): Promise<User | null> => {
//   try {
//     const updates: string[] = [];
//     const values: any[] = [];
//     let paramCount = 1;

//     if (userData.first_name) {
//       updates.push(`first_name = $${paramCount}`);
//       values.push(userData.first_name);
//       paramCount++;
//     }
//     if (userData.last_name) {
//       updates.push(`last_name = $${paramCount}`);
//       values.push(userData.last_name);
//       paramCount++;
//     }
//     if (userData.email) {
//       updates.push(`email = $${paramCount}`);
//       values.push(userData.email);
//       paramCount++;
//     }
//     if (userData.password) {
//       const hashedPassword = await bcrypt.hash(userData.password, 10);
//       updates.push(`password = $${paramCount}`);
//       values.push(hashedPassword);
//       paramCount++;
//     }
//     if (userData.points !== undefined) {
//       updates.push(`points = $${paramCount}`);
//       values.push(userData.points);
//       paramCount++;
//     }

//     if (updates.length === 0) {
//       return getUserById(id);
//     }

//     values.push(id);
//     const query = `
//       UPDATE users 
//       SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
//       WHERE id = $${paramCount}
//       RETURNING *
//     `;

//     console.log('Executing query:', query, 'with values:', values);
//     const result = await pool.query(query, values);
//     return result.rows[0] || null;
//   } catch (error) {
//     console.error('Error in updateUser:', error);
//     throw error;
//   }
// };

// export const deleteUser = async (id: number): Promise<boolean> => {
//   try {
//     const query = 'DELETE FROM users WHERE id = $1';
//     console.log('Executing query:', query, 'with id:', id);
//     const result = await pool.query(query, [id]);
    
//     return (result.rowCount ?? 0) > 0;
//   } catch (error) {
//     console.error('Error in deleteUser:', error);
//     throw error;
//   }
// };