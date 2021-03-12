import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import Request from '../components/Request';
import SendEmails from '../components/SendEmails';
import GlobalSettings from '../components/GlobalSettings';
import useMailgun from '../hooks/useMailgun';

const useStyles = makeStyles((theme) => ({
    spacing: {
        '& > *': {
            margin: theme.spacing(1, 0),
        },
    },
    card: {
        width: '100%',
        height: '100%',
    },
}));

export default function Home() {
    const [open, setOpen] = React.useState('');
    const classes = useStyles();
    const [info] = useMailgun();
    return (
        <Card className={classes.card}>
            <CardHeader title="Mailgun Mini" />
            <CardContent className={classes.spacing}>
                <GlobalSettings />
                <Divider />
                {info.apiKey && info.domain && (
                    <>
                        <Typography variant="overline">API</Typography>
                        <List>
                            <ListItem button onClick={() => setOpen('send-email')}>
                                <ListItemText primary="Send Email" />
                            </ListItem>
                        </List>
                        <SendEmails title="Send Emails" onClose={() => setOpen('')} open={open === 'send-email'} />
                    </>
                )}
            </CardContent>
        </Card>
    );
}
