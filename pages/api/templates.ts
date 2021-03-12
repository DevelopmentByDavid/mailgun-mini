// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Mailgun from '../../utils/mg';

function verifyBody(obj: Record<string, string>): obj is { apiKey: string; domain: string } {
    return Boolean(obj.apiKey) && Boolean(obj.domain);
}
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!verifyBody(req.body)) return res.status(400).send({});
    const { apiKey, domain } = req.body;
    const mg = new Mailgun(domain, apiKey);
    const { data } = await mg.getTemplates();
    res.statusCode = 200;
    res.json(data.items);
};
