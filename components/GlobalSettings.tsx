import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import useMailgun from '../hooks/useMailgun';

const useStyles = makeStyles((theme) => ({
    spacing: {
        '& > *': {
            margin: theme.spacing(1, 0),
        },
    },
}));

export default function GlobalSettings() {
    const [info, setInfo] = useMailgun();
    const classes = useStyles();
    const handleChange = (key: keyof typeof info) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setInfo((prev) => ({ ...prev, [key]: value }));
        };
    };
    return (
        <Grid container direction="column" className={classes.spacing}>
            <Typography variant="overline">Required Global Settings</Typography>
            <TextField value={info.apiKey} label="API Key" onChange={handleChange('apiKey')} variant="filled" />
            <TextField value={info.domain} label="Domain" onChange={handleChange('domain')} variant="filled" />
        </Grid>
    );
}
