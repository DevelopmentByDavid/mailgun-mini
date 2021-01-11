import { useEffect, useState } from 'react';
import papaparse from 'papaparse';

interface Props {
    file: File;
}

interface Datum {
    first_name: string;
    last_name: string;
    email: string;
}

export default function Preview({ file }: Props) {
    const [state, setState] = useState<Datum[]>([]);
    useEffect(() => {
        papaparse.parse<Datum>(file, {
            complete: (results) => {
                setState(results.data);
            },
            header: true,
        });
    }, [file]);
    if (state.length === 0) return <div>Parsing File...</div>;

    return (
        <div>
            <h5>Preview</h5>
            <p className="flex-text">
                Please compare to the csv to verify the integrity of the results
                below.
            </p>
            <p>
                <b>The first box is the legend</b>
            </p>
            <ul className="collection">
                <li className="collection-item">
                    <span className="title">
                        <i>First</i> <i>Last</i>
                    </span>
                    <p>
                        <i>Email</i>
                    </p>
                </li>
                {state.slice(0, 5).map(({ first_name, last_name, email }) => (
                    <li className="collection-item">
                        <span className="title">
                            {first_name} {last_name}
                        </span>
                        <p>{email}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
