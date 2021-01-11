import React from 'react';

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
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <p className="flow-text">Step 4. Send Sample Email</p>
                    <form onSubmit={onSubmit}>
                        <div className="input-field col s12">
                            <input
                                id="sample_email"
                                type="email"
                                required
                                className="validate"
                                value={form.email}
                                onChange={handleChange('email')}
                            />
                            <label htmlFor="sample_email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                id="sample_first_name"
                                required
                                type="text"
                                className="validate"
                                value={form.first_name}
                                onChange={handleChange('first_name')}
                            />
                            <label htmlFor="sample_first_name">
                                First Name
                            </label>
                        </div>
                        <div className="input-field col s12">
                            <input
                                id="sample_last_name"
                                required
                                type="text"
                                className="validate"
                                value={form.last_name}
                                onChange={handleChange('last_name')}
                            />
                            <label htmlFor="sample_last_name">Last Name</label>
                        </div>
                        <div className="col s12 right-align">
                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                            >
                                Send Sample
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
