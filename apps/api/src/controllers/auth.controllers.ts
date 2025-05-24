import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const newUser: PlatformUser = await createUser(email, password)

  res.status(201).json(newUser)
  } catch (error: any) {
  console.error('Error registering user:', error);

  if (error?.message?.includes("SQLITE_CONSTRAINT")) {
    res.status(400).json({ error: "Email already in use." });
  } else {
    res.status(500).json({ error: "Failed to register user", detail: error?.message });
  }
}
}

export default registerUser