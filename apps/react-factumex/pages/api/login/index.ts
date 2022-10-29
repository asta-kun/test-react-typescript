import { NextApiRequest, NextApiResponse } from 'next/types';
import { v4 as uuid } from 'uuid';

const users = [
  ['admin', 'password'],
  ['user', 'password'],
];

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === 'POST') {
    // adding a delay to simulate a real API
    await new Promise((resolve) => setTimeout(resolve, 1_500));

    const { username, password } = JSON.parse(req.body); // maybe add a way to validate the body

    const isValid = users.some(
      (user) => user[0] === username && user[1] === password
    );

    if (!isValid) {
      res.status(401).json({ message: 'Invalid username or password' });
      return;
    }

    res.status(201).json({ token: uuid() });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};

export default handler;
