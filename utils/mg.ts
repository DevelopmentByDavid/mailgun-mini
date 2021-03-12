import mg from 'mailgun-js';

const FROM = process.env.MG_FROM;
const REPLY_TO = process.env.MG_REPLY_TO;
const API_KEY = process.env.MG_API_KEY;
const DOMAIN = process.env.MG_DOMAIN;

const mail = mg({ apiKey: API_KEY, domain: DOMAIN });

/**
 * get all templates
 */
export async function getTemplates(): Promise<{
    items: { createdAt: string; description: string; name: string }[];
    paging: {
        first: string;
        last: string;
        next: string;
        prev: string;
    };
}> {
    return mail.get(`/${DOMAIN}/templates`, { limit: 10 });
}

export const getDefaultData = (): Partial<mg.messages.SendData> & {
    'h:List-Unsubscribe': string;
} => ({
    from: FROM,
    'h:Reply-To': REPLY_TO,
    'h:List-Unsubscribe': '%unsubscribe_url%',
    'o:tracking-clicks': true,
    'o:tracking-opens': true,
    'o:tracking': true,
});

/**
 * send a batch of emails
 */
export async function sendEmails(data: { email: string; firstName: string; lastName: string }[], subject: string) {
    const recipientVars = data.reduce(
        (accum, { email, firstName, lastName }) => ({ ...accum, [email]: { firstName, lastName } }),
        {}
    );
    const emails = data.map(({ email }) => email);
    return mail.messages().send({
        ...getDefaultData(),
        to: emails,
        'recipient-variables': recipientVars,
        subject,
    });
}

/**
 * sends a single mailgun email
 */
export async function sendEmail({ email, firstName, lastName }: Record<'email' | 'firstName' | 'lastName', string>) {
    return mail.messages().send({
        ...getDefaultData(),
        to: email,
        'recipient-variables': { [email]: { firstName, lastName } },
    });
}
