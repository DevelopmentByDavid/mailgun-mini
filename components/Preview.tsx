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
        <div className="container flex flex-col pl-8 pt-8">
            <h5 className="flex-auto text-lg font-light">Preview</h5>
            <p className="flex-auto pl-8 mb-8">
                Please compare the csv to the results below verify the integrity
                of the results below.
                <br />
                <b>
                    If you see any errors, double check the column names; see
                    example file.
                </b>
            </p>
            <div className="flex-auto pl-8 container max-w-2xl shadow-md rounded p-8 flex justify-center">
                <table className="table-auto">
                    <thead>
                        <tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state
                            .slice(0, 5)
                            .map(({ first_name, last_name, email }) => (
                                <tr key={email}>
                                    <td>{first_name || 'error :('}</td>
                                    <td>{last_name || 'error :('}</td>
                                    <td>{email || 'error: ('}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
