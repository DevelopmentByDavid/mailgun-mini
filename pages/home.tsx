import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Preview from '../components/Preview';
import TextField from '../components/TextField';
import FileField from '../components/FileField';
import ExampleFileDownload from '../components/ExampleFileDownload';
import SendSample from '../components/SendSample';

type State = {
    apiKey: string;
    email: string;
    emailTemplate: File | null;
    userList: File | null;
};

export default function Home() {
    const [state, setState] = useState<State>({
        apiKey: '',
        email: '',
        emailTemplate: null,
        userList: null,
    });
    const router = useRouter();

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
            import('materialize-css').then((M) => {
                const elems = document.querySelectorAll('.modal');
                M.Modal.init(elems, {
                    onCloseEnd: () => {},
                });
            });
        }
    }, []);

    function handleSendAll(_e: React.MouseEvent<HTMLButtonElement>) {
        console.log('send all');
        router.push('loading');
        new Promise((resolve, reject) => {
            router.push('/loading');
            setTimeout(resolve, 300);
        })
            .then(() => router.push('/success'))
            .catch(() => router.push('/error'));
    }
    return (
        <div className="container">
            <div id="confirmation-modal" className="modal">
                <div className="modal-content">
                    <h4>Please Confirm</h4>
                    <p>Are you sure you want to send this email to all?</p>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="modal-close waves-effect waves-red btn-flat"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="modal-close waves-effect waves-green btn"
                        onClick={handleSendAll}
                    >
                        Agree
                    </button>
                </div>
            </div>
            <TextField
                value={state.apiKey}
                onChange={handleChange('apiKey')}
                title="Step 1. Mailgun Info"
                id="mailgun_api_key"
                label="Mailgun API Key"
            />
            <FileField
                title="Step 2. Select Email Template to use"
                // value={state.email}
                onChange={handleFileChange('emailTemplate')}
                accept="text/html"
            />
            <FileField
                title="Step 3. Select list of users to use"
                // value={state.userList}
                onChange={handleFileChange('userList')}
                accept="text/csv"
            >
                <ExampleFileDownload />
            </FileField>
            {state.userList && <Preview file={state.userList} />}
            <SendSample onSubmit={handleSendSample} />
            <div className="row">
                <div className="col s12">
                    <div className="row">
                        <p className="flow-text">Step 5. Send to full list</p>
                        <div className="col s12 center-align">
                            <button
                                className="btn waves-effect waves-light modal-trigger"
                                type="button"
                                name="action"
                                data-target="confirmation-modal"
                            >
                                Send to all
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
