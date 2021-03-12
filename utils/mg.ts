import FormData from 'form-data';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const url = 'https://api.mailgun.net/v3/';

export interface MailOpts {
    from: string;
    to: string;
    subject: string;
    template: string;
    'o:tag': string;
    'recipient-variables': Record<string, { first_name: string; last_name: string }>;
    'h:Reply-To': string;
}

export default class Mailgun {
    domain: string;
    apiKey: string;
    url: string;
    axios: AxiosInstance;
    constructor(domain: string, apiKey: string) {
        this.domain = domain;
        this.apiKey = apiKey;
        this.url = `${url}${domain}`;
        this.axios = axios.create({
            baseURL: this.url,
            auth: {
                username: 'api',
                password: apiKey,
            },
        });
    }

    getTemplates(): Promise<
        AxiosResponse<{
            items: { createdAt: string; description: string; name: string }[];
            paging: {
                first: string;
                last: string;
                next: string;
                prev: string;
            };
        }>
    > {
        return this.axios.get('/templates');
    }

    sendEmails(options: MailOpts) {
        const form = new FormData();
        const entries = Object.entries(options);
        for (let i = 0; i < entries.length; i += 1) {
            form.append(entries[i][0], entries[i][1]);
        }
        return this.axios.post('/messages', form);
    }

    // sendSample(options: Pick<MailOpts, 'from' | 'to'>);
}
