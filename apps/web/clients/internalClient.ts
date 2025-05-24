import { PlatformAccessToken, PlatformUserCreateInput, PlatformUser } from '@enterprise-commerce/core/platform/types';
import axios from 'axios';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const registerUser = async (input: PlatformUserCreateInput): Promise<Pick<PlatformUser, "id"> | undefined | null> => {
  try {
    const { data } = await axios.post('http://localhost:3001/register', input);
    return data; // adjust if backend response format is different
  } catch (error) {
    console.error("Internal client registration failed", error);
    throw error;
  }
};

const loginUser = async (input: PlatformUserCreateInput) => {
  try {
    const response = await axios.post('http://localhost:3001/login', input);
    const user = response.data;

    if (!user?.id) {
      throw new Error('Invalid user returned from backend');
    }

    // 2. Sign JWT with user ID
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || 'no_key_set',
      { expiresIn: '1h' }
    );

    // 3. Expiration time: 1 hour
    const expiresAt = new Date(Date.now() + 3600 * 1000).toISOString();

    return { accessToken, expiresAt };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

const getUser = async (accessToken: string): Promise<PlatformUser | undefined | null> => {
  try {
    if(accessToken != "") {
      const { data } = await axios.get('http://localhost:3001/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return data.user;
    } else {
      return null
    }
  } catch (error) {
    console.error(error);
    // Handle error
    return null;
  }
};

export default {
  registerUser,
  loginUser,
  getUser
};