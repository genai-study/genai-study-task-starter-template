import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types";
import { createUser } from "../models/User";
import { findUserByEmail, comparePasswords } from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET || 'your_default_secret'; // Use env var in production

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password are required' });
    return;
  }

  try {
    const newUser: Omit<PlatformUser, 'id'> = { email, password };
    const createdUser = await createUser(newUser);

    if (!createdUser) {
      res.status(500).json({ error: 'User could not be created' });
      return;
    }

    const token = jwt.sign({ id: createdUser.id, email: createdUser.email }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({
      user: {
        id: createdUser.id,
        email: createdUser.email,
      },
      token,
    });
  } catch (error: any) {
    if (error.message.includes('UNIQUE constraint failed: users.email')) {
      res.status(409).json({ error: 'Email is already in use' });
    } else {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};


export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required." });
    return;
  }

  try {
    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials." });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "no_key_set", {
      expiresIn: '1h',
    });

    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();

    res.status(200).json({
      token,
      expiresAt,
      user: { id: user.id, email: user.email }
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login." });
  }
};