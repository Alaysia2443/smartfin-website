import fs from 'fs/promises';
import path from 'path';
import * as dbUsers from './db-users';
import type { User, CreateUserDTO, UpdateUserDTO } from './types';

const dataPath = path.join(process.cwd(), 'data/users.json');

// JSON fallback
const jsonUsers = {
  getUsers: async (): Promise<User[]> => {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data).users;
  },

  getUserByEmail: async (email: string): Promise<User | null> => {
    const users = await jsonUsers.getUsers();
    return users.find(u => u.email === email) || null;
  },

  getUserById: async (id: number): Promise<User | null> => {
    const users = await jsonUsers.getUsers();
    return users.find(u => u.id === id) || null;
  },

  createUser: async (userData: CreateUserDTO): Promise<User> => {
    const users = await jsonUsers.getUsers();
    const newUser = {
      id: Date.now(),
      points: 1000,
      ...userData,
      created_at: new Date(),
      updated_at: new Date()
    };
    await fs.writeFile(dataPath, JSON.stringify({ users: [...users, newUser] }, null, 2));
    return newUser;
  },

  updateUser: async (id: number, userData: UpdateUserDTO): Promise<User | null> => {
    const users = await jsonUsers.getUsers();
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return null;
    
    const updatedUser = { ...users[index], ...userData, updated_at: new Date() };
    users[index] = updatedUser;
    await fs.writeFile(dataPath, JSON.stringify({ users }, null, 2));
    return updatedUser;
  },

  deleteUser: async (id: number): Promise<boolean> => {
    const users = await jsonUsers.getUsers();
    const newUsers = users.filter(u => u.id !== id);
    if (users.length === newUsers.length) return false;
    await fs.writeFile(dataPath, JSON.stringify({ users: newUsers }, null, 2));
    return true;
  }
};

// Unified interface with fallback
async function withFallback<T>(dbFn: () => Promise<T>, jsonFn: () => Promise<T>): Promise<T> {
  try {
    return await dbFn();
  } catch (error) {
    console.error('Database error, using JSON fallback:', error);
    return jsonFn();
  }
}

export const getUsers = async (): Promise<User[]> => 
  withFallback(dbUsers.getUsers, jsonUsers.getUsers);

export const getUserByEmail = async (email: string): Promise<User | null> => 
  withFallback(() => dbUsers.getUserByEmail(email), () => jsonUsers.getUserByEmail(email));

export const getUserById = async (id: number): Promise<User | null> => 
  withFallback(() => dbUsers.getUserById(id), () => jsonUsers.getUserById(id));

export const createUser = async (userData: CreateUserDTO): Promise<User> => 
  withFallback(() => dbUsers.createUser(userData), () => jsonUsers.createUser(userData));

export const updateUser = async (id: number, userData: UpdateUserDTO): Promise<User | null> => 
  withFallback(() => dbUsers.updateUser(id, userData), () => jsonUsers.updateUser(id, userData));

export const deleteUser = async (id: number): Promise<boolean> => 
  withFallback(() => dbUsers.deleteUser(id), () => jsonUsers.deleteUser(id));
