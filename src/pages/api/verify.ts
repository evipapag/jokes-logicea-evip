import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { parseCookies } from 'nookies';

const secret = 'test_secret';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cookies = parseCookies({ req });
    const jwtToken = cookies.token;
    const decoded = jwt.verify(jwtToken, secret);
    // Send the JWT as a response
    res.status(200).json({ decoded });
  } catch (err) {
    // Token is invalid or expired
    // Send the JWT as a response
    res.status(200).json({ decoded: null });
  }
};

export default handler;
