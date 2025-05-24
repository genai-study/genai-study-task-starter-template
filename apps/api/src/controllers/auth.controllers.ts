import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Email and password are required.' });
    return;
  }

  try {
    const userId = await createUser({ email, password });

    if (!userId) {
      res.status(500).json({ message: 'Failed to create user.' });
      return;
    }

    res.status(201).json({ message: 'User registered successfully.', userId });
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
  // please finish this function