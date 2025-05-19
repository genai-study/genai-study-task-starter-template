import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required.' });
      return;
    }

    const newUser: Omit<PlatformUser, 'id'> = {
      email,
      password
    };

    const createdUser = await createUser(newUser);

    // Generate JWT token
    const token = jwt.sign(
      { id: createdUser.id, email: createdUser.email },
      process.env.JWT_SECRET || 'default_secret', // Use env var in production
      { expiresIn: '1h' }
    );

    res.status(201).json({
      user: {
        id: createdUser.id,
        email: createdUser.email
      },
      token
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
