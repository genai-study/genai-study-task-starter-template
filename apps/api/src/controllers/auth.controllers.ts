import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { createUser, loginDbUser } from "../models/User"


export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try{
    const { email, password } = req.body;
  const user = await createUser(email, password)
  res.status(200).json(user)
  }
  catch(err){
    res.status(401).json({
      message: err.message
    })
  }
  
  // please finish this function

};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try{
    const { email, password } = req.body;
    const user = await loginDbUser(email, password)
    res.status(200).json({user})
  }
  catch(err){
    res.status(401).json({
      message: err.message
    })
  }
}