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
        <div className="container flex flex-wrap flex-col space-y-4">
            <p className="flex-auto uppercase">{title}</p>
            <div className="flex-auto pl-8">{children}</div>
            <div className="flex-auto pl-8">
                <input
                    // value={value}
                    onChange={onChange}
                    type="file"
                    accept={accept}
                />
            </div>
        </div>
    );
}
