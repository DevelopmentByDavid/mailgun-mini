export default function TextField({ children, ...rest }: React.DOMAttributes<HTMLParagraphElement>) {
    return (
        <p className="flex-auto flex-grow uppercase" {...rest}>
            {children}
        </p>
    );
}
