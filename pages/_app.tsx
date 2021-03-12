import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import Head from '../components/Head';
import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <div className="bg-gray-50 h-full flex flex-1 flex-col overflow-auto">
            <Head />
            <main className="flex-auto">
                <Component {...pageProps} />
            </main>
        </div>
    );
}

export default MyApp;
