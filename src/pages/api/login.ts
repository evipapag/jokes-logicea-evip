import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

const secret = 'test_secret';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const token = jwt.sign(req.body.user, secret, { expiresIn: '1h' });

  // Send the JWT as a response
  res.status(200).json({ token });
};

export default handler;
