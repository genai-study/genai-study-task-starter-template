import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser, getUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    // Here you could add additional validations or password hashing

    const result = await createUser({ email, password });

    if (result?.id) {
      const newUser: PlatformUser = {
        id: result.id.toString(),
        email,
        password, // You might want to omit this in the response or hash it before saving
      };

      res.status(201).json({ id: newUser.id }); // Only return the ID
    } else {
      res.status(500).json({ error: "User creation failed." });
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required." });
      return;
    }

    // Here you could add additional validations or password hashing

    const result = await getUser({ email, password });

    if (result?.id) {
      const newUser: PlatformUser = {
        id: result.id.toString(),
        email,
        password, // You might want to omit this in the response or hash it before saving
      };

      res.status(401).json({ id: newUser.id }); // Only return the ID
    } else {
      res.status(500).json({ error: "User login failed." });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}