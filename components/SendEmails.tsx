import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import FilePreview from './FilePreview';
import Templates from './Templates';
import Settings, { State as SettingsState, initialState as initialSettingsState } from './Settings';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        input: {
            display: 'none',
        },
    })
);

interface State extends SettingsState {
    to: string;
    file: File | null;
    sampleEmail: string;
    templateName: string;
}

export default function SendEmails() {
    const classes = useStyles();
    const [state, setState] = React.useState<State>({
        ...initialSettingsState,
        to: '',
        file: null,
        sampleEmail: '',
        templateName: '',
    });

    function handleFileChange(k: keyof State) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { files } = e.target;
            if (files && files.length === 1) {
                setState((prev) => ({ ...prev, [k]: files[0] }));
            }
        };
    }

    function handleChange(k: keyof State) {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setState((prev) => ({ ...prev, [k]: value }));
        };
    }

    return (
        <Grid container direction="column" className={classes.root}>
            <Typography variant="overline">Base Settings</Typography>
            <Settings state={state} setState={setState} />

            <Divider />
            <Typography variant="overline">Choose Template</Typography>
            <Templates
                templateName={state.templateName}
                setTemplateName={(templateName) => setState((prev) => ({ ...prev, templateName }))}
            />
            <Divider />
            <Typography variant="overline">Send Sample</Typography>
            <Grid item xs={12} container justify="space-between">
                <TextField
                    label="Send Sample Email To"
                    variant="filled"
                    type="email"
                    value={state.sampleEmail}
                    onChange={handleChange('sampleEmail')}
                />
                <Button onClick={() => console.log('TODO')}>Send</Button>
            </Grid>
            <Divider />
            
            <Typography variant="overline">Recipients</Typography>
            <Grid item xs={12} container justify="space-between">
                <Button component="a" href="/example.csv">
                    Download Example file
                </Button>
                <input
                    accept="text/csv"
                    className={classes.input}
                    id="contained-button-file"
                    onChange={handleFileChange('file')}
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="outlined" color="primary" component="span">
                        Upload Recipient List
                    </Button>
                </label>
            </Grid>
            {state.file && <FilePreview file={state.file} />}
        </Grid>
    );
}
