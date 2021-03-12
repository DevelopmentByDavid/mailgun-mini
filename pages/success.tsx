import React from 'react';

export default function Success() {
    return (
        <div className="sm:container sm:mx-auto space-y-4 flex flex-col h-full bg-white shadow p-8 mb-8">
            <div className="flex-auto flex flex-col justify-center items-center">
                <p className="mb-8 text-4xl font-thin">Success!</p>
                <p>You may now close the page or send more</p>
                <div className="mt-4">
                    <a
                        className="bg-blue-300 mt-8 rounded shadow hover:bg-blue-400 transition-all hover:shadow-md px-2 py-0.5"
                        href="/home"
                    >
                        Send More
                    </a>
                </div>
            </div>
        </div>
    );
}
