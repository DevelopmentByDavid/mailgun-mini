import React from 'react';
import Loader from '../components/Loader';

export default function Loading() {
    return (
        <div
            className="valign-wrapper"
            style={{ width: '100%', height: '100%' }}
        >
            <div className="container center-align">
                <Loader />
            </div>
        </div>
    );
}
