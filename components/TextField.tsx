interface Props {
    title?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    id: string;
}
export default function TextField({
    title,
    value,
    onChange,
    label,
    id,
}: Props) {
    return (
        <div className="container flex flex-wrap flex-col space-y-3">
            {title && <p className="flex-auto flex-grow uppercase">{title}</p>}
            <div className="flex-auto pl-8">
                <input
                    id={id}
                    type="text"
                    className="shadow rounded pl-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    value={value}
                    required
                    onChange={onChange}
                    placeholder={label}
                />
            </div>
        </div>
    );
}
