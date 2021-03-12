import GoogleLogin from 'react-google-login';
import { useRouter } from 'next/router';

export default function Login() {
    const router = useRouter();
    return (
        <div className="sm:container sm:mx-auto space-y-4 flex flex-col h-full bg-white shadow p-8 mb-8 justify-center items-center">
            <div className="flex-0 flex justify-center flex-col items-center">
                <div className="flex-auto">
                    <GoogleLogin
                        clientId="515970516485-sm68lcasd593cn1ukvqg73hsfds8ldol.apps.googleusercontent.com"
                        buttonText="Login with Google"
                        onSuccess={() => router.push('/home')}
                        cookiePolicy="single_host_origin"
                        hostedDomain="connectingtocongress.org"
                    />
                </div>
            </div>
        </div>
    );
}
