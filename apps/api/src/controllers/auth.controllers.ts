import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser } from "../models/User"
import { userAgent } from 'next/server';

export const registerUser = async (req: Request, res: Response): Promise<PlatformUser> => {
  const { email, password } = req.body;

  const response = createUser(email,password);
  console.log("recieved user data ::::", response);
  return response;
};