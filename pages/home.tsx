import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Preview from '../components/Preview';
import TextField from '../components/TextField';
import FileField from '../components/FileField';
import ExampleFileDownload from '../components/ExampleFileDownload';
import SendSample from '../components/SendSample';
import Divider from '../components/Divider';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Title from '../components/Title';

type State = {
    apiKey: string;
    email: string;
    emailTemplate: File | null;
    userList: File | null;
    domain: string;
    from: string;
    selectedTemplate: string;
    tags: string;
    subject: string;
};

export default function Home() {
    const [state, setState] = useState<State>({
        apiKey: '',
        email: '',
        emailTemplate: null,
        userList: null,
        domain: '',
        from: '',
        selectedTemplate: '',
        tags: '',
        subject: '',
    });
    const router = useRouter();
    const [open, setOpen] = useState(false);

    function handleChange(k: keyof State) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const { value } = e.target;
            setState((prev) => ({ ...prev, [k]: value }));
        };
    }

    function handleFileChange(k: keyof State) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target;
            if (files && files.length === 1) {
                setState((prev) => ({ ...prev, [k]: files[0] }));
            }
        };
    }

    function handleSendSample(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log('send sample');
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
        }
    }, []);

    function handleSendAll() {
        console.log('send all');
        router.push('loading');
        setOpen(false);
        new Promise((resolve, reject) => {
            router.push('/loading');
            setTimeout(resolve, 300);
        })
            .then(() => router.push('/success'))
            .catch(() => router.push('/error'));
    }
    return (
        <div className="sm:container sm:mx-auto space-y-4 flex flex-col h-full bg-white shadow p-8 mb-8">
            <p className="text-4xl font-thin">Mailgun Mini</p>
            <Modal open={open} onClose={() => setOpen(false)} onAccept={handleSendAll} />
            <TextField
                value={state.apiKey}
                onChange={handleChange('apiKey')}
                title="Step 1. Mailgun Info"
                id="mailgun_api_key"
                label="Mailgun API Key"
            />
            <TextField
                value={state.domain}
                onChange={handleChange('domain')}
                id="mailgun_domain"
                label="Mailgun domain"
            />
            <TextField value={state.from} onChange={handleChange('from')} id="mailgun_from" label="From" />

            <TextField value={state.tags} onChange={handleChange('tags')} id="mailgun_tags" label="Tags" />
            <TextField
                value={state.subject}
                onChange={handleChange('subject')}
                id="mailgun_subject"
                label="Email Subject"
            />

            <Divider />
            <div className="container flex flex-wrap flex-col space-y-3">
                <div className="flex-auto">
                    <Title>Step 2. Select Template to Use</Title>
                </div>
                <div className="flex-auto pl-8">
                    <Button disabled={!state.apiKey || !state.domain} onClick={() => console.log('browse list')}>
                        Browse Template List
                    </Button>
                </div>
            </div>

            <Divider />

            <FileField
                title="Step 3. Select list of users to use"
                // value={state.userList}
                onChange={handleFileChange('userList')}
                accept="text/csv"
            >
                <ExampleFileDownload />
            </FileField>
            {state.userList && <Preview file={state.userList} />}

            <Divider />

            <SendSample onSubmit={handleSendSample} />

            <Divider />
            <div className="flex flex-col space-y-4">
                <p className="flex-auto uppercase">Step 5. Send to full list</p>
                <div className="flex-auto pl-8">
                    <button
                        type="button"
                        name="action"
                        data-target="confirmation-modal"
                        className="bg-blue-200 rounded shadow p-1 uppercase hover:shadow-md hover:bg-blue-400 transition-all flex-auto"
                        onClick={() => setOpen(true)}
                    >
                        Send to all
                    </button>
                </div>
            </div>
        </div>
    );
}
