import React, { useEffect, useState } from 'react';
import papaparse from 'papaparse';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface Props {
    file: File;
    onParseComplete: (data: Datum[]) => void;
}

interface Datum {
    first_name: string;
    last_name: string;
    email: string;
    link_survey?: string;
    link_join?: string;
    link_background?: string;
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Preview({ file, onParseComplete }: Props) {
    const classes = useStyles();
    const [state, setState] = useState<Datum[]>([]);
    useEffect(() => {
        papaparse.parse<Datum>(file, {
            complete: (results) => {
                setState(results.data);
                onParseComplete(results.data);
            },
            header: true,
        });
    }, [file]);
    if (state.length === 0) return <div>Parsing File...</div>;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Survey Link</TableCell>
                        <TableCell>Join Link</TableCell>
                        <TableCell>Background Link</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state
                        .slice(0, 5)
                        .map(({ first_name, last_name, email, link_survey, link_join, link_background }) => (
                            <TableRow key={email}>
                                <TableCell>{first_name || 'error :('}</TableCell>
                                <TableCell>{last_name || 'error :('}</TableCell>
                                <TableCell>{email || 'error: ('}</TableCell>
                                <TableCell>{link_survey || 'no link found'}</TableCell>
                                <TableCell>{link_join || 'no link found'}</TableCell>
                                <TableCell>{link_background || 'no link found'}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
