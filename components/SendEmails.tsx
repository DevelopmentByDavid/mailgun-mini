import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useFetch } from 'react-async';

import FilePreview from './FilePreview';
import Templates from './Templates';
import Settings, { State as SettingsState, initialState as initialSettingsState } from './Settings';
import useMailgun from '../hooks/useMailgun';

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
    to: {
        first_name: string;
        last_name: string;
        email: string;
        link_survey?: string;
        link_join?: string;
        link_background?: string;
    }[];
    file: File | null;
    sampleEmail: string;
    templateName: string;
    sampleFirst: string;
    sampleLast: string;
    sampleJoinLink: string;
    sampleBackgroundLink: string;
    sampleSurveyLink: string;
}

interface Props {
    title: string;
    open: boolean;
    onClose: () => void;
}
const initialState = {
    ...initialSettingsState,
    to: [],
    file: null,
    templateName: '',
    sampleEmail: '',
    sampleFirst: '',
    sampleLast: '',
    sampleJoinLink: '',
    sampleBackgroundLink: '',
    sampleSurveyLink: '',
};
export default function SendEmails({ onClose, open, title }: Props) {
    const classes = useStyles();
    const { run, data, isPending, error, isResolved } = useFetch('/api/send-invites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    const [info] = useMailgun();
    const [state, setState] = React.useState<State>(initialState);
    React.useEffect(() => {
        if (error) alert(error);
        if (isResolved) {
            alert('Success!');
            onClose();
        }
    }, [error, isResolved]);

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
    function handleSendSample() {
        if (info.apiKey && info.domain) {
            console.log(state);
            run((init) => ({
                ...init,
                body: JSON.stringify({
                    apiKey: info.apiKey,
                    domain: info.domain,
                    from: state.from,
                    to: [
                        {
                            first_name: state.sampleFirst,
                            last_name: state.sampleLast,
                            email: state.sampleEmail,
                            link_survey: state.sampleSurveyLink,
                            link_background: state.sampleBackgroundLink,
                            link_join: state.sampleJoinLink,
                        },
                    ],
                    subject: state.subject,
                    tags: state.tags,
                    replyTo: state.replyTo,
                    template: state.templateName,
                }),
            }));
        } else {
            alert('Must fill in API Key and domain!');
        }
    }

    function handleSendAll() {
        if (info.apiKey && info.domain) {
            run((init) => ({
                ...init,
                body: JSON.stringify({
                    apiKey: info.apiKey,
                    domain: info.domain,
                    from: state.from,
                    to: state.to,
                    subject: state.subject,
                    tags: state.tags,
                    replyTo: state.replyTo,
                    template: state.templateName,
                }),
            }));
        } else {
            alert('Must fill in API Key and domain!');
        }
    }

    return (
        <Dialog open={open} onClose={onClose} onExited={() => setState(initialState)}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent style={{ minWidth: 500 }}>
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
                    <Grid item xs={12} container direction="column" className={classes.root}>
                        <TextField
                            label="First Name"
                            value={state.sampleFirst}
                            onChange={handleChange('sampleFirst')}
                        />
                        <TextField label="Last Name" value={state.sampleLast} onChange={handleChange('sampleLast')} />
                        <TextField
                            label="Email"
                            variant="filled"
                            type="email"
                            value={state.sampleEmail}
                            onChange={handleChange('sampleEmail')}
                        />
                        <TextField
                            label="Sample Join URL"
                            value={state.sampleJoinLink}
                            onChange={handleChange('sampleJoinLink')}
                        />
                        <TextField
                            label="Sample Background URL"
                            value={state.sampleBackgroundLink}
                            onChange={handleChange('sampleBackgroundLink')}
                        />
                        <TextField
                            label="Sample Survey URL"
                            value={state.sampleSurveyLink}
                            onChange={handleChange('sampleSurveyLink')}
                        />
                        <Button onClick={handleSendSample}>Send Sample</Button>
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
                    {state.file && (
                        <FilePreview
                            file={state.file}
                            onParseComplete={(data) => setState((prev) => ({ ...prev, to: data }))}
                        />
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button disabled={isPending} variant="contained" color="primary" onClick={handleSendAll}>
                    Send
                </Button>
            </DialogActions>
        </Dialog>
    );
}
