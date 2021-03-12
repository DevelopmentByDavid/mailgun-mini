interface Props {
    children: React.ReactNode | React.ReactNodeArray;
}

export default function SendSample({
    children,
    ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            className="transition-colors uppercase text-blue-400 ring-blue-400 ring-1 p-1 hover:shadow-md mb-8 rounded shadow hover:bg-blue-50 disabled:opacity-50 disabled:pointer-events-none"
            name="action"
            {...rest}
        >
            {children}
        </button>
    );
}
