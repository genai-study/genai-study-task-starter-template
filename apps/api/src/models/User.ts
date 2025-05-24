import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import bcrypt from 'bcryptjs';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import openDb from '../db/db';
import { userAgent } from 'next/server';

export const createUser = async (
  email?: string, 
  password?: string
): Promise<PlatformUser> =>  {
  try {
    const db = await openDb();
    console.log("Inserting user with:", email, password);

    const result = await db.run(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email ?? null, password ?? null]
    );

    const id = result.lastID;
    await db.close();

    console.log("User created with ID:", id);

    return {
      id: String(id),
      email: email ?? null,
      password: password ?? null
    };
  } catch (err) {
    console.error("createUser error:", err);
    throw err;
  }
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
