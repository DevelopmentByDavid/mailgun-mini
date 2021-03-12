import React from 'react';
import { InfoContext, SetInfoContext } from '../contexts/Info';

export default function useMailgun() {
    const info = React.useContext(InfoContext);
    const setInfo = React.useContext(SetInfoContext);
    if (!info || !setInfo) throw new Error('useMailgun() must be a descendant of Info Context');
    return [info, setInfo] as const;
}
