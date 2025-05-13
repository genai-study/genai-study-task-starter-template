import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';
import bcrypt from 'bcryptjs';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import openDb from '../db/db';

export const createUser = async (email: string, password: string) => {
  const db = await openDb()
    let result = await db.get('SELECT * FROM users WHERE email = ?', email)
    if(result){
      throw {
        message: "User Already Exists"
      }
    }
    const newUser: PlatformUser = {
      id: null,
      email,
      password
    };
    result = await db.run('INSERT INTO users (email, password) VALUES (?, ?)',
        [newUser.email, _hashPassword(newUser.password)])
    await db.close()
    newUser.id = result.lastId
    newUser.password = ""
    return newUser
} // Implement the createUser function
export const loginDbUser = async (email: string, password: string) => {
  const db = await openDb()
  const user = await db.get<PlatformUser>('SELECT * FROM users WHERE email = ?', email);
  if(!user){
    throw {
      message: "Invalid Credentials"
    }
  }
  const status = comparePasswords(password, user.password)
  if(!status){
    throw {
      message: "Invaldi Credentials"
    }
  }
  await db.close()
  return user
}
export const findUserById = async (id: string): Promise<PlatformUser | null> => {
  const db = await openDb();
  const user = await db.get<PlatformUser>('SELECT * FROM users WHERE id = ?', id);
  await db.close();
  return user || null;
};
const _hashPassword = async(password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hashSync(password, salt)
  return hashedPassword
}
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
