import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client('515970516485-sm68lcasd593cn1ukvqg73hsfds8ldol.apps.googleusercontent.com');
export default async function verify(token: string) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: '515970516485-sm68lcasd593cn1ukvqg73hsfds8ldol.apps.googleusercontent.com',
    });
    const payload = ticket.getPayload();
    if (!payload) throw new Error('Invalid id token');
    // const userId = payload['sub'];
    const domain = payload['hd'];
    if (!domain || domain !== process.env.MG_DOMAIN) throw new Error('Incorrect domain');
}
