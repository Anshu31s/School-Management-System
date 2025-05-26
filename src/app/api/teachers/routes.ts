// pages/api/teachers/route.ts

import { createClerkClient } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, password, username } = req.body;

  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const user = await clerkClient.users.createUser({
      firstName,
      lastName,
      username,
      emailAddress: [email],
      password,
    });

    return res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    console.error('Error creating user:', error);
    return res.status(500).json({
      message: 'Failed to create user',
      error: error.errors || error.message,
    });
  }
}
