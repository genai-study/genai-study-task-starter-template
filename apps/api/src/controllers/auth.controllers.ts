import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const newUser: PlatformUser = {
    id: null,
    email,
    password
  };

  try {
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const createdUser = await createUser(email, password);

    // Remove password before sending user back
    const { password: _, ...userWithoutPassword } = createdUser;

    res.status(201).json({
      user: userWithoutPassword
    });
  } catch (error: any) {
    if (error.message.includes('User already exists')) {
      res.status(409).json({ error: 'User already exists' });
    } else {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};
  // please finish this function


  export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }  
  
  }
