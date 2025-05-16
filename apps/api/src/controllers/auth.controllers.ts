import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PlatformUser } from "@enterprise-commerce/core/platform/types"
import { comparePasswords, createUser, findUserByEmail } from "../models/User"

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  console.log("RegisterUser endpoint", req.body)
  const newUser: PlatformUser = {
    id: null,
    email,
    password
  };

  const registeredUser= await createUser(newUser)
  console.log("auth.controller", registeredUser)
  res.json(registerUser);
  res.end()
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try{
  const { email, password } = req.body;
  console.log("loginUser endpoint", req.body)
  

  const loggedInUser= await findUserByEmail(email)
  
  const isMatching = await comparePasswords(password, loggedInUser.password)
  if(!isMatching){
    res.status(401).send("Wrong password!")
    return
  }

  res.json(loggedInUser);
  res.end()
}
  catch(e){
    console.error(e);
    res.status(500).send(e.message);
}
};