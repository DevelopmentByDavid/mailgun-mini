import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import axios from 'axios';

// import getTemplates from "../api/getTemplates";
import useMailgun from '../hooks/useMailgun';

interface Props {
    templateName: string;
    setTemplateName: (name: string) => void;
}

export default function Templates({ templateName, setTemplateName }: Props) {
    const [info] = useMailgun();
    const [templates, setTemplates] = React.useState<{ name: string; description: string }[]>([]);
    React.useEffect(() => {
        let isMounted = true;
        if (info) {
            axios
                .post('/api/templates', info)
                .then(({ data }) => {
                    if (!isMounted) return;
                    setTemplates(data as { name: string; description: string }[]);
                })
                .catch(console.error);
        }
        return () => {
            isMounted = false;
        };
    }, [info]);
    console.log(templateName);
    if (templates.length === 0)
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                No Templates to display
            </Typography>
        );
    return (
        <List disablePadding>
            {templates.map(({ name, description }) => (
                <ListItem key={name} button selected={name === templateName} onClick={() => setTemplateName(name)}>
                    <Radio checked={name === templateName} />
                    <ListItemText primary={name} secondary={description} />
                </ListItem>
            ))}
        </List>
    );
}
