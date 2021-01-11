import { Children, InputHTMLAttributes } from 'react';

interface Props {
    title: string;
    // value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode | React.ReactNodeArray;
    accept?: string | undefined;
}

export default function FielField({
    title,
    onChange,
    children,
    accept,
}: Props) {
    return (
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <p className="flow-text">{title}</p>
                    {children}
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>File</span>
                            <input
                                // value={value}
                                onChange={onChange}
                                type="file"
                                accept={accept}
                            />
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
