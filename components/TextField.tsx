interface Props {
    title: string;
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
        <div className="row">
            <div className="col s12">
                <div className="row">
                    <p className="flow-text">{title}</p>
                    <div className="input-field col s12">
                        <input
                            id={id}
                            type="text"
                            className="validate"
                            value={value}
                            required
                            onChange={onChange}
                        />
                        <label htmlFor={id}>{label}</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
