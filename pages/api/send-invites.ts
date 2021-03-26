// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import * as yup from 'yup';
import Mailgun, { MailOpts } from '../../utils/mg';

interface Body {
    apiKey: string;
    domain: string;
    to: {
        first_name: string;
        last_name: string;
        email: string;
        link_survey?: string;
        link_join?: string;
        link_background?: string;
    }[];
    subject: string;
    tags: string;
    replyTo: string;
    from: string;
    template: string;
}

const schema: yup.SchemaOf<Body> = yup
    .object()
    .shape({
        apiKey: yup.string().required(),
        domain: yup.string().required(),
        from: yup.string().required(),
        to: yup
            .array()
            .of(
                yup.object().shape({
                    first_name: yup.string().required(),
                    last_name: yup.string().required(),
                    email: yup.string().required(),
                    link_survey: yup.string().optional(),
                    link_join: yup.string().optional(),
                    link_background: yup.string().optional(),
                })
            )
            .required(),
        subject: yup.string().required(),
        tags: yup.string().required(),
        replyTo: yup.string().required(),
        template: yup.string().required(),
    })
    .defined();

function verifyBody(obj: Record<string, any>): obj is Body {
    return schema.isValidSync(obj);
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (!verifyBody(req.body)) return res.status(400).send({});
    const { domain, apiKey, ...rest } = req.body;
    const mg = new Mailgun(domain, apiKey);
    const recipientVars = rest.to.reduce(
        (accum, item) => ({
            ...accum,
            [item.email]: {
                first_name: item.first_name,
                last_name: item.last_name,
                link_join: item.link_join,
                link_survey: item.link_survey,
                link_background: item.link_background,
            },
        }),
        {}
    );
    const to = rest.to.map(({ email }) => email).join(',');
    const results = await mg.sendEmails({
        from: rest.from,
        to,
        'h:Reply-To': rest.replyTo,
        subject: rest.subject,
        template: rest.template,
        'o:tag': rest.tags,
        'recipient-variables': recipientVars,
    });
    res.statusCode = 200;
    res.send(results.data);
};
