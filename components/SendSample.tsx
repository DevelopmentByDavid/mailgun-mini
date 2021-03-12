import React from 'react';
import Button from './Button';

interface Form {
    last_name: string;
    first_name: string;
    email: string;
}

interface Props {
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function SendSample({ onSubmit }: Props) {
    const [form, setForm] = React.useState<Form>({
        last_name: '',
        first_name: '',
        email: '',
    });

    function handleChange(key: keyof Form) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setForm({ ...form, [key]: value });
        };
    }
    return (
        <div className="container space-y-4">
            <p className="uppercase">Step 4. Send Sample Email</p>
            <p className="pl-8">
                Send a sample email to yourself.{' '}
                <b>It will probably take a few minutes.</b>
            </p>
            <form className="flex flex-col space-y-4 pl-8" onSubmit={onSubmit}>
                <div className="flex-auto">
                    <input
                        id="sample_email"
                        type="email"
                        required
                        className="shadow rounded pl-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={form.email}
                        onChange={handleChange('email')}
                        placeholder="Email"
                    />
                </div>
                <div className="flex-auto">
                    <input
                        id="sample_first_name"
                        required
                        type="text"
                        className="shadow rounded pl-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={form.first_name}
                        onChange={handleChange('first_name')}
                        placeholder="First Name"
                    />
                </div>
                <div className="flex-auto">
                    <input
                        id="sample_last_name"
                        required
                        type="text"
                        className="shadow rounded pl-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        value={form.last_name}
                        onChange={handleChange('last_name')}
                        placeholder="Last Name"
                    />
                </div>
                <div className="flex-auto">
                    <Button type="submit">Send Sample</Button>
                </div>
            </form>
        </div>
    );
}
