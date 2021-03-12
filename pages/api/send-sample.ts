// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
// import { sendEmail } from '../../utils/mg';

function verifyBody(obj: Record<string, string>): obj is { email: string; firstName: string; lastName: string } {
    return Boolean(obj.email) && Boolean(obj.firstName) && Boolean(obj.lastName);
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!verifyBody(req.body)) return res.status(400).send({});
    const { email, firstName, lastName } = req.body;
    res.statusCode = 200;
    res.json({ name: 'John Doe' });
};
