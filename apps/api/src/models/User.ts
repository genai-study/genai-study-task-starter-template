import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import bcrypt from 'bcryptjs';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import openDb from '../db/db';

export const createUser = async (user: Omit<PlatformUser, 'id'>): Promise<number> => {
  const db = await openDb();

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(user.password, 10);

  const result = await db.run(
    `INSERT INTO users (email, password, name) VALUES (?, ?)`,
    user.email,
    hashedPassword,
  );

  await db.close();

  return result.lastID
};
export const findUserById = async (id: string): Promise<PlatformUser | null> => {
  const db = await openDb();
  const user = await db.get<PlatformUser>('SELECT * FROM users WHERE id = ?', id);
  await db.close();
  return user || null;
};

// The function below might be useful for task 2. You can disregard it for the register function for task 1.
/**
 * Compares a plain text password with a hashed password.
 *
 * This function uses bcrypt to asynchronously compare a plain text password with a hashed password 
 * to determine if they match.
 *
 * @param {string} password - The plain text password to be compared. (input from user when trying to login)
 * @param {string} hashedPassword - The hashed password to compare against. (encrypted password stored in database)
 * @returns {Promise<boolean>} - A promise that resolves to `true` if the passwords match, 
 *                               and `false` otherwise.
 */
export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword); 
};
