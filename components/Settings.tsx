import React from 'react';

import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export interface State {
    from: string;
    replyTo: string;
    // unsubscribe: boolean;
    // trackClicks: boolean;
    // trackOpens: boolean;
    tags: string;
    subject: string;
    // tracking: boolean;
}
export const initialState: State = {
    from: '',
    replyTo: '',
    // unsubscribe: false,
    // trackClicks: false,
    // trackOpens: false,
    tags: '',
    subject: '',
};

interface Props<T extends State> {
    state: State;
    setState: React.Dispatch<React.SetStateAction<T>>;
}

export default function Settings<T extends State>({ state, setState }: Props<T>) {
    const handleChange = (key: keyof State) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;
            setState((prev) => ({ ...prev, [key]: value }));
        };
    };
    // const handleCheckboxChange = (key: keyof State) => {
    //     return (e: React.ChangeEvent<HTMLInputElement>) => {
    //         const { checked } = e.target;
    //         setState((prev) => ({ ...prev, [key]: checked }));
    //     };
    // };
    return (
        <>
            {/* <FormControlLabel
                control={<Checkbox value={state.trackOpens} onChange={handleCheckboxChange('trackOpens')} />}
                label="Track Opens"
            />
            <FormControlLabel
                control={<Checkbox value={state.trackClicks} onChange={handleCheckboxChange('trackClicks')} />}
                label="Track Clicks"
            />
            <FormControlLabel
                control={<Checkbox value={state.unsubscribe} onChange={handleCheckboxChange('unsubscribe')} />}
                label="Use Unsubscribe Link"
            /> */}
            <TextField
                helperText="Ex. MeowGun <no-reply@meowgun.com>"
                label="From"
                value={state.from}
                onChange={handleChange('from')}
            />
            <TextField
                helperText="Ex. help@meowgun.com"
                label="Reply To"
                value={state.replyTo}
                onChange={handleChange('replyTo')}
            />
            <TextField
                helperText="Ex. Your Daily Cat Facts"
                label="Subject"
                value={state.subject}
                onChange={handleChange('subject')}
            />
            <TextField
                helperText="Ex. tag-1,tag-2,tag-3 (comma separated)"
                label="Tags"
                value={state.tags}
                onChange={handleChange('tags')}
            />
        </>
    );
}
