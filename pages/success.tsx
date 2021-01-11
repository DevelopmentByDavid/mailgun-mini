import React from 'react';

export default function Success() {
    return (
        <div
            className="container valign-wrapper"
            style={{ width: '100%', height: '100%' }}
        >
            <div className="row">
                <div className="col s12">
                    <div className="container center-align">
                        Success
                        <p>You may now close the page or send more</p>
                    </div>
                </div>
                <div className="col s12">
                    <div className="container center-align">
                        <a className="btn" href="/home">
                            Send More
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
